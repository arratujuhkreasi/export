import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.CEREBRAS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "CEREBRAS_API_KEY is not defined in environment variables" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.cerebras.ai/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    });

    const data = await res.json();
    return NextResponse.json({
      status: res.status,
      keyLength: apiKey.length,
      keyPrefix: apiKey.slice(0, 6),
      keySuffix: apiKey.slice(-4),
      data
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
