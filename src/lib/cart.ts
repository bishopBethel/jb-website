"use client";

import { useSyncExternalStore } from "react";

// The cart lives in the browser until checkout; the server re-prices it then, so nothing here is trusted.
export type CartLine = { slug: string; quantity: number };

const KEY = "jb-cart";
const EVENT = "jb-cart-change";
const empty: CartLine[] = [];
let cached: { raw: string | null; lines: CartLine[] } = { raw: null, lines: empty };

function read(): CartLine[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return empty;
  }
  if (raw === cached.raw) return cached.lines;
  let lines: CartLine[] = empty;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      lines = parsed
        .filter((line): line is CartLine => typeof line?.slug === "string" && Number.isInteger(line?.quantity) && line.quantity > 0)
        .map(({ slug, quantity }) => ({ slug, quantity }));
    }
  } catch {
    lines = empty;
  }
  cached = { raw, lines };
  return lines;
}

function write(lines: CartLine[]) {
  try {
    if (lines.length) window.localStorage.setItem(KEY, JSON.stringify(lines));
    else window.localStorage.removeItem(KEY);
  } catch {
    // Private windows may refuse storage; the cart then lasts only for this page.
    cached = { raw: JSON.stringify(lines), lines };
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => event.key === KEY && onChange();
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart(): CartLine[] {
  return useSyncExternalStore(subscribe, read, () => empty);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function addToCart(slug: string, max: number) {
  const lines = read();
  const existing = lines.find((line) => line.slug === slug);
  write(
    existing
      ? lines.map((line) => (line.slug === slug ? { slug, quantity: Math.min(line.quantity + 1, max) } : line))
      : [...lines, { slug, quantity: 1 }],
  );
}

export function setQuantity(slug: string, quantity: number) {
  write(read().map((line) => (line.slug === slug ? { slug, quantity } : line)).filter((line) => line.quantity > 0));
}

export function removeFromCart(slug: string) {
  write(read().filter((line) => line.slug !== slug));
}

export function clearCart() {
  write([]);
}
