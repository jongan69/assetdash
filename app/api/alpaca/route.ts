import { NextApiRequest, NextApiResponse } from 'next';
import { AlpacaClient } from '@master-chief/alpaca';

// Initialize AlpacaClient with your credentials
const client = new AlpacaClient({
  credentials: {
    key: 'YOUR_ALPACA_API_KEY',
    secret: 'YOUR_ALPACA_API_SECRET',
    paper: true, // Set to true if using Alpaca's paper trading
  },
  rate_limit: true, // Enable rate limiting
});

// API endpoint handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the account details including the account balance
    const account = await client.getAccount();
    const accountBalance = account.buying_power;

    // Return the account balance as the response
    res.status(200).json({ accountBalance });
  } catch (error) {
    console.error('Error fetching account balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
