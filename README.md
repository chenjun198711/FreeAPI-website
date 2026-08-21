# FreeAPI Hub

A modern, fast, and SEO-optimized directory of 1,400+ free public APIs across 50+ categories. Built with Next.js 16, React 19, and Tailwind CSS 4 as a fully static site (no backend required).

**Live site:** [https://freeapihub.cc](https://freeapihub.cc)

## Features

- **1,400+ APIs** — Browse a curated directory of free public APIs with verified metadata (auth type, HTTPS, CORS).
- **Powerful Search & Filter** — Search by name, description, category, or URL. Filter by authentication type, HTTPS support, and CORS compatibility.
- **API Detail Pages** — Each API has a dedicated page with description, auth requirements, HTTPS/CORS badges, direct documentation links, and ready-to-use code examples (JavaScript & Python).
- **Integration Guides** — Step-by-step guides covering authentication setup, security best practices, and implementation tips.
- **50+ Categories** — APIs organized into categories like Animals, Finance, Weather, Machine Learning, and more.
- **Blog** — Developer-focused articles on API integration, best practices, and tutorials.
- **Bookmarks** — Save APIs for later reference (stored locally in the browser).
- **Dark Mode** — Full dark/light theme support with system preference detection.
- **SEO Optimized** — Auto-generated sitemap.xml, robots.txt, JSON-LD structured data, Open Graph tags, and semantic HTML.
- **AdSense Ready** — Google AdSense integration with Consent Mode v2 compliance (GDPR/EEA).
- **Static Export** — Outputs pure HTML/CSS/JS. Deploy to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages, etc.).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Static Export) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Language | TypeScript 5 |
| Icons | lucide-react |
| Theming | next-themes |
| Fonts | Geist & Geist Mono (next/font) |

## Project Structure

```
api-website/
├── data/
│   ├── apis.json            # API directory data (1,400+ entries)
│   └── categories.json      # Category metadata
├── public/
│   ├── ads.txt
│   ├── robots.txt
│   └── _headers             # Cloudflare Pages headers
├── scripts/
│   ├── generate-sitemap.ts  # Post-build sitemap generator
│   └── parse-readme.ts
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── search/          # API search & filter
│   │   ├── categories/      # All categories
│   │   ├── category/[slug]/ # Category listing page
│   │   ├── api/[id]/        # API detail page
│   │   ├── popular/         # Ranked popular APIs
│   │   ├── blog/            # Blog index & articles
│   │   ├── bookmarks/       # Saved APIs
│   │   ├── faq/             # FAQ page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── layout.tsx       # Root layout (SEO, ads, consent)
│   │   └── globals.css
│   ├── components/           # Reusable UI components
│   ├── lib/                 # Data access & business logic
│   └── types/               # TypeScript type definitions
├── next.config.ts           # Static export config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+)
- npm 10+

### Installation

```bash
git clone https://github.com/chenjun198711/FreeAPI-website.git
cd FreeAPI-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This runs `next build` (static export) and then generates `sitemap.xml` in the `out/` directory. The entire static site is output to `out/`.

### Deploy

The `out/` directory can be deployed to any static hosting provider:

- **Cloudflare Pages** — Connect the repo, set build command to `npm run build`, output directory to `out`.
- **Vercel** — Import the repo, framework preset "Next.js", output directory `out`.
- **Netlify** — Build command `npm run build`, publish directory `out`.
- **GitHub Pages** — Push `out/` contents to `gh-pages` branch.

## Data Format

APIs are stored in `data/apis.json`:

```json
{
  "id": "cat-facts",
  "name": "Cat Facts",
  "description": "Daily cat facts",
  "auth": "No",
  "https": "Yes",
  "cors": "No",
  "url": "https://catfact.ninja",
  "category": "Animals",
  "categorySlug": "animals",
  "sponsored": false
}
```

Categories are stored in `data/categories.json`:

```json
{
  "slug": "animals",
  "name": "Animals",
  "icon": "Cat",
  "count": 18
}
```

## License

This project is for personal use. API data is sourced from the public [public-apis](https://github.com/public-apis/public-apis) repository.
