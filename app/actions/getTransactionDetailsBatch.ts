"use server"
import axios from "axios";

export const getTransactionDetailsBatch = async (signatures: string[]) => {
  try {
    const apiKey = process.env.PRIVATE_ALCHEMY_API_KEY;
    
    // Create an array of promises for all transactions
    const promises = signatures.map(signature => 
      axios.post(`https://solana-mainnet.g.alchemy.com/v2/${apiKey}`, {
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [
          signature,
          {
            encoding: "jsonParsed"
          }
        ]
      })
    );
    
    // Execute all promises in parallel
    const responses = await Promise.all(promises);
    
    // Map responses to their data
    return responses.map((response, index) => ({
      signature: signatures[index],
      data: response.data
    }));
  } catch (error) {
    console.error("Error fetching transaction details batch:", error);
    return [];
  }
} 