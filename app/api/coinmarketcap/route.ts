
import { AlpacaClient }  from '@master-chief/alpaca';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'

// API endpoint handler
export async function GET(request: Request) {
  try {
    
    return NextResponse.json({ msg: "" })
  } catch (error) {
    console.error('Error fetching account balance:', error);
    return NextResponse.json({ error })
  }
}
