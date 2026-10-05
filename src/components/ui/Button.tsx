import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  outline: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  solid: "border-ink bg-ink text-paper hover:bg-paper hover:text-ink",
  pine: "border-pine bg-pine text-paper hover:bg-paper hover:text-pine",
};

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: keyof typeof variants;
  size?: "default" | "compact";
  className?: string;
};

export function Button({ href, children, external, variant = "outline", size = "default", className }: Props) {
  const classes = cn(
    "flex items-center justify-center gap-3 border text-label uppercase transition-colors duration-300 ease-editorial",
    size === "compact" ? "h-9 whitespace-nowrap px-3" : "h-12 w-full px-6",
    variants[variant],
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
