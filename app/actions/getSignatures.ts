"use server"
import axios from "axios";

export const getSignatures = async (address: string, limit = 5) => {
    try {
        const apiKey = process.env.PRIVATE_ALCHEMY_API_KEY;
        const response = await axios.post(`https://solana-mainnet.g.alchemy.com/v2/${apiKey}`, {
            jsonrpc: "2.0",
            id: 1,
            method: "getSignaturesForAddress",
            params: [
                address,
                {
                    limit: limit
                }
            ]
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching signatures:", error);
        return { result: [] };
    }
}