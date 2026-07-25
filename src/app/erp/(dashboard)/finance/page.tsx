"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, DollarSign, CreditCard, Receipt, FileText, Plus, AlertCircle } from "lucide-react";
import { resolveLocale, ui } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function FinanceModuleContent() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].erp.finance;

  const [activeTab, setActiveTab] = useState<"invoices" | "income" | "expenses">("invoices");
  
  const [invoices, setInvoices] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchInvoices();
    fetchTransactions();
  }, []);

  async function fetchInvoices() {
    const res = await fetch("/api/finance/invoices");
    if (res.ok) setInvoices(await res.json());
  }

  async function fetchTransactions() {
    const res = await fetch("/api/finance/transactions");
    if (res.ok) setTransactions(await res.json());
  }

  async function handleCreateInvoice(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      buyerName: formData.get("buyerName"),
      amount: formData.get("amount"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate"),
    };

    const res = await fetch("/api/finance/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsInvoiceOpen(false);
      fetchInvoices();
    }
    setIsSubmitting(false);
  }

  async function handleRecordTransaction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      type: formData.get("type"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      description: formData.get("description"),
      date: formData.get("date"),
    };

    const res = await fetch("/api/finance/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsTransactionOpen(false);
      fetchTransactions();
    }
    setIsSubmitting(false);
  }

  const income = transactions.filter(t => t.type === "INCOME");
  const expenses = transactions.filter(t => t.type === "EXPENSE");
  
  const totalRevenue = income.reduce((acc, t) => acc + t.amount, 0);
  const totalCosts = expenses.reduce((acc, t) => acc + t.amount, 0);
  const pendingReceivables = invoices.filter(i => i.status === "PENDING" || i.status === "DRAFT").reduce((acc, i) => acc + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{copy.title}</h1>
          <p className="text-muted-foreground mt-1">{copy.description}</p>
        </div>
        <div className="flex items-center gap-2">
          
          <Dialog open={isTransactionOpen} onOpenChange={setIsTransactionOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                {copy.recordTransaction}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{copy.recordTransaction}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleRecordTransaction} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <select name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="INCOME">Income</option>
                      <option value="EXPENSE">Expense</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input name="category" required placeholder="e.g. Sales, Logistics" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" name="amount" required min="0" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input name="description" />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Transaction"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                {copy.createInvoice}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{copy.createInvoice}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="space-y-2">
                  <Label>Buyer Name</Label>
                  <Input name="buyerName" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input type="number" name="amount" required min="0" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <select name="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="DRAFT">Draft</option>
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" name="dueDate" />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Create Invoice"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.totalRevenue}</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.pendingReceivables}</CardTitle>
            <CreditCard className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingReceivables.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.totalCosts}</CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalCosts.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mt-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab("invoices")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "invoices"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {copy.tabs.cashFlow || "Invoices"}
        </button>
        <button
          onClick={() => setActiveTab("income")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "income"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {copy.tabs.income}
        </button>
        <button
          onClick={() => setActiveTab("expenses")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "expenses"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {copy.tabs.expenses}
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "invoices" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No invoices found.</td></tr>
                ) : invoices.map((invoice) => (
                  <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.invoiceNo}</td>
                    <td className="px-6 py-4">{invoice.buyerName}</td>
                    <td className="px-6 py-4 font-medium">${invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-500">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        invoice.status === "PAID" ? "bg-emerald-50 text-emerald-700" :
                        invoice.status === "PENDING" ? "bg-amber-50 text-amber-700" :
                        "bg-gray-50 text-gray-700"
                      }>
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "income" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {income.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No income records found.</td></tr>
                ) : income.map((t) => (
                  <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">{t.category}</td>
                    <td className="px-6 py-4 text-gray-600">{t.description || "-"}</td>
                    <td className="px-6 py-4 text-emerald-600 font-medium text-right">+ ${t.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "expenses" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No expense records found.</td></tr>
                ) : expenses.map((t) => (
                  <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">{t.category}</td>
                    <td className="px-6 py-4 text-gray-600">{t.description || "-"}</td>
                    <td className="px-6 py-4 text-red-600 font-medium text-right">- ${t.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function FinanceModule() {
  return (
    <Suspense fallback={<div className="h-32 w-full animate-pulse bg-gray-200 rounded-lg" />}>
      <FinanceModuleContent />
    </Suspense>
  );
}