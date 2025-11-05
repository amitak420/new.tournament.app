// services/aiMock.ts
// A small, safe mock replacement for any client-side AI SDK.
// Exports a few friendly helpers so most import patterns won't break.

export async function askAI(prompt: string) {
  // return a fake but plausible response object
  return {
    text: `Mock reply: ${String(prompt).slice(0, 200)}`,
    raw: { debug: true },
  };
}

// Some libraries use a createClient() or similar factory.
export function createClient(_cfg?: any) {
  return {
    generate: async (opts: any) => {
      const prompt = (opts?.prompt || opts?.input || "no-prompt").toString();
      return { output: [{ content: `Mock generated text for: ${prompt}` }] };
    },
    text: {
      // mimic a text generation helper some libs expose
      generate: async (opts: any) => ({ text: `Mock text for: ${opts?.prompt || opts}` }),
    },
    ask: async (p: any) => ({ text: `Mock ask: ${p}` }),
  };
}

// Default export for `import genai from '@google/genai'` style
const defaultExport = {
  ask: (p: any) => askAI(p),
  createClient,
};
export default defaultExport;
