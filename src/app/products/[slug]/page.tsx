import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileText, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/reveal";
import { getProductBySlug, getProductStaticParams } from "@/lib/cms";
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
  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const specLabels = copy.specs;

  return (
    <article className="bg-background py-10 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 px-0">
          <Link href={hrefWithLocale("/products", locale)}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </Link>
        </Button>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 shadow-xl shadow-black/[0.05]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <Badge variant="secondary" className="rounded-md bg-[#eef6f2] text-[#1d6b4f]">
                {product.category}
              </Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.longDescription}</p>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2]">
                  <MapPin className="size-4 text-[#1d6b4f]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium">{copy.origin}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{product.origin}</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-[#b9d8c7]/60 bg-gradient-to-br from-[#eef6f2] to-[#f6faf8] p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1d6b4f]">{copy.priceRange}</p>
                <p className="mt-2 text-2xl font-semibold text-[#143421]">{product.priceRange}</p>
                <p className="mt-1 text-sm text-muted-foreground">{product.incoterm}</p>
              </div>
              <Separator className="my-8" />
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="card-lift rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {specLabels[label as keyof typeof specLabels]}
                    </p>
                    <p className="mt-2 font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8 h-12 bg-[#1d6b4f] shadow-lg shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-xl hover:shadow-[#1d6b4f]/25 active:scale-[0.98]">
                <Link href={hrefWithLocale(`/contact?product=${product.slug}`, locale)}>{copy.requestQuote}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <section className="mt-14 rounded-xl border border-border/60 bg-card p-5 shadow-lg shadow-black/[0.03] sm:p-6">
            <h2 className="text-2xl font-semibold">{copy.catalog}</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[
                [copy.minOrder, product.minOrder],
                [copy.incoterm, product.incoterm],
                [copy.leadTime, product.leadTime],
                [copy.hsCode, product.hsCode],
                [copy.supplyCapacity, product.supplyCapacity],
                [copy.priceRange, product.priceRange],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border/60 bg-gradient-to-br from-background to-[#faf8f5] p-4 transition-colors duration-200 hover:bg-[#eef6f2]/50">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-[#b9d8c7]/60 bg-gradient-to-br from-[#eef6f2] to-[#f6faf8] p-4">
              <p className="text-sm font-semibold">{copy.catalogNote}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.catalogNote}</p>
            </div>
          </section>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2]">
                  <FileText className="size-4 text-[#1d6b4f]" aria-hidden="true" />
                </div>
                {copy.exportDocuments}
              </h2>
              <div className="mt-5 grid gap-3">
                {product.documents.map((document) => (
                  <div key={document} className="card-lift flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                    <CheckCircle2 className="size-5 text-emerald-500" aria-hidden="true" />
                    <span className="text-sm font-medium">{document}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal delay={0.08}>
            <section>
              <h2 className="text-2xl font-semibold">{copy.applications}</h2>
              <div className="mt-5 grid gap-3">
                {product.applications.map((application) => (
                  <div key={application} className="card-lift rounded-xl border border-border/60 bg-card p-4 text-sm font-medium shadow-sm">
                    {application}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">{copy.productKnowledge}</h2>
              <div className="mt-5 grid gap-4 text-sm leading-7 text-muted-foreground">
                {product.knowledge.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal delay={0.08}>
            <section>
              <h2 className="text-2xl font-semibold">{copy.qualityControl}</h2>
              <div className="mt-5 grid gap-3">
                {product.qualityControl.map((item) => (
                  <div key={item} className="card-lift flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                    <CheckCircle2 className="size-5 text-emerald-500" aria-hidden="true" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
