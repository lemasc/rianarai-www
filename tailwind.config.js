module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        line: {
          DEFAULT: "#06C755",
          50: "#89FBB8",
          100: "#75FBAC",
          200: "#4EFA94",
          300: "#26F87C",
          400: "#07EF66",
          500: "#06C755",
          600: "#04913E",
          700: "#035A26",
          800: "#01240F",
          900: "#000000",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
