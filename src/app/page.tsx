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
      <section className="bg-background py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {copy.metrics.map(({ metric, label }, index) => {
            const Icon = metricIcons[index];

            return (
              <Reveal key={metric}>
                <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-5">
                  <div className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground">
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
      <FeatureGrid locale={locale} />
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">{copy.featuredEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {copy.featuredTitle}
                </h2>
              </div>
            </Reveal>
            <Button asChild variant="outline">
              <Link href={hrefWithLocale("/products", locale)}>
                {copy.viewCatalog} <ArrowRight className="size-4" aria-hidden="true" />
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
      <section className="bg-[#eef6f2] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">{copy.insightsEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {copy.insightsTitle}
                </h2>
              </div>
            </Reveal>
            <Button asChild variant="outline">
              <Link href={hrefWithLocale("/insights", locale)}>
                {copy.readInsights} <ArrowRight className="size-4" aria-hidden="true" />
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
