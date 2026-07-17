import Link from "next/link";
import { ArrowRight, Container, Globe2, Sprout } from "lucide-react";

import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { InsightCard } from "@/components/insight-card";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getRecentPosts } from "@/lib/cms";

const metrics = [
  { metric: "12+", label: "export-ready dummy SKUs", icon: Sprout },
  { metric: "18", label: "common export documents mapped", icon: Container },
  { metric: "Global", label: "FOB, CNF, and trial shipment support", icon: Globe2 },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const recentPosts = getRecentPosts();

  return (
    <>
      <HeroSection />
      <section className="bg-background py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {metrics.map(({ metric, label, icon: Icon }) => (
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
          ))}
        </div>
      </section>
      <FeatureGrid />
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">Featured products</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Commodity lines prepared for B2B conversations.
                </h2>
              </div>
            </Reveal>
            <Button asChild variant="outline">
              <Link href="/products">
                View Catalog <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08}>
                <ProductCard product={product} />
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">Insights</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Buyer education for commodity sourcing.
                </h2>
              </div>
            </Reveal>
            <Button asChild variant="outline">
              <Link href="/insights">
                Read Insights <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {recentPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.08}>
                <InsightCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
