'use server'

import axios from 'axios'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export async function fetchSolanaBalance(address: string): Promise<number> {
  try {
    const response = await axios.post(
      `https://solana-mainnet.g.alchemy.com/v2/${process.env.PRIVATE_ALCHEMY_API_KEY}`,
      {
        id: 1,
        jsonrpc: "2.0",
        method: "getAccountInfo",
        params: [address]
      }
    )
    
    return response.data.result.value.lamports / LAMPORTS_PER_SOL
  } catch (error) {
    console.error("Error fetching Solana balance:", error)
    return 0
  }
} 