import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const frontendRoot = fileURLToPath(new URL('.', import.meta.url))
  const env = loadEnv(mode, frontendRoot, 'VITE_')
  const codespaceName = env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
  }
})
