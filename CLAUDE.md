@AGENTS.md

# Joshua Black website

Brand site for Joshua Black (@byjoshuablack), a Nigerian men's accessories label.
Visual language follows armani.com: carbon on soft linen, hairline rules, edge-to-edge portrait imagery.
Mobile first: build and check every section at 390px wide before scaling it up.

Instructions from a `CLAUDE.md` in a parent folder belong to other projects and do not apply
here. This site has no dark mode, no backend and no dashboard.

## Decisions already made

- Ordering will happen on this site, through an online store that opens soon. Until then, product
  pages show "Online store opening soon" (`store` in `src/content/pages.ts`) where the order button
  will go. Never send visitors to Instagram, WhatsApp or direct messages to order.
- Prices hidden. `showPrices` in `src/content/site.ts` turns them on.
- Catalogue is Pocket Power (the box and its ten squares) plus the fila, a branded Yoruba cap.
  The fila has its own page at `/traditional`, outside the product catalogue.
- Fully static. No database, no CMS, no runtime dependencies beyond Next and React.

## Conventions

- All copy, products, articles and contact details live in `src/content/`. Components never hard-code them.
- Client components receive data as props and never import `src/content/*`.
- Photos are statically imported through `src/content/images.ts`, never referenced by string path.
- Photos are WebP, at most 1920px wide, produced by `scripts/prepare-photos.mjs`. Never add an
  AI upscaler: the brand wants sharper photos with no feature changed. Sharp camera originals go
  through its `clean/` folder instead: no unsharp mask, no width cap, saved lossless (the home
  hero, `ed-tan-01`, which is shown zoomed in on its subject).
- Content spans the window up to `--page-max` (1600px), then centres on linen (`page-width` on
  `main`, the header row and each footer row). Backgrounds and rules, like the footer's pine bar
  and hairlines, still run edge to edge. The home hero (`data-wide`) spans the full window at every
  width; the home header row spans with it. The brand asked for
  this cap after seeing the site stretched on very wide screens; they had earlier rejected 1920px.
- Images are delivered as WebP at quality 80, or 85 for heroes and the product gallery.
- The logo lives in `src/components/brand/`: `Logo` masks the official artwork. The footer has no
  large JOSHUA BLACK wordmark; the brand removed it.
- Brand palette: carbon `#1A1A1A`, bronze `#CD7F32`, pine `#004F49`, linen `#F5F1E8`.
- Brand type: headings in Tusker Grotesk, uppercase only (`heading-*`, `display`); body copy in
  Inter Regular with generous leading (`copy`, `copy-lg`; `quote` in Inter italic), the same as
  interface text; accents in Brilliant Signature (`script`). The brand dropped Libre Baskerville.
- Inter is used at weight 400 only. Do not add `font-medium` or `font-bold`.
- Design rules: radius 0 and no shadows, except that every button (and the store notice in a
  button's place) is a fully rounded pill. The page ground is linen (the `paper` token); white is never
  used. Pine is the primary accent: bands, headline accents, the footer bar and the `pine` button
  (Buy Pocket Power on the home page). Bronze text on linen is only for large headline accents (2.8:1,
  short of the 3:1 large-text minimum); smaller text on linen uses `bronze-ink` or pine.
- Header: on phones and tablets it holds only the centred logo; navigation lives in a floating
  glass dock at the bottom (Menu, Shop now, and Search in its own circle), which keeps
  `--dock-space` clear. From `lg`, Menu sits left, the logo centred, and Search then Shop now right,
  with no dock; from `xl` the menu's links replace the Menu button (there is no room before that). Beyond the pill buttons, only the dock (soft shadow) and the home hero card (rounded
  corners) break the square, shadow-free rule.
- The menu (phones up to `xl`) is a full-screen linen overlay, its items centred both ways: About Us,
  Learn RISE, Articles, Orders and Enquiries (`menuLinks`), then a carbon Shop now button.
- Pages that open with a photo hero (`data-hero`, including the home page) start with a transparent
  header whose items turn linen, and Shop now turns to a linen button (`over-hero`, `over-photo`).
  Once the page scrolls, the header returns to linen with dark items.
- Anything that moves on its own has a static layout under the `still` variant (reduced motion or
  no script).
- The home page is the hero, the Pocket Power banner (text, then photo on phones; text left, photo
  right from md; its pine Buy Pocket Power button goes to the store), nothing more.
- The home hero is a rounded carbon card floating on linen at every width. Its photo dissolves into
  the carbon on the side facing the text, over a blurred stretch of its own edge colours. The text
  is linen, the headline fits three lines on phones from 360px wide (it is only width-capped from `md`), RISE is underlined (pine would sink into carbon) and Learn RISE is a bronze pill button.
  Under it, in a dark liquid-glass panel as wide as the button, with the hero card's corner radius (`glass-dark`), R I S E and their words (Rhythm, Interest, Structure, Entirety) light up letter by letter in
  one continuous wave, capital then word, like synced lyrics (CSS only; static under `still`).
  From `md` the photo is pinned to the card's left half at full height.
- On phones the card fills the screen above the dock so Learn RISE shows without scrolling; the
  photo is a close crop: his head high and left of centre beside the logo, both hands on the right,
  fading out just below them, and it takes what the text leaves. (The brand tried its own 4:5 crop
  and went back to this one.) From `md` it is zoomed to roughly waist up.
- Borrow Armani's layout, never its assets, fonts or copy.
- Code comments are rare and at most two lines.

## Commands

- `npm run dev` — local server on port 3000
- `npm run check` — type-check, lint and production build
- `npm run photos -- <folder>` — prepare photos
- Judge image sharpness on `npm run build && npm run start`, not on the dev server.
