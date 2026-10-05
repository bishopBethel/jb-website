import { InstagramStrip } from "@/components/editorial/InstagramStrip";
import { IntroHero } from "@/components/editorial/IntroHero";
import { ProductFeature } from "@/components/editorial/ProductFeature";
import { RiseLoop } from "@/components/editorial/RiseLoop";
import { Tile } from "@/components/editorial/Tile";
import { TileGrid } from "@/components/editorial/TileGrid";
import { TextLink } from "@/components/ui/TextLink";
import { picture, site } from "@/content";
import { home } from "@/content/pages";
import { instagramProfile } from "@/lib/order";
import { sizes } from "@/lib/sizes";

export default function Home() {
  return (
    <>
      <IntroHero
        title={home.intro.title}
        accents={home.intro.accents}
        body={home.intro.body}
        link={home.intro.link}
        picture={picture(home.intro.image)}
      />

      <RiseLoop title={home.loop.title} items={home.loop.items} />

      <ProductFeature
        title={home.accessorise.title}
        highlight={home.accessorise.highlight}
        accent={home.accessorise.accent}
        line={home.accessorise.line}
        link={home.accessorise.link}
        picture={picture(home.accessorise.image)}
      />

      <TileGrid columns={4} className="mt-px">
        {home.quartet.map((tile) => (
          <Tile
            key={tile.href}
            caption="below"
            title={tile.title}
            href={tile.href}
            picture={picture(tile.image)}
            links={tile.links}
            sizes={sizes.quarter}
          />
        ))}
      </TileGrid>

      <section className="gutter py-14 text-center lg:py-24">
        <p className="mb-5 text-tiny uppercase text-mute">{site.tagline}</p>
        <h2 className="quote mx-auto max-w-[22ch] text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)]">
          {home.statement.title}
        </h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {home.statement.links.map((link) => (
            <li key={link.href} className="text-body">
              <TextLink href={link.href}>{link.label}</TextLink>
            </li>
          ))}
        </ul>
      </section>

      <TileGrid columns={2} className="mt-px">
        {home.duoProduct.map((tile) => (
          <Tile key={tile.title} title={tile.title} href={tile.href} picture={picture(tile.image)} links={tile.links} sizes={sizes.half} />
        ))}
      </TileGrid>

      <InstagramStrip
        handle={site.contact.instagramHandle}
        profileUrl={instagramProfile}
        pictures={home.follow.map(picture)}
      />
    </>
  );
}
