/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
