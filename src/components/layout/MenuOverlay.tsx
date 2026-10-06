"use client";

import Link from "next/link";
import { useId, type RefObject } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { LinkItem } from "@/content/types";

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
  links: LinkItem[];
  cta: LinkItem;
  extras: (LinkItem & { icon: IconName })[];
  onSearch: () => void;
};

// A full-screen linen overlay with the menu centred both ways, on every screen size.
export function MenuOverlay({ ref, links, cta, extras, onSearch }: Props) {
  const titleId = useId();
  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-ink backdrop:bg-transparent"
    >
      <div className="flex h-full animate-sheet-in flex-col">
        <div className="gutter grid h-(--header-h) shrink-0 grid-cols-[1fr_auto_1fr] items-center">
          <button type="button" onClick={onSearch} aria-haspopup="dialog" className="-ml-1 flex h-10 items-center gap-2 justify-self-start text-label">
            <Icon name="search" size={18} />
            Search
          </button>
          <Link href="/" onClick={close} aria-label="Joshua Black, home">
            <Logo decorative className="h-9 lg:h-11" />
          </Link>
          <button type="button" onClick={close} aria-label="Close menu" className="-mr-2 grid h-10 w-10 place-items-center justify-self-end">
            <Icon name="close" />
          </button>
        </div>

        {/* A tap or click starts focus here. It follows the buttons above, so keys still start on them. */}
        <h2 id={titleId} tabIndex={-1} className="sr-only">
          Menu
        </h2>

        <nav aria-label="Main" className="gutter flex flex-1 flex-col items-center justify-center overflow-y-auto py-10 text-center">
          <ul className="space-y-5 lg:space-y-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className="heading-lg link-line-in">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 w-full max-w-xs lg:mt-12">
            <Button href={cta.href} variant="solid" onClick={close}>
              {cta.label}
            </Button>
          </div>
        </nav>

        <ul className="flex shrink-0 justify-center gap-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {extras.map((extra) => (
            <li key={extra.href}>
              <a
                href={extra.href}
                onClick={close}
                aria-label={extra.label}
                {...(extra.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-10 w-10 place-items-center"
              >
                <Icon name={extra.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
