/** @type {import('tailwindcss').Config} */

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px', // Define a custom 3xl breakpoint at 1920px
      },
      fontFamily: {
        'afacad': ['Afacad', 'sans-serif'],
        'fraunces': ['Fraunces', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Modified fontSize configuration to avoid recursion
      fontSize: {
        // Define your xl variants directly instead of using theme('fontSize')
        'xl:xs': ['calc(0.75rem + 2px)', { lineHeight: '1rem' }],
        'xl:sm': ['calc(0.875rem + 2px)', { lineHeight: '1.25rem' }],
        'xl:base': ['calc(1rem + 2px)', { lineHeight: '1.5rem' }],
        'xl:lg': ['calc(1.125rem + 2px)', { lineHeight: '1.75rem' }],
        'xl:xl': ['calc(1.25rem + 2px)', { lineHeight: '1.75rem' }],
        'xl:2xl': ['calc(1.5rem + 2px)', { lineHeight: '2rem' }],
        'xl:3xl': ['calc(1.875rem + 2px)', { lineHeight: '2.25rem' }],
        'xl:4xl': ['calc(2.25rem + 2px)', { lineHeight: '2.5rem' }],
        'xl:5xl': ['calc(3rem + 2px)', { lineHeight: '1' }],
        'xl:6xl': ['calc(3.75rem + 2px)', { lineHeight: '1' }],
        'xl:7xl': ['calc(4.5rem + 2px)', { lineHeight: '1' }],
        'xl:8xl': ['calc(6rem + 2px)', { lineHeight: '1' }],
        'xl:9xl': ['calc(8rem + 2px)', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      // Get the 3xl breakpoint value
      const screens = theme('screens', {})
      const threeXlBreakpoint = screens['3xl'] || '1920px'
      
      addComponents({
        [`@media (min-width: ${threeXlBreakpoint})`]: {
          'html': {
            fontSize: '125%', // Increases base font size by 12.5% on 3xl screens and above
          },
        },
      })
    }),
  ],
};