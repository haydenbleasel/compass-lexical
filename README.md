# Compass

A simple, ephemeral notes app, built on [Next.js](https://nextjs.org/) and [Tailwind](https://tailwindcss.com/).

## Contributing

Clone the repo, then just run `yarn dev`. It'll sort everything out for you. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

Make sure you create an `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_FIREBASE_APIKEY=""
NEXT_PUBLIC_FIREBASE_PROJECTID=""
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=""
NEXT_PUBLIC_FIREBASE_APPID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENTID=""
NEXT_PUBLIC_RECAPTCHA_SITEKEY=""
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## To Do List

- Account management
  - Delete account functionality
- Code blocks
  - Markdown shortcut
  - Syntax highlighting
- Divider
  - Markdown shortcut
