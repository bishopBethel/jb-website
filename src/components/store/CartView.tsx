"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import type { CheckoutContent, LinkItem, Picture, ShopContent } from "@/content/types";
import { removeFromCart, setQuantity, useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

export type CatalogItem = {
  slug: string;
  name: string;
  unitPrice: number;
  picture: Picture;
  /** The most one order may hold: the shop's limit or what is left in stock. */
  max: number;
};

type Props = {
  catalog: CatalogItem[];
  zones: ShopContent["zones"];
  states: readonly string[];
  copy: CheckoutContent;
  policies: LinkItem[];
};

type Field = "items" | "name" | "email" | "phone" | "address" | "city" | "state" | "agree";

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

const inputClasses =
  "h-12 w-full appearance-none border border-rule bg-transparent px-4 text-body text-ink outline-none transition-colors focus:border-ink";

// True once the browser's saved cart can be read, so the page never flashes "empty" first.
const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false);

function Row({ label, error, children, htmlFor }: { label: string; error?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-tiny uppercase text-mute">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-label text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

export function CartView({ catalog, zones, states, copy, policies }: Props) {
  const hydrated = useHydrated();
  const cart = useCart();
  const [state, setState] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field | "form", string>>>({});
  const [sending, setSending] = useState(false);

  const lines = cart.flatMap((line) => {
    const item = catalog.find((entry) => entry.slug === line.slug);
    return item ? [{ ...item, quantity: Math.min(line.quantity, Math.max(item.max, 1)) }] : [];
  });
  const unavailable = cart.filter((line) => !catalog.some((entry) => entry.slug === line.slug));
  const zone = state ? (zones.find((item) => item.states.includes(state)) ?? zones.find((item) => item.everywhereElse)) : undefined;
  const deliveryFree = zones.length > 0 && zones.every((item) => item.fee === 0);
  const subtotal = lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
  const total = subtotal + (zone?.fee ?? 0);

  if (!hydrated) return <div className="min-h-[40svh]" />;

  if (lines.length === 0) {
    return (
      <div className="max-w-sm py-6">
        <p className="copy-lg">{copy.cart.empty}</p>
        <div className="mt-8">
          <Button href="/collection" variant="pine">
            {copy.cart.continueShopping}
          </Button>
        </div>
      </div>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSending(true);
    setErrors({});
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          items: lines.map((line) => ({ product: line.slug, quantity: line.quantity })),
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          city: data.get("city"),
          state,
          agree: data.get("agree") === "on",
        }),
      });
      const result = (await response.json()) as { authorizationUrl?: string; message?: string; field?: Field };
      if (response.ok && result.authorizationUrl) {
        window.location.assign(result.authorizationUrl);
        return;
      }
      setErrors({ [result.field ?? "form"]: result.message ?? "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    }
    setSending(false);
  }

  return (
    <form onSubmit={submit} noValidate className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
      <div>
        <ul className="border-t border-rule">
          {lines.map((line) => (
            <li key={line.slug} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-rule py-5 sm:grid-cols-[6rem_1fr]">
              <Link href={`/collection/${line.slug}`} aria-label={line.name}>
                <Frame picture={line.picture} sizes="96px" />
              </Link>
              <div className="flex min-w-0 flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <Link href={`/collection/${line.slug}`} className="heading-sm truncate">
                    {line.name}
                  </Link>
                  <span className="shrink-0 text-body">{naira(line.unitPrice * line.quantity)}</span>
                </div>
                <p className="text-label text-mute">{naira(line.unitPrice)}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div role="group" aria-label={`${copy.cart.quantityLabel}: ${line.name}`} className="flex h-10 items-center border border-rule">
                    <button
                      type="button"
                      aria-label="One fewer"
                      onClick={() => setQuantity(line.slug, line.quantity - 1)}
                      className="grid h-full w-10 place-items-center"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="w-8 text-center text-body">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="One more"
                      disabled={line.quantity >= line.max}
                      onClick={() => setQuantity(line.slug, line.quantity + 1)}
                      className="grid h-full w-10 place-items-center disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(line.slug)} className="text-label text-mute">
                    <span className="link-line-in">{copy.cart.remove}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {unavailable.map((line) => (
          <p key={line.slug} className="mt-4 text-label text-mute">
            {line.slug} is no longer available.{" "}
            <button type="button" onClick={() => removeFromCart(line.slug)} className="link-line-in">
              {copy.cart.remove}
            </button>
          </p>
        ))}
        {errors.items && (
          <p role="alert" className="mt-4 text-label text-ink">
            {errors.items}
          </p>
        )}

        <h2 className="heading-sm mt-12">{copy.cart.detailsTitle}</h2>
        <div className="mt-6 space-y-6">
          <Row label={copy.form.nameLabel} htmlFor="name" error={errors.name}>
            <input id="name" name="name" autoComplete="name" required className={inputClasses} />
          </Row>
          <div className="grid gap-6 sm:grid-cols-2">
            <Row label={copy.form.emailLabel} htmlFor="email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className={inputClasses} />
            </Row>
            <Row label={copy.form.phoneLabel} htmlFor="phone" error={errors.phone}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={inputClasses} />
            </Row>
          </div>
          <Row label={copy.form.addressLabel} htmlFor="address" error={errors.address}>
            <textarea
              id="address"
              name="address"
              autoComplete="street-address"
              rows={3}
              required
              className={cn(inputClasses, "h-auto py-3")}
            />
          </Row>
          <div className="grid gap-6 sm:grid-cols-2">
            <Row label={copy.form.cityLabel} htmlFor="city" error={errors.city}>
              <input id="city" name="city" autoComplete="address-level2" required className={inputClasses} />
            </Row>
            <Row label={copy.form.stateLabel} htmlFor="state" error={errors.state}>
              <div className="relative">
                <select id="state" value={state} onChange={(event) => setState(event.target.value)} required className={inputClasses}>
                  <option value="" disabled>
                    —
                  </option>
                  {states.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <Icon name="chevron-down" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </Row>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:mt-0 lg:self-start">
        <dl className="border-y border-rule py-5 text-body">
          <div className="flex justify-between py-1">
            <dt className="text-mute">{copy.form.subtotalLabel}</dt>
            <dd>{naira(subtotal)}</dd>
          </div>
          <div className="flex justify-between py-1">
            <dt className="text-mute">
              {copy.form.deliveryLabel}
              {zone && !deliveryFree ? ` · ${zone.name}` : ""}
            </dt>
            <dd>{deliveryFree || zone?.fee === 0 ? copy.form.deliveryIncluded : zone ? naira(zone.fee) : "—"}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-rule pt-3 font-bold">
            <dt>{copy.form.totalLabel}</dt>
            <dd aria-live="polite">{naira(total)}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <label className="flex items-start gap-3 text-label">
            <input type="checkbox" name="agree" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-pine)]" />
            <span>
              {copy.form.agreement}{" "}
              {policies.length === 0 && "policies"}
              {policies.map((policy, index) => (
                <span key={policy.href}>
                  {index > 0 && (index === policies.length - 1 ? " and " : ", ")}
                  <Link href={policy.href} target="_blank" className="link-line-in">
                    {policy.label.toLowerCase()}
                  </Link>
                </span>
              ))}
              .
            </span>
          </label>
          {errors.agree && (
            <p role="alert" className="mt-2 text-label text-ink">
              {errors.agree}
            </p>
          )}
        </div>

        {errors.form && (
          <p role="alert" className="mt-4 text-label text-ink">
            {errors.form}
          </p>
        )}
        <button type="submit" disabled={sending} className={buttonClasses("pine", "default", "mt-6 disabled:opacity-60")}>
          {sending ? "…" : `${copy.cart.payLabel} · ${naira(total)}`}
        </button>
      </div>
    </form>
  );
}
