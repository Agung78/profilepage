import type { Config } from 'tailwindcss';

/* Field-report palette: warm paper, ink, one vermilion accent.
   Text contrast: ink-soft 9:1, mute 4.8:1, flare 5.8:1 on paper;
   paper 15:1 and flare-bright 5.4:1 on ink. */
const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      transitionTimingFunction: { 'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)' },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: { DEFAULT: '#EEE9DE', deep: '#E3DDCE' },
        ink: { DEFAULT: '#17150F', soft: '#3B372E', raised: '#24211A' },
        mute: '#6A645A',
        line: '#CFC8B6',
        flare: { DEFAULT: '#B8341A', bright: '#E8603B' },
      },
    },
  },
  plugins: [],
};
export default config;
