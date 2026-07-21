import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

import { CategoryBar } from "@/components/category-bar";
import { MarketplaceHero } from "@/components/marketplace-hero";
import { MarketplaceProductCard } from "@/components/marketplace-product-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { PromoBanners } from "@/components/promo-banners";
import { Reveal } from "@/components/reveal";
import { Testimonials } from "@/components/testimonials";
import { TrustBadges } from "@/components/trust-badges";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/cms";
import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

type HomeProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].home;
  const allProducts = getProducts(locale);

  return (
    <>
      {/* Marketplace Hero */}
      <MarketplaceHero locale={locale} />

      {/* Category Bar */}
      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      {/* Trust Badges */}
      <TrustBadges locale={locale} />

      {/* Featured Products */}
      <section className="bg-background py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">{copy.featuredTitle}</h2>
            </Reveal>
            <Button asChild variant="ghost" className="text-sm text-[#1d6b4f] hover:bg-[#eef6f2]">
              <Link href={hrefWithLocale("/products", locale)}>
                {copy.viewAll} <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{copy.featuredSubtitle}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.05}>
                <MarketplaceProductCard
                  product={product}
                  locale={locale}
                  imageLoading={index < 5 ? "eager" : "lazy"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Sidebar + Products could go here */}
      <section className="bg-[#faf8f5] py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left: Special Offer Card */}
            <Reveal>
              <div className="rounded-2xl bg-gradient-to-b from-[#e8f5ee] to-[#d7eadf] p-6 shadow-sm">
                <span className="badge-export">{ui[locale].marketplace.specialOffer}</span>
                <h3 className="mt-4 text-2xl font-bold text-[#143421]">
                  {ui[locale].marketplace.getDiscount}
                </h3>
                <p className="mt-1 text-sm text-[#143421]/70">
                  {ui[locale].marketplace.onBulkOrder}
                </p>
                <div className="mt-4 rounded-lg border-2 border-dashed border-[#1d6b4f]/30 bg-white/60 px-4 py-2 text-center">
                  <span className="font-mono text-lg font-bold text-[#1d6b4f]">
                    {ui[locale].marketplace.promoCode}
                  </span>
                </div>
                <Button
                  asChild
                  className="mt-5 w-full rounded-full bg-[#1d6b4f] text-white hover:bg-[#174f3b]"
                >
                  <Link href={hrefWithLocale("/products", locale)}>
                    {ui[locale].marketplace.shopNow} <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>

                {/* RFQ flow note */}
                <div className="mt-6 rounded-xl bg-white/70 p-4 shadow-sm">
                  <p className="text-xs italic leading-5 text-muted-foreground">
                    {locale === "id"
                      ? "Tambahkan produk ke inquiry cart, kirim RFQ, lalu tim sales menyiapkan quotation final, payment term, dan dokumen ekspor."
                      : "Add products to the inquiry cart, submit an RFQ, then the sales desk prepares final quotation, payment terms, and export documents."}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[#1d6b4f] text-[10px] font-bold text-white">
                      RFQ
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{locale === "id" ? "Alur transaksi B2B" : "B2B transaction flow"}</p>
                      <p className="text-[10px] text-muted-foreground">⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: More Products */}
            <div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {allProducts.map((product, index) => (
                  <Reveal key={`grid2-${product.id}`} delay={index * 0.05}>
                    <MarketplaceProductCard product={product} locale={locale} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <PromoBanners locale={locale} />

      {/* Testimonials */}
      <Testimonials locale={locale} />

      {/* Newsletter */}
      <NewsletterSection locale={locale} />
    </>
  );
}
