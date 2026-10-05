"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { LinkItem, NavNode } from "@/content/types";
import { cn } from "@/lib/cn";

type Extra = LinkItem & { icon: IconName };

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
  nav: NavNode[];
  extras: Extra[];
  onSearch: () => void;
};

export function MenuDrawer({ ref, nav, extras, onSearch }: Props) {
  const [path, setPath] = useState<number[]>([]);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const columns: { title?: string; items: NavNode[] }[] = [{ items: nav }];
  let level = nav;
  for (const index of path) {
    const node = level[index];
    if (!node?.children) break;
    columns.push({ title: node.label, items: node.children });
    level = node.children;
  }

  useEffect(() => {
    if (path.length === 0) return;
    columnRefs.current[path.length]?.querySelector<HTMLElement>("[data-item]")?.focus();
  }, [path]);

  const close = () => ref.current?.close();

  const back = () => {
    const depth = path.length;
    setPath(path.slice(0, -1));
    requestAnimationFrame(() => {
      columnRefs.current[depth - 1]?.querySelector<HTMLElement>('[aria-expanded="true"], [data-item]')?.focus();
    });
  };

  return (
    <dialog
      ref={ref}
      aria-label="Menu"
      onClose={() => setPath([])}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 m-0 h-dvh w-screen bg-transparent p-0 text-ink backdrop:bg-paper/70"
    >
      {/* Phones and tablets open the menu from the right, beside its button; desktop keeps the left. */}
      <div className="flex h-full w-full sm:ml-auto sm:w-fit lg:ml-0">
        {columns.map((column, depth) => {
          const isLast = depth === columns.length - 1;
          const selected = path[depth];
          return (
            <div
              key={depth === 0 ? "root" : `${depth}-${column.title}`}
              ref={(node) => {
                columnRefs.current[depth] = node;
              }}
              className={cn(
                "h-full w-full shrink-0 animate-drawer-in-right flex-col border-l border-rule bg-paper sm:w-[360px] lg:w-(--drawer-col) lg:animate-drawer-in lg:border-l-0 lg:border-r",
                isLast ? "flex" : "hidden lg:flex",
              )}
            >
              <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-rule px-(--gutter) lg:border-b-0 lg:px-5">
                {depth === 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={onSearch}
                      aria-haspopup="dialog"
                      className="-ml-1 flex h-10 items-center gap-2 text-label lg:hidden"
                    >
                      <Icon name="search" size={18} />
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close menu"
                      className="-mr-2 grid h-10 w-10 place-items-center lg:mr-0 lg:-ml-2"
                    >
                      <Icon name="close" />
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={back} className="-ml-1 flex h-10 items-center gap-2 text-label lg:hidden">
                      <Icon name="chevron-left" size={16} />
                      Back
                    </button>
                    {isLast && (
                      <button type="button" onClick={close} aria-label="Close menu" className="-mr-2 grid h-10 w-10 place-items-center lg:hidden">
                        <Icon name="close" />
                      </button>
                    )}
                  </>
                )}
              </div>

              <nav aria-label={column.title ?? "Main"} className="flex-1 overflow-y-auto px-(--gutter) pb-8 lg:px-5">
                {depth === 0 ? (
                  <Link href="/" onClick={close} aria-label="Joshua Black, home" className="mb-8 mt-6 block w-fit">
                    <Logo decorative className="h-12" />
                  </Link>
                ) : (
                  <p className="mb-8 mt-6 flex h-12 items-end text-tiny uppercase text-mute">{column.title}</p>
                )}
                <ul className="space-y-1">
                  {column.items.map((item, index) => {
                    if (item.children) {
                      const expanded = selected === index;
                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            data-item
                            aria-expanded={expanded}
                            onClick={() => setPath([...path.slice(0, depth), index])}
                            className="flex w-full items-center justify-between gap-4 py-2 text-left"
                          >
                            <span data-active={expanded} className="link-line-in text-body">
                              {item.label}
                            </span>
                            <Icon name="chevron-right" size={16} />
                          </button>
                        </li>
                      );
                    }
                    return (
                      <li key={item.label}>
                        <Link href={item.href ?? "/"} data-item onClick={close} className="flex py-2">
                          <span className="link-line-in text-body">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {depth === 0 && (
                <ul className="shrink-0 space-y-1 border-t border-rule px-(--gutter) py-5 lg:px-5">
                  {extras.map((extra) => (
                    <li key={extra.label}>
                      <a
                        href={extra.href}
                        onClick={close}
                        {...(extra.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-3 py-1.5 text-label"
                      >
                        <Icon name={extra.icon} size={18} />
                        {extra.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </dialog>
  );
}
