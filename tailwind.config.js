/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:  "#2D5A3D",
        "primary-light": "#3D7A53",
        accent:   "#F5A623",
        "app-bg": "#F5F5F5",
        danger:   "#EF4444",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
