import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages has no rewrites, so give /home-v2 its own copy of the page
 * and send any unknown path to the app through 404.html.
 */
function pagesFallback() {
  let outDir
  return {
    name: 'pages-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      mkdirSync(resolve(outDir, 'home-v2'), { recursive: true })
      copyFileSync(index, resolve(outDir, 'home-v2', 'index.html'))
      copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig(({ command }) => ({
  // Built for https://lakhtar-singh.github.io/portfolio/. `npm run dev` stays at http://localhost:5173/.
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react(), pagesFallback()],
}))
