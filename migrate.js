import { createClient } from "@libsql/client";
import "dotenv/config";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required");
  }

  const client = createClient({
    url,
  });

  try {
    console.log("Adding columns to Invoice...");
    try {
      await client.execute(`ALTER TABLE "Invoice" ADD COLUMN "dueDate" DATETIME;`);
    } catch (e) {
      console.log("Column dueDate might already exist:", e.message);
    }
    try {
      await client.execute(`ALTER TABLE "Invoice" ADD COLUMN "items" TEXT;`);
    } catch (e) {
      console.log("Column items might already exist:", e.message);
    }

    console.log("Creating Transaction table...");
    await client.execute(`
      CREATE TABLE IF NOT EXISTS "Transaction" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "type" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "amount" REAL NOT NULL,
        "description" TEXT,
        "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "referenceId" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      );
    `);
    
    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

main();
