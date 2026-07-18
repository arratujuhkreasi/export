import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/lib/cms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";

export function ProductCard({
  product,
  locale,
  imageLoading = "lazy",
}: {
  product: Product;
  locale: Locale;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <Card className="gradient-border card-lift group h-full overflow-hidden rounded-xl border-border/60 py-0 shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading={imageLoading}
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <CardContent className="p-5">
        <Badge variant="secondary" className="rounded-md bg-[#eef6f2] text-[#1d6b4f]">{product.category}</Badge>
        <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <div className="mt-4 rounded-lg border border-border/60 bg-gradient-to-br from-[#f6f9f7] to-[#eef6f2] p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[#1d6b4f]/70">{ui[locale].products.priceRange}</p>
          <p className="mt-1 text-lg font-semibold text-[#143421]">{product.priceRange}</p>
          <p className="mt-1 text-xs text-muted-foreground">{product.incoterm}</p>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild variant="outline" className="group/btn w-full border-border/60 transition-all duration-300 hover:border-[#1d6b4f]/30 hover:bg-[#eef6f2]">
          <Link href={hrefWithLocale(`/products/${product.slug}`, locale)}>
            {ui[locale].products.viewDetails}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
