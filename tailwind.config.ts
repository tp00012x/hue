export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "var(--text-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#062A30",
        disabled: "#95958E",
        error: "#D50000",
      },
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
      fontFamily: {
        body: ["var(--body-font-family)", "sans-serif"],
        apercu: ["Apercu Pro", "sans-serif"],
        cheltenham: ["ITC Cheltenham Std", "serif"],
      },
      fontSize: {
        "person-name": "var(--person-name-font-size)",
        "review-text": "var(--review-text-font-size)",
        "main-header": "var(--main-header-font-size)",
      },
      fontWeight: {
        "person-name": "var(--person-name-font-weight)",
        "review-text": "var(--review-text-font-weight)",
        "main-header": "var(--main-header-font-weight)",
      },
    },
  },
  plugins: [],
} satisfies Config;
