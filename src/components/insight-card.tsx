import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Post } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function InsightCard({
  post,
  imageLoading = "lazy",
}: {
  post: Post;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <Card className="h-full overflow-hidden py-0">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading={imageLoading}
          className="object-cover"
        />
      </div>
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1d6b4f]">
          {post.date} - {post.readTime}
        </p>
        <h3 className="mt-3 text-xl font-semibold leading-tight">{post.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild variant="ghost" className="px-0">
          <Link href={`/insights/${post.slug}`}>
            Read Article <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
