import { createClient } from "@libsql/client";
import "dotenv/config";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required");
  }

  const client = createClient({ url });

  try {
    console.log("Recreating Supplier table...");
    await client.execute(`DROP TABLE IF EXISTS "Supplier";`);
    await client.execute(`
      CREATE TABLE "Supplier" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      );
    `);

    console.log("Creating Inquiry table...");
    await client.execute(`
      CREATE TABLE IF NOT EXISTS "Inquiry" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "rfqNo" TEXT NOT NULL,
        "buyer" TEXT NOT NULL,
        "product" TEXT NOT NULL,
        "volume" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      );
    `);
    await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Inquiry_rfqNo_key" ON "Inquiry"("rfqNo");`);

    console.log("Creating Shipment table...");
    await client.execute(`
      CREATE TABLE IF NOT EXISTS "Shipment" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "shipmentId" TEXT NOT NULL,
        "orderRef" TEXT NOT NULL,
        "destination" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'In Progress',
        "etd" DATETIME,
        "documents" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      );
    `);
    await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Shipment_shipmentId_key" ON "Shipment"("shipmentId");`);

    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

main();
