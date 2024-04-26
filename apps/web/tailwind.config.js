/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        green500: "#124b24",
        green400: "#007324",
        green300: "#188a41",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
