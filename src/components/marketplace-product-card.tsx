"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";

import type { Product } from "@/lib/cms";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";

export function MarketplaceProductCard({
  product,
  locale,
  imageLoading = "lazy",
}: {
  product: Product;
  locale: Locale;
  imageLoading?: "eager" | "lazy";
}) {
  const copy = ui[locale].products;

  return (
    <Link
      href={hrefWithLocale(`/products/${product.slug}`, locale)}
      className="marketplace-card group block h-full overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6faf8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
          loading={imageLoading}
          className="object-cover transition-all duration-500 ease-out group-hover:scale-110"
        />

        {/* Discount / New badge */}
        {product.discount && (
          <span className="absolute left-3 top-3 rounded-md bg-[#1d6b4f] px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            {product.discount}
          </span>
        )}

        {product.isNew && !product.discount && (
          <span className="absolute left-3 top-3 rounded-md bg-amber-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            NEW
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          className="wishlist-heart absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-sm backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="Add to wishlist"
        >
          <Heart className="size-4" />
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>

        {/* Product name */}
        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-foreground group-hover:text-[#1d6b4f]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#1d6b4f]">{product.priceRange}</span>
        </div>

        {/* Incoterm */}
        <p className="mt-1 text-[11px] text-muted-foreground">{product.incoterm}</p>

        {/* Rating + Origin */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" aria-hidden="true" />
            <span className="truncate max-w-[100px]">{product.origin.split(",")[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
