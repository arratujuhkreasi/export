"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Printer,
  Download,
  Calendar,
} from "lucide-react";
import { resolveLocale, ui } from "@/lib/i18n";

interface PeriodData {
  period: string;
  income: number;
  expense: number;
  profit: number;
}

interface SummaryData {
  totals: { income: number; expense: number; profit: number; profitMargin: string };
  growthData: PeriodData[];
  weekly: PeriodData[];
  daily: PeriodData[];
  invoiceStatus: Record<string, number>;
  recentTransactions: any[];
}

/* ── Lightweight SVG Bar Chart ──────────────────────────────────────── */
function BarChartSVG({ data, labelKey, bars, colors, height = 220 }: {
  data: { label: string;[k: string]: any }[];
  labelKey: string;
  bars: string[];
  colors: string[];
  height?: number;
}) {
  if (!data.length) return null;
  const maxVal = Math.max(...data.flatMap((d) => bars.map((b) => d[b] || 0)), 1);
  const barWidth = Math.max(16, Math.min(40, 600 / (data.length * bars.length + data.length)));
  const groupWidth = barWidth * bars.length + 8;
  const chartWidth = Math.max(data.length * groupWidth + 40, 300);

  return (
    <div className="overflow-x-auto">
      <svg width={chartWidth} height={height + 40} className="mx-auto">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
          <g key={frac}>
            <line
              x1={40} y1={height * (1 - frac) + 10}
              x2={chartWidth} y2={height * (1 - frac) + 10}
              stroke="#e5e7eb" strokeWidth={1}
            />
            <text x={36} y={height * (1 - frac) + 14} textAnchor="end" className="fill-gray-400 text-[10px]">
              {Math.round(maxVal * frac).toLocaleString()}
            </text>
          </g>
        ))}
        {/* Bars */}
        {data.map((d, i) => (
          <g key={i} transform={`translate(${40 + i * groupWidth}, 0)`}>
            {bars.map((barKey, bi) => {
              const val = d[barKey] || 0;
              const barH = (val / maxVal) * height;
              return (
                <g key={barKey}>
                  <rect
                    x={bi * barWidth + 4}
                    y={height - barH + 10}
                    width={barWidth - 2}
                    height={barH}
                    rx={3}
                    fill={colors[bi]}
                    className="transition-all duration-300"
                  >
                    <title>{`${barKey}: $${val.toLocaleString()}`}</title>
                  </rect>
                </g>
              );
            })}
            <text
              x={groupWidth / 2}
              y={height + 28}
              textAnchor="middle"
              className="fill-gray-500 text-[10px]"
            >
              {d[labelKey].length > 7 ? d[labelKey].slice(5) : d[labelKey]}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex justify-center gap-6 mt-2">
        {bars.map((b, i) => (
          <div key={b} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: colors[i] }} />
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Donut Chart ────────────────────────────────────────────────────── */
function DonutChart({ data, colors }: { data: { label: string; value: number }[]; colors: string[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  if (total === 0) return null;
  const cx = 100, cy = 100, r = 70, r2 = 45;
  let cumAngle = -90;

  function polarToCartesian(a: number, radius: number) {
    const rad = (a * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={200} height={200} viewBox="0 0 200 200">
        {data.map((d, i) => {
          const angle = (d.value / total) * 360;
          const startAngle = cumAngle;
          const endAngle = cumAngle + angle;
          cumAngle = endAngle;
          const largeArc = angle > 180 ? 1 : 0;
          const s1 = polarToCartesian(startAngle, r);
          const e1 = polarToCartesian(endAngle, r);
          const s2 = polarToCartesian(endAngle, r2);
          const e2 = polarToCartesian(startAngle, r2);
          const path = `M ${s1.x} ${s1.y} A ${r} ${r} 0 ${largeArc} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${r2} ${r2} 0 ${largeArc} 0 ${e2.x} ${e2.y} Z`;
          return <path key={i} d={path} fill={colors[i % colors.length]} className="transition-all duration-300 hover:opacity-80" />;
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-gray-900 text-xl font-bold">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-gray-500 text-[10px]">Total</text>
      </svg>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: colors[i % colors.length] }} />
            {d.label}: {d.value}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Line Chart ─────────────────────────────────────────────────────── */
function LineChartSVG({ data, lineKey, color, height = 180 }: {
  data: { label: string;[k: string]: any }[];
  lineKey: string;
  color: string;
  height?: number;
}) {
  if (!data.length) return null;
  const maxVal = Math.max(...data.map((d) => Math.abs(d[lineKey] || 0)), 1);
  const width = Math.max(data.length * 60 + 60, 300);
  const points = data.map((d, i) => {
    const x = 50 + (i / Math.max(data.length - 1, 1)) * (width - 80);
    const y = height - ((d[lineKey] || 0) / maxVal) * (height - 30) + 10;
    return { x, y, value: d[lineKey] || 0, label: d.label };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = pathD + ` L ${points[points.length - 1].x} ${height + 10} L ${points[0].x} ${height + 10} Z`;

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height + 40} className="mx-auto">
        {[0, 0.5, 1].map((frac) => (
          <g key={frac}>
            <line x1={40} y1={height * (1 - frac) + 10} x2={width} y2={height * (1 - frac) + 10} stroke="#e5e7eb" strokeWidth={1} />
            <text x={36} y={height * (1 - frac) + 14} textAnchor="end" className="fill-gray-400 text-[10px]">
              ${Math.round(maxVal * frac).toLocaleString()}
            </text>
          </g>
        ))}
        <path d={areaD} fill={color} opacity={0.1} />
        <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill="white" stroke={color} strokeWidth={2} />
            <text x={p.x} y={height + 28} textAnchor="middle" className="fill-gray-500 text-[10px]">
              {p.label.length > 7 ? p.label.slice(5) : p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────── */
function ReportsContent() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].erp.reports;
  const common = ui[locale].erp.common;

  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly" | "growth">("monthly");
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

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

  function exportCSV() {
    if (!summary) return;
    let rows = "Period,Income,Expense,Profit\n";
    const data = activeTab === "daily" ? summary.daily : activeTab === "weekly" ? summary.weekly : summary.growthData;
    data.forEach((d) => {
      rows += `${d.period},${d.income},${d.expense},${d.profit}\n`;
    });
    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${activeTab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const tabs = [
    { key: "daily" as const, label: copy.tabs.daily },
    { key: "weekly" as const, label: copy.tabs.weekly },
    { key: "monthly" as const, label: copy.tabs.monthly },
    { key: "growth" as const, label: copy.tabs.growth },
  ];

  // Filter data by selected period
  const filteredDaily = summary?.daily.filter((d) => d.period === selectedDate) || [];
  const filteredMonthly = summary?.growthData.filter((d) => d.period === selectedMonth) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{copy.title}</h1>
          <p className="text-muted-foreground mt-1">{copy.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="hidden sm:flex">
            <Printer className="mr-2 h-4 w-4" />
            {copy.printReport}
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" />
            {copy.exportCSV}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.totalIncome}</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {summary ? fmt(summary.totals.income) : "$0.00"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.totalExpense}</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary ? fmt(summary.totals.expense) : "$0.00"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.netProfit}</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary && summary.totals.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {summary ? fmt(summary.totals.profit) : "$0.00"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.profitMargin}</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {summary ? `${summary.totals.profitMargin}%` : "0%"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mt-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Daily Report */}
      {activeTab === "daily" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
          {filteredDaily.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3 mb-4">
              {filteredDaily.map((d) => (
                <div key={d.period} className="contents">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-500">{copy.income}</p>
                      <p className="text-2xl font-bold text-emerald-600">{fmt(d.income)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-500">{copy.expense}</p>
                      <p className="text-2xl font-bold text-red-600">{fmt(d.expense)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-500">{copy.netProfit}</p>
                      <p className={`text-2xl font-bold ${d.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>{fmt(d.profit)}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">{copy.noData}</CardContent>
            </Card>
          )}
          {/* Daily trend chart */}
          {summary && summary.daily.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{copy.tabs.daily} — {copy.summary}</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChartSVG
                  data={summary.daily.slice(-14).map((d) => ({ label: d.period, income: d.income, expense: d.expense }))}
                  labelKey="label"
                  bars={["income", "expense"]}
                  colors={["#10b981", "#ef4444"]}
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Weekly Report */}
      {activeTab === "weekly" && (
        <div className="space-y-4">
          {summary && summary.weekly.length > 0 ? (
            <>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4">{copy.period}</th>
                        <th className="px-6 py-4 text-right">{copy.income}</th>
                        <th className="px-6 py-4 text-right">{copy.expense}</th>
                        <th className="px-6 py-4 text-right">{copy.netProfit}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.weekly.map((w) => (
                        <tr key={w.period} className="bg-white border-b hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{w.period}</td>
                          <td className="px-6 py-4 text-right text-emerald-600 font-medium">{fmt(w.income)}</td>
                          <td className="px-6 py-4 text-right text-red-600 font-medium">{fmt(w.expense)}</td>
                          <td className={`px-6 py-4 text-right font-bold ${w.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {fmt(w.profit)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{copy.tabs.weekly} — {copy.summary}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChartSVG
                    data={summary.weekly.slice(-8).map((d) => ({ label: d.period, income: d.income, expense: d.expense }))}
                    labelKey="label"
                    bars={["income", "expense"]}
                    colors={["#10b981", "#ef4444"]}
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">{copy.noData}</CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Monthly Report */}
      {activeTab === "monthly" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-auto"
            />
          </div>
          {summary && summary.growthData.length > 0 ? (
            <>
              {filteredMonthly.length > 0 && (
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  {filteredMonthly.map((d) => (
                    <div key={d.period} className="contents">
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-500">{copy.income}</p>
                          <p className="text-2xl font-bold text-emerald-600">{fmt(d.income)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-500">{copy.expense}</p>
                          <p className="text-2xl font-bold text-red-600">{fmt(d.expense)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-500">{copy.netProfit}</p>
                          <p className={`text-2xl font-bold ${d.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>{fmt(d.profit)}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4">{copy.period}</th>
                        <th className="px-6 py-4 text-right">{copy.income}</th>
                        <th className="px-6 py-4 text-right">{copy.expense}</th>
                        <th className="px-6 py-4 text-right">{copy.netProfit}</th>
                        <th className="px-6 py-4 text-right">{copy.profitMargin}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.growthData.map((m) => {
                        const margin = m.income > 0 ? ((m.profit / m.income) * 100).toFixed(1) : "0";
                        return (
                          <tr key={m.period} className="bg-white border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{m.period}</td>
                            <td className="px-6 py-4 text-right text-emerald-600 font-medium">{fmt(m.income)}</td>
                            <td className="px-6 py-4 text-right text-red-600 font-medium">{fmt(m.expense)}</td>
                            <td className={`px-6 py-4 text-right font-bold ${m.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {fmt(m.profit)}
                            </td>
                            <td className="px-6 py-4 text-right text-amber-600 font-medium">{margin}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">{copy.noData}</CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Growth Charts */}
      {activeTab === "growth" && summary && (
        <div className="space-y-6">
          {/* Revenue Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                {copy.growth.revenueGrowth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary.growthData.length > 0 ? (
                <LineChartSVG
                  data={summary.growthData.map((d) => ({ label: d.period, value: d.income }))}
                  lineKey="value"
                  color="#10b981"
                />
              ) : (
                <p className="text-center text-gray-500 py-8">{copy.noData}</p>
              )}
            </CardContent>
          </Card>

          {/* Expense Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                {copy.growth.expenseTrend}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary.growthData.length > 0 ? (
                <LineChartSVG
                  data={summary.growthData.map((d) => ({ label: d.period, value: d.expense }))}
                  lineKey="value"
                  color="#ef4444"
                />
              ) : (
                <p className="text-center text-gray-500 py-8">{copy.noData}</p>
              )}
            </CardContent>
          </Card>

          {/* Monthly Comparison Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                {copy.growth.monthlyComparison}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary.growthData.length > 0 ? (
                <BarChartSVG
                  data={summary.growthData.slice(-6).map((d) => ({
                    label: d.period,
                    income: d.income,
                    expense: d.expense,
                    profit: Math.max(d.profit, 0),
                  }))}
                  labelKey="label"
                  bars={["income", "expense", "profit"]}
                  colors={["#10b981", "#ef4444", "#3b82f6"]}
                  height={240}
                />
              ) : (
                <p className="text-center text-gray-500 py-8">{copy.noData}</p>
              )}
            </CardContent>
          </Card>

          {/* Profit Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                {copy.growth.profitTrend}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary.growthData.length > 0 ? (
                <LineChartSVG
                  data={summary.growthData.map((d) => ({ label: d.period, value: d.profit }))}
                  lineKey="value"
                  color="#3b82f6"
                />
              ) : (
                <p className="text-center text-gray-500 py-8">{copy.noData}</p>
              )}
            </CardContent>
          </Card>

          {/* Invoice Status Donut */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-500" />
                {copy.growth.invoiceStatus}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {Object.keys(summary.invoiceStatus).length > 0 ? (
                <DonutChart
                  data={Object.entries(summary.invoiceStatus).map(([label, value]) => ({ label, value }))}
                  colors={["#10b981", "#f59e0b", "#6366f1", "#ef4444", "#8b5cf6"]}
                />
              ) : (
                <p className="text-center text-gray-500 py-8">{copy.noData}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function ReportsModule() {
  return (
    <Suspense fallback={<div className="h-32 w-full animate-pulse bg-gray-200 rounded-lg" />}>
      <ReportsContent />
    </Suspense>
  );
}
