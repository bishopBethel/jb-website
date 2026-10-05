import { IntroHero } from "@/components/editorial/IntroHero";
import { ProductFeature } from "@/components/editorial/ProductFeature";
import { RiseLoop } from "@/components/editorial/RiseLoop";
import { Tile } from "@/components/editorial/Tile";
import { TileGrid } from "@/components/editorial/TileGrid";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { picture, site } from "@/content";
import { home } from "@/content/pages";
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

      <TileGrid columns={3} className="mt-px">
        {home.trio.map((tile, index, all) => (
          <Tile
            key={tile.href}
            caption="below"
            title={tile.title}
            href={tile.href}
            picture={picture(tile.image)}
            links={tile.links}
            // An odd last tile spans the row on phones.
            sizes={index === all.length - 1 && all.length % 2 === 1 ? sizes.thirdOrFull : sizes.third}
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
        <div className="mx-auto mt-10 max-w-sm">
          <Button href={home.statement.shop.href} variant="pine">
            {home.statement.shop.label}
          </Button>
        </div>
      </section>

      <Tile
        className="mt-px"
        title={home.founder.title}
        href={home.founder.href}
        picture={picture(home.founder.image)}
        pair={picture(home.founder.pair)}
        links={home.founder.links}
        sizes={sizes.pair}
      />
    </>
  );
}
