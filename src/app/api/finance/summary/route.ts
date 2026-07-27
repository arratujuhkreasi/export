import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [transactions, invoices] = await Promise.all([
      prisma.transaction.findMany({ orderBy: { date: "desc" } }),
      prisma.invoice.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    const income = transactions.filter((t) => t.type === "INCOME");
    const expenses = transactions.filter((t) => t.type === "EXPENSE");

    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
    const netProfit = totalIncome - totalExpense;

    // Group transactions by month for growth data
    const monthlyMap = new Map<string, { income: number; expense: number }>();
    
    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!monthlyMap.has(key)) monthlyMap.set(key, { income: 0, expense: 0 });
      const entry = monthlyMap.get(key)!;
      if (t.type === "INCOME") entry.income += t.amount;
      else entry.expense += t.amount;
    });

    const growthData = Array.from(monthlyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, data]) => ({
        period,
        income: data.income,
        expense: data.expense,
        profit: data.income - data.expense,
      }));

    // Group by week
    const weeklyMap = new Map<string, { income: number; expense: number }>();
    transactions.forEach((t) => {
      const d = new Date(t.date);
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const weekNum = Math.ceil(((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
      const key = `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
      if (!weeklyMap.has(key)) weeklyMap.set(key, { income: 0, expense: 0 });
      const entry = weeklyMap.get(key)!;
      if (t.type === "INCOME") entry.income += t.amount;
      else entry.expense += t.amount;
    });

    const weekly = Array.from(weeklyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, data]) => ({
        period,
        income: data.income,
        expense: data.expense,
        profit: data.income - data.expense,
      }));

    // Group by day
    const dailyMap = new Map<string, { income: number; expense: number }>();
    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = d.toISOString().split("T")[0];
      if (!dailyMap.has(key)) dailyMap.set(key, { income: 0, expense: 0 });
      const entry = dailyMap.get(key)!;
      if (t.type === "INCOME") entry.income += t.amount;
      else entry.expense += t.amount;
    });

    const daily = Array.from(dailyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, data]) => ({
        period,
        income: data.income,
        expense: data.expense,
        profit: data.income - data.expense,
      }));

    // Balance sheet computations
    const cashAndBank = totalIncome - totalExpense; // net cash position
    const accountsReceivable = invoices
      .filter((i) => i.status === "PENDING" || i.status === "DRAFT")
      .reduce((acc, i) => acc + i.amount, 0);
    const totalAssets = cashAndBank + accountsReceivable;

    const accountsPayable = expenses
      .filter((t) => t.category?.toLowerCase().includes("payable") || t.category?.toLowerCase().includes("credit"))
      .reduce((acc, t) => acc + t.amount, 0);
    const totalLiabilities = accountsPayable;

    const equity = totalAssets - totalLiabilities;

    // Invoice status breakdown
    const invoiceStatusMap: Record<string, number> = {};
    invoices.forEach((i) => {
      invoiceStatusMap[i.status] = (invoiceStatusMap[i.status] || 0) + 1;
    });

    // Ledger data (grouped by category)
    const ledgerMap = new Map<string, { debit: number; credit: number }>();
    transactions.forEach((t) => {
      const cat = t.category || "Uncategorized";
      if (!ledgerMap.has(cat)) ledgerMap.set(cat, { debit: 0, credit: 0 });
      const entry = ledgerMap.get(cat)!;
      if (t.type === "INCOME") entry.credit += t.amount;
      else entry.debit += t.amount;
    });

    const ledger = Array.from(ledgerMap.entries()).map(([account, data]) => ({
      account,
      debit: data.debit,
      credit: data.credit,
      balance: data.credit - data.debit,
    }));

    return NextResponse.json({
      totals: {
        income: totalIncome,
        expense: totalExpense,
        profit: netProfit,
        profitMargin: totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : "0",
      },
      balanceSheet: {
        cashAndBank,
        accountsReceivable,
        totalAssets,
        accountsPayable,
        totalLiabilities,
        equity,
      },
      growthData,
      weekly,
      daily,
      ledger,
      invoiceStatus: invoiceStatusMap,
      recentTransactions: transactions.slice(0, 10),
      pendingInvoiceCount: invoices.filter((i) => i.status === "PENDING" || i.status === "DRAFT").length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
