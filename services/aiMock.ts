// services/aiMock.ts
// Safe mock used for production build / Vercel so no real cloud SDKs are required.

export async function askAI(prompt: string) {
  return { text: `Mock reply: ${String(prompt).slice(0, 200)}`, raw: { mock: true } };
}

export function createClient(_cfg?: any) {
  return {
    generate: async (opts: any) => {
      const prompt = (opts?.prompt || opts?.input || "no-prompt").toString();
      return { output: [{ content: `Mock generated text for: ${prompt}` }] };
    },
    text: {
      generate: async (opts: any) => ({ text: `Mock text for: ${opts?.prompt || opts}` }),
    },
    ask: async (p: any) => ({ text: `Mock ask: ${p}` }),
  };
}

// Named export that some components may expect (GoogleGenAI or similar)
export const GoogleGenAI = {
  createClient: createClient,
  ask: (p: any) => askAI(p),
  generate: async (opts: any) => (await createClient().generate(opts)),
};

// default export for `import genai from '@google/genai'` style imports
const defaultExport = {
  ask: (p: any) => askAI(p),
  createClient,
};
export default defaultExport;
