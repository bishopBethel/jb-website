import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import config from "@payload-config";
import { getPayload } from "payload";
import { CheckoutForm } from "@/components/store/CheckoutForm";
import { StoreNotice } from "@/components/product/StoreNotice";
import { Frame } from "@/components/ui/Frame";
import { getContent, picture } from "@/content";
import { sizes } from "@/lib/sizes";
import { getShop, stockOf } from "@/store/checkout";
import { nigerianStates } from "@/store/states";

// Prices and stock change at any moment, so checkout always renders fresh.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { checkout } = await getContent();
  return { title: checkout.form.title, robots: { index: false, follow: false } };
}

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const { product: requested } = await props.searchParams;
  const content = await getContent();
  const { checkout, policies } = content;
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  const shop = await getShop(payload);

  // Signed-in admins can test checkout before the shop opens.
  const open = shop.status === "open" || user?.role === "admin";
  const slug = typeof requested === "string" ? requested : content.products.find((product) => product.purchasable)?.slug;
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug ?? "" }, _status: { equals: "published" } },
    limit: 1,
    depth: 0,
  });
  const product = docs[0];
  if (!product?.purchasable || typeof product.price !== "number" || product.price <= 0) notFound();
  const display = content.products.find((item) => item.slug === product.slug);
  const available = Math.min(shop.maxPerOrder, await stockOf(payload, product.id));

  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="gutter pb-16 pt-10 lg:px-16 lg:pb-24 lg:pt-16 xl:px-24">
        <h1 className="heading-lg">{checkout.form.title}</h1>
        {checkout.form.intro && <p className="copy-lg mt-5 max-w-lg">{checkout.form.intro}</p>}
        <div className="mt-10 max-w-xl">
          {!open ? (
            <StoreNotice status={checkout.form.closed} />
          ) : available < 1 ? (
            <StoreNotice status={checkout.form.soldOut} />
          ) : (
            <CheckoutForm
              product={{ slug: product.slug, name: product.name, unitPrice: product.price }}
              maxQuantity={available}
              zones={content.shop.zones}
              states={nigerianStates}
              copy={checkout.form}
              policies={policies.map((policy) => ({ label: policy.title, href: `/policies/${policy.slug}` }))}
            />
          )}
        </div>
      </div>
      {display && (
        <div className="group hidden lg:sticky lg:top-(--header-h) lg:block lg:h-[calc(100svh-var(--header-h))] lg:self-start">
          <Frame picture={picture(display.tile)} sizes={sizes.half} priority aspect="lg:aspect-auto lg:h-full" />
        </div>
      )}
    </div>
  );
}
