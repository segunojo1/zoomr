// app/api/stream-token/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY!;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const iat = Math.floor(Date.now() / 1000) - 60;
  const token = streamClient.createToken(userId, exp, iat);

  return NextResponse.json({ token });
}