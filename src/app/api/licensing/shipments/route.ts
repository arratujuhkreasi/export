import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(shipments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newShipment = await prisma.shipment.create({
      data: {
        shipmentId: data.shipmentId,
        orderRef: data.orderRef,
        destination: data.destination,
        status: data.status || "In Progress",
        etd: data.etd ? new Date(data.etd) : null,
        documents: JSON.stringify({
          invoice: "Pending",
          packingList: "Pending",
          coo: "Pending",
          svlk: "Pending",
          phyto: "Pending",
          bl: "Pending"
        })
      }
    });
    return NextResponse.json(newShipment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { id, documentKey, documentStatus } = data;
    
    const shipment = await prisma.shipment.findUnique({ where: { id } });
    if (!shipment) return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    
    let docs: Record<string, string> = {};
    if (shipment.documents) {
      docs = JSON.parse(shipment.documents);
    }
    
    docs[documentKey] = documentStatus;
    
    const updated = await prisma.shipment.update({
      where: { id },
      data: { documents: JSON.stringify(docs) }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
  }
}
