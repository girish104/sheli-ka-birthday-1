import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        heading: ["'Cinzel'", "serif"],           // Regal, wizarding-world feel
        body: ["'Crimson Text'", "serif"],         // Old-world, aged manuscript feel
        hindi: ["'Tiro Devanagari Hindi'", "serif"],
      },
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

        // ── Dark Potterhead Palette ──────────────────────────────────────────

        // Aged gold — primary accent throughout the dark theme
        gold: {
          DEFAULT: "#FFD700",
          dim: "#C0A060",
          dark: "#8B6914",
          muted: "#4a3a20",
        },

        // Gryffindor — deep blood red + tarnished gold
        gryffindor: {
          DEFAULT: "#740001",
          dark: "#4a0000",
          gold: "#D4AF37",
          "gold-dim": "#A07820",
        },

        // Slytherin — dark forest green + cold silver
        slytherin: {
          DEFAULT: "#1a472a",
          dark: "#0d2a18",
          silver: "#8a9a8a",
          "silver-dim": "#4a5a4a",
        },

        // Ravenclaw — midnight navy + aged bronze
        ravenclaw: {
          DEFAULT: "#0e1a40",
          dark: "#07102a",
          bronze: "#b9832e",
          "bronze-dim": "#7a5520",
        },

        // Hufflepuff — dark amber + near-black
        hufflepuff: {
          DEFAULT: "#c9a227",
          dark: "#8a6e18",
          black: "#1a1200",
        },

        // Dark atmospheric backgrounds
        void: "#050008",          // Deepest background
        "dark-stone": "#0a0812", // Card surfaces
        "dark-manor": "#0f0a1a", // Mid-level surfaces
        "dark-shadow": "#1a1228", // Elevated surfaces

        // Magical accent colors
        "magic-purple": "#6b21a8",
        "magic-purple-glow": "#9333ea",
        "spell-blue": "#1e3a8a",
        "dark-fire": "#7c2d12",

        // Neutrals for dark theme text
        "parchment-dark": "#D4B896",   // Body text on dark
        "parchment-dim": "#9a8060",    // Muted text
        "parchment-faint": "#4a3a28",  // Disabled / subtle

        // Legacy aliases (keep for backward compat with existing components)
        magenta: "hsl(var(--magenta))",
        "magenta-glow": "hsl(var(--magenta-glow))",
        saffron: "hsl(var(--saffron))",
        "festive-yellow": "hsl(var(--festive-yellow))",
        "desi-green": "hsl(var(--desi-green))",

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
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
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // Dark magic pulsing glow — gold/purple instead of magenta
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.2), 0 0 40px rgba(107, 33, 168, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(107, 33, 168, 0.3)" },
        },
        // Candle flicker
        "candle-flicker": {
          "0%, 100%": { opacity: "0.9", transform: "scaleY(1)" },
          "25%": { opacity: "1", transform: "scaleY(1.05)" },
          "75%": { opacity: "0.75", transform: "scaleY(0.96)" },
        },
        // Gold shimmer sweep
        "gold-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        // Magical particle float
        "magic-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "translateY(-20px) rotate(180deg)", opacity: "1" },
        },
        // Reveal from below
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Card ambient glow breath
        "glow-breath": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,215,0,0.15), 0 0 60px rgba(139,105,20,0.08)" },
          "50%": { boxShadow: "0 0 40px rgba(255,215,0,0.35), 0 0 100px rgba(139,105,20,0.2)" },
        },
        // Text glow pulse
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(255,215,0,0.6), 0 0 20px rgba(184,134,11,0.3)" },
          "50%": { textShadow: "0 0 20px rgba(255,215,0,1), 0 0 40px rgba(184,134,11,0.6), 0 0 60px rgba(139,105,20,0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "candle-flicker": "candle-flicker 0.8s ease-in-out infinite",
        "gold-shimmer": "gold-shimmer 4s linear infinite",
        "magic-float": "magic-float 6s ease-in-out infinite",
        "reveal-up": "reveal-up 0.8s ease-out forwards",
        "glow-breath": "glow-breath 3s ease-in-out infinite",
        "text-glow": "text-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;