/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cavanas: "#12101C",
        surface: "#1C1830",
        "surface-hover": "#241F3D",
        edge: "#332C54",
        violet: {
          DEFAULT: "#7C6CFF",
          dim: "#5B4DC4",
        },
        gold: {
          DEFAULT: "#FFC53D",
          dim: "#D9A62E",
        },
        mint: "#3ECF8E",
        coral: "#FF5C7A",
        ink: "#F4F2FF",
        muted: "#9C93BE",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "level-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.25s ease-out",
        "level-pop": "level-pop 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
