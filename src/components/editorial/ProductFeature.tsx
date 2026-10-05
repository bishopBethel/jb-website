import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Highlight } from "@/components/ui/Highlight";
import type { LinkItem, Picture } from "@/content/types";
import { sizes } from "@/lib/sizes";

type Props = {
  title: string;
  highlight: string;
  accent: string;
  line: string;
  link: LinkItem;
  picture: Picture;
};

export function ProductFeature({ title, highlight, accent, line, link, picture }: Props) {
  return (
    // From md the photo is pinned to the section's full height, so it always matches the text side.
    <section className="relative grid pb-14 pt-12 md:min-h-[min(calc(100svh-var(--header-h)),62.5vw)] md:grid-cols-2 md:grid-rows-[1fr_auto_auto_1fr] md:py-0">
      <Frame
        picture={picture}
        sizes={sizes.half}
        aspect="aspect-portrait w-full md:absolute md:inset-y-0 md:left-0 md:aspect-auto md:w-1/2"
        className="z-10 [mask-image:linear-gradient(to_bottom,#000_calc(100%-8rem),transparent)] md:[mask-image:linear-gradient(to_right,#000_72%,transparent)]"
      />
      <div className="gutter @container relative isolate pt-8 text-center md:static md:col-start-2 md:row-start-2 md:px-(--caption-pad) md:pt-0">
        {/* The photo's edge colours, stretched and softened, run under its fade and settle into linen. */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-32 bottom-0 -z-10 overflow-hidden md:inset-y-0 md:left-[36%] md:right-0">
          <div
            className="absolute -inset-10 bg-[length:100%_1000%] bg-bottom bg-no-repeat blur-2xl saturate-150 md:bg-[length:1000%_100%] md:bg-right"
            style={{ backgroundImage: `url(${picture.src.blurDataURL})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-paper/0 to-paper to-55% md:bg-linear-to-r md:to-60%" />
        </div>
        <h2 className="inline-block text-left text-[min(15cqw,6rem)]">
          <span className="display block">
            <Highlight text={title} marks={[{ text: highlight, className: "text-bronze" }]} />
          </span>{" "}
          <span className="script -mt-[0.56em] ml-[2.7em] block text-pine">{accent}</span>
        </h2>
        <p className="copy-lg mx-auto mt-4 max-w-[34ch]">{line}</p>
      </div>
      <div className="gutter relative mt-8 md:col-start-2 md:row-start-3 md:px-(--caption-pad)">
        <div className="mx-auto max-w-sm">
          <Button href={link.href} variant="solid">
            {link.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
