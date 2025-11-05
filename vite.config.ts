import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map problematic client-side SDK imports to our safe mock
      "@google/genai": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/app": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/auth": path.resolve(__dirname, "services/aiMock.ts"),
      "firebase/database": path.resolve(__dirname, "services/aiMock.ts"),
      // project root alias
      "@": path.resolve(__dirname, "."),
    },
  },
  build: {
    outDir: "dist",
  },
});
