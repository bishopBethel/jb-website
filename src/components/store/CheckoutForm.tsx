"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { CheckoutContent, LinkItem, ShopContent } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  product: { slug: string; name: string; unitPrice: number };
  maxQuantity: number;
  zones: ShopContent["zones"];
  states: readonly string[];
  copy: CheckoutContent["form"];
  policies: LinkItem[];
};

type Field = "quantity" | "name" | "email" | "phone" | "address" | "city" | "state" | "agree";

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

const inputClasses =
  "h-12 w-full appearance-none border border-rule bg-transparent px-4 text-body text-ink outline-none transition-colors focus:border-ink";

function Choice({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <Icon name="chevron-down" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}

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

export function CheckoutForm({ product, maxQuantity, zones, states, copy, policies }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field | "form", string>>>({});
  const [sending, setSending] = useState(false);

  const zone = state ? (zones.find((item) => item.states.includes(state)) ?? zones.find((item) => item.everywhereElse)) : undefined;
  const subtotal = product.unitPrice * quantity;
  const total = subtotal + (zone?.fee ?? 0);

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
          product: product.slug,
          quantity,
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
    <form onSubmit={submit} noValidate className="space-y-6">
      <Row label={copy.quantityLabel} htmlFor="quantity" error={errors.quantity}>
        <Choice>
          <select
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className={inputClasses}
          >
            {Array.from({ length: maxQuantity }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </Choice>
      </Row>

      <Row label={copy.nameLabel} htmlFor="name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" required className={inputClasses} />
      </Row>
      <div className="grid gap-6 sm:grid-cols-2">
        <Row label={copy.emailLabel} htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className={inputClasses} />
        </Row>
        <Row label={copy.phoneLabel} htmlFor="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={inputClasses} />
        </Row>
      </div>
      <Row label={copy.addressLabel} htmlFor="address" error={errors.address}>
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
        <Row label={copy.cityLabel} htmlFor="city" error={errors.city}>
          <input id="city" name="city" autoComplete="address-level2" required className={inputClasses} />
        </Row>
        <Row label={copy.stateLabel} htmlFor="state" error={errors.state}>
          <Choice>
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
          </Choice>
        </Row>
      </div>

      <dl className="border-y border-rule py-5 text-body">
        <div className="flex justify-between py-1">
          <dt className="text-mute">
            {copy.subtotalLabel} · {quantity} × {product.name}
          </dt>
          <dd>{naira(subtotal)}</dd>
        </div>
        <div className="flex justify-between py-1">
          <dt className="text-mute">
            {copy.deliveryLabel}
            {zone ? ` · ${zone.name}` : ""}
          </dt>
          <dd>{zone ? naira(zone.fee) : "—"}</dd>
        </div>
        <div className="mt-2 flex justify-between border-t border-rule pt-3 font-bold">
          <dt>{copy.totalLabel}</dt>
          <dd aria-live="polite">{naira(total)}</dd>
        </div>
      </dl>

      <div>
        <label className="flex items-start gap-3 text-label">
          <input type="checkbox" name="agree" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-pine)]" />
          <span>
            {copy.agreement}{" "}
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
        <p role="alert" className="text-label text-ink">
          {errors.form}
        </p>
      )}
      <button type="submit" disabled={sending} className={buttonClasses("pine", "default", "disabled:opacity-60")}>
        {sending ? "…" : `${copy.payLabel} · ${naira(total)}`}
      </button>
    </form>
  );
}
