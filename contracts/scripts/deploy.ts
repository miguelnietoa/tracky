import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Desplegando contratos Tracky...");

  const [deployer] = await ethers.getSigners();
  console.log("📜 Deploy account:", deployer.address);

  const initialSupply = ethers.parseUnits("1000000", 18);
  const TrackyToken = await ethers.getContractFactory("TrackyToken");
  const token = await TrackyToken.deploy(initialSupply);
  await token.waitForDeployment();
  console.log("✅ TrackyToken desplegado en:", await token.getAddress());

  const TrackyNFT = await ethers.getContractFactory("TrackyNFT");
  const nft = await TrackyNFT.deploy(
    "TrackyNFT",
    "TNFT",
    deployer.address,
    deployer.address
  );
  await nft.waitForDeployment();
  console.log("✅ TrackyNFT desplegado en:", await nft.getAddress());

  const CampaignManager = await ethers.getContractFactory("CampaignManager");
  const manager = await CampaignManager.deploy(
    await token.getAddress(),
    await nft.getAddress()
  );
  await manager.waitForDeployment();
  console.log("✅ CampaignManager desplegado en:", await manager.getAddress());

  const tx = await nft.setMinter(await manager.getAddress());
  await tx.wait();
  console.log("🔧 NFT minter asignado al CampaignManager");

  console.log("\n🎉 Despliegue completo:");
  console.log("TOKEN:", await token.getAddress());
  console.log("NFT:", await nft.getAddress());
  console.log("MANAGER:", await manager.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
