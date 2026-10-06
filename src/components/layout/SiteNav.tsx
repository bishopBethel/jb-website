"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { LinkItem, SearchEntry } from "@/content/types";
import { cn } from "@/lib/cn";
import { MenuOverlay } from "./MenuOverlay";
import { SearchOverlay } from "./SearchOverlay";

const tab = "flex h-10 flex-1 items-center justify-center gap-2 rounded-full px-4 text-label transition-colors duration-300";
const tabActive = "bg-ink text-paper";

type Props = {
  menuLinks: LinkItem[];
  searchIndex: SearchEntry[];
  suggestions: LinkItem[];
  shop: LinkItem;
  extras: (LinkItem & { icon: IconName })[];
};

export function SiteNav({ menuLinks, searchIndex, suggestions, shop, extras }: Props) {
  const pathname = usePathname();
  const onShop = pathname === shop.href;
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = header.current;
    if (!el) return;

    const onScroll = () => {
      el.dataset.scrolled = String(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    menu.current?.close();
    search.current?.close();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // A tap or click starts on the menu's hidden title, so no focus ring lands on a button. Keys keep the default.
  const openMenu = (event: MouseEvent) => {
    menu.current?.showModal();
    if (event.detail > 0) menu.current?.querySelector<HTMLElement>("h2")?.focus();
  };
  const openSearch = () => search.current?.showModal();
  const searchFromMenu = () => {
    menu.current?.close();
    search.current?.showModal();
  };

  return (
    <>
      <header
        ref={header}
        data-scrolled="false"
        className="sticky top-0 z-40 h-(--header-h) bg-paper text-ink transition-colors duration-300 ease-editorial over-hero:bg-transparent over-hero:text-paper"
      >
        {/* Over the floating hero card the contents clear its top edge; on desktop they sit an even
            1.5rem in from its top and sides (the card itself is inset 1rem). */}
        <div className="page-width gutter grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 transition-[translate,padding] duration-300 ease-editorial over-photo:translate-y-5 lg:over-photo:translate-y-0 lg:over-photo:items-start lg:over-photo:px-10 lg:over-photo:pt-10">
          {/* From xl the menu's links sit in the header itself; narrower screens open them as an overlay. */}
          <div className="hidden items-center gap-7 lg:flex lg:h-9">
            <button type="button" onClick={openMenu} aria-haspopup="dialog" className="flex items-center gap-2 text-body xl:hidden">
              <Icon name="menu" />
              Menu
            </button>
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-7">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="link-line-in whitespace-nowrap text-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link href="/" aria-label="Joshua Black, home" className="col-start-2">
            <Logo decorative className="h-9 lg:h-11" />
          </Link>

          <div className="col-start-3 hidden items-center justify-end gap-7 lg:flex lg:h-9">
            <button type="button" onClick={openSearch} aria-haspopup="dialog" className="flex items-center gap-2 text-body">
              <Icon name="search" />
              Search
            </button>
            <Button
              href={shop.href}
              variant="solid"
              size="compact"
              className="over-photo:border-paper over-photo:bg-paper over-photo:text-ink over-photo:hover:bg-transparent over-photo:hover:text-paper"
            >
              {shop.label}
            </Button>
          </div>
        </div>
      </header>

      {/* Below lg, navigation lives in a floating dock at the bottom of the screen. */}
      <nav aria-label="Quick links" className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 flex gap-2 text-ink lg:hidden">
        <div className="glass flex h-14 flex-1 items-center rounded-full px-2">
          <button type="button" onClick={openMenu} aria-haspopup="dialog" className={cn(tab, !onShop && tabActive)}>
            <Icon name="menu" size={18} />
            Menu
          </button>
          <Link href={shop.href} aria-current={onShop ? "page" : undefined} className={cn(tab, "uppercase", onShop && tabActive)}>
            <Icon name="bag" size={18} />
            {shop.label}
          </Link>
        </div>
        <button
          type="button"
          onClick={openSearch}
          aria-haspopup="dialog"
          aria-label="Search"
          className="glass grid size-14 shrink-0 place-items-center rounded-full"
        >
          <Icon name="search" />
        </button>
      </nav>

      <MenuOverlay ref={menu} links={menuLinks} cta={shop} extras={extras} onSearch={searchFromMenu} />
      <SearchOverlay ref={search} index={searchIndex} suggestions={suggestions} />
    </>
  );
}
