
import { AlpacaClient } from '@master-chief/alpaca';
import { NextResponse } from 'next/server';

// API endpoint handler
export async function POST(request: Request) {
    try {
        // Need a string or array of strings for assets in request body
        // {
        //     "assets": "['SPY', 'DIA']"
        // }

        let assets = request.body
        // Initialize AlpacaClient with your credentials
        const client = new AlpacaClient({
            credentials: {
                key: process.env.ALPACA_API_KEY,
                secret: process.env.ALPACA_API_SECRET,
                // paper: true, // Set to true if using Alpaca's paper trading
            },
            rate_limit: true, // Enable rate limiting
        });
        // Fetch the account details including the account balance
        const alpacaAssetLookup = await client.getNews({ symbols: assets });

        return NextResponse.json({ msg: alpacaAssetLookup })
    } catch (Exception) {
        console.error('Error fetching news:', Exception);
        return NextResponse.json({ Exception })
        // Basicaly throw Exception;
    }

}

