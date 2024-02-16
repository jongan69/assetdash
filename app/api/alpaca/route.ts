
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
    const accountHistory = await client.getPortfolioHistory({ 
      period: '1M', 
      timeframe: '1D',
    });
    const trades = await client.getOrders({ status: 'all', limit: 50 }); // Adjust limit as needed
    const tradesWithAssets = [];

    for (const trade of trades) {
      // For each trade, fetch the asset details
      const asset = await client.getAsset({ asset_id_or_symbol: trade.symbol });
      tradesWithAssets.push({ trade: trade, asset: asset });
    }
    // const accountAssets = await client.getAssets();
    // const snapshot = await client.getSnapshot();
    // console.log(
    //   { "tradesWithAssets": tradesWithAssets}
    // )
    // Return the account balance as the response
    return NextResponse.json({ msg: accountBalance, accountHistory, tradesWithAssets })
  } catch (error) {
    console.error('Error fetching account balance:', error);
    return NextResponse.json({ error })
  }
}
