// services/aiMock.js
export async function askAI(prompt) {
  // Simple mock response so the app won't require any real API key in browser
  return { text: `Mock AI reply for: ${String(prompt).slice(0,120)}` };
}
