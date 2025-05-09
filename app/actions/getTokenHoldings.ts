'use server'

import axios from 'axios';
import { cache } from 'react'

type TokenMetadata = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  uiAmount: number;
}

type TokenAccountData = {
  pubkey: string;
  account: {
    data: {
      parsed: {
        info: {
          mint: string;
          tokenAmount: {
            amount: string;
            decimals: number;
            uiAmount: number;
            uiAmountString: string;
          }
        }
      }
    }
  }
}

export const getTokenHoldings = cache(async (address: string): Promise<TokenMetadata[]> => {
  try {

    const response = await axios.post(`https://solana-mainnet.g.alchemy.com/v2/${process.env.PRIVATE_ALCHEMY_API_KEY}`, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getTokenAccountsByOwner',
      params: [
          address,
          {
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
          },
          {
            encoding: 'jsonParsed'
          }
        ]
      })
    

    const data = response.data;
    
    if (!data.result?.value) {
      return [];
    }


    const nonZeroAccounts = data.result.value.filter((account: TokenAccountData) => 
      Number(account.account.data.parsed.info.tokenAmount.uiAmount) > 0
    );


    const tokensWithMetadata = await Promise.all(
      nonZeroAccounts.map(async (account: TokenAccountData) => {
        const mint = account.account.data.parsed.info.mint;
        const amount = account.account.data.parsed.info.tokenAmount.uiAmount;
        
        try {
          const metadataResponse = await axios.get(`https://lite-api.jup.ag/tokens/v1/token/${mint}`);
          
          if (metadataResponse.status === 200) {
            const metadata = metadataResponse.data;
            return {
              address: mint,
              name: metadata.name || 'NFToken',
              symbol: metadata.symbol || 'NFToken',
              decimals: metadata.decimals,
              logoURI: metadata.logoURI ,
              uiAmount: amount
            };
          }
        } catch (error) {
          console.error(`Error fetching metadata for ${mint}:`, error);
        }
        

        return {
          address: mint,
          name: 'NFToken',
          symbol: mint.slice(0, 4),
          decimals: account.account.data.parsed.info.tokenAmount.decimals,
          logoURI: 'SolWeb',
          uiAmount: amount
        };
      })
    );
    

    return tokensWithMetadata.sort((a, b) => b.uiAmount - a.uiAmount);
    
  } catch (error) {
    console.error('Error fetching token holdings:', error);
    return [];
  }
}); 