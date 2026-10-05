"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { LinkItem, NavNode, SearchEntry } from "@/content/types";
import { MenuDrawer } from "./MenuDrawer";
import { SearchOverlay } from "./SearchOverlay";

type Props = {
  nav: NavNode[];
  searchIndex: SearchEntry[];
  suggestions: LinkItem[];
  shop: LinkItem;
  extras: (LinkItem & { icon: IconName })[];
};

export function SiteNav({ nav, searchIndex, suggestions, shop, extras }: Props) {
  const pathname = usePathname();
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
        <div className="gutter flex h-full items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden items-center gap-7 lg:flex">
            <button type="button" onClick={openMenu} aria-haspopup="dialog" className="flex items-center gap-2 text-body">
              <Icon name="menu" />
              Menu
            </button>
            <button type="button" onClick={openSearch} aria-haspopup="dialog" className="flex items-center gap-2 text-body">
              <Icon name="search" />
              Search
            </button>
          </div>

          <Link href="/" aria-label="Joshua Black, home">
            <Logo decorative className="h-9 lg:h-11" />
          </Link>

          <div className="flex items-center justify-end gap-2 over-hero:text-ink over-photo:text-paper">
            <Button
              href={shop.href}
              variant="solid"
              size="compact"
              className="over-photo:border-paper over-photo:bg-paper over-photo:text-ink over-photo:hover:bg-transparent over-photo:hover:text-paper"
            >
              {shop.label}
            </Button>
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-label="Menu"
              className="grid size-9 place-items-center border border-current lg:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer ref={menu} nav={nav} extras={extras} onSearch={searchFromMenu} />
      <SearchOverlay ref={search} index={searchIndex} suggestions={suggestions} />
    </>
  );
}
