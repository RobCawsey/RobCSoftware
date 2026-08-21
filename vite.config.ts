import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Root locally and on hosts that serve from a root domain (Netlify, Vercel). GitHub Pages
  // project sites serve from /<repo-name>/ instead, so the deploy workflow overrides this.
  base: process.env.SITE_BASE_PATH || '/',
})
