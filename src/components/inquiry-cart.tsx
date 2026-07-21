"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/cms";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";
import {
  type InquiryCartItem,
  type TradeTerm,
  readInquiryCart,
  removeInquiryCartItem,
  writeInquiryCart,
} from "@/lib/marketplace";

type InquiryCartProps = {
  products: Product[];
  locale: Locale;
};

const tradeTerms: TradeTerm[] = ["FOB", "CIF", "CFR", "EXW"];

export function InquiryCart({ products, locale }: InquiryCartProps) {
  const copy = ui[locale].marketplace;
  const [items, setItems] = useState<InquiryCartItem[]>([]);
  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  useEffect(() => {
    setItems(readInquiryCart());
  }, []);

  function updateItem(productId: string, patch: Partial<InquiryCartItem>) {
    const next = items.map((item) => (item.productId === productId ? { ...item, ...patch } : item));
    setItems(next);
    writeInquiryCart(next);
  }

  function removeItem(productId: string) {
    removeInquiryCartItem(productId);
    setItems(readInquiryCart());
  }

  const validItems = items.filter((item) => productMap.has(item.productId));

  if (validItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-border/60 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{copy.cartTitle}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{copy.emptyCart}</p>
        <Button asChild className="mt-6 bg-[#1d6b4f] text-white hover:bg-[#174f3b]">
          <Link href={hrefWithLocale("/products", locale)}>{copy.continueShopping}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {validItems.map((item) => {
          const product = productMap.get(item.productId);

          if (!product) return null;

          return (
            <div key={item.productId} className="rounded-xl border border-border/60 bg-white p-4 shadow-sm sm:p-5">
              <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <Link href={hrefWithLocale(`/products/${product.slug}`, locale)} className="relative aspect-square overflow-hidden rounded-lg bg-[#f6faf8]">
                  <Image src={product.image} alt={product.name} fill sizes="120px" className="object-cover" />
                </Link>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{product.category}</p>
                      <Link href={hrefWithLocale(`/products/${product.slug}`, locale)} className="mt-1 block text-lg font-bold hover:text-[#1d6b4f]">
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{product.priceRange} · {product.incoterm}</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" aria-label={copy.removeItem} onClick={() => removeItem(item.productId)}>
                      <Trash2 className="size-4" aria-hidden="true" />
                    </Button>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <label className="grid gap-1.5 text-sm font-medium">
                      {copy.quantity}
                      <Input value={item.quantity} onChange={(event) => updateItem(item.productId, { quantity: event.target.value })} />
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium">
                      {copy.destinationPort}
                      <Input value={item.destinationPort} placeholder="Port Klang, Jebel Ali..." onChange={(event) => updateItem(item.productId, { destinationPort: event.target.value })} />
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium">
                      {copy.tradeTerm}
                      <select
                        value={item.tradeTerm}
                        onChange={(event) => updateItem(item.productId, { tradeTerm: event.target.value as TradeTerm })}
                        className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {tradeTerms.map((term) => (
                          <option key={term} value={term}>{term}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="mt-3 grid gap-1.5 text-sm font-medium">
                    {copy.notes}
                    <Textarea value={item.notes} rows={2} placeholder="Grade, packaging, document request..." onChange={(event) => updateItem(item.productId, { notes: event.target.value })} />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="h-fit rounded-xl border border-border/60 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">{copy.cartTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.cartDescription}</p>
        <div className="mt-5 rounded-lg bg-[#eef6f2] p-4 text-sm text-[#174f3b]">
          <p className="font-semibold">{validItems.length} {locale === "id" ? "produk siap RFQ" : "products ready for RFQ"}</p>
          <p className="mt-1 text-xs opacity-80">{locale === "id" ? "Harga final dikonfirmasi setelah spesifikasi dan tujuan." : "Final pricing is confirmed after specification and destination review."}</p>
        </div>
        <Button asChild size="lg" className="mt-5 w-full bg-[#1d6b4f] text-white hover:bg-[#174f3b]">
          <Link href={hrefWithLocale("/checkout", locale)}>
            {copy.proceedCheckout}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link href={hrefWithLocale("/products", locale)}>{copy.continueShopping}</Link>
        </Button>
      </aside>
    </div>
  );
}
