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
              <div>
                <Header/>
                <Main/>
              </div>)
}

export default page;
