import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// In development, the client might be instantiated multiple times if we don't attach it to global.
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    // If DATABASE_URL is not set (e.g. during build), fallback to local SQLite memory or file so it doesn't crash.
    const url = process.env.DATABASE_URL || "file:./dev.db";
    const adapter = new PrismaLibSql({
      url,
      // If authToken is not in the URL, you could pass it here, but Prisma schema handles URL with query params
      // We will allow the URL to contain authToken for simplicity.
    });
    
    return new PrismaClient({ adapter });
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
