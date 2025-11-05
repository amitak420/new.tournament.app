import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // map any problematic client AI SDK import to our local mock
      "@google/genai": path.resolve(__dirname, "services/aiMock.ts"),
      // if code imports firebase directly in a client-only way and it breaks builds, map it too:
      "firebase/app": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/auth": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/database": path.resolve(__dirname, "services/aiMock.ts"),
      "@": path.resolve(__dirname, "."),
    },
  },
  build: {
    outDir: "dist",
  },
});
