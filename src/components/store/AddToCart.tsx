"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { addToCart, useCart } from "@/lib/cart";

type Props = {
  slug: string;
  label: string;
  viewCartLabel: string;
  /** The most of this product one order may hold. */
  max: number;
};

export function AddToCart({ slug, label, viewCartLabel, max }: Props) {
  const lines = useCart();
  const inCart = lines.find((line) => line.slug === slug)?.quantity ?? 0;

  return (
    <div>
      <button
        type="button"
        onClick={() => addToCart(slug, max)}
        disabled={inCart >= max}
        className={buttonClasses("pine", "default", "disabled:opacity-60")}
      >
        {label}
      </button>
      <p aria-live="polite" className="mt-4 min-h-5 text-center text-label">
        {inCart > 0 && (
          <Link href="/cart" className="link-line">
            {viewCartLabel} ({inCart})
          </Link>
        )}
      </p>
    </div>
  );
}
