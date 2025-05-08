"use client"
import React from 'react'
import { Button } from './ui/button'
import { Database, Wallet } from 'lucide-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from './Logo'
import { motion } from 'framer-motion'
import '@solana/wallet-adapter-react-ui/styles.css';
import { useRouter } from 'next/navigation'

function Header() {
  const router = useRouter();
  return (
    <motion.header 
      className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/') }
          >
              <Wallet className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold"><Logo /></span>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          > */}
                <WalletMultiButton />
          {/* </motion.div> */}
        </div>
      </motion.header>
  )
}

export default Header