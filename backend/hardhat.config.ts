import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Vérification de la clé privée
if (!process.env.PRIVATE_KEY) {
  throw new Error("❌ PRIVATE_KEY est manquant dans le fichier .env");
}

// Configuration de Hardhat
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "bnbTestnet",
  networks: {
    bnbTestnet: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY],
    },
    bnb: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY || "", // Pour vérifier le contrat sur BscScan (optionnel)
  },
};

export default config;