/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#fbbf24",
          2: "#7698b3",
          3: "#726e97",
          4: "#7f557d",
          5: "#673c4f",
        },
        secondary: {
          1: "#161616",
          2: "#282828",
          3: "#4d4d4d",
          4: "#6b6b6b",
          5: "#c0c0c0",
          6: "#ebebeb",
        },
      },
      fontFamily: {
        sfPro: ['"SF Pro"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
