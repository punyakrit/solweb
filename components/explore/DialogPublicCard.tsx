import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Dialog } from "../ui/dialog";
import { Copy, X } from "lucide-react";
import { getTokenHoldings } from "../../app/actions/getTokenHoldings";

type TokenMetadata = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  uiAmount: number;
}

function DialogPublicCard({
  isOpen,
  setIsOpen,
  amount,
  address,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  amount: number;
  address: string;
}) {
  const [tokens, setTokens] = useState<TokenMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && address) {
      setLoading(true);
      getTokenHoldings(address)
        .then((data) => {
          setTokens(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching token data:", error);
          setLoading(false);
        });
    }
  }, [isOpen, address]);

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1a1128] border-0 text-white max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-center mb-4 mt-2">
            <div className="p-5 rounded-full bg-[#2a2139]">
              <svg className="h-10 w-10 text-[#6d7aaa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h8m-8 4h13m8 4H3" />
              </svg>
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            Wallet Holdings
          </DialogTitle>
          <div className="text-sm text-gray-400 text-center mt-1 flex items-center justify-center gap-2">
            {formatAddress(address)} <Copy onClick={() => navigator.clipboard.writeText(address)} className="cursor-pointer w-4 h-4" />
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="bg-[#2a2139] px-4 py-2 rounded-lg">
              <p className="text-xl font-bold text-[#6d7aaa]">{amount} SOL</p>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-grow mt-4 pr-1">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6d7aaa]"></div>
            </div>
          ) : tokens.length > 0 ? (
            <div className="space-y-3">
              {tokens.map((token) => (
                <div key={token.address} className="bg-[#2a2139] rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#3a3149] flex items-center justify-center overflow-hidden">
                      {token.logoURI ? (
                        <img
                          src={token.logoURI}
                          alt="SolWeb"
                          className="h-8 w-8 object-contain"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            //@ts-ignore
                            (e.currentTarget.parentElement as HTMLElement).querySelector('.fallback-text')!.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="fallback-text text-xs font-bold text-white h-full w-full items-center justify-center"
                        style={{ display: token.logoURI ? 'none' : 'flex' }}
                      >
                        SolWeb
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-sm text-gray-400">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{token.uiAmount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 p-8">
              No tokens found in this wallet
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogPublicCard;
