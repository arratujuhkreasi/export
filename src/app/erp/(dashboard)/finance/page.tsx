"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, DollarSign, CreditCard, Receipt, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const dummyInvoices = [
  { id: "INV-2024-089", client: "Global Foods Inc.", amount: "$45,200", status: "Paid", date: "2024-05-15", dueDate: "2024-06-15" },
  { id: "INV-2024-090", client: "Euro Spices Ltd", amount: "$12,450", status: "Pending", date: "2024-05-18", dueDate: "2024-06-18" },
  { id: "INV-2024-091", client: "Asian Marts", amount: "$8,900", status: "Overdue", date: "2024-04-10", dueDate: "2024-05-10" },
  { id: "INV-2024-092", client: "North Traders", amount: "$32,100", status: "Draft", date: "2024-05-20", dueDate: "2024-06-20" },
];

const dummyCosts = [
  { id: "FOB-001", orderRef: "ORD-1023", category: "Trucking", description: "Warehouse to Port Tanjung Priok", amount: "Rp 3,500,000", date: "2024-05-12" },
  { id: "FOB-002", orderRef: "ORD-1023", category: "Customs", description: "PEB & COO Handling", amount: "Rp 1,200,000", date: "2024-05-13" },
  { id: "FOB-003", orderRef: "ORD-1024", category: "Fumigation", description: "Phytosanitary treatment", amount: "Rp 850,000", date: "2024-05-15" },
];

export default function FinanceModule() {
  const [activeTab, setActiveTab] = useState<"invoices" | "fob">("invoices");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Finance</h1>
          <p className="text-muted-foreground mt-1">Manage invoices, payments, and FOB operational costs.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">Create Invoice</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,231.89</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receivables</CardTitle>
            <CreditCard className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,350.00</div>
            <p className="text-xs text-muted-foreground">3 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Receipt className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$8,900.00</div>
            <p className="text-xs text-muted-foreground">1 invoice overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total FOB Costs (MTD)</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.5M</div>
            <p className="text-xs text-muted-foreground">Across 4 shipments</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mt-8">
        <button
          onClick={() => setActiveTab("invoices")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "invoices"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Proforma & Commercial Invoices
        </button>
        <button
          onClick={() => setActiveTab("fob")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "fob"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          FOB Cost Tracking
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder={`Search ${activeTab}...`} className="pl-9" />
        </div>
      </div>

      {activeTab === "invoices" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Issue Date</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyInvoices.map((invoice) => (
                  <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                    <td className="px-6 py-4">{invoice.client}</td>
                    <td className="px-6 py-4 font-medium">{invoice.amount}</td>
                    <td className="px-6 py-4 text-gray-500">{invoice.date}</td>
                    <td className="px-6 py-4 text-gray-500">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          invoice.status === "Paid" ? "secondary" :
                          invoice.status === "Pending" ? "default" :
                          invoice.status === "Draft" ? "outline" :
                          "destructive"
                        }
                        className={
                          invoice.status === "Paid" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" :
                          invoice.status === "Pending" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                          invoice.status === "Overdue" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                          "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "fob" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Record ID</th>
                  <th className="px-6 py-4">Order Ref</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyCosts.map((cost) => (
                  <tr key={cost.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{cost.id}</td>
                    <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">{cost.orderRef}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-slate-50 text-slate-700">
                        {cost.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{cost.description}</td>
                    <td className="px-6 py-4 text-gray-500">{cost.date}</td>
                    <td className="px-6 py-4 font-medium">{cost.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}