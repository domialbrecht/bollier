/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#fafaf9',
        secondary: '#171717',
      },
      fontFamily: {
        sans: ['Forum', 'cursive'],
        body: ['Montserrat', 'serif'],
        special: ['Rufina', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
