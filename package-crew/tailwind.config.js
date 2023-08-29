/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: [
          "15px",
          {
            lineHeight: "normal",
            fontWeight: "400",
          },
        ],
        lg: [
          "17px",
          {
            lineHeight: "normal",
            fontWeight: "400",
          },
        ],
        xl: [
          "20px",
          {
            lineHeight: "normal",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        mainColor: "#2094F3",
      },
    },
  },
  plugins: [require("daisyui")],
};
