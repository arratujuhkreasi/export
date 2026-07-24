import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Check if the provided password matches the master password in env
    const masterPassword = process.env.ADMIN_PASSWORD;

    if (!masterPassword) {
      console.error("ADMIN_PASSWORD is not set in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (password === masterPassword) {
      // Set a secure cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: "admin_token",
        value: "authenticated",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}