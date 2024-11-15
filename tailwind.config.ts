import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
      backgroundImage: {
        "hero-background": "url('/bg-lamp-2.jpg')",
      },
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
