/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        border: 'var(--border-color)',
        ink: 'var(--ink)',
        'ink-secondary': 'var(--ink-secondary)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--ink)',
            a: { color: 'var(--ink)', textDecoration: 'underline' },
            h1: { color: 'var(--ink)' },
            h2: { color: 'var(--ink)' },
            h3: { color: 'var(--ink)' },
            code: { color: 'var(--ink)' },
            blockquote: { color: 'var(--ink-secondary)', borderLeftColor: 'var(--ink)' },
          },
        },
      },
    },
  },
  plugins: [],
}
