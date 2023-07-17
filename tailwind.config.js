/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      fonts: {
        sans: [`Manrope`, `system-ui`, `sans-serif`],
      },
      colors: {
        dark: `#464646`,
        lightGray: `#A1A7B0`,
        primary: `#4C9FC1`,
      },
    },
    variants: {},
  },
  plugins: [],
}
