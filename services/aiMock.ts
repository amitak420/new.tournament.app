// services/aiMock.ts
export async function askAI(prompt: string) {
  return {
    text: `Mock AI reply for: ${String(prompt).slice(0, 100)}`,
    raw: { debug: true },
  };
}

export function createClient(_cfg?: any) {
  return {
    generate: async (opts: any) => {
      const prompt = (opts?.prompt || "no prompt").toString();
      return { output: [{ content: `Mock generated text for: ${prompt}` }] };
    },
    text: {
      generate: async (opts: any) => ({
        text: `Mock text for: ${opts?.prompt || opts}`,
      }),
    },
    ask: async (p: any) => ({ text: `Mock ask: ${p}` }),
  };
}

export const GoogleGenAI = {
  generateText: async (prompt: string) => ({
    text: `Mock GoogleGenAI response for: ${prompt}`,
  }),
  chat: async (msg: string) => ({
    reply: `Mock chat reply for: ${msg}`,
  }),
};

export default {
  askAI,
  createClient,
  GoogleGenAI,
};
