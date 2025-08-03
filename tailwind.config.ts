import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Majestic Tarot Brand Colors
        "majestic-primary": "#2C194F",
        "majestic-text": "#F9EDD6",
        "majestic-hover": "#B3FFAC",
        "majestic-accent-purple": "#7D3FFF",
        "majestic-accent-red": "#DD4444",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        bebas: ["var(--font-bebas)", "cursive"],
      },
      fontSize: {
        h1: ["36px", { lineHeight: "1.2", fontWeight: "200" }],
        h2: ["30px", { lineHeight: "1.3", fontWeight: "200" }],
        h3: ["24px", { lineHeight: "1.4", fontWeight: "200" }],
        h4: ["20px", { lineHeight: "1.4", fontWeight: "200" }],
        h5: ["16px", { lineHeight: "1.5", fontWeight: "200" }],
        h6: ["14px", { lineHeight: "1.5", fontWeight: "200" }],
        body: ["12px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      fontWeight: {
        header: "200",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
