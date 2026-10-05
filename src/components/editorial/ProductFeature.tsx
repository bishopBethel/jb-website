import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Highlight } from "@/components/ui/Highlight";
import type { LinkItem, Picture } from "@/content/types";
import { sizes } from "@/lib/sizes";

type Props = {
  title: string;
  highlight: string;
  line: string;
  link: LinkItem;
  picture: Picture;
};

export function ProductFeature({ title, highlight, line, link, picture }: Props) {
  return (
    <section className="grid py-14 md:grid-cols-2 md:grid-rows-[1fr_auto_auto_1fr] md:py-0">
      <div className="gutter text-center md:col-start-1 md:row-start-2 md:px-(--caption-pad)">
        <h2 className="text-balance font-serif text-[clamp(2.25rem,1.7rem+2.4vw,4rem)] leading-[1.1]">
          <Highlight text={title} marks={[{ text: highlight, className: "display text-[0.8em] text-pine" }]} />
        </h2>
        <p className="copy-lg mx-auto mt-4 max-w-[34ch]">{line}</p>
      </div>
      <Frame
        picture={picture}
        sizes={sizes.half}
        aspect="aspect-portrait w-full md:aspect-auto md:h-[min(calc(100svh-var(--header-h)),62.5vw)]"
        className="mt-8 md:col-start-2 md:row-span-4 md:row-start-1 md:mt-0"
      />
      <div className="gutter mt-8 md:col-start-1 md:row-start-3 md:px-(--caption-pad)">
        <div className="mx-auto max-w-sm">
          <Button href={link.href} variant="solid">
            {link.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
