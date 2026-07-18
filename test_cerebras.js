const { streamText } = require('ai');
const { createOpenAI } = require('@ai-sdk/openai');

const cerebras = createOpenAI({
  baseURL: 'https://api.cerebras.ai/v1',
  apiKey: 'csk-yje4v8y62h35drc4hkvjt6wnkewjwxtfy4dvwjhym96f8nnf',
  compatibility: 'compatible'
});

async function main() {
  try {
    const result = streamText({
      model: cerebras.chat('gpt-oss-120b'),
      messages: [{ role: 'user', content: 'Hello' }],
    });
    
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
  } catch (e) {
    console.error(e);
  }
}
main();
