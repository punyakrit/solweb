"use client"
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Search, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function Main() {
    const [walletAddress, setWalletAddress] = useState('')
  return (
    <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/10 mb-8">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">Explore Solana Like Never Before</span>
          </div>


          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Visualize Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Solana Network
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300 mb-8">
            With Powerful Analytics
          </h2>

          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Discover insights, track transactions, and analyze wallet interactions with our intuitive visualization
            tools and real-time analytics platform.
          </p>


          <div className="relative max-w-2xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl p-2 border border-white/10 shadow-xl">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <Input
                    type="text"
                    placeholder="Enter a Solana wallet address"
                    className="w-full pl-12 pr-4 py-6 bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    />
              </div>
              <Button className="px-6 py-6 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-2xl hover:opacity-90 transition-opacity font-bold ">
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </main>
  )
}

export default Main