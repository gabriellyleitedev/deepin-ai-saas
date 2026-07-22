/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ativa por classe manualmente (.dark)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx}", // Caso a pasta de componentes esteja fora de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}