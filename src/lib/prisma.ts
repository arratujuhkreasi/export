import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const url = process.env.DATABASE_URL || "file:./dev.db";
    const authToken = process.env.DATABASE_AUTH_TOKEN;
    
    console.log("prisma.ts initializing with url:", url, "authToken exists:", !!authToken);
    
    // We only use libSQL adapter if it's a remote URL
    if (url.startsWith("libsql://") || url.startsWith("https://")) {
      console.log("Creating libsql adapter with url:", url);
      const adapter = new PrismaLibSql({ url, authToken });
      return new PrismaClient({ adapter });
    }
    
    return new PrismaClient();
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
