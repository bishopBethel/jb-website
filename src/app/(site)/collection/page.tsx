import { ProductCard } from "@/components/product/ProductCard";
import { StoreNotice } from "@/components/product/StoreNotice";
import { AddToCart } from "@/components/store/AddToCart";
import { getBox, getContent, picture } from "@/content";
import { formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { sizes } from "@/lib/sizes";

export async function generateMetadata() {
  const { collection, site } = await getContent();
  return pageMetadata({ title: collection.title, description: collection.intro, path: "/collection", siteName: site.name });
}

// Only the Pocket Power box is sold, so the store shows it alone; the squares keep their own pages.
export default async function CollectionPage() {
  const content = await getContent();
  const { collection, checkout, shop, store } = content;
  const box = getBox(content);

  return (
    <>
      {/* The brand asked for no visible title; screen readers and search engines still get one. */}
      <h1 className="sr-only">{collection.title}</h1>
      <div className="gutter mx-auto max-w-xl pb-16 pt-6 md:pt-12 lg:pb-24">
        <ProductCard
          product={{
            slug: box.slug,
            kind: box.kind,
            name: box.name,
            descriptor: box.descriptor,
            price: box.price ? formatPrice(box.price) : undefined,
            picture: picture(box.tile),
          }}
          sizes={sizes.half}
          eager
        />
        <div className="mx-auto mt-2 max-w-sm">
          {shop.open && box.purchasable ? (
            <AddToCart slug={box.slug} label={checkout.cart.addToCart} viewCartLabel={checkout.cart.viewCart} max={shop.maxPerOrder} />
          ) : (
            <StoreNotice status={store.status} note={store.note} />
          )}
        </div>
      </div>
    </>
  );
}
