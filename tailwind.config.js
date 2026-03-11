export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D0BB95",
        "background-light": "#f7f7f6",
        "background-dark": "#1d1a15"
      },
      fontFamily: {
        display: ["Inter"]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      }
    }
  }
}