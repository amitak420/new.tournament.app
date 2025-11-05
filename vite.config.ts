import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@google/genai": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/app": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/auth": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/database": path.resolve(__dirname, "services/aiMock.ts"),
      "@/": path.resolve(__dirname, "."),
    },
  },
  build: {
    outDir: "dist",
  },
});
