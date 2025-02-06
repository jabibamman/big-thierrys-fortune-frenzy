import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import DiceGameABI from "@/contracts/DiceGame.json";

export function useDiceGame() {
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

    async function getContract() {
        if (!walletClient) return null;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(contractAddress, DiceGameABI.abi, signer);
    }

    async function rollDice(chosenNumber: number, betAmount: string) {
        if (!isConnected || !walletClient) {
            alert("Connecte-toi d'abord !");
            return { rolledNumber: null, payout: "0" };
        }

        try {
            const contract = await getContract();
            if (!contract) return { rolledNumber: null, payout: "0" };

            const formattedBetAmount = betAmount.replace(",", ".");
            console.log("💰 Valeur envoyée :", formattedBetAmount);

            const tx = await contract.rollDice(chosenNumber, {
                value: ethers.parseEther(formattedBetAmount),
                gasLimit: 100000,
            });

            console.log("📜 Transaction envoyée, en attente de confirmation...");
            await tx.wait();
            console.log("✅ Transaction confirmée !");

            const receipt = await tx.wait();
            const logs = receipt.logs.filter((log: { address: string; }) => log.address.toLowerCase() === contractAddress.toLowerCase());

            if (logs.length > 0) {
                const iface = new ethers.Interface(DiceGameABI.abi);
                for (const log of logs) {
                    try {
                        const parsedLog = iface.parseLog(log);
                        if (parsedLog && parsedLog.name === "BetResult") {
                            const rolledNumber = parsedLog.args[1];
                            const payout = ethers.formatEther(parsedLog.args[2]);
                            return { rolledNumber, payout };
                        }
                    } catch (err) {
                        console.error("❌ Erreur de parsing de l'événement :", err);
                    }
                }
            }

            return { rolledNumber: 0, payout: "0" };
        } catch (error: any) {
            console.error("❌ Erreur lors du pari :", error);
            alert("Une erreur s'est produite !");
            return { rolledNumber: 0, payout: "0" };
        }
    }

    return { rollDice, isConnected, address };
}
