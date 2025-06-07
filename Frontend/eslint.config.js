/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["'Orbitron'", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui"] // ejemplo de fuente neutra
      },
      colors: {
        "siat-blue": "#00BFFF",   // azul claro para botones
        "siat-light": "#E5F6FF",  // fondo muy claro
        "siat-gray": "#F8FAFC",   // gris muy claro
        "siat-darkgray": "#374151" // para textos secundarios
      }
    }
  },
  plugins: []
};
