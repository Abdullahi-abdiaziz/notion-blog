import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "monospace"],
        geist: ["var(--geist-mono)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "custom-pattern":
          "repeating-linear-gradient(45deg, #00ff0010 0, #00ff0010 1px, #e5e5f710 0, #e5e5f7 10%)",
        "custom-svg":
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1006%26quot%3b)' fill='none'%3e%3cpath d='M539.11 71.69a0.97 0.97 0 1 0 1.78-0.77z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M76.12 5.6 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M1009.81 543.71 a23.06 23.06 0 1 0 46.12 0 a23.06 23.06 0 1 0 -46.12 0z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M237.23 351.18L285.83 351.18L285.83 351.94L237.23 351.94z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M1189.93 282.19 a29.96 29.96 0 1 0 59.92 0 a29.96 29.96 0 1 0 -59.92 0z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M210.01 186 a36.03 36.03 0 1 0 72.06 0 a36.03 36.03 0 1 0 -72.06 0z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M881.11 268.28 a37.36 37.36 0 1 0 74.72 0 a37.36 37.36 0 1 0 -74.72 0z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M943.21 210.38a44.86 44.86 0 1 0 38.8-80.89z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M233.65 162.16L275.07 162.16L275.07 203.58L233.65 203.58z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M558.31 184.22 a50.8 50.8 0 1 0 101.6 0 a50.8 50.8 0 1 0 -101.6 0z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M236.62 432.05L286.11 432.05L286.11 481.54L236.62 481.54z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M1212.25 311.8L1239.27 311.8L1239.27 326.63L1212.25 326.63z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M543.27 285.13a46.78 46.78 0 1 0 30.9-88.31z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M1319.08 37.3 a41.9 41.9 0 1 0 83.8 0 a41.9 41.9 0 1 0 -83.8 0z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M107.11 399.16L108.41 399.16L108.41 439.32L107.11 439.32z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M99.01 520.04L154.45 520.04L154.45 575.48L99.01 575.48z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M440.52 342.13L486.94 342.13L486.94 388.03L440.52 388.03z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M368.76 242.67a27.43 27.43 0 1 0-19.25 51.37z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M1260.54 98.59 a43.72 43.72 0 1 0 87.44 0 a43.72 43.72 0 1 0 -87.44 0z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M144.44 149.16a44.33 44.33 0 1 0-34.72 81.58z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M1167.5 24.8 a38.11 38.11 0 1 0 76.22 0 a38.11 38.11 0 1 0 -76.22 0z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M482.36 185.45a25.67 25.67 0 1 0 5.29 51.07z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M85.25 143.59L121.42 143.59L121.42 179.76L85.25 179.76z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M831.66 32.6L876.34 32.6L876.34 77.28L831.66 77.28z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M541.97 153.44L584.74 153.44L584.74 196.21L541.97 196.21z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M944.75 457.42L972.78 457.42L972.78 485.45L944.75 485.45z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M675.05 363.42L694.6 363.42L694.6 382.97L675.05 382.97z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M1087.45 363.66 a16.46 16.46 0 1 0 32.92 0 a16.46 16.46 0 1 0 -32.92 0z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M857.73 211.44a9.27 9.27 0 1 0 8.69 16.38z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M36.05 525.78 a38.89 38.89 0 1 0 77.78 0 a38.89 38.89 0 1 0 -77.78 0z' fill='%23e73635'%3e%3c/path%3e%3c/g%3e%3c/svg%3e\")",
      },

      backgroundSize: {
        "10px-10px": "15px 15px",
        "5px-5px": "7px 7px",
        "0px-0px": "0px 0px",
      },
      backgroundPosition: {
        "top-left": "top left",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("daisyui"),
  ],
};
export default config;
