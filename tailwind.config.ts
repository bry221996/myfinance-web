import type { Config } from 'tailwindcss'
import tailwindcssForm from '@tailwindcss/forms'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#22A2BF',
          'shade-1': 'rgb(0, 15, 37)',
          'shade-2': 'rgb(34, 162, 191)',
          'shade-3': 'rgb(34, 162, 191)',
          'shade-4': 'rgb(34, 162, 191)',
        },
        dark: {
          DEFAULT: '#002034',
          '900': 'rgba(0, 15, 37, 0.30)',
          '800': 'rgba(0, 32, 52, 0.70)',
          '700': 'rgba(0, 32, 52, 0.40)',
          '600': 'rgba(0, 32, 52, 0.30)',
          '500': 'rgba(0, 32, 52, 0.10)',
          '400': 'rgba(0, 32, 52, 0.05)',
        },
        info: '#0C87F9',
        success: '#2DC659',
        warning: '#FFB600',
        error: '#FF3232',
      },
    },
  },
  plugins: [tailwindcssForm],
}
export default config

// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   content: ['./src/**/*.js'],
//   darkMode: 'media',
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Nunito', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   variants: {
//     extend: {
//       opacity: ['disabled'],
//     },
//   },
//   plugins: [require('@tailwindcss/forms')],
// }
