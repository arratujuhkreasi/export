import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const client = createClient({ url });
let sql = readFileSync("migration.sql", "utf-16le"); // PowerShell saved as utf-16le

// Strip BOM
if (sql.charCodeAt(0) === 0xFEFF) {
  sql = sql.slice(1);
}

// Split by ; and run each statement
const statements = sql.split(";").filter(s => s.trim().length > 0);

async function run() {
  for (const stmt of statements) {
    console.log("Executing:", stmt.trim());
    await client.execute(stmt);
  }
  console.log("Migration complete!");
}

run().catch(console.error);
