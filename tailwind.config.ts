import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { bg:"#0b0c10", card:"#111216", card2:"#16181d", brand:"#6d28d9", brand2:"#0ea5e9" } } },
  plugins: []
} satisfies Config;
