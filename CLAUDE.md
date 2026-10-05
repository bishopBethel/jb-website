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
  AI upscaler: the brand wants sharper photos with no feature changed.
- Pages span the full window at every width. Do not cap the page width; the brand rejected that.
- Images are delivered as WebP at quality 80, or 85 for heroes and the product gallery.
- The logo lives in `src/components/brand/`: `Logo` masks the official artwork, `Wordmark` typesets
  the name in Tusker Grotesk.
- Brand palette: carbon `#1A1A1A`, bronze `#CD7F32`, pine `#004F49`, linen `#F5F1E8`.
- Brand type, from the brand's own guide: headings in Tusker Grotesk, uppercase only
  (`heading-*`, `display`); body copy in Libre Baskerville with generous leading (`copy`,
  `copy-lg`, `quote`); interface text in Inter Regular; accents in Brilliant Signature (`script`).
- Inter is used at weight 400 only. Do not add `font-medium` or `font-bold`.
- Design rules: radius 0, no shadows. The page ground is linen (the `paper` token); white is never
  used. Pine is the primary accent: bands, headline accents, the footer bar and the `pine` button
  (the home statement's Shop now). Bronze text on linen is only for large headline accents (2.8:1,
  short of the 3:1 large-text minimum); smaller text on linen uses `bronze-ink` or pine.
- Header: on phones and tablets the logo sits left, with Shop now and the menu on the right. The
  menu button there is an outlined square as tall as Shop now. From
  `lg`, Menu and Search sit left, the logo centred and Shop now right. There is no bottom bar.
  The menu opens from the side its button is on: right below `lg`, left from `lg`.
- Pages that open with a photo hero (`data-hero`, including the home page) start with a transparent
  header whose items turn linen wherever the photo is behind them (`over-hero`, `over-photo`). On
  the home page's split hero, Shop now stays dark from `md`. Once the page scrolls, the header
  returns to linen with dark items.
- Anything that moves on its own has a static layout under the `still` variant (reduced motion or
  no script). The RISE loop has no pause button, by the brand's choice.
- Home photo-and-text sections dissolve the photo into the linen on the side facing the text: its
  edge fades out over a blurred stretch of its own edge colours. On desktop the top and bottom edges
  stay clean. From `md` the photo is pinned to the section's full height.
- The accessoRISE lockup: Tusker capitals with ACCESSO in carbon and RISE in bronze, then
  "and Shine" in Brilliant Signature, pine, tucked under RISE.
- Borrow Armani's layout, never its assets, fonts or copy.
- Code comments are rare and at most two lines.

## Commands

- `npm run dev` — local server on port 3000
- `npm run check` — type-check, lint and production build
- `npm run photos -- <folder>` — prepare photos
- Judge image sharpness on `npm run build && npm run start`, not on the dev server.
