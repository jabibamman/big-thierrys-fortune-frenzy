import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import DiceGameABI from "@/contracts/DiceGame.json";

export function useDiceGame() {
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
    const rpcUrl = process.env.NEXT_PUBLIC_BSC_TESTNET_RPC || "https://bsc-testnet.publicnode.com"; // Sécurisation RPC

    async function getContract() {
        if (!walletClient) return null;
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
        return new ethers.Contract(contractAddress, DiceGameABI.abi, signer);
    }

    // Fonction pour lancer les dés
    async function rollDice(chosenNumber: number, betAmount: string) {
        if (!isConnected || !walletClient) {
            alert("Connecte-toi d'abord !");
            return;
        }

        try {
            const contract = await getContract();
            if (!contract) return;

            const formattedBetAmount = betAmount.replace(",", ".");

            console.log("💰 Valeur envoyée :", formattedBetAmount);

            const tx = await contract.rollDice(chosenNumber, {
                value: ethers.parseEther(formattedBetAmount),
                gasLimit: 100000,
            });

            console.log("📜 Transaction envoyée, en attente de confirmation...");
            await tx.wait();
            console.log("✅ Transaction confirmée !");

            // 🔥 Attendre l'événement `BetResult` une seule fois pour éviter les erreurs de RPC
            const receipt = await tx.wait();
            const logs = receipt.logs.filter(log => log.address.toLowerCase() === contractAddress.toLowerCase());

            if (logs.length > 0) {
                const iface = new ethers.Interface(DiceGameABI.abi);
                logs.forEach((log) => {
                    try {
                        const parsedLog = iface.parseLog(log);
                        if (parsedLog.name === "BetResult") {
                            const rolledNumber = parsedLog.args[1];
                            const payout = parsedLog.args[2];
                            console.log(`🎲 Numéro lancé: ${rolledNumber}`);
                            console.log(`💰 Gain: ${ethers.formatEther(payout)} BNB`);

                            if (payout > 0) {
                                alert(`🎉 Félicitations ! Le dé a fait ${rolledNumber}, tu gagnes ${ethers.formatEther(payout)} BNB !`);
                            } else {
                                alert(`😢 Dommage, le dé a fait ${rolledNumber}. Réessaie ta chance !`);
                            }
                        }
                    } catch (err) {
                        console.error("❌ Erreur de parsing de l'événement :", err);
                    }
                });
            }

        } catch (error: any) {
            console.error("❌ Erreur lors du pari :", error);

            if (error.reason) {
                alert(`Erreur Solidity: ${error.reason}`);
            } else if (error.data) {
                alert(`Erreur brut: ${JSON.stringify(error.data)}`);
            } else {
                alert("Une erreur inconnue s'est produite.");
            }
        }
    }

    return { rollDice, isConnected, address };
}