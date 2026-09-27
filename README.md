# Neighborhood Listing Platform

An accessible, responsive interface for discovering neighborhood homes and
the local businesses that support the community.

## Component hierarchy

```text
Home page
├── Page header
├── SearchFilters
├── Listing section
│   └── PropertyCard (rendered from sample data)
└── SponsorBanner
```

The page owns the sample data and layout. Each child component receives typed
props, so the same cards, filters, and sponsor banner can be reused elsewhere.

## Run the project

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Verification commands

```bash
npm run lint
npm run build
```

Manual accessibility and responsive checks are documented in
[`docs/accessibility-test-notes.md`](docs/accessibility-test-notes.md).

AI review evidence is documented in [`docs/ai-log.md`](docs/ai-log.md).

## Live deployment

[View the Neighborhood Listing Platform](https://neighborhood-listing-platform-lake.vercel.app/)

## Technology stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- npm
- Git and GitHub
- Vercel
