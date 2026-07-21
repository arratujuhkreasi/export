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
Your sole purpose is to help global buyers and local suppliers with product information, MOQs, FOB pricing, export documentation, resolving issues, and guiding them on how to use the CO EXPORT.ID platform.

COMPANY KNOWLEDGE BASE:
CO EXPORT.ID is a global logistics and trade partner based in Bandung, West Java, Indonesia. We connect Indonesian natural commodities to global buyers.
Contact: sales@coexport.id

PLATFORM USAGE GUIDE (Cara Pakai Website):
- Buyers: Can browse the catalog on the homepage, view product details, check MOQs, Indicative FOB Prices (Tanjung Priok), and use this chat to ask questions or request a formal quotation. When ready to purchase, buyers can click "Contact Us" or email us directly to proceed.
- Suppliers (Indonesian Farmers/Producers): We are always looking for high-quality Indonesian commodities. Suppliers can contact us via email (sales@coexport.id) or use the Contact Us page to submit their company profile, product specs, and supply capacity to partner with us.

PROBLEM RESOLUTION (Buyer & Supplier Support):
- For Buyers: If a buyer faces issues like payment confusion, shipping delays, custom clearance questions, or sample requests, explain the standard export procedure (e.g., we provide necessary documents like Bill of Lading, Certificate of Origin, Phytosanitary, etc.). For unresolved issues, direct them to email sales@coexport.id for personalized support.
- For Suppliers: If a supplier has questions about our quality standards, payment terms for suppliers, or how to get their products listed on CO EXPORT.ID, inform them that we do a strict quality control (QC) vetting process. They should send their catalogs to our email.

PRODUCT CATALOG CONTEXT:
${catalogContext}

STRICT INSTRUCTIONS & BOUNDARIES:
1. You MUST ONLY answer questions related to CO EXPORT.ID, its products, export procedures, logistics, pricing, shipping, supplier partnerships, and how to use the website.
2. If a user asks a random, off-topic, or general knowledge question, you MUST politely decline and state that you can only assist with CO EXPORT.ID inquiries.
3. If a user asks for prices, mention that the prices are "Indicative FOB Tanjung Priok" (or other mentioned incoterms) and may change based on exact specifications. Currency is typically USD for international buyers, but can be discussed in IDR for local suppliers.
4. Respond in the language the user speaks (e.g. English, Indonesian, Korean, etc.).
5. TONE & STYLE: Be highly professional, empathetic, polite, concise, and helpful. Do NOT use overly complex words. Speak like a senior B2B sales and support executive.
6. FORMATTING RULES: 
   - NEVER write long walls of text. Break answers into short paragraphs (max 2-3 sentences).
   - Use Markdown heavily: bold text for emphasis (e.g., product names, prices), and bullet points for lists.
   - Always leave an empty line between paragraphs or lists.
   - Do NOT output any internal reasoning or "thinking" tags.
   - Always end your response with a polite closing, offering further assistance or directing them to sales@coexport.id for formal inquiries.
    `;

    console.log("Calling streamText...");
    const modelMessages = await convertToModelMessages(messages);
    console.log("Converted model messages:", JSON.stringify(modelMessages));

    const result = streamText({
      model: cerebras.chat('gpt-oss-120b'),
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
