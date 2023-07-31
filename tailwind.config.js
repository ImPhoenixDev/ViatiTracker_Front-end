/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      height: {
        screen: [`100vh /* fallback for Opera, IE and etc. */`, `100dvh`],
      },
      fonts: {
        sans: [`Manrope`, `system-ui`, `sans-serif`],
      },
      gridTemplateRows: {
        layout: `1fr 50px`,
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
