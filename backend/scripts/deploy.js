const { ethers } = require("hardhat");

async function main() {
  const DiceGame = await ethers.getContractFactory("DiceGame");

  const diceGame = await DiceGame.deploy();
  await diceGame.waitForDeployment();

  // Récupérer l'adresse du contrat déployé
  const contractAddress = await diceGame.getAddress();
  console.log("DiceGame déployé à l'adresse :", contractAddress);
}

main().catch((error) => {
  console.error("Erreur lors du déploiement :", error);
  process.exitCode = 1;
});