/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Forum', 'cursive'],
        body: ['Montserrat', 'serif'],
        special: ['Rufina', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
