"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  Printer,
} from "lucide-react";
import { resolveLocale, ui } from "@/lib/i18n";

interface SummaryData {
  totals: { income: number; expense: number; profit: number; profitMargin: string };
  balanceSheet: {
    cashAndBank: number;
    accountsReceivable: number;
    totalAssets: number;
    accountsPayable: number;
    totalLiabilities: number;
    equity: number;
  };
  ledger: { account: string; debit: number; credit: number; balance: number }[];
  recentTransactions: any[];
}

interface JournalEntry {
  id: string;
  date: string;
  account: string;
  debit: number;
  credit: number;
  description: string;
  reference: string;
}

function AccountingContent() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].erp.accounting;
  const common = ui[locale].erp.common;

  const [activeTab, setActiveTab] = useState<"journal" | "ledger" | "balanceSheet">("journal");
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSummary();
  }, []);

  async function fetchSummary() {
    try {
      const res = await fetch("/api/finance/summary");
      if (res.ok) {
        const data = await res.json();
        setSummary(data);
        // Generate journal entries from recent transactions
        const entries: JournalEntry[] = (data.recentTransactions || []).map((t: any) => ({
          id: t.id,
          date: t.date,
          account: t.category || "General",
          debit: t.type === "EXPENSE" ? t.amount : 0,
          credit: t.type === "INCOME" ? t.amount : 0,
          description: t.description || "-",
          reference: t.referenceId || "-",
        }));
        setJournalEntries(entries);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAddEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const debit = parseFloat(formData.get("debit") as string) || 0;
    const credit = parseFloat(formData.get("credit") as string) || 0;

    const data = {
      type: credit > 0 ? "INCOME" : "EXPENSE",
      category: formData.get("account"),
      amount: credit > 0 ? credit : debit,
      description: formData.get("description"),
      date: formData.get("date"),
      referenceId: formData.get("reference") || undefined,
    };

    try {
      const res = await fetch("/api/finance/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsAddOpen(false);
        fetchSummary();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const fmt = (n: number) => mounted ? `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${n.toFixed(2)}`;

  const tabs = [
    { key: "journal" as const, label: copy.tabs.journal },
    { key: "ledger" as const, label: copy.tabs.ledger },
    { key: "balanceSheet" as const, label: copy.tabs.balanceSheet },
  ];

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
            {common.printReport}
          </Button>
          {activeTab === "journal" && (
            <Button size="sm" onClick={() => setIsAddOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {copy.journal.addEntry}
            </Button>
          )}
        </div>
      </div>

      {/* Add Journal Entry Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{copy.journal.addEntry}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEntry} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{copy.journal.date}</Label>
                <Input type="date" name="date" required defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <Label>{copy.journal.account}</Label>
                <Input name="account" required placeholder="e.g. Sales, Logistics" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{copy.journal.debit}</Label>
                <Input type="number" name="debit" min="0" step="0.01" defaultValue="0" />
              </div>
              <div className="space-y-2">
                <Label>{copy.journal.credit}</Label>
                <Input type="number" name="credit" min="0" step="0.01" defaultValue="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{copy.journal.description}</Label>
              <Input name="description" />
            </div>
            <div className="space-y-2">
              <Label>{copy.journal.reference}</Label>
              <Input name="reference" placeholder="INV-2024-..." />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? common.saving : common.save}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.journal.debit}</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary ? fmt(summary.totals.expense) : "$0.00"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.journal.credit}</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {summary ? fmt(summary.totals.income) : "$0.00"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.ledger.balance}</CardTitle>
            <Scale className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary && summary.totals.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {summary ? fmt(summary.totals.profit) : "$0.00"}
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

      {/* Journal Entries Tab */}
      {activeTab === "journal" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">{copy.journal.date}</th>
                  <th className="px-6 py-4">{copy.journal.account}</th>
                  <th className="px-6 py-4">{copy.journal.description}</th>
                  <th className="px-6 py-4">{copy.journal.reference}</th>
                  <th className="px-6 py-4 text-right">{copy.journal.debit}</th>
                  <th className="px-6 py-4 text-right">{copy.journal.credit}</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      {copy.journal.noEntries}
                    </td>
                  </tr>
                ) : (
                  journalEntries.map((entry) => (
                    <tr key={entry.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500">
                        {mounted ? new Date(entry.date).toLocaleDateString() : ""}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{entry.account}</td>
                      <td className="px-6 py-4 text-gray-600">{entry.description}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{entry.reference}</td>
                      <td className="px-6 py-4 text-right font-medium text-red-600">
                        {entry.debit > 0 ? fmt(entry.debit) : "-"}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-emerald-600">
                        {entry.credit > 0 ? fmt(entry.credit) : "-"}
                      </td>
                    </tr>
                  ))
                )}
                {journalEntries.length > 0 && (
                  <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                    <td colSpan={4} className="px-6 py-4 text-right">{common.total}</td>
                    <td className="px-6 py-4 text-right text-red-600">
                      {fmt(journalEntries.reduce((acc, e) => acc + e.debit, 0))}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-600">
                      {fmt(journalEntries.reduce((acc, e) => acc + e.credit, 0))}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* General Ledger Tab */}
      {activeTab === "ledger" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">{copy.ledger.account}</th>
                  <th className="px-6 py-4 text-right">{copy.ledger.totalDebit}</th>
                  <th className="px-6 py-4 text-right">{copy.ledger.totalCredit}</th>
                  <th className="px-6 py-4 text-right">{copy.ledger.balance}</th>
                </tr>
              </thead>
              <tbody>
                {(!summary || summary.ledger.length === 0) ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      {copy.ledger.noData}
                    </td>
                  </tr>
                ) : (
                  summary.ledger.map((row) => (
                    <tr key={row.account} className="bg-white border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.account}</td>
                      <td className="px-6 py-4 text-right text-red-600">{fmt(row.debit)}</td>
                      <td className="px-6 py-4 text-right text-emerald-600">{fmt(row.credit)}</td>
                      <td className={`px-6 py-4 text-right font-bold ${row.balance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {fmt(row.balance)}
                      </td>
                    </tr>
                  ))
                )}
                {summary && summary.ledger.length > 0 && (
                  <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                    <td className="px-6 py-4">{common.total}</td>
                    <td className="px-6 py-4 text-right text-red-600">
                      {fmt(summary.ledger.reduce((acc, r) => acc + r.debit, 0))}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-600">
                      {fmt(summary.ledger.reduce((acc, r) => acc + r.credit, 0))}
                    </td>
                    <td className={`px-6 py-4 text-right ${summary.totals.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {fmt(summary.ledger.reduce((acc, r) => acc + r.balance, 0))}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Balance Sheet Tab */}
      {activeTab === "balanceSheet" && summary && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{copy.balanceSheet.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {copy.balanceSheet.asOf} {mounted ? new Date().toLocaleDateString() : ""}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Assets */}
            <Card>
              <CardHeader className="bg-emerald-50 border-b">
                <CardTitle className="text-lg text-emerald-800">{copy.balanceSheet.assets}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-dashed">
                    <span className="text-gray-600">{copy.balanceSheet.cashAndBank}</span>
                    <span className="font-medium">{fmt(summary.balanceSheet.cashAndBank)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-dashed">
                    <span className="text-gray-600">{copy.balanceSheet.accountsReceivable}</span>
                    <span className="font-medium">{fmt(summary.balanceSheet.accountsReceivable)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-gray-300 font-bold text-emerald-700">
                    <span>{copy.balanceSheet.totalAssets}</span>
                    <span>{fmt(summary.balanceSheet.totalAssets)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liabilities & Equity */}
            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="text-lg text-blue-800">{copy.balanceSheet.liabilities} & {copy.balanceSheet.equity}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{copy.balanceSheet.liabilities}</p>
                  <div className="flex justify-between py-2 border-b border-dashed">
                    <span className="text-gray-600">{copy.balanceSheet.accountsPayable}</span>
                    <span className="font-medium">{fmt(summary.balanceSheet.accountsPayable)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b font-semibold text-red-600">
                    <span>{copy.balanceSheet.totalLiabilities}</span>
                    <span>{fmt(summary.balanceSheet.totalLiabilities)}</span>
                  </div>

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">{copy.balanceSheet.equity}</p>
                  <div className="flex justify-between py-2 border-b border-dashed">
                    <span className="text-gray-600">{copy.balanceSheet.retainedEarnings}</span>
                    <span className="font-medium">{fmt(summary.balanceSheet.equity)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-gray-300 font-bold text-blue-700">
                    <span>{copy.balanceSheet.totalLiabilitiesAndEquity}</span>
                    <span>{fmt(summary.balanceSheet.totalAssets)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visual balance indicator */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-sm text-gray-500">{copy.balanceSheet.totalAssets}</p>
                  <p className="text-3xl font-bold text-emerald-600">{fmt(summary.balanceSheet.totalAssets)}</p>
                </div>
                <div className="text-4xl text-gray-300">=</div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">{copy.balanceSheet.totalLiabilities}</p>
                  <p className="text-3xl font-bold text-red-600">{fmt(summary.balanceSheet.totalLiabilities)}</p>
                </div>
                <div className="text-4xl text-gray-300">+</div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">{copy.balanceSheet.equity}</p>
                  <p className="text-3xl font-bold text-blue-600">{fmt(summary.balanceSheet.equity)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "balanceSheet" && !summary && (
        <div className="text-center py-12 text-gray-500">{common.loading}</div>
      )}
    </div>
  );
}

export default function AccountingModule() {
  return (
    <Suspense fallback={<div className="h-32 w-full animate-pulse bg-gray-200 rounded-lg" />}>
      <AccountingContent />
    </Suspense>
  );
}
