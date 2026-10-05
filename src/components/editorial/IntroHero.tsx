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
    <section className="grid md:grid-cols-2">
      <Frame
        picture={picture}
        sizes={sizes.half}
        priority
        quality={85}
        aspect="aspect-portrait max-h-[58svh] w-full md:aspect-auto md:h-[min(calc(100svh-var(--header-h)),62.5vw)] md:max-h-none"
      />
      <div className="gutter flex flex-col items-center justify-center pb-14 pt-8 text-center md:px-(--caption-pad) md:py-16">
        <h1 className="heading-lg max-w-[22ch] text-balance">
          <Highlight text={title} marks={accents.map((accent) => ({ text: accent.text, className: tones[accent.tone] }))} />
        </h1>
        <p className="copy-lg mt-5 max-w-[40ch]">{body}</p>
        <div className="mt-8 w-full max-w-sm">
          <Button href={link.href}>{link.label}</Button>
        </div>
      </div>
    </section>
  );
}
