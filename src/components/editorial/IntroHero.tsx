import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Highlight } from "@/components/ui/Highlight";
import type { Accent, LinkItem, Picture } from "@/content/types";
import { sizes } from "@/lib/sizes";

const tones = { pine: "text-pine", bronze: "text-bronze" };

type Props = {
  title: string;
  accents: Accent[];
  body: string;
  link: LinkItem;
  picture: Picture;
};

export function IntroHero({ title, accents, body, link, picture }: Props) {
  return (
    // The section slides under the header, which stays transparent over it until the page scrolls.
    // On phones it fills the first screen: the photo takes what the text leaves.
    <section
      data-hero="split"
      className="relative -mt-(--header-h) grid min-h-svh grid-rows-[minmax(10rem,1fr)_auto] md:min-h-[min(100svh,calc(62.5vw+var(--header-h)))] md:grid-cols-2 md:grid-rows-none"
    >
      <Frame
        picture={picture}
        sizes={sizes.half}
        priority
        quality={85}
        aspect="w-full md:absolute md:inset-y-0 md:left-0 md:w-1/2"
        className="z-10 max-md:[&_img]:object-[40%_22%]! [mask-image:linear-gradient(to_bottom,#000_max(40%,calc(100%-13rem)),transparent_calc(100%-3rem))] md:[mask-image:linear-gradient(to_right,#000_72%,transparent)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-black/45 to-transparent md:right-1/2 md:[mask-image:linear-gradient(to_right,#000_72%,transparent)]" />
      <div className="relative gutter -mt-16 flex flex-col items-center justify-center pb-8 text-center md:col-start-2 md:mt-0 md:px-(--caption-pad) md:pb-16 md:pt-[calc(4rem+var(--header-h))]">
        {/* The photo's edge colours, stretched and softened, run under its fade and settle into linen. */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-36 bottom-0 -z-10 overflow-hidden md:inset-y-0 md:-left-[28%] md:right-0">
          <div
            className="absolute -inset-10 bg-[length:100%_1000%] bg-bottom bg-no-repeat blur-2xl saturate-150 md:bg-[length:1000%_100%] md:bg-right"
            style={{ backgroundImage: `url(${picture.src.blurDataURL})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-paper/0 to-paper to-35% md:bg-linear-to-r md:to-60%" />
        </div>
        {/* On phones the text rises over the photo's fade, so it sits above the photo; the blend stays below. */}
        <h1 className="heading-lg relative z-20 max-w-[22ch] text-balance">
          <Highlight text={title} marks={accents.map((accent) => ({ text: accent.text, className: tones[accent.tone] }))} />
        </h1>
        <p className="copy-lg relative z-20 mt-4 max-w-[40ch] md:mt-5">{body}</p>
        <div className="relative z-20 mt-6 w-full max-w-sm md:mt-8">
          <Button href={link.href}>{link.label}</Button>
        </div>
      </div>
    </section>
  );
}
