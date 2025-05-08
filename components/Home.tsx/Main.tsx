"use client";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Search, Zap } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
function Main() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  return (
    <main className="relative z-10 container mx-auto px-4 py-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/10 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium">
            Explore Solana Like Never Before
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Visualize Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            Solana Network
          </span>
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          With Powerful Analytics
        </motion.h2>

        <motion.p
          className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          Discover insights, track transactions, and analyze wallet interactions
          with our intuitive visualization tools and real-time analytics
          platform.
        </motion.p>

        <motion.div
          className="relative max-w-2xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl p-2 border border-white/10 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          }}
          whileHover={{ boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)" }}
        >
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="px-6 py-6 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-2xl hover:opacity-90 transition-opacity font-bold"
                onClick={() => router.push(`/explore?address=${walletAddress}`)}
              >
                Start Exploring
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default Main;
