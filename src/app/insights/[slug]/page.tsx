import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPostBySlug, posts } from "@/lib/cms";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Insight Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-background py-10 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 px-0">
          <Link href="/insights">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Insights
          </Link>
        </Button>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">
          {post.date} - {post.readTime}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
      </div>
      <div className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mx-auto mt-10 grid w-full max-w-3xl gap-6 px-4 text-base leading-8 text-muted-foreground sm:px-6 lg:px-8">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
