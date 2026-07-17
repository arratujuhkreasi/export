import type { Metadata } from "next";

import { InsightCard } from "@/components/insight-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPosts } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Insights",
  description: "Educational export sourcing articles for B2B commodity buyers.",
};

type InsightsPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].insights;
  const posts = getPosts(locale);

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
