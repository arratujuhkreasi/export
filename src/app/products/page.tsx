import type { Metadata } from "next";

import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getProducts } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Products",
  description: "CO EXPORT.ID export catalog for coco peat, coco fiber, legal wood, Sumedang sweet potato, and young areca nut.",
};

type ProductsPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].products;
  const products = getProducts(locale);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={copy.title}
            title={copy.pageTitle}
            description={copy.pageDescription}
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} locale={locale} imageLoading={index < 4 ? "eager" : "lazy"} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg shadow-black/[0.03]">
            <div className="border-b border-border/60 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold">{copy.tableTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{copy.tableDescription}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-gradient-to-r from-[#eef6f2] to-[#f6f9f7] text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4 font-semibold">{copy.title}</th>
                    <th className="px-5 py-4 font-semibold">{copy.origin}</th>
                    <th className="px-5 py-4 font-semibold">{copy.priceRange}</th>
                    <th className="px-5 py-4 font-semibold">{copy.minOrder}</th>
                    <th className="px-5 py-4 font-semibold">{copy.leadTime}</th>
                    <th className="px-5 py-4 font-semibold">{copy.supplyCapacity}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {products.map((product) => (
                    <tr key={product.id} className="align-top transition-colors duration-200 hover:bg-[#faf8f5]">
                      <td className="px-5 py-4 font-medium">{product.name}</td>
                      <td className="px-5 py-4 text-muted-foreground">{product.origin}</td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[#143421]">{product.priceRange}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{product.incoterm}</span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{product.minOrder}</td>
                      <td className="px-5 py-4 text-muted-foreground">{product.leadTime}</td>
                      <td className="px-5 py-4 text-muted-foreground">{product.supplyCapacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
