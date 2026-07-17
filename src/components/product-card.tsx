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
    <Card className="h-full overflow-hidden py-0">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading={imageLoading}
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <Badge variant="secondary" className="rounded-md">{product.category}</Badge>
        <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={hrefWithLocale(`/products/${product.slug}`, locale)}>
            {ui[locale].products.viewDetails} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
