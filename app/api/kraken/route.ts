
import { NextResponse } from "next/server";
import { Kraken } from "node-kraken-api";

export async function GET(req: any, res: any) {
    // Initialize KrakenClient with your API keys
    // IMPORTANT: Replace 'YourAPIKey' and 'YourAPISecret' with your actual Kraken API Key and Secret
    const key = process.env.KRAKEN_API_KEY;  // Use environment variables or another secure method to store these values
    const secret = process.env.KRAKEN_API_PRIVATE_KEY; // Use environment variables or another secure method to store these values new KrakenClient(key, secret);
    const kraken = new Kraken({
        /** REST API key. */
        key: key,
        /** REST API secret. */
        secret: secret
    });

    try {
        // Fetch the account balance from Kraken
        const balance = await kraken.balance()
        const tradeBalance = await kraken.tradeBalance()
        // Return the balance as JSON
        return NextResponse.json({ balanceData: { balance, tradeBalance } })
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching account balance:', error);
        res.status(500).json({ error: 'Failed to fetch account balance' });
    }
}
