const baseColor = "#f28919";

const colorPalette = {
  primary: {
    50: "#fef5e2",
    100: "#140f04",
    200: "#facf8c",
    300: "#f8b559",
    400: "#f6a126",
    500: baseColor, // Cor base
    600: "#c06e00",
    700: "#8a4b00",
    800: "#573700",
    900: "#301400",
  },
  // Outras cores conforme necessário
};

const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colorPalette,
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: colorPalette.primary,
          // ... outras cores
        },
      },
      dark: {
        colors: {
          background: "#000000",
          foreground: "#ECEDEE",
          primary: colorPalette.primary,
          // ... outras cores
        },
      },
      mytheme: {
        extend: "dark",
        colors: {
          primary: {
            DEFAULT: "#f8b559",
            foreground: "#000000",
          },
          focus: "#f8b559",
        },
      },
    },
  })],
};