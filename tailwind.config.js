/* eslint-env node */
/* global module, require */
module.exports = {
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
        },
        abyss: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          'primary': '#1e293b',
          'secondary': '#64748b',
          'accent': '#0ea5e9',
          'neutral': '#334155',
          'base-100': '#0f172a',
          'info': '#38bdf8',
          'success': '#22d3ee',
          'warning': '#fbbf24',
          'error': '#ef4444',
        },
      }
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
}; 