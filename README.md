# Edwin — Interactive 3D Portfolio

A Next.js portfolio with a physics-driven hanging ID, flexible 3D lanyard, and draggable badge. The previous HTML portfolio is backed up at `/original-portfolio.html`.

## Local development

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open http://localhost:3000.

## Deploy to Vercel

Upload the **contents** of this project folder to your GitHub repository. Vercel detects Next.js automatically. Commit changes to the branch connected to your existing Vercel project. Keep a backup branch first. Do not upload only the `index.html` file.

## Customize

- `app/page.tsx`: text, links, and page sections.
- `app/globals.css`: responsive appearance.
- `components/HangingCard.tsx`: 3D badge and physics.
- `public/edwin.jpg`: original portrait extracted from the previous portfolio.
- `public/original-portfolio.html`: unmodified previous portfolio backup.

The badge is a new implementation inspired by the linked 3D_CARD demo; it does not copy its original source. For a production website, replace the placeholder LinkedIn link with your actual contact URL.
