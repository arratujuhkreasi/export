"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, UserCheck, Clock, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const dummyInquiries = [
  { id: "RFQ-2024-001", buyer: "Global Foods Inc.", product: "Arabica Coffee Beans", volume: "20 MT", status: "Pending", date: "2024-05-12" },
  { id: "RFQ-2024-002", buyer: "Euro Spices Ltd", product: "Black Pepper", volume: "5 MT", status: "Quoted", date: "2024-05-10" },
  { id: "RFQ-2024-003", buyer: "Asian Marts", product: "Cassava Chips", volume: "10 MT", status: "Rejected", date: "2024-05-08" },
  { id: "RFQ-2024-004", buyer: "North Traders", product: "Palm Sugar", volume: "15 MT", status: "In Discussion", date: "2024-05-05" },
];

const dummySuppliers = [
  { id: "SUP-001", name: "PT Kopi Abadi", category: "Coffee", location: "Sumatra", status: "Approved", joined: "2024-01-15" },
  { id: "SUP-002", name: "CV Rempah Jaya", category: "Spices", location: "Java", status: "Reviewing", joined: "2024-05-11" },
  { id: "SUP-003", name: "Agro Nusantara", category: "Snacks", location: "Bali", status: "Rejected", joined: "2024-04-20" },
];

export default function CRMModule() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "suppliers">("inquiries");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">CRM</h1>
          <p className="text-muted-foreground mt-1">Manage buyer inquiries and supplier applications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">Export Data</Button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "inquiries"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Buyer Inquiries (RFQs)
        </button>
        <button
          onClick={() => setActiveTab("suppliers")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "suppliers"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Supplier Applications
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder={`Search ${activeTab}...`} className="pl-9" />
        </div>
      </div>

      {activeTab === "inquiries" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">RFQ ID</th>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Volume</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{inquiry.id}</td>
                    <td className="px-6 py-4">{inquiry.buyer}</td>
                    <td className="px-6 py-4">{inquiry.product}</td>
                    <td className="px-6 py-4">{inquiry.volume}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          inquiry.status === "Pending" ? "default" :
                          inquiry.status === "Quoted" ? "secondary" :
                          inquiry.status === "In Discussion" ? "outline" :
                          "destructive"
                        }
                        className={
                          inquiry.status === "Pending" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                          inquiry.status === "Quoted" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" :
                          inquiry.status === "In Discussion" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                          ""
                        }
                      >
                        {inquiry.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{inquiry.date}</td>
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

      {activeTab === "suppliers" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Supplier ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummySuppliers.map((supplier) => (
                  <tr key={supplier.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{supplier.id}</td>
                    <td className="px-6 py-4">{supplier.name}</td>
                    <td className="px-6 py-4">{supplier.category}</td>
                    <td className="px-6 py-4">{supplier.location}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          supplier.status === "Approved" ? "secondary" :
                          supplier.status === "Reviewing" ? "default" :
                          "destructive"
                        }
                        className={
                          supplier.status === "Approved" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" :
                          supplier.status === "Reviewing" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                          ""
                        }
                      >
                        {supplier.status === "Approved" && <UserCheck className="mr-1 h-3 w-3" />}
                        {supplier.status === "Reviewing" && <Clock className="mr-1 h-3 w-3" />}
                        {supplier.status === "Rejected" && <XCircle className="mr-1 h-3 w-3" />}
                        {supplier.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{supplier.joined}</td>
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