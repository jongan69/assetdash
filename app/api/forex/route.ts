// pages/api/account/balance.ts

import { NextApiRequest, NextApiResponse } from 'next';
import GCapiClient from '../../clients/gcapClient'; // Adjust the import path as per your project structure
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Initialize the GCapiClient with credentials from environment variables
        const client = new GCapiClient({
            baseURL: process.env.GCAP_API_BASE_URL,
            UserName: process.env.GCAP_USERNAME,
            Password: process.env.GCAP_PASSWORD,
            AppKey: process.env.GCAP_APPKEY,
            TradingAccountId: process.env.GCAP_TRADEACCOUNTID
        });

        // Fetch the account balance
        const balance = await client.getAccountInfo();
        // console.log(balance)
        // Send the account balance as the response
        return NextResponse.json({ balance })
    } catch (error) {
        // If an error occurs, send an error response
        console.warn(error)
        return NextResponse.json({ error })
    }
}
