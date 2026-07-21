import { NextResponse } from "next/server";

type RfqPayload = {
  type?: string;
  order?: unknown;
  products?: unknown;
  locale?: string;
  inquiry?: unknown;
  partner?: unknown;
};

export async function POST(request: Request) {
  let payload: RfqPayload;

  try {
    payload = (await request.json()) as RfqPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload.order && !payload.inquiry && !payload.partner) {
    return NextResponse.json({ ok: false, message: "Missing submission data." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      ok: true,
      message: "RFQ reference created. Sales webhook is not configured yet; use email backup.",
      delivery: "local-reference",
    });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: payload.type ?? "export_rfq",
      source: "CO EXPORT.ID marketplace checkout",
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({
      ok: false,
      message: "RFQ reference created, but sales workflow rejected the request.",
    }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    message: "RFQ sent to sales workflow.",
    delivery: "webhook",
  });
}
