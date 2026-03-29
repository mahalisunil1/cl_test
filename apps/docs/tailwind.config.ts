import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/**/*.{ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
