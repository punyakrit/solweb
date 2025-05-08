"use client"

import Header from "@/components/Header";
import Main from "@/components/Home.tsx/Main";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import React from "react";
import '@solana/wallet-adapter-react-ui/styles.css';


function page() {
  return (
    
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div>
                <Main/>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
     
  );
}

export default page;
