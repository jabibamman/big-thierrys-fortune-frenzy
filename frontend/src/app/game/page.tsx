"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useDiceGame } from "../hooks/useDiceGame";

export default function GamePage() {
  const { rollDice, isConnected } = useDiceGame();
  const { address } = useAccount();
  const [chosenNumber, setChosenNumber] = useState(1);
  const [betAmount, setBetAmount] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        🎲 Big Thierry's Dice Game 🎲
      </h1>

      {isConnected ? (
        <>
          <p className="mb-4">Ton adresse : {address}</p>

          <label className="block mb-2">Choisis un numéro (1-6) :</label>
          <input
            type="number"
            min="1"
            max="6"
            value={chosenNumber}
            onChange={(e) => setChosenNumber(Number(e.target.value))}
            className="mb-4 p-2 rounded text-black"
          />

          <label className="block mb-2">Montant du pari (BNB) :</label>
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="mb-4 p-2 rounded text-black"
          />

          <button
            onClick={() => rollDice(chosenNumber, betAmount)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Lancer les dés 🎲
          </button>
        </>
      ) : (
        <p className="text-red-500">Connecte ton wallet pour jouer !</p>
      )}
    </div>
  );
}
