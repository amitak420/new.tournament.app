// services/aiMock.ts
export async function askAI(prompt: string) {
  return { text: `Mock: ${String(prompt).slice(0,120)}` };
}
export function createClient() {
  return {
    generate: async (opts:any) => ({ output: [{ content: `Mock for: ${opts?.prompt||opts}`}] })
  };
}
export default { askAI, createClient };
