module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        line: {
          DEFAULT: "#06C755",
          50: "#46F990",
          100: "#3AF988",
          200: "#21F879",
          300: "#08F86A",
          400: "#07E060",
          500: "#06C755",
          600: "#05AE4A",
          700: "#059540",
          800: "#047D35",
          900: "#03642B",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
