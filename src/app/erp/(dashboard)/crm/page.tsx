"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, UserCheck, Clock, XCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function CRMModule() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "suppliers">("inquiries");
  
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchInquiries();
    fetchSuppliers();
  }, []);

  async function fetchInquiries() {
    try {
      const res = await fetch("/api/crm/inquiries");
      if (res.ok) setInquiries(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchSuppliers() {
    try {
      const res = await fetch("/api/crm/suppliers");
      if (res.ok) setSuppliers(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAddInquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await fetch("/api/crm/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      setIsInquiryOpen(false);
      fetchInquiries();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAddSupplier(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await fetch("/api/crm/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      setIsSupplierOpen(false);
      fetchSuppliers();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">CRM</h1>
          <p className="text-muted-foreground mt-1">Manage buyer inquiries and supplier applications.</p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === "inquiries" ? (
            <Button size="sm" onClick={() => setIsInquiryOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add RFQ
            </Button>
          ) : (
            <Button size="sm" onClick={() => setIsSupplierOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Buyer Inquiry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddInquiry} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">RFQ Number</label>
                <Input name="rfqNo" required placeholder="RFQ-2024-..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Buyer Name</label>
                <Input name="buyer" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product</label>
                <Input name="product" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Volume</label>
                <Input name="volume" required placeholder="e.g. 20 MT" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Inquiry"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSupplierOpen} onOpenChange={setIsSupplierOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSupplier} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Supplier Name</label>
              <Input name="name" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input name="category" required placeholder="Coffee, Spices..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input name="location" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Supplier"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                {inquiries.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">No inquiries found.</td></tr>
                ) : inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{inquiry.rfqNo}</td>
                    <td className="px-6 py-4">{inquiry.buyer}</td>
                    <td className="px-6 py-4">{inquiry.product}</td>
                    <td className="px-6 py-4">{inquiry.volume}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          inquiry.status === "PENDING" ? "default" :
                          inquiry.status === "QUOTED" ? "secondary" :
                          inquiry.status === "IN DISCUSSION" ? "outline" :
                          "destructive"
                        }
                      >
                        {inquiry.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{mounted ? new Date(inquiry.date).toLocaleDateString() : ""}</td>
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
                  <th className="px-6 py-4">Supplier Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No suppliers found.</td></tr>
                ) : suppliers.map((supplier) => (
                  <tr key={supplier.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{supplier.name}</td>
                    <td className="px-6 py-4">{supplier.category}</td>
                    <td className="px-6 py-4">{supplier.location}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          supplier.status === "APPROVED" ? "secondary" :
                          supplier.status === "PENDING" ? "default" :
                          "destructive"
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{mounted ? new Date(supplier.createdAt).toLocaleDateString() : ""}</td>
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