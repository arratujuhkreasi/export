import { streamText, convertToModelMessages } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/cms';

export const maxDuration = 30;

// Configure Cerebras using the OpenAI SDK adapter with compatible mode
const cerebras = createOpenAI({
  baseURL: 'https://api.cerebras.ai/v1',
  apiKey: process.env.CEREBRAS_API_KEY,
  // @ts-expect-error The Cerebras-compatible OpenAI endpoint accepts this adapter option.
  compatibility: 'compatible',
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    console.log("Parsed body:", JSON.stringify(body));
    const { messages } = body;

    if (!messages) {
      return NextResponse.json({ error: "Missing messages in request body" }, { status: 400 });
    }

    // Load products for rich context
    const productsID = getProducts('id');
    console.log("Loaded products count:", productsID?.length);

    // TEMPORARY: Log API Key format (first 6 chars and length) for validation
    const key = process.env.CEREBRAS_API_KEY || "";
    console.log("CEREBRAS API KEY FORMAT:", {
      length: key.length,
      prefix: key.slice(0, 6),
      suffix: key.slice(-4),
    });

    // TEMPORARY: Query Cerebras models to see valid names
    try {
      const modelsRes = await fetch("https://api.cerebras.ai/v1/models", {
        headers: {
          "Authorization": `Bearer ${process.env.CEREBRAS_API_KEY}`
        }
      });
      const modelsData = await modelsRes.json();
      console.log("CEREBRAS MODELS LIST:", JSON.stringify(modelsData));
    } catch (err: any) {
      console.error("Failed to fetch Cerebras models:", err.message);
    }
    
    const catalogContext = productsID.map(p => `
Product Name: ${p.name}
Category: ${p.category}
Description: ${p.longDescription}
Origin: ${p.origin}
Indicative FOB Price: ${p.priceRange}
Minimum Order Quantity (MOQ): ${p.minOrder}
Lead Time: ${p.leadTime}
Incoterm: ${p.incoterm}
HS Code: ${p.hsCode}
Documents Provided: ${p.documents.join(', ')}
Key Specs: ${JSON.stringify(p.specs)}
    `).join('\n\n');

    const systemPrompt = `
You are "Admin", the official B2B export AI assistant for CO EXPORT.ID.
Your sole purpose is to help global buyers with product information, MOQs, FOB pricing, and export documentation for CO EXPORT.ID's catalog.

COMPANY KNOWLEDGE BASE:
CO EXPORT.ID is a global logistics and trade partner based in Bandung, West Java, Indonesia. We connect Indonesian natural commodities to global buyers.
Contact: sales@coexport.id

PRODUCT CATALOG CONTEXT:
${catalogContext}

STRICT INSTRUCTIONS & BOUNDARIES:
1. You MUST ONLY answer questions related to CO EXPORT.ID, its products, export procedures, logistics, pricing, and shipping.
2. If a user asks a random, off-topic, or general knowledge question (e.g., coding, math, history, jokes, recipes, weather, other companies), you MUST politely decline and state that you can only assist with CO EXPORT.ID export inquiries. Do not provide the answer.
3. If a user asks for prices, mention that the prices are "Indicative FOB Tanjung Priok" and may change based on exact specifications.
4. Respond in the language the user speaks (English or Indonesian).
5. TONE & STYLE: Be highly professional, polite, concise, and helpful. Do NOT use overly complex words. Speak like a senior B2B sales executive.
6. FORMATTING RULES: 
   - NEVER write long walls of text. Break answers into short paragraphs (max 2-3 sentences).
   - Use Markdown heavily: bold text for emphasis (e.g., product names, prices), and bullet points for listing specifications or features.
   - Always leave an empty line between paragraphs or lists.
   - Do NOT output any internal reasoning or "thinking" tags.
   - Always end your response with a polite closing, offering further assistance or directing them to sales@coexport.id for formal inquiries.
    `;

    console.log("Calling streamText...");
    const modelMessages = await convertToModelMessages(messages);
    console.log("Converted model messages:", JSON.stringify(modelMessages));

    const result = streamText({
      model: cerebras.chat('llama-3.3-70b'),
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
