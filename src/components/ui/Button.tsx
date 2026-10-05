import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "outline" | "solid";
  size?: "default" | "compact";
  className?: string;
};

export function Button({ href, children, external, variant = "outline", size = "default", className }: Props) {
  const classes = cn(
    "flex items-center justify-center gap-3 border border-ink text-label uppercase transition-colors duration-300 ease-editorial",
    size === "compact" ? "h-9 whitespace-nowrap px-3" : "h-12 w-full px-6",
    variant === "solid" ? "bg-ink text-paper hover:bg-paper hover:text-ink" : "bg-transparent text-ink hover:bg-ink hover:text-paper",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
