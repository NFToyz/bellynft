import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { WagmiProvider, chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const supportedNetworks = [chain.polygonTestnetMumbai, chain.polygonMainnet];
const connectors = [
  new InjectedConnector({
    chains: supportedNetworks,
  }),
  new WalletConnectConnector({
    chains: supportedNetworks,
    options: {
      infuraId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      qrcode: true,
    },
  }),
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </WagmiProvider>
  );
}

export default MyApp;
