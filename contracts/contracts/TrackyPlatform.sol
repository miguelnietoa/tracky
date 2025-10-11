// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Tracky token (ERC20)
contract TrackyToken is ERC20, ERC20Burnable, Ownable {
    constructor(uint256 initialSupply)
        ERC20("Tracky", "TRK")
        Ownable(msg.sender) 
    {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

/// @title TrackyNFT (ERC721) 
contract TrackyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds; 

    address public minter;

    event MinterChanged(address indexed previous, address indexed current);
    event Minted(uint256 indexed tokenId, address indexed to, string tokenURI);

    /// @param name_ Nombre del NFT
    /// @param symbol_ Símbolo del NFT
    /// @param initialOwner Dirección que será el owner del contrato
    /// @param initialMinter Dirección autorizada a mintear desde el despliegue
    constructor(
        string memory name_,
        string memory symbol_,
        address initialOwner,
        address initialMinter
    )
        ERC721(name_, symbol_)
        Ownable(initialOwner) // ✅ requerido en OZ v5
    {
        require(initialOwner != address(0), "Owner zero address");
        require(initialMinter != address(0), "Minter zero address");
        minter = initialMinter;
        emit MinterChanged(address(0), initialMinter);
    }

    modifier onlyMinter() {
        require(minter == msg.sender, "TrackyNFT: caller is not minter");
        _;
    }


    function setMinter(address newMinter) external onlyOwner {
        emit MinterChanged(minter, newMinter);
        minter = newMinter;
    }

    function mintTo(address to, string memory uri)
        external
        onlyMinter
        returns (uint256)
    {
        _tokenIds += 1; 
        uint256 newId = _tokenIds;
        _safeMint(to, newId);
        _setTokenURI(newId, uri);
        emit Minted(newId, to, uri);
        return newId;
    }
}

/// @title CampaignManager - gestiona campañas, fondos TRK y minteo de NFTs
contract CampaignManager is Ownable, ReentrancyGuard {
    enum CampaignStatus {
        Created,
        Active,
        Completed,
        Cancelled
    }

    struct Participant {
        string name;
        address wallet;
        bool attended;
        bool nftMinted;
    }

    struct Campaign {
        uint256 id;
        string name;
        string description;
        uint256 startAt;
        uint256 endAt;
        address creator;
        uint256 rewardAmount;
        uint256 funds;
        string imageUrl;
        CampaignStatus status;
        Participant[] participants;
    }

    TrackyToken public token;
    TrackyNFT public nft;

    uint256 private _campaignCounter;
    mapping(uint256 => Campaign) private campaigns;
    mapping(uint256 => mapping(address => uint256))
        private participantIndexByAddr;

    // EVENTS
    event CampaignCreated(
        uint256 indexed id,
        string name,
        address indexed creator
    );
    event ParticipantAdded(
        uint256 indexed id,
        address indexed participant,
        string name
    );
    event CampaignFunded(
        uint256 indexed id,
        address indexed funder,
        uint256 amount
    );
    event AttendanceMarked(
        uint256 indexed id,
        address indexed participant,
        bool attended
    );
    event RewardTransferred(
        uint256 indexed id,
        address indexed creator,
        uint256 amount
    );
    event NftMinted(
        uint256 indexed id,
        uint256 tokenId,
        address indexed to,
        string uri
    );
    event CampaignCompleted(uint256 indexed id, string imageUrl);
    event CampaignCancelled(uint256 indexed id);

    modifier campaignExists(uint256 id) {
        require(id > 0 && id <= _campaignCounter, "Campaign: not exists");
        _;
    }

    constructor(address tokenAddress, address nftAddress)
        Ownable(msg.sender)
    {
        require(tokenAddress != address(0), "Token address zero");
        require(nftAddress != address(0), "NFT address zero");
        token = TrackyToken(tokenAddress);
        nft = TrackyNFT(nftAddress);
    }

    /// @notice Crea una nueva campaña
    function createCampaign(
        string calldata name_,
        string calldata description_,
        uint256 startAt_,
        uint256 endAt_,
        address creator_,
        string[] calldata participantNames,
        address[] calldata participantWallets,
        uint256 rewardAmount_
    ) external returns (uint256) {
        require(
            participantNames.length == participantWallets.length,
            "Participants mismatch"
        );
        require(startAt_ < endAt_, "Invalid dates");
        require(creator_ != address(0), "Creator zero address");
        require(participantWallets.length > 0, "Need participants");

        _campaignCounter++;
        uint256 id = _campaignCounter;

        Campaign storage c = campaigns[id];
        c.id = id;
        c.name = name_;
        c.description = description_;
        c.startAt = startAt_;
        c.endAt = endAt_;
        c.creator = creator_;
        c.rewardAmount = rewardAmount_;
        c.status = CampaignStatus.Created;

        for (uint256 i = 0; i < participantWallets.length; i++) {
            address w = participantWallets[i];
            require(w != address(0), "participant zero addr");
            c.participants.push(
                Participant({
                    name: participantNames[i],
                    wallet: w,
                    attended: false,
                    nftMinted: false
                })
            );
            participantIndexByAddr[id][w] = c.participants.length;
            emit ParticipantAdded(id, w, participantNames[i]);
        }

        emit CampaignCreated(id, name_, creator_);
        return id;
    }

    function fundCampaign(uint256 id, uint256 amount)
        external
        nonReentrant
        campaignExists(id)
    {
        require(amount > 0, "Amount zero");
        Campaign storage c = campaigns[id];
        require(
            c.status == CampaignStatus.Created ||
                c.status == CampaignStatus.Active,
            "Campaign not fundable"
        );
        bool ok = token.transferFrom(msg.sender, address(this), amount);
        require(ok, "Transfer failed");
        c.funds += amount;
        if (c.status == CampaignStatus.Created) {
            c.status = CampaignStatus.Active;
        }
        emit CampaignFunded(id, msg.sender, amount);
    }

    function markAttendance(uint256 id, address[] calldata attendees)
        external
        campaignExists(id)
    {
        Campaign storage c = campaigns[id];
        require(msg.sender == c.creator || msg.sender == owner(), "Not authorized");
        require(
            c.status == CampaignStatus.Active ||
                c.status == CampaignStatus.Created,
            "Campaign not active"
        );

        for (uint256 i = 0; i < attendees.length; i++) {
            address addr = attendees[i];
            uint256 indexPlus = participantIndexByAddr[id][addr];
            if (indexPlus == 0) continue;
            uint256 idx = indexPlus - 1;
            if (!c.participants[idx].attended) {
                c.participants[idx].attended = true;
                emit AttendanceMarked(id, addr, true);
            }
        }
    }

    /// @notice Mintea NFTs para los participantes sin completar la campaña
    /// @dev Solo el creador de la campaña o el owner pueden ejecutar. Requiere que el NFT tenga como minter a este contrato.
    /// @param id Id de la campaña
    /// @param imageUrl URI/imagen que se usará como tokenURI de los NFTs
    /// @param onlyAttended Si es true, solo mintea a quienes tengan asistencia marcada
    /// @return minted Cantidad de NFTs minteados en la llamada
    function mintNfts(
        uint256 id,
        string calldata imageUrl,
        bool onlyAttended
    )
        external
        nonReentrant
        campaignExists(id)
        returns (uint256 minted)
    {
        Campaign storage c = campaigns[id];
        require(msg.sender == c.creator || msg.sender == owner(), "Not authorized");
        require(
            c.status == CampaignStatus.Active || c.status == CampaignStatus.Created,
            "Campaign not open"
        );
        require(nft.minter() == address(this), "NFT minter not set");

        for (uint256 i = 0; i < c.participants.length; i++) {
            Participant storage p = c.participants[i];
            if (p.nftMinted) {
                continue;
            }
            if (onlyAttended && !p.attended) {
                continue;
            }
            uint256 tokenId = nft.mintTo(p.wallet, imageUrl);
            p.nftMinted = true;
            minted += 1;
            emit NftMinted(id, tokenId, p.wallet, imageUrl);
        }

        if (bytes(c.imageUrl).length == 0 && bytes(imageUrl).length != 0) {
            c.imageUrl = imageUrl;
        }
    }

    function verifyAndComplete(uint256 id, string calldata imageUrl)
        external
        nonReentrant
        campaignExists(id)
    {
        Campaign storage c = campaigns[id];
        require(msg.sender == c.creator || msg.sender == owner(), "Not authorized");
        require(
            c.status == CampaignStatus.Active ||
                c.status == CampaignStatus.Created,
            "Campaign not open"
        );
        require(nft.minter() == address(this), "NFT minter not set");

        // Mint NFT para todos los participantes
        for (uint256 i = 0; i < c.participants.length; i++) {
            Participant storage p = c.participants[i];
            if (!p.nftMinted) {
                uint256 tokenId = nft.mintTo(p.wallet, imageUrl);
                p.nftMinted = true;
                emit NftMinted(id, tokenId, p.wallet, imageUrl);
            }
        }

        // Enviar recompensa al creador
        if (c.rewardAmount > 0) {
            require(c.funds >= c.rewardAmount, "Insufficient campaign funds");
            c.funds -= c.rewardAmount;
            bool sent = token.transfer(c.creator, c.rewardAmount);
            require(sent, "Token transfer failed");
            emit RewardTransferred(id, c.creator, c.rewardAmount);
        }

        c.imageUrl = imageUrl;
        c.status = CampaignStatus.Completed;
        emit CampaignCompleted(id, imageUrl);
    }

    function getCampaignBasic(uint256 id)
        external
        view
        campaignExists(id)
        returns (
            uint256 cid,
            string memory name_,
            string memory description_,
            uint256 startAt,
            uint256 endAt,
            address creator_,
            uint256 rewardAmount,
            uint256 funds,
            CampaignStatus status_,
            string memory imageUrl
        )
    {
        Campaign storage c = campaigns[id];
        return (
            c.id,
            c.name,
            c.description,
            c.startAt,
            c.endAt,
            c.creator,
            c.rewardAmount,
            c.funds,
            c.status,
            c.imageUrl
        );
    }

    function getParticipants(uint256 id)
        external
        view
        campaignExists(id)
        returns (Participant[] memory)
    {
        Campaign storage c = campaigns[id];
        Participant[] memory arr = new Participant[](c.participants.length);
        for (uint256 i = 0; i < c.participants.length; i++) {
            arr[i] = c.participants[i];
        }
        return arr;
    }

    /// @notice Devuelve el id de campaña, su creador y todas las wallets participantes
    function getCampaignCreatorAndWallets(uint256 id)
        external
        view
        campaignExists(id)
        returns (
            uint256 cid,
            address creator,
            address[] memory wallets
        )
    {
        Campaign storage c = campaigns[id];
        address[] memory ws = new address[](c.participants.length);
        for (uint256 i = 0; i < c.participants.length; i++) {
            ws[i] = c.participants[i].wallet;
        }
        return (c.id, c.creator, ws);
    }

    function cancelCampaignAndWithdraw(uint256 id)
        external
        nonReentrant
        campaignExists(id)
    {
        Campaign storage c = campaigns[id];
        require(msg.sender == c.creator || msg.sender == owner(), "Not authorized");
        require(c.status != CampaignStatus.Completed, "Already completed");

        uint256 remaining = c.funds;
        c.funds = 0;
        c.status = CampaignStatus.Cancelled;
        if (remaining > 0) {
            bool ok = token.transfer(msg.sender, remaining);
            require(ok, "Transfer failed");
        }
        emit CampaignCancelled(id);
    }

    function setToken(address newToken) external onlyOwner {
        require(newToken != address(0), "Zero token");
        token = TrackyToken(newToken);
    }

    function setNFT(address newNFT) external onlyOwner {
        require(newNFT != address(0), "Zero nft");
        nft = TrackyNFT(newNFT);
    }
}
