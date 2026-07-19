import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { kv } from "@vercel/kv";
import { getPostBySlug, getPostStaticParams, Post } from "@/lib/cms";
import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

export const revalidate = 60; // Revalidate every 60 seconds

type InsightPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export function generateStaticParams() {
  return getPostStaticParams();
}

export async function generateMetadata({ params, searchParams }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  let post: Post | undefined = getPostBySlug(slug, locale);

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!post && kvUrl && kvToken) {
    try {
      const redis = process.env.KV_REST_API_URL ? kv : require('@vercel/kv').createClient({ url: kvUrl, token: kvToken });
      const dynamicPosts: Post[] = await redis.get("dynamic-insights") || [];
      post = dynamicPosts.find((p: Post) => p.slug === slug);
    } catch (e) {
      console.error(e);
    }
  }

  if (!post) {
    return { title: "Insight Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function InsightDetailPage({ params, searchParams }: InsightPageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].insights;
  let post: Post | undefined = getPostBySlug(slug, locale);

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!post && kvUrl && kvToken) {
    try {
      const redis = process.env.KV_REST_API_URL ? kv : require('@vercel/kv').createClient({ url: kvUrl, token: kvToken });
      const dynamicPosts: Post[] = await redis.get("dynamic-insights") || [];
      post = dynamicPosts.find((p: Post) => p.slug === slug);
    } catch (e) {
      console.error(e);
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-background py-10 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 px-0">
          <Link href={hrefWithLocale("/insights", locale)}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </Link>
        </Button>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6f2] px-3 py-1 text-xs font-medium text-[#1d6b4f]">
            {post.date} · {post.readTime}
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        </Reveal>
      </div>
      <div className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.08}>
          <div className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-border/60 shadow-xl shadow-black/[0.05]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.12}>
        <div className="mx-auto mt-10 grid w-full max-w-3xl gap-6 px-4 text-base leading-8 text-muted-foreground sm:px-6 lg:px-8">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </article>
  );
}
