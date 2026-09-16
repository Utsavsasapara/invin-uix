import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Don't pre-bundle the linked library so source-level icon imports resolve
    // against the real package graph at build time.
    exclude: ['invin-uix'],
    // Pre-bundle heavy dependencies to avoid reload on first lazy-load
    include: [
      'recharts',
      'react-remove-scroll',
      '@phosphor-icons/react',
      '@xyflow/react',
    ],
  },
  server: {
    fs: {
      allow: ['.', '../../Invin-ui/invin-ui-poc'],
    },
  },
})
