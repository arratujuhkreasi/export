import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileText, MapPin, MessageCircle, ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MarketplaceProductCard } from "@/components/marketplace-product-card";
import { Reveal } from "@/components/reveal";
import { getProductBySlug, getProductStaticParams, getProducts } from "@/lib/cms";
import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({ params, searchParams }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const product = getProductBySlug(slug, locale);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].products;
  const mktCopy = ui[locale].marketplace;
  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const specLabels = copy.specs;
  const relatedProducts = getProducts(locale).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <article className="bg-background py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 px-0 text-muted-foreground hover:text-foreground">
          <Link href={hrefWithLocale("/products", locale)}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </Link>
        </Button>

        {/* Main product section */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left: Image */}
          <Reveal>
            <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-[#f6faf8] shadow-xl shadow-black/[0.05]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {product.discount && (
                <span className="absolute left-4 top-4 rounded-lg bg-[#1d6b4f] px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                  {product.discount}
                </span>
              )}
            </div>
          </Reveal>

          {/* Right: Details */}
          <Reveal delay={0.08}>
            <div>
              {/* Breadcrumb badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-md bg-[#eef6f2] text-[#1d6b4f]">
                  {product.category}
                </Badge>
                {product.isNew && (
                  <Badge variant="secondary" className="rounded-md bg-amber-50 text-amber-600">
                    NEW
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{product.longDescription}</p>

              {/* Origin */}
              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-[#1d6b4f]" aria-hidden="true" />
                {product.origin}
              </div>

              <Separator className="my-6" />

              {/* Price Section */}
              <div className="rounded-xl border border-[#b9d8c7]/60 bg-gradient-to-br from-[#eef6f2] to-[#f6faf8] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1d6b4f]">{copy.priceRange}</p>
                <p className="mt-2 text-3xl font-bold text-[#143421]">{product.priceRange}</p>
                <p className="mt-1 text-sm text-muted-foreground">{product.incoterm}</p>
              </div>

              {/* Quick specs grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/60 bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{copy.minOrder}</p>
                  <p className="mt-1 text-sm font-semibold">{product.minOrder}</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{copy.leadTime}</p>
                  <p className="mt-1 text-sm font-semibold">{product.leadTime}</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{copy.hsCode}</p>
                  <p className="mt-1 text-sm font-semibold">{product.hsCode}</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{copy.supplyCapacity}</p>
                  <p className="mt-1 text-sm font-semibold">{product.supplyCapacity}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 flex-1 bg-[#1d6b4f] text-white shadow-lg shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-xl active:scale-[0.98]"
                >
                  <Link href={hrefWithLocale(`/contact?product=${product.slug}`, locale)}>
                    <ShoppingBag className="mr-2 size-4" />
                    {mktCopy.requestQuote}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 flex-1 border-[#1d6b4f]/20 text-[#1d6b4f] transition-all duration-300 hover:border-[#1d6b4f]/40 hover:bg-[#eef6f2] active:scale-[0.98]"
                >
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 size-4" />
                    {mktCopy.chatWhatsapp}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tabs-like sections */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Specifications */}
          <Reveal>
            <section className="rounded-xl border border-border/60 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold">{copy.catalog}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border/60 bg-[#faf8f5] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {specLabels[label as keyof typeof specLabels]}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-[#b9d8c7]/40 bg-[#eef6f2]/50 p-4">
                <p className="text-xs font-semibold text-[#1d6b4f]">{copy.catalogNote}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{product.catalogNote}</p>
              </div>
            </section>
          </Reveal>

          {/* Documents */}
          <Reveal delay={0.08}>
            <section className="rounded-xl border border-border/60 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <FileText className="size-5 text-[#1d6b4f]" aria-hidden="true" />
                {copy.exportDocuments}
              </h2>
              <div className="mt-5 grid gap-2">
                {product.documents.map((document) => (
                  <div key={document} className="flex items-center gap-3 rounded-lg border border-border/60 bg-[#faf8f5] p-3">
                    <CheckCircle2 className="size-4 flex-none text-emerald-500" aria-hidden="true" />
                    <span className="text-sm font-medium">{document}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Applications */}
          <Reveal>
            <section className="rounded-xl border border-border/60 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold">{copy.applications}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <span key={app} className="badge-export rounded-full px-3 py-1.5 text-xs">
                    {app}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Quality Control */}
          <Reveal delay={0.08}>
            <section className="rounded-xl border border-border/60 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold">{copy.qualityControl}</h2>
              <div className="mt-5 grid gap-2">
                {product.qualityControl.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-border/60 bg-[#faf8f5] p-3">
                    <CheckCircle2 className="size-4 flex-none text-emerald-500" aria-hidden="true" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        {/* Product Knowledge */}
        <Reveal>
          <section className="mt-8 rounded-xl border border-border/60 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold">{copy.productKnowledge}</h2>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-muted-foreground">
              {product.knowledge.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">
                {locale === "id" ? "Produk Terkait" : "Related Products"}
              </h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((p, index) => (
                <Reveal key={p.id} delay={index * 0.06}>
                  <MarketplaceProductCard product={p} locale={locale} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
