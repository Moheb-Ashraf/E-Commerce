/** @type {import('tailwindcss').Config} */
export default {
  content: ["./html.index", "./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    container:{
      center:"ture"
    },
    extend: {
      container:"1320px",
      colors:{
        primary:
          {
            50:"#ceefce",
            100:"#9dde9d",
            200:"#6cce6c",
            300:"#3bbd3b",
            400:"#23b523",
            500:"#0aad0a",
            600:"#099c09",
            700:"#077907",
            800:"#066806",
            900:"#055705"
          }
      }
    },
  },
  plugins: [],
}

