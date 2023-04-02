/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  variants: {
    extend: {
      scrollbar: ["rounded", "dark"],
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
