"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";
import { resolveLocale, ui } from "@/lib/i18n";

interface SummaryData {
  totals: { income: number; expense: number; profit: number; profitMargin: string };
  growthData: { period: string; income: number; expense: number; profit: number }[];
  recentTransactions: any[];
  pendingInvoiceCount: number;
}

/* ── Mini Bar Chart ────────────────────────────────────────────────── */
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((v, i) => (
        <div
          key={i}
          className="rounded-sm transition-all duration-500"
          style={{
            width: `${100 / data.length - 2}%`,
            height: `${(v / max) * 100}%`,
            minHeight: "2px",
            backgroundColor: color,
            opacity: 0.7 + (i / data.length) * 0.3,
          }}
        />
      ))}
    </div>
  );
}

/* ── Mini Line Sparkline ───────────────────────────────────────────── */
function Sparkline({ data, color, width = 120, height = 40 }: { data: number[]; color: string; width?: number; height?: number }) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points.join(" ")} ${width},${height}`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Revenue Bar Chart ─────────────────────────────────────────────── */
function RevenueChart({ data, label }: { data: { period: string; income: number; expense: number }[]; label: string }) {
  const max = Math.max(...data.flatMap((d) => [d.income, d.expense]), 1);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">{label}</h3>
      <div className="flex items-end gap-3 h-36">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex gap-0.5 items-end w-full h-28">
              <div
                className="flex-1 bg-emerald-400 rounded-t-sm transition-all duration-500"
                style={{ height: `${(d.income / max) * 100}%`, minHeight: "2px" }}
                title={`Income: $${d.income.toLocaleString()}`}
              />
              <div
                className="flex-1 bg-red-400 rounded-t-sm transition-all duration-500"
                style={{ height: `${(d.expense / max) * 100}%`, minHeight: "2px" }}
                title={`Expense: $${d.expense.toLocaleString()}`}
              />
            </div>
            <span className="text-[10px] text-gray-500 truncate w-full text-center">
              {d.period.slice(5)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />
          Income
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />
          Expense
        </span>
      </div>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].erp.dashboard;

  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSummary();
  }, []);

  async function fetchSummary() {
    try {
      const res = await fetch("/api/finance/summary");
      if (res.ok) setSummary(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  const fmt = (n: number) =>
    mounted
      ? `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `$${n.toFixed(2)}`;

  const revenueData = summary?.growthData.slice(-6) || [];
  const incomeSparkline = revenueData.map((d) => d.income);
  const expenseSparkline = revenueData.map((d) => d.expense);
  const profitSparkline = revenueData.map((d) => d.profit);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{copy.title}</h1>
        <p className="text-muted-foreground mt-1">{copy.description}</p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.totalRevenue}</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary ? fmt(summary.totals.income) : "$0.00"}
            </div>
            <div className="mt-2">
              <Sparkline data={incomeSparkline} color="#10b981" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.totalExpenses}</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary ? fmt(summary.totals.expense) : "$0.00"}
            </div>
            <div className="mt-2">
              <Sparkline data={expenseSparkline} color="#ef4444" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.netProfit}</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary && summary.totals.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {summary ? fmt(summary.totals.profit) : "$0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary ? `${summary.totals.profitMargin}% ${copy.profitMargin}` : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.pendingInvoices}</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.pendingInvoiceCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {copy.invoicesPending}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{copy.revenueChart}</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <RevenueChart data={revenueData} label="" />
            ) : (
              <div className="h-36 flex items-center justify-center text-gray-400 text-sm">
                {copy.noTransactions}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{copy.recentTransactions}</CardTitle>
          </CardHeader>
          <CardContent>
            {summary && summary.recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {summary.recentTransactions.slice(0, 6).map((t: any) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-full ${t.type === "INCOME" ? "bg-emerald-100" : "bg-red-100"}`}>
                        {t.type === "INCOME" ? (
                          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t.category}</p>
                        <p className="text-xs text-gray-500">{t.description || "-"}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${t.type === "INCOME" ? "text-emerald-600" : "text-red-600"}`}>
                      {t.type === "INCOME" ? "+" : "-"}{fmt(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-36 flex items-center justify-center text-gray-400 text-sm">
                {copy.noTransactions}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ERPDashboard() {
  return (
    <Suspense fallback={<div className="h-32 w-full animate-pulse bg-gray-200 rounded-lg" />}>
      <DashboardContent />
    </Suspense>
  );
}