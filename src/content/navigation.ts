import type { LinkItem } from "./types";

/** The header's Shop now, the dock's middle tab and the menu's closing button. */
export const shopLink: LinkItem = { label: "Shop now", href: "/collection/pocket-power" };

/** The full-screen menu, in order. Shop now closes it as a button. */
export const menuLinks: LinkItem[] = [
  { label: "About Us", href: "/world" },
  { label: "Learn RISE", href: "/style-guide/the-rise-framework" },
  { label: "Articles", href: "/style-guide" },
  { label: "Orders and Enquiries", href: "/contact" },
];

export const footerColumns: { title: string; links: LinkItem[] }[] = [
  {
    title: "Client service",
    links: [
      { label: "Ordering", href: "/contact" },
      { label: "How ordering will work", href: "/contact#how-it-works" },
    ],
  },
  {
    title: "Pocket Power",
    links: [
      { label: "The box", href: "/collection/pocket-power" },
      { label: "All pieces", href: "/collection" },
    ],
  },
  {
    title: "The brand",
    links: [
      { label: "The World of Joshua Black", href: "/world" },
      { label: "Style Guide", href: "/style-guide" },
    ],
  },
];
