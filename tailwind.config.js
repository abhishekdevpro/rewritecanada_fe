/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
      colors: {
        mainColor: "#488877",
        lightColor: "#4888771A",
        mainsecondColor: "#CB363B",
      },
    },
  },
  plugins: [],
};
