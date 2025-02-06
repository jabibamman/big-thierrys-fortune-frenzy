"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-black via-purple-900 to-black text-white min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0">
        <Image
          src="/casino-background.png"
          alt="Casino background"
          fill
          className="object-cover opacity-30"
        />
      </div>
      {isConnected && (
        <button
          onClick={() => disconnect()}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105">
          Déconnexion
        </button>
      )}

      <main className="z-10 text-center max-w-4xl p-8">
        <h1 className="text-5xl font-bold mb-6 tracking-wide text-yellow-400 drop-shadow-lg">
          Big Thierry's <br />
          <span className="text-red-500">Fortune Frenzy</span>
        </h1>

        <p className="text-lg mb-8 text-gray-200">
          Préparez-vous à plonger dans un monde de pari, de frissons et de
          blockchain !
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
          {isConnected ? (
            <a
              href="/game"
              className="px-6 py-3 text-lg font-bold rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-lg">
              Jouez maintenant
            </a>
          ) : (
            <button
              onClick={() => router.push("/connect")}
              className="px-6 py-3 text-lg font-bold rounded-lg bg-green-500 text-white hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg">
              Se connecter
            </button>
          )}
          <a
            href="/rules"
            className="px-6 py-3 text-lg font-bold rounded-lg border-2 border-yellow-400 text-yellow-400 hover:text-black hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-lg">
            Règles du jeu
          </a>
        </div>
      </main>

      <footer className="absolute bottom-4 flex flex-col sm:flex-row gap-4 justify-center items-center z-10">
        <a
          className="text-gray-400 hover:text-yellow-400 transition-colors"
          href="https://esgi.fr"
          target="_blank"
          rel="noopener noreferrer">
          Créé avec le ❤️ par la meilleure équipe de l'ESGI
        </a>
      </footer>
    </div>
  );
}
