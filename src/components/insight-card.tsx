import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Post } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";

export function InsightCard({
  post,
  locale,
  imageLoading = "lazy",
}: {
  post: Post;
  locale: Locale;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <Card className="gradient-border card-lift group h-full overflow-hidden rounded-xl border-border/60 py-0 shadow-sm">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading={imageLoading}
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
        />
      </div>
      <CardContent className="p-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6f2] px-3 py-1 text-xs font-medium text-[#1d6b4f]">
          {post.date} · {post.readTime}
        </span>
        <h3 className="mt-3 text-xl font-semibold leading-tight">{post.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild variant="ghost" className="group/btn px-0 text-[#1d6b4f] hover:text-[#174f3b]">
          <Link href={hrefWithLocale(`/insights/${post.slug}`, locale)}>
            {ui[locale].insights.readArticle}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
