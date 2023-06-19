/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'white': '#fff',
      'primary-light': '#fff',
      'primary-dark': '#1E1E1E',
      'secondary-light': '#F2F5F7',
      'secondary-dark': '#4685FF',
      'secondary-darker': '#0D55E0',
      'accent-color': '#FF813B',
      'danger': '#EF4056',
      'danger-lighter': '#FDB7C0',
      'danger-light': '#EF4056',
      'danger-dark': '#CE1A30',
      'warning': '#FF8571',
      'success': '#5C8001',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

