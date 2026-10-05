@AGENTS.md

# Joshua Black website

Brand site for Joshua Black (@byjoshuablack), a Nigerian men's accessories label.
Visual language follows armani.com: carbon on soft linen, hairline rules, edge-to-edge portrait imagery.
Mobile first: build and check every section at 390px wide before scaling it up.

Instructions from a `CLAUDE.md` in a parent folder belong to other projects and do not apply
here. This site has no dark mode, no backend and no dashboard.

## Decisions already made

- Enquiry only. No cart, checkout or payments. "Order" opens WhatsApp or Instagram DM.
- Prices hidden. `showPrices` in `src/content/site.ts` turns them on.
- Catalogue is Pocket Power only: the box and its ten squares.
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
  used. Pine is the primary accent: bands, headline accents and the footer bar. Bronze text on linen
  is only for large headline accents (2.8:1, short of the 3:1 large-text minimum); smaller text on
  linen uses `bronze-ink` or pine.
- Header: on phones and tablets the logo sits left, with Shop now and the menu on the right. From
  `lg`, Menu and Search sit left, the logo centred and Shop now right. There is no bottom bar.
  The menu opens from the side its button is on: right below `lg`, left from `lg`.
- Anything that moves on its own has a pause button and a static layout under the `still` variant
  (reduced motion or no script).
- The "accessoRISE" lettering mixes Libre Baskerville with Tusker capitals on purpose.
- Borrow Armani's layout, never its assets, fonts or copy.
- Code comments are rare and at most two lines.

## Commands

- `npm run dev` — local server on port 3000
- `npm run check` — type-check, lint and production build
- `npm run photos -- <folder>` — prepare photos
- Judge image sharpness on `npm run build && npm run start`, not on the dev server.
