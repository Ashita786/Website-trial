# Website-trial

**FoodVibe** — a restaurant discovery and booking landing page, built from a Figma
Make design as plain HTML, CSS and JavaScript. No build step, no dependencies.

> *Discover the Vibe Before You Dine.*

## Running it

Open `index.html` in a browser. That's it.

If you'd rather serve it over HTTP (some browsers restrict `file://` for fonts):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | What's in it |
|---|---|
| `index.html` | All markup, plus an inline SVG sprite for the icons |
| `styles.css` | Design tokens and every component style |
| `app.js` | Theme toggle, tabs, chips, favourites, mood picker, countdowns |
| `vendor-images.sh` | Optional: downloads the photos for offline use |

## Working offline

Photos load from Unsplash, so out of the box the page needs a connection to show
them. If one is missing the card falls back to a branded gradient rather than a
broken-image icon, so the layout never breaks.

To make the page fully self-contained, run:

```sh
./vendor-images.sh
```

That downloads all 13 photos into `assets/img/` and repoints `index.html` at the
local copies. It's safe to re-run, and `git checkout index.html` reverts to the
remote URLs. Photos are Unsplash-licensed — check
<https://unsplash.com/license> before publishing anywhere public.

## Sections

Navbar · Hero with search · Browse by Cuisine · Trending Now · Occasions ·
Flash Deals · AI Vibe Finder · Food Explorer / gamification · App banner ·
Footer · Mobile bottom nav

## Design system

Tokens live at the top of `styles.css` as CSS custom properties, mirroring the
Figma file's theme. Light and dark values are the same set of names, so
components never hard-code a colour that changes between modes.

| Token | Light | Dark |
|---|---|---|
| `--primary` | `#FF5A5F` | `#FF5A5F` |
| `--secondary` | `#06D6A0` | `#06D6A0` |
| `--accent` | `#FFB703` | `#FFB703` |
| `--background` | `#FAFAF9` | `#0F0F1A` |
| `--foreground` | `#1C1C2E` | `#F5F5FA` |
| `--card` | `#FFFFFF` | `#1A1A2E` |
| `--muted` | `#F2F2F7` | `#252538` |

Spacing follows an 8px scale (`--sp-1` … `--sp-16`). Corner radius is driven by
`--radius: 1rem` with small/large/xl derived from it.

Type is *Bricolage Grotesque* for headings and *Plus Jakarta Sans* for body,
loaded from Google Fonts with system fallbacks.

## Notes

- **Dark mode** follows your OS setting on first visit and remembers your choice
  in `localStorage` afterwards.
- **Photography** is loaded from Unsplash via the URLs used in the design, so the
  page needs a network connection to show images.
- **Animations** respect `prefers-reduced-motion`.
- The page is static — buttons like *Book Now* and *Sign In* are presentational.
