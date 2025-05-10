'use client'
import React, { useEffect, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { SendIcon, WalletIcon } from 'lucide-react'
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

export const ParentPublicNode = React.memo((props: any) => {
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
            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Right} id="b" />
            <Handle type="source" position={Position.Bottom} id="c" />
            <Handle type="source" position={Position.Left} id="d" />
            <div className="relative" onClick={() => {
                setIsOpen(true);
            }}>
            <div className="bg-gradient-to-br from-gray-900/30 to-black/10 backdrop-blur-lg px-6 py-5 min-w-[240px] shadow-2xl border border-gray-800/40 rounded-2xl">
                <div className="flex flex-col items-center space-y-3">
                    <div className="bg-indigo-900/30 p-3 rounded-full border border-indigo-500/20">
                        <WalletIcon className="w-7 h-7 text-indigo-400" />
                    </div>
                    <p className="text-base font-medium text-gray-200">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                    <p className="text-2xl font-bold text-indigo-300">{accountBalance.toFixed(4)} SOL</p>
                </div>
            </div>
            </div>
            {isOpen && <DialogPublicCard isOpen={isOpen} setIsOpen={setIsOpen} amount={accountBalance} address={address}/>}
            <Handle type="target" position={Position.Top} id="e" />
            <Handle type="target" position={Position.Right} id="f" />
            <Handle type="target" position={Position.Bottom} id="g" />
            <Handle type="target" position={Position.Left} id="h" />
        </>
    )
})

export const ChildPublicNode = React.memo((props: any) => {
    const { address, isSource } = props.data;
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
            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Right} id="b" />
            <Handle type="source" position={Position.Bottom} id="c" />
            <Handle type="source" position={Position.Left} id="d" />
            <div className="relative" onClick={() => setIsOpen(true)}>
                <div className="bg-gradient-to-br from-gray-800/30 to-black/10 backdrop-blur-lg px-4 py-3 min-w-[180px] shadow-xl border border-gray-800/40 rounded-xl">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="bg-blue-900/30 p-2 rounded-full border border-blue-500/20">
                            <SendIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-300">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                        <p className="text-lg font-bold text-blue-300">{accountBalance.toFixed(4)} SOL</p>
                    </div>
                </div>
            </div>
            {isOpen && <DialogPublicCard isOpen={isOpen} setIsOpen={setIsOpen} amount={accountBalance} address={address}/>}
            <Handle type="target" position={Position.Top} id="e" />
            <Handle type="target" position={Position.Right} id="f" />
            <Handle type="target" position={Position.Bottom} id="g" />
            <Handle type="target" position={Position.Left} id="h" />
        </>
    )
})

export default CustomNodes

