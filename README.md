# blog.valen.icu

A minimalist, file-based MDX blog — the writing & tutorial space for [valen.icu](https://valen.icu).

Built with **React**, **React Router**, **Framer Motion**, **MDX**, and **Tailwind CSS**.

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Writing a New Post

Create a `.mdx` file in `src/content/posts/`. The filename becomes the URL slug.

```
src/content/posts/my-new-article.mdx
→ blog.valen.icu/blog/my-new-article
```

### Required frontmatter

```mdx
---
title: "Your Article Title"
date: "2026-03-01"
excerpt: "A one or two sentence summary shown in cards and meta tags."
tags: ["React", "Tutorial"]
readTime: "5 min read"
---

Your MDX content here...
```

### Optional frontmatter

| Field | Type | Description |
|-------|------|-------------|
| `featured` | `boolean` | Show as featured on homepage |

---

## Custom MDX Components

Use these in any `.mdx` file:

### `<Callout>`

```mdx
<Callout type="tip">
  This is a helpful tip.
</Callout>
```

Types: `info` (default) · `tip` · `warning` · `danger`

### `<Step>`

```mdx
<Step number="1" title="Install dependencies">
  Run `npm install` in your project root.
</Step>
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           ← Top nav with theme toggle + portfolio link
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx      ← Light / dark mode button
│   ├── ArticleCard.jsx      ← Card used in grid layouts
│   ├── FeaturedCard.jsx     ← Large hero card for latest post
│   ├── SearchFilter.jsx     ← Search input + tag filter chips
│   ├── TableOfContents.jsx  ← Auto-extracts headings, sticky sidebar + mobile float
│   ├── ReadingProgress.jsx  ← Thin progress bar at top of article pages
│   └── MDXComponents.jsx    ← Custom components injected into MDX
├── content/
│   └── posts/               ← ✏️ Add your .mdx files here
├── data/
│   └── index.js             ← ✏️ Site config (name, socials, etc.)
├── hooks/
│   ├── useTheme.jsx         ← Theme context + localStorage persistence
│   └── useReadingProgress.js
├── pages/
│   ├── Home.jsx             ← Landing page with hero + featured + recent grid
│   ├── BlogList.jsx         ← /blog — all posts with search & filter
│   ├── ArticlePage.jsx      ← /blog/:slug — full article reader
│   └── NotFound.jsx         ← 404
└── utils/
    └── posts.js             ← getAllPosts(), getPost(), getAllTags(), getAdjacentPosts()
```

---

## Design Tokens

Matches `valen.icu` exactly — same CSS variable names:

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#F2F0EB` | `#111111` |
| `--surface` | `#E8E6E0` | `#1A1A18` |
| `--ink` | `#111111` | `#F2F0EB` |
| `--ink-secondary` | `#4A4845` | `#B5B2AD` |
| `--ink-muted` | `#8A8783` | `#6A6762` |

Dark mode is toggled via the `.dark` class on `<html>`, persisted in `localStorage`.

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder
```

Set your custom domain to `blog.valen.icu` in your DNS provider:
```
CNAME  blog  cname.vercel-dns.com
```

---

## Adding Tags

Tags are extracted automatically from your posts' frontmatter. No configuration needed — just add new tags to `tags: [...]` in your `.mdx` files.

---

## License

Personal use — built for **blog.valen.icu**
