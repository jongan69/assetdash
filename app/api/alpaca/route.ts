import { NextApiRequest, NextApiResponse } from 'next';
import { AlpacaClient } from '@master-chief/alpaca';
import { NextResponse } from 'next/server';

// Initialize AlpacaClient with your credentials
const client = new AlpacaClient({
  credentials: {
    key: process.env.ALPACA_API_KEY,
    secret: process.env.ALPACA_API_SECRET,
    paper: true, // Set to true if using Alpaca's paper trading
  },
  rate_limit: true, // Enable rate limiting
});

// API endpoint handler
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the account details including the account balance
    const account = await client.getAccount();
    const accountBalance = account.buying_power;

    // Return the account balance as the response
    return NextResponse.json({ msg: accountBalance })
  } catch (error) {
    console.error('Error fetching account balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
