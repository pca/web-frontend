module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: "#FFD329",
        blue: "#468FCC",
        red: "#EF4438",
        dark: "#222222",
        light: "#F8F8F8",
        text: "#303030",
        gray: "#EEEEEE",
      },
      fontFamily: {
        effra: "Effra, sans-serif",
        effraMd: "Effra Medium, sans-serif",
      },
      borderWidth: {
        bar: "40px",
      },
      fontSize: {
        xs: [".75rem", { lineHeight: "1rem" }],
        sm: [".875rem", { lineHeight: "1.25rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        subtitle: ["1.5rem", { lineHeight: "1.75rem" }],
        h4: ["2rem", { lineHeight: "2.4rem" }],
        h3: ["3rem", { lineHeight: "3rem" }],
        h2: ["3.5rem", { lineHeight: "4.2rem" }],
        h1: ["4rem", { lineHeight: "4.8rem" }],
      },
      spacing: {
        70: "70px",
      },
      maxWidth: {
        1140: "1140px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
