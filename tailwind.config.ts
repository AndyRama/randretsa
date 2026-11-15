import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FDFDFC",
        sand: "#F6F4F1",
        card: "#F9F8F5",
        ink: "#2A2420",
        dark: "#2C2521",
        body: "#6B655F",
        muted: "#8D8780",
        moss: "#5A6B52",
        line: "#E5E1DA",
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', "Georgia", "serif"],
        sans: ['"Work Sans Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
