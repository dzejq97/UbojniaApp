/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'light': '#F3F3F3',
        'dark': '#171D1C',
        'gray': '#808080',
        'primary': '#454ADE',
        'primaryhover': '#4561DE',
        'accent': '#FF8600',
        'accenthover': '#ff9900'
      }
    },
  },
  plugins: [],
}

