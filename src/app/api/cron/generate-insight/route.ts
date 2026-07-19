import { google } from "@ai-sdk/google";
import { kv } from "@vercel/kv";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const maxDuration = 60; // 60 seconds max

const PRODUCTS = ["Coco Peat", "Coco Fiber", "Legal Wood", "Sumedang Sweet Potato", "Young Areca Nut"];

export async function GET(req: Request) {
  try {
    // 1. Verify cron authorization (Vercel sets CRON_SECRET)
    const authHeader = req.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Select a random product to talk about
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // 3. Generate article using Gemini
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `You are an expert B2B commodity analyst for CO EXPORT.ID, an Indonesian export company.
Your task is to write a short, professional, and engaging market update article about a specific commodity.
The tone should be professional, B2B-focused, and highlight Indonesia's supply strength.
Format the output EXACTLY in this JSON structure (do not use markdown formatting for the outer JSON, just raw JSON string):
{
  "title": "A catchy, professional title (max 60 chars)",
  "excerpt": "A 1-sentence summary of the article (max 120 chars)",
  "content": ["Paragraph 1 string", "Paragraph 2 string", "Paragraph 3 string"]
}
Limit the content to 3 short paragraphs.
IMPORTANT: You MUST search the internet to find a real, recent fact, trend, or news related to the commodity to include in the article.`,
      prompt: `Write a market update article about: ${randomProduct}. Use real-world recent data if possible.`,
    });

    // 4. Parse the generated JSON safely
    let articleData;
    try {
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      articleData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse AI output:", text);
      return NextResponse.json({ error: "AI Output Parsing Failed", raw: text }, { status: 500 });
    }

    // 5. Construct the Post object
    const newPostId = `auto-insight-${Date.now()}`;
    const newPost = {
      id: newPostId,
      slug: `${randomProduct.toLowerCase().replace(/\s+/g, "-")}-update-${Date.now()}`,
      title: articleData.title,
      excerpt: articleData.excerpt,
      date: currentDate,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop", // Generic export image
      readTime: "2 min read",
      content: articleData.content,
    };

    // 6. Save to Vercel KV (prepend to existing list)
    // We store the dynamic insights under the key 'dynamic-insights'
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      let existingPosts: any[] = await kv.get("dynamic-insights") || [];
      existingPosts = [newPost, ...existingPosts];
      
      // Limit to max 30 posts to save space
      if (existingPosts.length > 30) {
        existingPosts = existingPosts.slice(0, 30);
      }
      
      await kv.set("dynamic-insights", existingPosts);
      
      return NextResponse.json({ success: true, post: newPost });
    } else {
      console.warn("KV database is not configured. Article generated but not saved.");
      return NextResponse.json({ success: false, error: "KV not configured", post: newPost }, { status: 500 });
    }
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
