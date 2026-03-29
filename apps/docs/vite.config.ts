import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@mahalisunil1\/(.*)$/,
        replacement: path.resolve(__dirname, "../../packages/$1/src")
      }
    ]
  },
  server: {
    fs: {
      allow: [".."]
    },
    watch: {
      usePolling: true,
      interval: 200,
      ignored: ["!**/packages/**"]
    }
  },
  optimizeDeps: {
    exclude: [
      "@mahalisunil1/utils",
      "@mahalisunil1/tokens",
      "@mahalisunil1/animation"
    ]
  }
})

