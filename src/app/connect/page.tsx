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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">
        Connectez votre Wallet
      </h1>

      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 mb-4">
          Se connecter avec {connector.name}
        </button>
      ))}
    </div>
  );
}
