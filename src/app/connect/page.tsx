"use client";

import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWalletPage() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  const connectorLogos: { [key: string]: string } = {
    "io.metamask": "/metamask.png",
    walletConnect: "/walletconnect.png",
    injected: "/injected.png",
    coinbaseWalletSDK: "/coinbase_wallet.png",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">
        Connectez votre Wallet
      </h1>

      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="group flex flex-col items-center px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:border-purple-300 hover:shadow-purple-500/50 mb-4">
          <img
            src={connectorLogos[connector.id] || "/fallback.png"}
            alt={`Logo de ${connector.name}`}
            className="w-12 h-12 mb-2 group-hover:opacity-90"
          />
          <span className="text-sm group-hover:text-purple-300">
            Se connecter avec {connector.name}
          </span>
        </button>
      ))}
    </div>
  );
}
