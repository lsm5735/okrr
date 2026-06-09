/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Okrr 5-Color Pantone Palette
        // cloud uses a CSS variable so palette-picker can swap it at runtime
        okrr: {
          cloud:  'rgb(var(--palette-bg-rgb, 239 233 225) / <alpha-value>)',
          nimbus: '#C8CBCF', // Nimbus Cloud — border/secondary
          rose:   '#EDD5D8', // Raindrops on Roses — accent pink
          ice:    '#BFD0E0', // Ice Melt — accent blue
          aqua:   '#B5C4B5', // Almost Aqua — accent sage
        },
        // Dark mode surfaces
        dark: {
          bg:      '#1A1917',
          surface: '#252320',
          border:  '#3A3835',
          muted:   '#6B6762',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1600px',
      },
    },
  },
  plugins: [],
}
