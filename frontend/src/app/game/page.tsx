"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useDiceGame } from "../hooks/useDiceGame";
import Image from "next/image";

export default function GamePage() {
  const { rollDice, isConnected } = useDiceGame();
  const { address } = useAccount();
  const [chosenNumber, setChosenNumber] = useState(1);
  const minBetAmount = 0.000001;
  const [betAmount, setBetAmount] = useState(minBetAmount.toString());
  const [result, setResult] = useState<{
    rolledNumber: number;
    payout: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRollDice() {
    if (!betAmount || Number(betAmount) < minBetAmount) {
      alert(`Le montant du pari doit être d'au moins ${minBetAmount} BNB !`);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { rolledNumber, payout } = await rollDice(chosenNumber, betAmount);
      setResult({ rolledNumber, payout });
    } catch (error) {
      console.error("Erreur lors du pari :", error);
      alert("Une erreur est survenue !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0">
        <Image
          src="/keepmining.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50 blur-md"
        />
      </div>
      <div className="relative z-10 bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
          🎲 Big Thierry's Dice Game 🎲
        </h1>

        {isConnected ? (
          <>
            <p className="mb-4 text-lg text-center">Ton adresse : {address}</p>

            <label className="block mb-2 text-lg">
              Choisis un numéro (1-6) :
            </label>
            <input
              type="number"
              min="1"
              max="6"
              value={chosenNumber}
              onChange={(e) => setChosenNumber(Number(e.target.value))}
              className="mb-4 p-2 rounded text-black w-full text-center border border-gray-300"
            />

            <label className="block mb-2 text-lg">
              Montant du pari (BNB) :
            </label>
            <input
              type="number"
              min="0.001"
              step="0.001"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="mb-4 p-2 rounded text-black w-full text-center border border-gray-300"
            />

            <button
              onClick={handleRollDice}
              disabled={loading}
              className={`w-full px-6 py-3 text-lg font-bold rounded-lg transition transform ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 hover:scale-105"
              }`}>
              {loading ? "Lancer en cours..." : "Lancer les dés 🎲"}
            </button>

            {result && (
              <div
                className={`mt-6 p-4 rounded-lg text-center text-xl font-bold transition-all ${
                  Number(result.payout) > 0
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}>
                🎲 Résultat : {result.rolledNumber}
                <br />
                {Number(result.payout) > 0 ? (
                  <>
                    🎉 Tu gagnes{" "}
                    <span className="text-yellow-300">{result.payout} BNB</span>{" "}
                    !
                  </>
                ) : (
                  "😢 Perdu, retente ta chance !"
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-red-500 text-lg text-center">
            Connecte ton wallet pour jouer !
          </p>
        )}
      </div>
    </div>
  );
}
