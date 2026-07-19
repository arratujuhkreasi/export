import type { Metadata } from "next";

import { InsightCard } from "@/components/insight-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { kv } from "@vercel/kv";
import { getPosts, Post } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Insights",
  description: "Educational export sourcing articles for B2B commodity buyers.",
};

// Next.js dynamic rendering for this page so it updates when KV updates
export const revalidate = 60; // Revalidate every 60 seconds

type InsightsPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].insights;
  const staticPosts = getPosts(locale);
  
  let dynamicPosts: Post[] = [];
  try {
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (kvUrl && kvToken) {
      const redis = process.env.KV_REST_API_URL ? kv : require('@vercel/kv').createClient({ url: kvUrl, token: kvToken });
      dynamicPosts = await redis.get("dynamic-insights") || [];
    }
  } catch (error) {
    console.error("Failed to fetch dynamic insights from KV:", error);
  }

  const posts = [...dynamicPosts, ...staticPosts];

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
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08}>
              <InsightCard post={post} locale={locale} imageLoading={index === 0 ? "eager" : "lazy"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
