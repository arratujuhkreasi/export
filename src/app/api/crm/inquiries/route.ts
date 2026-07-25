import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newInquiry = await prisma.inquiry.create({
      data: {
        rfqNo: data.rfqNo,
        buyer: data.buyer,
        product: data.product,
        volume: data.volume,
        status: data.status || "PENDING",
      }
    });
    return NextResponse.json(newInquiry);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
