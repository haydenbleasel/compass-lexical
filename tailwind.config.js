/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
