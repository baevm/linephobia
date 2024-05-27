import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      certDir: './certs',
    }),
  ],

  server: {
    port: 3000,
  },

  preview: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@app': path.resolve('src/app'),
      '@entities': path.resolve('src/entities'),
      '@features': path.resolve('src/features'),
      '@pages': path.resolve('src/pages'),
      '@shared': path.resolve('src/shared'),
      '@widgets': path.resolve('src/widgets'),
    },
  },
})
