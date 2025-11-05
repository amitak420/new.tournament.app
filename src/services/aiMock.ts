// services/aiMock.ts
// Safe mock replacement for client-side AI SDKs.
// Exports default + named exports so all import styles work.

export async function askAI(prompt: string) {
  return {
    text: `Mock reply: ${String(prompt).slice(0, 300)}`,
    raw: { debug: true, prompt: String(prompt) },
  };
}

// createClient() style factory
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

// Named export used by some code
export const GoogleGenAI = {
  ask: (p: any) => askAI(p),
  createClient,
};

// Default export (for `import genai from '@google/genai'` style)
const defaultExport = {
  ask: (p: any) => askAI(p),
  createClient,
};

export default defaultExport;
