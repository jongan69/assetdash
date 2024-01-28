//app/api/test/route.js

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Get Youtube 
  return NextResponse.json({ msg: 'Hello from server' })
}