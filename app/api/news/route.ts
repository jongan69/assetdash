
import GCapiClient from '@/app/clients/gcapClient';
// import { AlpacaClient } from '@master-chief/alpaca';
import { NextResponse } from 'next/server';

// API endpoint handler
export async function GET(request: Request) {
  try {
    const client = new GCapiClient({
      baseURL: process.env.GCAP_API_BASE_URL,
      UserName: process.env.GCAP_USERNAME,
      Password: process.env.GCAP_PASSWORD,
      AppKey: process.env.GCAP_APPKEY,
      TradingAccountId: process.env.GCAP_TRADEACCOUNTID
    });
    const forexNews = await client.getUSNewsHeadlines();

    const alpacaNews = await fetch('https://data.alpaca.markets/v1beta1/news', {
      headers: {
        "Apca-Api-Key-Id": process.env.ALPACA_API_KEY,
        "Apca-Api-Secret-Key": process.env.ALPACA_API_SECRET
      }
    }).then((data) => data.json())
    
    const marketAuxNews = await fetch(
      `${process.env.MARKETAUX_NEWS_API_URL}?countries=us&filter_entities=true&api_token=${process.env.MARKETAUX_NEWS_API_KEY}`)
      .then((data) => data.json())

    return NextResponse.json({ msg: alpacaNews, marketAuxNews, forexNews })
  } catch (Exception) {
    console.error('Error fetching news:', Exception);
    return NextResponse.json({ Exception })
    // Basicaly throw Exception;
  }

}
