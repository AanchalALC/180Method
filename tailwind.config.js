/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        /* ------------------------------------------------------------------
           PALETTE — re-weighted.

           v1 used charcoal (#28251A) as the dominant dark surface. It is in
           the brand doc, but it is a warm BROWN-black, and using it for every
           dark section made the whole site read brown. The live site barely
           touches it — it leads with black, forest green and lime.

           So: `ink` (a near-black with a cool green undertone) is now the dark
           surface, `forest` carries the mid-tones, `lime` is the loud accent,
           and `paper` is a clean white rather than a warm sand.

           charcoal + sand are KEPT as tokens because they are brand colours —
           they are simply no longer load-bearing.
        ------------------------------------------------------------------ */
        ink: {
          DEFAULT: '#0B0D0B',
          950: '#040604',
          900: '#0B0D0B',
          800: '#12160F',
          700: '#1B211A',
          600: '#2A322A',
          500: '#3E483D',
        },
        forest: {
          DEFAULT: '#275442',
          950: '#0A1A12',
          900: '#0F2618',
          800: '#173A28',
          700: '#1E4634',
          600: '#275442', // brand: Forest Green
          500: '#356E57',
          400: '#48906F',
          300: '#6FB393',
        },
        lime: {
          DEFAULT: '#DCE576',
          200: '#F1F5C8',
          300: '#E9EFA5',
          400: '#E3EA8D',
          500: '#DCE576', // brand: Lime Green
          600: '#C8D250',
          700: '#A6B133',
          800: '#7C8524',
        },
        aloe: {
          DEFAULT: '#AAB099',
          200: '#DCDFD2',
          300: '#C7CBB8',
          400: '#B8BDA6',
          500: '#AAB099', // brand: Aloe
          600: '#8B927A',
          700: '#6C725C',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F6F8F3',
          200: '#EDF0E8',
          300: '#E0E4DA',
          400: '#CBD0C2',
        },

        /* Brand tokens, retained but deliberately not load-bearing. */
        sand: '#DED9D5',
        charcoal: '#28251A',
      },

      fontFamily: {
        display: ['"Radio Stars"', 'Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Gabriel Sans"', 'Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',
        'fluid-sm': 'clamp(0.875rem, 0.84rem + 0.18vw, 0.9375rem)',
        'fluid-base': 'clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)',
        'fluid-lg': 'clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)',
        'fluid-xl': 'clamp(1.375rem, 1.2rem + 0.85vw, 1.875rem)',
        'fluid-2xl': 'clamp(1.75rem, 1.35rem + 1.9vw, 3rem)',
        'fluid-3xl': 'clamp(2.25rem, 1.5rem + 3.6vw, 4.5rem)',
        'fluid-4xl': 'clamp(2.75rem, 1.5rem + 6.2vw, 6.75rem)',
        'fluid-5xl': 'clamp(3.5rem, 1.2rem + 10.5vw, 10rem)',
      },

      spacing: {
        section: 'clamp(4.5rem, 3rem + 6vw, 9rem)',
        'section-sm': 'clamp(2.5rem, 2rem + 2.5vw, 5rem)',
      },

      borderRadius: { '4xl': '1.75rem', '5xl': '2.5rem' },
      maxWidth: { prose: '66ch' },
      transitionTimingFunction: { brand: 'cubic-bezier(0.16, 1, 0.3, 1)' },

      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        'orbit-spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 70s linear infinite',
        'marquee-fast': 'marquee 24s linear infinite',
        'orbit-spin': 'orbit-spin 26s linear infinite',
      },
    },
  },
  plugins: [],
}
