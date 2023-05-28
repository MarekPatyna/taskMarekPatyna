/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000853",
        second: "#761BE4",
        drop: "#898DA9",
        hoverIn: "#EEDFFF"
      },
      backgroundColor: {
        primary: "#761BE4",
        inputs: "#FAF9FA",
        error: "#F8D3D3",
        button: "#6A19CD"
      }
    },
  },
  plugins: [],
}

