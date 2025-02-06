"use client";

import Image from "next/image";
import Link from "next/link";

export default function RulesPage() {
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

      <div className="relative z-10 bg-black bg-opacity-60 p-8 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">
          📜 Règles du Jeu 🎲
        </h1>

        <p className="text-lg mb-4 text-gray-200">
          Bienvenue dans{" "}
          <span className="font-bold text-yellow-300">
            Big Thierry's Dice Game
          </span>{" "}
          ! Le but est simple : pariez sur un chiffre et tentez de multiplier
          vos gains !
        </p>

        <div className="text-left space-y-4 text-lg">
          <p>
            ✔️ <span className="text-yellow-300 font-bold">1.</span> Connectez
            votre wallet.
          </p>
          <p>
            ✔️ <span className="text-yellow-300 font-bold">2.</span> Choisissez
            un numéro entre{" "}
            <span className="font-bold text-red-500">1 et 6</span>.
          </p>
          <p>
            ✔️ <span className="text-yellow-300 font-bold">3.</span> Entrez le
            montant du pari en <span className="text-blue-400">BNB</span>.
          </p>
          <p>
            ✔️ <span className="text-yellow-300 font-bold">4.</span> Lancez les
            dés et découvrez le résultat ! 🎲
          </p>
          <p>
            ✔️ <span className="text-yellow-300 font-bold">5.</span> Si vous
            gagnez, votre mise est multipliée par{" "}
            <span className="font-bold text-green-400">x5</span> !
          </p>
        </div>

        <div className="mt-6 p-4 bg-red-700 bg-opacity-75 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-300">
            ⚠️ Avertissement sur les jeux d'argent
          </h2>
          <p className="text-sm mt-2 text-gray-300">
            Les jeux d'argent comportent des risques d'addiction et de pertes
            financières. Jouez de manière responsable. Si vous ressentez le
            besoin d’aide, contactez :
          </p>
          <p className="mt-2 font-bold text-white">
            📞 Joueurs Info Service :{" "}
            <span className="text-yellow-300">09 74 75 13 13</span> (appel non
            surtaxé)
          </p>
          <a
            href="https://www.joueurs-info-service.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-400 hover:text-yellow-300">
            ➡️ Plus d’infos ici
          </a>
        </div>
        <div className="mt-6">
          <Link
            href="/game"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105">
            Jouer maintenant 🎲
          </Link>
        </div>
      </div>
    </div>
  );
}
