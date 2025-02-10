import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, bscTestnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export function getConfig() {
    return createConfig({
        chains: [mainnet, bscTestnet],
        connectors: [
            injected(),
            coinbaseWallet(),
            walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '' }),
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [mainnet.id]: http(),
            [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC),
        },
    })
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof getConfig>
    }
}