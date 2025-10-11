import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY, MOONBASE_RPC } = process.env;

if (!PRIVATE_KEY) throw new Error("❌ Falta PRIVATE_KEY en el .env");
if (!MOONBASE_RPC) throw new Error("❌ Falta MOONBASE_RPC en el .env");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    moonbase: {
      url: MOONBASE_RPC || "https://rpc.api.moonbase.moonbeam.network",
      chainId: 1287,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      moonbase: "abc", // No se necesita clave real para Moonbase Alpha
    },
    customChains: [
      {
        network: "moonbase",
        chainId: 1287,
        urls: {
          apiURL: "https://blockscout.moonbeam.network/api",
          browserURL: "https://blockscout.moonbeam.network",
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};

export default config;
