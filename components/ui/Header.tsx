import React from 'react'
import { Button } from './button'
import { Database, Wallet } from 'lucide-react'

function Header() {
  return (
    <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold">SolWeb</span>
          </div>
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
              Connect Wallet
            </Button>
        </div>
      </header>
  )
}

export default Header