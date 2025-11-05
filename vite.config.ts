import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Vite Config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // Keep your existing environment key setup
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // ✅ Keep your existing alias
        '@': path.resolve(__dirname, '.'),

        // ✅ Add mock aliases (this line fixes the "API key must be set" crash)
        '@google/genai': path.resolve(__dirname, 'services/aiMock.ts'),
        'genai': path.resolve(__dirname, 'services/aiMock.ts'),
        'gemini': path.resolve(__dirname, 'services/aiMock.ts'),
        '@emergent/genai': path.resolve(__dirname, 'services/aiMock.ts'),
      },
    },
  };
});
