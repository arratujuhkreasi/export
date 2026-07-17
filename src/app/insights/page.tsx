import type { Metadata } from "next";

import { InsightCard } from "@/components/insight-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Insights",
  description: "Educational export sourcing articles for B2B commodity buyers.",
};

export default function InsightsPage() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Insights"
            title="B2B sourcing articles for global buyers"
            description="SEO-ready dummy articles covering commodity applications, export preparation, and importer due diligence."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08}>
              <InsightCard post={post} imageLoading={index === 0 ? "eager" : "lazy"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
