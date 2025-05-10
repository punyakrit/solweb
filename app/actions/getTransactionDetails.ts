"use server"
import axios from "axios";

export const getTransactionDetails = async (signature: string) => {
    try {
        const apiKey = process.env.PRIVATE_ALCHEMY_API_KEY;
        const response = await axios.post(`https://solana-mainnet.g.alchemy.com/v2/${apiKey}`, {
            jsonrpc: "2.0",
            id: 1,
            method: "getTransaction",
            params: [
                signature,
                {
                    encoding: "jsonParsed"
                }
            ]
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction details:", error);
        return { result: null };
    }
} 