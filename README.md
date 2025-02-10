# Big Thierry's Fortune Frenzy 🎲

Bienvenue dans **Big Thierry's Fortune Frenzy**, un jeu de dés basé sur la blockchain BNB Smart Chain Testnet ! 🏆

## 📜 Description

Ce projet est une **plateforme de jeu décentralisée** où les joueurs peuvent parier en BNB et tenter leur chance en lançant un dé numérique (1 à 6). S'ils devinent correctement le numéro, ils remportent **5x leur mise** !

Le projet se compose de deux parties :
- **Backend** : Contrat intelligent Solidity déployé sur BNB Smart Chain Testnet.
- **Frontend** : Interface utilisateur en **Next.js**, permettant aux joueurs de parier et de voir leurs résultats.

## 📦 Installation et configuration

### 1️⃣ Backend : Contrat intelligent Solidity

#### 📌 Prérequis
- **Node.js** (>= 18.x)
- **Hardhat**

#### 📂 Installation
```sh
git clone https://github.com/jabibamman/big-thierrys-fortune-frenzy.git
cd big-thierrys-fortune-frenzy/backend
pnpm install
```

#### 🚀 Déploiement sur BNB Testnet
```sh
npx hardhat run scripts/deploy.js --network bnbTestnet
```

#### 🌍 Configuration environnementale (`.env`)
Crée un fichier `.env` et ajoute :
```
PRIVATE_KEY=ton_private_key_metamask
NEXT_PUBLIC_BSC_TESTNET_RPC=https://bsc-testnet-rpc.publicnode.com
NEXT_PUBLIC_CONTRACT_ADDRESS=0xTonAdresseDeContrat
```

### 2️⃣ Frontend : Interface utilisateur

#### 📂 Installation
```sh
cd ../frontend
pnpm install
```

#### 🚀 Lancer l'application
```sh
pnpm run dev
```

Accède à l'application sur **http://localhost:3000**.

## 🎮 Règles du jeu

- 🎲 **Sélectionne un numéro** entre 1 et 6.
- 💰 **Entre ta mise** en BNB.
- 🏆 **Si tu gagnes**, tu récupères **5x ta mise**.
- ❌ **Si tu perds**, ta mise est perdue.

## ⚠️ Disclaimer - Jeu responsable

Les jeux d'argent comportent **un risque d'addiction et de pertes financières**. Joue de manière responsable. **Si tu ressens un problème avec le jeu, contacte Joueurs Info Service au 09 74 75 13 13 (France)**.

## 📜 Licence

Ce projet est sous licence MIT.
