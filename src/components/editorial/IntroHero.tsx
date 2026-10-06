import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Highlight } from "@/components/ui/Highlight";
import type { Accent, LinkItem, Picture } from "@/content/types";
import { cn } from "@/lib/cn";
import { sizes } from "@/lib/sizes";

// Pine would sink into the hero's carbon, so its accent is an underline instead.
const tones = {
  pine: "underline decoration-[0.05em] underline-offset-[0.06em]",
  bronze: "text-bronze",
};

// Each letter of the RISE row glows in turn; a capital and its word share one step of the six-second cycle.
const glyph = "inline-block animate-rise-wave still:animate-none still:opacity-80";
const step = 1.5;

type Props = {
  title: string;
  accents: Accent[];
  body: string;
  link: LinkItem;
  /** The words behind R, I, S and E, shown under the button. */
  rise: string[];
  picture: Picture;
};

export function IntroHero({ title, accents, body, link, rise, picture }: Props) {
  return (
    // A carbon card floating on linen that slides under the header, transparent over it until the page
    // scrolls. On phones it fills the screen above the dock; from md the photo takes the left half.
    <section
      data-hero
      data-wide
      className="relative isolate mx-2.5 -mt-[calc(var(--header-h)-0.625rem)] grid min-h-[calc(100svh-0.625rem-var(--dock-space))] grid-rows-[minmax(10rem,1fr)_auto] overflow-hidden rounded-2xl bg-ink text-paper [clip-path:inset(0_round_1rem)] md:mx-4 md:-mt-[calc(var(--header-h)-1rem)] md:min-h-[min(calc(100svh-2rem),calc(62.5vw+var(--header-h)))] md:grid-cols-2 md:grid-rows-none"
    >
      {/* On phones the photo is sized to its frame's height: his head sits high, beside the logo, and his
          hands end above the fade, zooming in only as far as the frame allows. */}
      <Frame
        picture={picture}
        sizes={sizes.hero}
        priority
        quality={85}
        aspect="w-full md:absolute md:inset-y-0 md:left-0 md:w-1/2"
        className="z-10 @container-[size] max-md:[--h:clamp(125cqw,408cqh_-_510px,240cqw)] max-md:[&_img]:h-(--h)! max-md:[&_img]:w-[calc(var(--h)*0.8)]! max-md:[&_img]:max-w-none max-md:[&_img]:object-center! max-md:[&_img]:top-[calc(28px_-_0.23*var(--h))]! max-md:[&_img]:left-[clamp(100cqw_-_0.8*var(--h),31cqw_-_0.296*var(--h),0px)]! md:[&_img]:origin-[34%_26%] md:[&_img]:scale-[1.8] [mask-image:linear-gradient(to_bottom,#000_max(40%,calc(100%-8rem)),transparent_calc(100%-3rem))] md:[mask-image:linear-gradient(to_right,#000_72%,transparent)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b md:h-40 from-black/45 to-transparent md:right-1/2 md:[mask-image:linear-gradient(to_right,#000_72%,transparent)]" />
      <div className="relative gutter -mt-16 flex flex-col items-center justify-center pb-(--gutter) text-center md:col-start-2 md:mt-0 md:px-(--caption-pad) md:pb-16 md:pt-[calc(4rem+var(--header-h))]">
        {/* The photo's edge colours, stretched and softened, run under its fade and settle into carbon. */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-36 bottom-0 -z-10 overflow-hidden md:inset-y-0 md:-left-[28%] md:right-0">
          <div
            className="absolute -inset-10 bg-[length:100%_1000%] bg-bottom bg-no-repeat blur-2xl saturate-150 md:bg-[length:1000%_100%] md:bg-right"
            style={{ backgroundImage: `url(${picture.src.blurDataURL})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-ink/0 to-ink to-35% md:bg-linear-to-r md:to-60%" />
        </div>
        {/* On phones the text rises over the photo's fade, so it sits above the photo; the blend stays below. */}
        <h1 className="heading-lg relative z-20 md:max-w-[22ch] text-balance leading-[1.16]">
          <Highlight text={title} marks={accents.map((accent) => ({ text: accent.text, className: tones[accent.tone] }))} />
        </h1>
        <p className="copy-lg relative z-20 mt-4 max-w-[40ch] md:mt-5">{body}</p>
        <div className="relative z-20 mt-6 w-full md:mt-8 md:max-w-sm">
          <Button href={link.href} variant="bronze">
            {link.label}
          </Button>
        </div>
        <ul
          aria-label="What RISE stands for"
          className="glass-dark relative z-20 mt-(--gutter) flex w-full justify-around rounded-2xl md:mt-4 md:max-w-sm px-6 py-4"
        >
          {rise.map((word, index) => (
            <li key={word} className="flex flex-col items-center gap-2.5">
              <span
                aria-hidden="true"
                className={cn(glyph, "heading-md leading-none [text-box:trim-both_cap_alphabetic]")}
                style={{ animationDelay: `${index * step}s` }}
              >
                {word[0]}
              </span>
              <span className="sr-only">{word}</span>
              <span aria-hidden="true" className="text-tiny tracking-normal [text-box:trim-both_cap_alphabetic]">
                {/* The wave leaves the capital and runs through the word before the next capital lights. */}
                {[...word].map((char, at) => (
                  <span
                    key={at}
                    className={glyph}
                    style={{ animationDelay: `${index * step + ((at + 1) / (word.length + 1)) * step}s` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
