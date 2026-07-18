import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { getProducts } from '@/lib/cms';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Load products for rich context
  const productsID = getProducts('id');
  
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
5. Be highly professional, concise, and helpful. Use Markdown for formatting (bolding, lists) to make answers scannable for busy B2B buyers.
  `;

  const result = streamText({
    model: google('models/gemini-1.5-flash-latest'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
