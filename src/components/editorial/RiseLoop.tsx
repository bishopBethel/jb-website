"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  items: { word: string; line: string }[];
  interval?: number;
};

const reach = 4;
const stepDeg = 10;
// Indexed by distance from the arrow. The outermost slot is invisible, so slots mount and unmount unseen.
const fade = [1, 0.55, 0.28, 0.12, 0];
const blur = [0, 0.025, 0.05, 0.08, 0.1];
const grow = [1.08, 0.94, 0.9, 0.86, 0.86];

export function RiseLoop({ title, items, interval = 2400 }: Props) {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    const sync = () => {
      window.clearInterval(timer);
      timer = document.hidden || motion.matches ? undefined : window.setInterval(() => setStep((s) => s + 1), interval);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [inView, interval]);

  const wrap = (k: number) => ((k % items.length) + items.length) % items.length;
  const active = wrap(step);
  // Keyed by absolute position and kept in ascending order, so React never moves a node mid-transition.
  const slots = Array.from({ length: reach * 2 + 1 }, (_, i) => step - reach + i);

  return (
    <section ref={root}>
      <h2 className="sr-only">{title}</h2>
      <div className="gutter py-2 md:py-12 lg:flex lg:items-center lg:justify-center lg:gap-12 lg:py-16 lg:still:block">
        <div
          aria-hidden="true"
          className="relative mx-auto h-[6.5em] w-[5em] shrink-0 overflow-hidden text-[2.5rem] [mask-image:linear-gradient(transparent,#000_18%,#000_82%,transparent)] md:text-[3rem] lg:mx-0 lg:text-[4.5rem] still:hidden"
        >
          <Icon name="arrow-right" className="absolute left-0 top-1/2 size-[0.8em] -translate-y-1/2 stroke-2 text-bronze" />
          {slots.map((k) => {
            const offset = k - step;
            const d = Math.abs(offset);
            return (
              <span
                key={k}
                className="absolute inset-y-0 left-[1.2em] flex origin-[-8.5em_50%] items-center transition-[rotate] duration-600 ease-editorial"
                style={{ rotate: `${offset * stepDeg}deg` }}
              >
                <span
                  className="display block origin-left whitespace-nowrap transition-[scale,opacity,filter] duration-600 ease-editorial first-letter:text-bronze"
                  style={{ scale: grow[d], opacity: fade[d], filter: `blur(${blur[d]}em)` }}
                >
                  {items[wrap(k)]?.word}
                </span>
              </span>
            );
          })}
        </div>

        <div aria-hidden="true" className="mt-6 grid text-center lg:mt-0 lg:text-left still:hidden">
          {items.map((item, index) => (
            <p
              key={item.word}
              className={cn(
                "quote col-start-1 row-start-1 text-[clamp(1.25rem,1rem+1vw,2rem)] transition-opacity duration-600 ease-editorial",
                index === active ? "opacity-100" : "opacity-0",
              )}
            >
              {item.line}
            </p>
          ))}
        </div>

        <ol className="sr-only still:not-sr-only still:grid still:gap-8 sm:still:grid-cols-2 lg:still:grid-cols-4">
          {items.map((item) => (
            <li key={item.word}>
              <p className="display text-[2.5rem] first-letter:text-bronze">{item.word}</p>
              <p className="copy-lg mt-2">{item.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
