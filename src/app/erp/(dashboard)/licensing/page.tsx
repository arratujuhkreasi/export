"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

const dummyShipments = [
  { 
    id: "SHP-001", 
    orderRef: "ORD-1023", 
    destination: "Rotterdam, NL",
    docs: {
      invoice: "Ready",
      packingList: "Ready",
      coo: "Ready",
      svlk: "Not Required",
      phyto: "Pending",
      bl: "Draft"
    },
    status: "In Progress",
    etd: "2024-06-15"
  },
  { 
    id: "SHP-002", 
    orderRef: "ORD-1024", 
    destination: "Tokyo, JP",
    docs: {
      invoice: "Ready",
      packingList: "Ready",
      coo: "Ready",
      svlk: "Ready",
      phyto: "Ready",
      bl: "Ready"
    },
    status: "Cleared",
    etd: "2024-05-28"
  },
  { 
    id: "SHP-003", 
    orderRef: "ORD-1025", 
    destination: "Jebel Ali, AE",
    docs: {
      invoice: "Draft",
      packingList: "Draft",
      coo: "Pending",
      svlk: "Pending",
      phyto: "Not Required",
      bl: "Pending"
    },
    status: "Action Required",
    etd: "2024-07-10"
  },
];

const renderDocStatus = (status: string) => {
  if (status === "Ready") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "Pending" || status === "Draft") return <Clock className="h-4 w-4 text-amber-500" />;
  if (status === "Action Required") return <AlertCircle className="h-4 w-4 text-red-500" />;
  return <span className="text-xs text-gray-400">-</span>;
};

export default function LicensingModule() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Licensing & Docs</h1>
          <p className="text-muted-foreground mt-1">Track SVLK, Phytosanitary, and other export document compliance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">Upload Document</Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 mt-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search shipments or order ref..." className="pl-9" />
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
              {dummyShipments.map((shipment) => (
                <tr key={shipment.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{shipment.id}</div>
                    <div className="text-xs text-blue-600 hover:underline cursor-pointer">{shipment.orderRef}</div>
                  </td>
                  <td className="px-6 py-4">{shipment.destination}</td>
                  
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-1">
                      {renderDocStatus(shipment.docs.invoice)}
                      {renderDocStatus(shipment.docs.packingList)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">{renderDocStatus(shipment.docs.coo)}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">{renderDocStatus(shipment.docs.svlk)}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">{renderDocStatus(shipment.docs.phyto)}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">{renderDocStatus(shipment.docs.bl)}</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        shipment.status === "Cleared" ? "secondary" :
                        shipment.status === "In Progress" ? "default" :
                        "destructive"
                      }
                      className={
                        shipment.status === "Cleared" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" :
                        shipment.status === "In Progress" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                        "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {shipment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{shipment.etd}</td>
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
    </div>
  );
}