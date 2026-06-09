# Castaway Kitchen — Website

**Live URL:** https://castaway-kitchen-site.pages.dev  
**Domain (pending):** https://castawaykitchen.co.uk  
**Repo:** campbellconsultancyuk/castaway-kitchen-site  
**Managed by:** Campbell Consultancy (dev@campbellconsultancy.co)  
**Stack:** Astro · Cloudflare Pages · GitHub

---

## Pages

| Page | File | Status |
|---|---|---|
| Home | `src/pages/index.astro` | ✅ Skeleton built |
| Food & Menu | `src/pages/menu.astro` | ✅ Skeleton built |
| Festivals | `src/pages/festivals.astro` | ✅ Skeleton built |
| Private Catering | `src/pages/private-catering.astro` | ✅ Skeleton built |
| Gallery | `src/pages/gallery.astro` | ✅ Skeleton built |
| Contact | `src/pages/contact.astro` | ✅ Skeleton built |
| 404 | `src/pages/404.astro` | ✅ Built |
| Thank You | `src/pages/thanks.astro` | ✅ Built |

---

## Assets pending from Scott

- [ ] Logo SVG (true vector — current file is Canva raster export)
- [ ] Festival photos (for gallery + hero)
- [ ] Confirmed 2026 festival dates
- [ ] Menu copy with real prices
- [ ] Private catering details (guest capacities, pricing)
- [ ] Email address confirmation (placeholder: hello@castawaykitchen.co.uk)
- [ ] Social media handles (Instagram, Facebook)

---

## Where to swap content

All placeholder content is clearly marked in the code with comments or `TBC` flags.

**Menu prices/items:** `src/pages/menu.astro` — update the `menuSections` array at the top  
**Festival dates:** `src/pages/festivals.astro` — update the `festivals2026` array at the top  
**Email address:** `src/components/Footer.astro` + `src/pages/contact.astro`  
**Social handles:** `src/components/Footer.astro` + `src/pages/contact.astro` + `src/pages/gallery.astro`  
**Photos:** Replace placeholder tiles in `src/pages/gallery.astro` and `src/pages/index.astro` with `<img>` tags pointing to `/public/` assets

---

## Dev commands

```bash
npm install
npm run dev      # localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview build locally
```

---

## Deployment

Cloudflare Pages — connected to GitHub. Push to `main` → auto-deploy.

Build command: `npm run build`  
Output directory: `dist`

---

## Phase two (separate project)

WhatsApp chatbot via Make.com + Claude API:
- Staff onboarding flow (voice note → Google Sheet)
- Private hire enquiry qualification
- Stock take via voice note → Google Sheet

Blocked on: UK number not on WhatsApp, Meta Business access.
