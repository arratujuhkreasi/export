import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { type, category, amount, description, date, referenceId } = data;

    const newTransaction = await prisma.transaction.create({
      data: {
        type, // INCOME or EXPENSE
        category,
        amount: parseFloat(amount),
        description,
        date: date ? new Date(date) : new Date(),
        referenceId,
      },
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
