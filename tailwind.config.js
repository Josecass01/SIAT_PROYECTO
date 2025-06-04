// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["'Orbitron'", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "siat-blue": "#00BFFF",
        "siat-light": "#E5F6FF",
        "siat-gray": "#F8FAFC",
        "siat-darkgray": "#374151",
      },
    },
  },
  plugins: [
    // Si quieres usar line-clamp, descomenta la siguiente línea:
    // require("@tailwindcss/line-clamp"),
  ],
};
