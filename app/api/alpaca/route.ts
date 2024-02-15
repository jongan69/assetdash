
import { AlpacaClient }  from '@master-chief/alpaca';
import { NextResponse } from 'next/server';

// API endpoint handler
export async function GET(request: Request) {
  try {
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
    const account = await client.getAccount();
    const accountBalance = account.buying_power;
    const accountHistory = await client.getPortfolioHistory({ period: '1M', timeframe: '1D' });
    console.log(
      { "history": accountHistory}
    )
    // Return the account balance as the response
    return NextResponse.json({ msg: accountBalance, accountHistory })
  } catch (error) {
    console.error('Error fetching account balance:', error);
    return NextResponse.json({ error })
  }
}
