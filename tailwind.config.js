/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "16px",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1031px",
        },
      },
      colors: {
        primary: "#062A30",
        disabled: "#95958E",
        error: "#D50000",
      },
      fontFamily: {
        apercu: ["Apercu Pro", "sans-serif"],
        cheltenham: ["ITC Cheltenham Std", "serif"],
      },
    },
  },
  plugins: [],
};
