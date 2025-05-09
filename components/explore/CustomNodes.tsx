'use client'
import React, { useEffect, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Card, CardContent,CardHeader, CardTitle } from '../ui/card'
import { WalletIcon } from 'lucide-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { fetchSolanaBalance } from '@/app/actions/solanaBalance'
import DialogPublicCard from './DialogPublicCard'

function CustomNodes() {

  return (
    <div>
        <Handle type="source" position={Position.Top} />
        <div className="bg-white rounded-lg p-4">
            <h1 className="text-2xl font-bold">Custom Nodes</h1>
        </div>
        <Handle type="target" position={Position.Bottom} />
    </div>
  )
}

export default CustomNodes

export const ParentPublicNode = (props: any) => {
    const { address, balance = "0.1000 SOL" } = props.data;
    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect(() => {
        async function getBalance() {
            if (address) {
                const balance = await fetchSolanaBalance(address);
                setAccountBalance(balance);
            }
        }
        
        getBalance();
    }, [address]);
    
    return (
        <>
            <div className="relative" onClick={() => {
                setIsOpen(true);
            }}>
            <div className="bg-gradient-to-br from-gray-900/30 to-black/10 backdrop-blur-lg  px-6 py-5 min-w-[240px] shadow-2xl border border-gray-800/40 rounded-2xl">
                <div className="flex flex-col items-center space-y-3">
                    <div className="bg-indigo-900/30 p-3 rounded-full border border-indigo-500/20">
                        <WalletIcon className="w-7 h-7 text-indigo-400" />
                    </div>
                    <p className="text-base font-medium text-gray-200">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                    <p className="text-2xl font-bold text-indigo-300">{accountBalance.toFixed(4)} SOL</p>
                </div>
            </div>
            </div>
            {isOpen && <DialogPublicCard isOpen={isOpen} setIsOpen={setIsOpen} amount={accountBalance}  address={address}/>}
        </>
    )
}

export const ChildPublicNode = () => {
    return (
        <div>
            <Handle type="source" position={Position.Top} />
        </div>
    )
}

