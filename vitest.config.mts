import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
        reporter: ['text', 'json', 'html'], // Generates coverage reports
    },
    setupFiles: ["./setupTests.ts"],
    exclude: ["node_modules", "dist", ".next", ".vercel"], 
  },
})