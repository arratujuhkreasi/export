import Link from "next/link";
import { ArrowRight, Container, Globe2, Sprout } from "lucide-react";

import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { InsightCard } from "@/components/insight-card";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getRecentPosts } from "@/lib/cms";
import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

const metricIcons = [Sprout, Container, Globe2] as const;

type HomeProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].home;
  const featuredProducts = getFeaturedProducts(locale);
  const recentPosts = getRecentPosts(locale);

  return (
    <>
      <HeroSection locale={locale} />

      {/* Metrics section */}
      <section className="relative -mt-12 z-10 pb-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {copy.metrics.map(({ metric, label }, index) => {
            const Icon = metricIcons[index];

            return (
              <Reveal key={metric} delay={index * 0.08}>
                <div className="gradient-border card-lift group flex items-center gap-4 rounded-xl border border-border/50 bg-white p-5 shadow-lg shadow-black/[0.04]">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2] text-[#174f3b] shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{metric}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <FeatureGrid locale={locale} />

      {/* Featured products */}
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
                  <span className="inline-block h-px w-8 bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" aria-hidden="true" />
                  <span className="gradient-text">{copy.featuredEyebrow}</span>
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {copy.featuredTitle}
                </h2>
              </div>
            </Reveal>
            <Button asChild variant="outline" className="group border-border/60 transition-all duration-300 hover:border-[#1d6b4f]/30 hover:bg-[#eef6f2]">
              <Link href={hrefWithLocale("/products", locale)}>
                {copy.viewCatalog} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08}>
                <ProductCard product={product} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="relative overflow-hidden bg-[#eef6f2] py-20">
        {/* Subtle mesh gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 70% 20%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(196,163,90,0.04), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
                  <span className="inline-block h-px w-8 bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" aria-hidden="true" />
                  <span className="gradient-text">{copy.insightsEyebrow}</span>
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {copy.insightsTitle}
                </h2>
              </div>
            </Reveal>
            <Button asChild variant="outline" className="group border-border/60 bg-white/60 transition-all duration-300 hover:border-[#1d6b4f]/30 hover:bg-white">
              <Link href={hrefWithLocale("/insights", locale)}>
                {copy.readInsights} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {recentPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.08}>
                <InsightCard post={post} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
