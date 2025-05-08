"use client"
import React from 'react'
import { Button } from './ui/button'
import { Database, Wallet } from 'lucide-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from './Logo'

function Header() {
  return (
    <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold"><Logo /></span>
          </div>
          <div>
              <WalletMultiButton />
          </div>
        </div>
      </header>
  )
}

export default Header