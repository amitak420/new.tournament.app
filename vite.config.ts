import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: { port: 3000, host: "0.0.0.0" },
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY || ""),
      "process.env.GEMINI_API": JSON.stringify(env.GEMINI_API_KEY || "")
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
        // map common client-side AI imports to your safe mock
        "@google/genai": path.resolve(__dirname, "services/aiMock.ts"),
        "emergentintegrations/llm/chat": path.resolve(__dirname, "services/aiMock.ts"),
        "deepseek": path.resolve(__dirname, "services/aiMock.ts"),
      }
    }
  };
});
