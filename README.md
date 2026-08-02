# Website-trial

GlowUp Cosmetics — a dark-mode beauty e-commerce storefront, implemented from the
[GlowUp Cosmetics Website Design](https://www.figma.com/make/hECJvIadmcKWkN8ziHv3Mq/GlowUp-Cosmetics-Website-Design)
Figma Make file.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
```

## Structure

```
index.html
src/
  main.tsx              # React entry point
  index.css             # design tokens, fonts, marquee/float keyframes
  App.tsx               # page state, cart state, product catalogue
  components/Navbar.tsx # fixed glass navbar with cart badge
  pages/HomePage.tsx    # hero, trust marquee, product grid, banner,
                        # promises, testimonials, newsletter, footer
  pages/CartPage.tsx    # bag items, free-shipping meter, promo code,
                        # order summary, empty state
```

## Design notes

Colours, radii, and typography live as CSS custom properties in `src/index.css`
(`--primary: #C94FFF`, `--accent: #FF3D7F`, `--background: #08080E`, …), matching
the tokens in the Figma file. Headings use Plus Jakarta Sans, body copy uses
DM Sans; both load from Google Fonts.

Product photography is referenced from Unsplash by URL, exactly as in the design
source. Icons are `lucide-react` components, except the GlowUp star mark, which
is an inline SVG.

## State

Cart state is in-memory React state in `App.tsx` — adding to bag, quantity
steppers, and removal all work, but nothing is persisted and checkout is a
non-functional CTA.
