import type { Config } from "tailwindcss"

const config = {
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
        // Brand Colors from Style Guide
        "majestic-primary": "#2C194F",
        "majestic-text": "#F9EDD6",
        "majestic-hover": "#B3FFAC",
        "majestic-accent-red": "#DD4444",
        "majestic-accent-purple": "#7D3FFF",

        // Shadcn Colors
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        seaweed: ["var(--font-seaweed)", "cursive"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Style Guide Typography
        h1: ["36px", { lineHeight: "1.2", fontWeight: "200" }],
        h2: ["30px", { lineHeight: "1.2", fontWeight: "200" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "200" }],
        h4: ["20px", { lineHeight: "1.3", fontWeight: "200" }],
        h5: ["18px", { lineHeight: "1.4", fontWeight: "200" }],
        h6: ["14px", { lineHeight: "1.4", fontWeight: "200" }],
        p: ["12px", { lineHeight: "1.5", fontWeight: "400" }],

        // Standard sizes
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      fontWeight: {
        // Style Guide Header Weight
        header: "200",
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
        header: "0.02em",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        constellation: "constellation 4s ease-in-out infinite",
        "star-twinkle": "star-twinkle 2s ease-in-out infinite",
        "star-orbit": "star-orbit 4s linear infinite",
        "star-pulse": "star-pulse 2.5s ease-in-out infinite",
        "star-float": "star-float 3s ease-in-out infinite",
        "star-shimmer": "star-shimmer 2s linear infinite",
        shimmer: "shimmer 2s linear infinite",
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
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInRight: {
          from: {
            opacity: "0",
            transform: "translateX(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(0.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)",
          },
        },
        constellation: {
          "0%": {
            opacity: "0.2",
          },
          "50%": {
            opacity: "0.8",
          },
          "100%": {
            opacity: "0.2",
          },
        },
        "star-twinkle": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(0.8) rotate(0deg)",
          },
          "25%": {
            opacity: "0.8",
            transform: "scale(1.1) rotate(90deg)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2) rotate(180deg)",
          },
          "75%": {
            opacity: "0.6",
            transform: "scale(0.9) rotate(270deg)",
          },
        },
        "star-orbit": {
          "0%": {
            transform: "rotate(0deg) translateX(20px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(20px) rotate(-360deg)",
          },
        },
        "star-pulse": {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(0.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.3)",
          },
        },
        "star-float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(-8px) rotate(120deg)",
          },
          "66%": {
            transform: "translateY(4px) rotate(240deg)",
          },
        },
        "star-shimmer": {
          "0%": {
            "background-position": "-100% 0",
          },
          "100%": {
            "background-position": "100% 0",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "-200px 0",
          },
          "100%": {
            "background-position": "calc(200px + 100%) 0",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(44, 25, 79, 0.1)",
        "glass-strong": "0 12px 40px rgba(44, 25, 79, 0.15)",
        glow: "0 0 30px rgba(125, 63, 255, 0.3)",
        "glow-green": "0 0 30px rgba(179, 255, 172, 0.3)",
        "glow-red": "0 0 30px rgba(221, 68, 68, 0.3)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2C194F, #7D3FFF)",
        "gradient-accent": "linear-gradient(135deg, #7D3FFF, #B3FFAC)",
        "gradient-mystical": "linear-gradient(135deg, #2C194F, #7D3FFF, #DD4444)",
        shimmer: "linear-gradient(90deg, transparent, rgba(179, 255, 172, 0.2), transparent)",
      },
      screens: {
        xs: "475px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
