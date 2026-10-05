import { shopLink } from "./navigation";
import type { Accent, ImageRef, LinkItem } from "./types";

export type TileContent = {
  title: string;
  href: string;
  image: ImageRef;
  /** A second photo, set to the right of `image` in a tile that spans the full width. */
  pair?: ImageRef;
  links: LinkItem[];
};

/** Follows the mouse over a tile's photo. */
export const tileHint = "Learn more";

export const home = {
  intro: {
    title: "Dress with RISE: the styling framework that makes your outfits look effortless",
    accents: [
      { text: "RISE", tone: "pine" },
      { text: "makes your outfits look effortless", tone: "bronze" },
    ] satisfies Accent[],
    body: "If you've come to this site, you likely feel like styling yourself is trial and error. You're not alone. It's hard, but I can help.",
    link: { label: "Learn RISE", href: "/style-guide/the-rise-framework" } satisfies LinkItem,
    image: { id: "ed-tan-01", crop: { x: 40, y: 30, top: 16 } } satisfies ImageRef,
  },

  loop: {
    title: "The RISE framework",
    items: [
      { word: "Rhythm", line: "Repeat one colour, material or pattern." },
      { word: "Interest", line: "Give the eye a single place to land." },
      { word: "Structure", line: "Every piece knows its place." },
      { word: "Entirety", line: "Does it all belong?" },
    ],
  },

  accessorise: {
    title: "accessoRISE",
    highlight: "RISE",
    accent: "and Shine",
    line: "Start with the one piece that completes your look.",
    link: shopLink,
    image: { id: "pp-box-stack" } satisfies ImageRef,
  },

  statement: {
    title: "A guide into sophistication, through accessories.",
    links: [
      { label: "Discover Pocket Power", href: "/collection/pocket-power" },
      { label: "The world of Joshua Black", href: "/world" },
    ] satisfies LinkItem[],
    shop: shopLink,
  },

  trio: [
    {
      title: "Pocket Power",
      href: "/collection/pocket-power",
      image: { id: "pp-box-open" },
      links: [{ label: "Discover the box", href: "/collection/pocket-power" }],
    },
    {
      title: "The Squares",
      href: "/collection",
      image: { id: "pp-fan" },
      links: [{ label: "View all ten", href: "/collection" }],
    },
    {
      title: "Traditional",
      href: "/traditional",
      image: { id: "trad-red-portrait" },
      links: [{ label: "Discover the fila", href: "/traditional" }],
    },
  ] satisfies TileContent[],

  founder: {
    title: "From the founder",
    href: "/world",
    image: { id: "ed-dark-suit" },
    pair: { id: "pp-founder-box" },
    links: [{ label: "Read the story", href: "/world" }],
  } satisfies TileContent,
};

export const collection = {
  title: "Pocket Power",
  intro: "One box, ten pocket squares in a silk-wool blend. Browse the box and each square inside it.",
  welcome: {
    kicker: "Pocket Power",
    lines: ["One box.", "Ten pocket squares."],
    highlight: "Ten",
    accent: "to make you stand out",
    body: "A silk-wool blend, soft yet structured enough to hold its fold in your pocket. Each square folds up to seven ways.",
    image: { id: "pp-drape" } satisfies ImageRef,
    links: [
      { label: "Discover the box", href: "/collection/pocket-power" },
      { label: "View all ten", href: "#pieces" },
    ] satisfies LinkItem[],
  },
};

export const traditional = {
  title: "Traditional: the Fila",
  intro: "The fila, the Yoruba cap that completes a traditional outfit, with the Joshua Black monogram in its band.",
  welcome: {
    kicker: "Traditional",
    lines: ["The fila.", "Worn like a crown."],
    highlight: "crown",
    accent: "for the royal bloodline",
    body: "The fila is the Yoruba cap that completes a traditional outfit. Ours carries the Joshua Black monogram in its band, made to finish your kaftan or agbada.",
    image: { id: "trad-rose-profile" } satisfies ImageRef,
    links: [
      { label: "See the colours", href: "#colours" },
      { label: "Ordering", href: "#order" },
    ] satisfies LinkItem[],
  },
  colours: {
    title: "The colours",
    intro: "Each fila carries the monogram in its band.",
    items: [
      { name: "Green", image: { id: "trad-green-band", crop: { x: 50, y: 30 } } },
      { name: "Rose", image: { id: "trad-rose-band" } },
      { name: "Red and navy", image: { id: "trad-red-band" } },
      { name: "Tan", image: { id: "trad-tan-band" } },
    ] satisfies { name: string; image: ImageRef }[],
  },
  order: {
    title: "Order your fila",
    text: "Our online store opens soon. When it does, you will choose your colour and order your fila right here.",
    image: { id: "trad-green-seated" } satisfies ImageRef,
  },
};

export const styleGuide = {
  title: "Style Guide",
  intro: "Notes on dressing with intention. Fewer rules than you think, and better ones.",
  hero: { id: "ed-tan-04", crop: { x: 50, y: 12 } } satisfies ImageRef,
};

export const world = {
  hero: {
    kicker: "The World of Joshua Black",
    title: "2 words. 1 idea.",
    image: { id: "ed-navy-03", crop: { x: 55, y: 10 } } satisfies ImageRef,
  },
  name: {
    intro: "Joshua Black is more than a name. It is the idea behind everything the brand makes.",
    parts: [
      { term: "Joshua", text: "Hebrew for salvation. A guide to something better." },
      { term: "Black", text: "Sophistication. Class." },
    ],
    together: "A guide into sophistication, through accessories.",
  },
  founder: {
    image: { id: "pp-founder-box" } satisfies ImageRef,
    title: "The founder",
    paragraphs: [
      "Joshua Black was founded by Opeyemi Okediji. Joshua is his middle name.",
      "He treats dressing as stewardship: taking what has been given and caring for it with intention, beauty and purpose. Accessories are where that care shows first.",
    ],
    quote: "Dress like you're of the royal bloodline.",
  },
  timeline: {
    title: "The making of Pocket Power",
    image: { id: "pp-box-engraved" } satisfies ImageRef,
    events: [
      {
        date: "January 2026",
        text: "The idea: give customers something that makes them feel truly special. The plan allowed two months.",
      },
      {
        date: "First quarter",
        text: "The plan did not survive. Hurdles arrived one after another, and the quarter closed with nothing to show.",
      },
      {
        date: "30 April",
        text: "The first squares arrive. After months of sleepless nights, the collection is real.",
      },
      {
        date: "May",
        text: "The squares are ready, but the launch waits. A collection like this needs a box worthy of it.",
      },
      { date: "23 May", text: "The box arrives. Love at first sight." },
      { date: "1 July 2026", text: "Pocket Power launches." },
    ],
  },
  closing: {
    lines: ["The finishing", "touch"],
    highlight: "touch",
    accent: "for the intentional man",
    image: { id: "pp-box-open" } satisfies ImageRef,
    links: [
      { label: "Discover Pocket Power", href: "/collection/pocket-power" },
      { label: "Ordering", href: "/contact" },
    ] satisfies LinkItem[],
  },
};

/** Shown where the order button will sit once the online store opens. */
export const store = {
  status: "Online store opening soon",
  note: "You will be able to order right here on our website.",
  details: "Our online store opens soon. You will be able to order and pay for every piece right here on our website.",
};

export const contact = {
  title: "Ordering",
  intro: "Our online store opens soon. When it does, you will choose, order and pay for every piece right here on our website.",
  image: { id: "pp-box-stack" } satisfies ImageRef,
  stepsTitle: "How ordering will work",
  steps: [
    { title: "Choose", text: "Browse Pocket Power and the fila and pick the pieces you want." },
    { title: "Order", text: "Place your order and pay on our website. There is nothing to arrange by message." },
    { title: "Receive", text: "We prepare your order and send it to you." },
  ],
};
