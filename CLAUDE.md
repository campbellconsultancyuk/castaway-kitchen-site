# Castaway Kitchen website: instructions for Claude Code

Client site for Castaway Kitchen (festival street food and private catering, Moreton-in-Marsh, Gloucestershire), built and maintained by Campbell Consultancy (Ben and Lara Harrison). Live at https://castawaykitchen.co.uk. The owner, Scott, is not technical, so anything we build must be dead simple for him.

## Stack and deploy

- Astro 4.16, plain CSS custom properties (see `src/styles/global.css`), GSAP for scroll animation. **No Tailwind.**
- Hosted on Cloudflare Pages. Every push to `main` auto-deploys in about 1–2 minutes.
- Preview locally with `npm run dev` (localhost:4321).
- Run `npm run build` before pushing anything that touches content collections, `config.ts`, or several pages at once. It is not needed for a small copy tweak.

## Hard rules

- **Never upgrade `@astrojs/sitemap`.** It is pinned to 3.1.6 in `package-lock.json`. Newer versions break the Cloudflare build. Do not run `npm update` or `npm install` with upgrades.
- Images live in `public/image-assets/` and are referenced as `/image-assets/name.webp`. Cloudflare is case-sensitive, so filenames must match exactly.
- Map backgrounds use an `<img>` with absolutely-positioned HTML pins. Do not use SVG-inside-SVG (severe performance problems). Pin pulse effects use CSS `box-shadow`.
- On a Mac, Reduce Motion must be OFF or the GSAP animations show their static end state.
- Keep copy short, punchy and warm. Festival, characterful, not corporate. British English.
- Brand: teal `#2a7c6f`, black, white. Circular seagull/wave/sun logo.

## Updating the festival map (do this after every event)

The map lives in `src/components/FestivalRoadmap.astro`. Festival data is written out **twice** and both copies must be edited together:

1. The `festivals` array in the frontmatter (with map coordinates `left` and `top`).
2. The `FESTIVALS` array in the `<script>` at the bottom of the file.

Also update the `nextDates` object in that script (ISO start date per festival id), because it drives the countdown.

Status values are `completed`, `current` or `upcoming`. The "next up" banner and countdown use the first `current` festival, otherwise the first `upcoming` one. The season progress bar counts `completed` entries.

To add a festival: add it to both arrays with the next `num`, add its date to `nextDates`, then update the hard-coded counts and season wording in:
- `src/pages/festivals.astro` (hero text, FAQ answer, meta description)
- `src/pages/index.astro` (the teal festival banner)

Scott's festival status updates come in on Mondays after each event.

## Blog

Posts are markdown files in `src/content/blog/`. Adding a file is all that's needed; the listing page, post template and homepage strip pick it up automatically, newest first.

Front matter (validated by `src/content/config.ts`):

```md
---
title: "Post title"
excerpt: "One or two sentences for the card."
date: 2026-10-01
image: "/image-assets/some-image.webp"
imageAlt: "Descriptive alt text"
tag: "Festival News"
---
```

- `tag` must be one of: `Food`, `Festival News`, `Behind the Scenes`, `Ops & Updates`.
- Add `draft: true` to hold a post back without deleting it.
- Use `##` for subheadings and link internally to `/festivals/`, `/menu/`, `/private-catering/`, `/contact/` and other posts (`/blog/<slug>/`).
- Tone is lighthearted and seasonal. Time festival posts to land just before the event. Avoid heavy political topics.
- Never invent facts about Castaway (menu items, pitch locations, stats, quotes). If unsure, leave it out or flag it for Ben or Scott.
- Posts aimed at restaurant owners (tag `Ops & Updates`) are lead-generation for Campbell Consultancy. They link to https://campbellconsultancy.co.

## Git

- Commit straight to `main` for normal content work; that deploys the site.
- Use `git add .` (festival folder names can contain brackets).
- Never force-push. Never rewrite history on `main`.

## Attribution and ownership

- Footer carries "Site by Campbell Consultancy", and the About page has an "Operational AI & automation by Campbell Consultancy" lockup. Keep both.
- Domain is on Cloudflare (registration still at 123-reg until March 2027). Credentials are in Bitwarden, never in the repo.
