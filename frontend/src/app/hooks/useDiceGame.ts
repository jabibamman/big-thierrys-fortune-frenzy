import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import DiceGameABI from "@/contracts/DiceGame.json";

export function useDiceGame() {
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

    // Récupérer une instance du contrat
    function getContract() {
        if (!signer) return null;
        return new ethers.Contract(contractAddress, DiceGameABI.abi, signer);
    }

    // Fonction pour lancer les dés
    async function rollDice(chosenNumber: number, betAmount: string) {
        if (!isConnected || !signer) {
            alert("Connecte-toi d'abord !");
            return;
        }

        try {
            const contract = getContract();
            if (!contract) return;

            const tx = await contract.rollDice(chosenNumber, {
                value: ethers.parseEther(betAmount),
            });

            await tx.wait();
            alert("🎲 Pari effectué !");
        } catch (error) {
            console.error("Erreur lors du pari :", error);
            alert("Erreur lors du pari");
        }
    }

    return { rollDice, isConnected, address };
}