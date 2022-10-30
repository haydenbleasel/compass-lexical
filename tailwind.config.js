/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Newsreader', 'serif'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            em: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontSize: 'calc(1em + 1px)',
            },
            p: {
              marginTop: 0,
              marginBottom: '0.75rem',
            },
            li: {
              margin: '0',
              '&[role="checkbox"]': {
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                outline: 'none',
                marginLeft: '-1.625em',
                '&::before': {
                  content: "''",
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  display: 'block',
                  position: 'relative',
                  border: '1px solid #999',
                  borderRadius: '2px',
                },
                '&[aria-checked="true"]::before': {
                  backgroundColor: '#999',
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
