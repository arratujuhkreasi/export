"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, CheckCircle2, AlertCircle, Clock, Plus, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const renderDocStatus = (status: string) => {
  if (status === "Ready") return <span title="Ready"><CheckCircle2 className="h-4 w-4 text-emerald-500" /></span>;
  if (status === "Pending" || status === "Draft") return <span title="Pending"><Clock className="h-4 w-4 text-amber-500" /></span>;
  if (status === "Action Required") return <span title="Action Required"><AlertCircle className="h-4 w-4 text-red-500" /></span>;
  return <span className="text-xs text-gray-400" title="Not Required">-</span>;
};

export default function LicensingModule() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const [isShipmentOpen, setIsShipmentOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchShipments();
  }, []);

  async function fetchShipments() {
    try {
      const res = await fetch("/api/licensing/shipments");
      if (res.ok) setShipments(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAddShipment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await fetch("/api/licensing/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      setIsShipmentOpen(false);
      fetchShipments();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateDoc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await fetch("/api/licensing/shipments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      setIsUploadOpen(false);
      fetchShipments();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Licensing & Docs</h1>
          <p className="text-muted-foreground mt-1">Track SVLK, Phytosanitary, and other export document compliance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button size="sm" onClick={() => setIsShipmentOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Shipment
          </Button>
        </div>
      </div>

      <Dialog open={isShipmentOpen} onOpenChange={setIsShipmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Shipment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddShipment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Shipment ID</label>
                <Input name="shipmentId" required placeholder="SHP-..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Ref</label>
                <Input name="orderRef" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Input name="destination" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ETD</label>
                <Input type="date" name="etd" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Shipment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Document Status</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateDoc} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Shipment</label>
              <select name="id" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                {shipments.map(s => (
                  <option key={s.id} value={s.id}>{s.shipmentId} - {s.destination}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Type</label>
              <select name="documentKey" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="invoice">Invoice</option>
                <option value="packingList">Packing List</option>
                <option value="coo">COO</option>
                <option value="svlk">SVLK</option>
                <option value="phyto">Phytosanitary</option>
                <option value="bl">Bill of Lading</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select name="documentStatus" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="Ready">Ready / Uploaded</option>
                <option value="Pending">Pending</option>
                <option value="Action Required">Action Required</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Status"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-4 mb-4 mt-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search shipments..." className="pl-9" />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">Shipment ID</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4 text-center">Inv / PL</th>
                <th className="px-6 py-4 text-center">COO</th>
                <th className="px-6 py-4 text-center">SVLK</th>
                <th className="px-6 py-4 text-center">Phyto</th>
                <th className="px-6 py-4 text-center">B/L</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">ETD</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length === 0 ? (
                <tr><td colSpan={10} className="px-6 py-8 text-center text-gray-500">No shipments found.</td></tr>
              ) : shipments.map((shipment) => {
                const docs = shipment.documents ? JSON.parse(shipment.documents) : {};
                return (
                  <tr key={shipment.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{shipment.shipmentId}</div>
                      <div className="text-xs text-blue-600 hover:underline cursor-pointer">{shipment.orderRef}</div>
                    </td>
                    <td className="px-6 py-4">{shipment.destination}</td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        {renderDocStatus(docs.invoice)}
                        {renderDocStatus(docs.packingList)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">{renderDocStatus(docs.coo)}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">{renderDocStatus(docs.svlk)}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">{renderDocStatus(docs.phyto)}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">{renderDocStatus(docs.bl)}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          shipment.status === "Cleared" ? "secondary" :
                          shipment.status === "In Progress" ? "default" :
                          "destructive"
                        }
                      >
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{mounted && shipment.etd ? new Date(shipment.etd).toLocaleDateString() : "-"}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}