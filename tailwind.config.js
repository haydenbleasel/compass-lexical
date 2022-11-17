/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
            ul: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
              ul: {
                marginTop: 0,
                marginBottom: 0,
              },
            },
            a: {
              cursor: 'pointer',
            },
            li: {
              margin: '0',
              listStyle: 'none',
              '&[dir="ltr"]': {
                listStyle: 'inherit',
              },
              '&[role="checkbox"]': {
                listStyle: 'none',
                outline: 'none',
                marginLeft: '-1.625em',
                position: 'relative',
                paddingLeft: '1.5em',
                '&::before': {
                  position: 'absolute',
                  top: '6px',
                  left: 0,
                  content: "''",
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  display: 'block',
                  border: '1px solid #999',
                  borderRadius: '2px',
                },
                '&[aria-checked="true"]': {
                  textDecoration: 'line-through',
                },
                '&[aria-checked="true"]::before': {
                  borderColor: 'transparent',
                  background: `${theme(
                    'colors.zinc.800'
                  )} url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="%23FFF" stroke-width="2" d="M3 8l3 3 6-6"/></svg>')`,
                },
                '& + :not([role])': {
                  paddingLeft: 0,
                  listStyle: 'none',
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
