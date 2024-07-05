/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00a9ff",
          "secondary": "#00fca5",
          "accent": "#00a900",
          "neutral": "#130503",
          "base-100": "#fff7fc",
          "info": "#0069be",
          "success": "#008b00",
          "warning": "#facc15",
          "error": "#ff7d93",
        },
      },
    ],
  },
};

