// services/aiMock.ts
// A small, safe mock replacement for any client-side AI SDK.
// Exports a few friendly helpers so most import patterns won't break.

export async function askAI(prompt: string) {
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
      generate: async (opts: any) => ({ text: `Mock text for: ${opts?.prompt || opts}` }),
    },
    ask: async (p: any) => ({ text: `Mock ask: ${p}` }),
  };
}

// ✅ Add this missing export (Fixes the build error)
export const GoogleGenAI = {
  generateText: async (prompt: string) => ({
    text: `Mock GoogleGenAI response for: ${prompt}`,
  }),
  chat: async (message: string) => ({
    reply: `Mock chat reply for: ${message}`,
  }),
};

// Default export
const defaultExport = {
  ask: (p: any) => askAI(p),
  createClient,
  GoogleGenAI,
};

export default defaultExport;
