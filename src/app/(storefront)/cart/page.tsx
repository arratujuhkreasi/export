import type { Metadata } from "next";

import { InquiryCart } from "@/components/inquiry-cart";
import { getProducts } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Inquiry Cart",
  description: "Review selected export products before submitting an RFQ.",
};

type CartPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].marketplace;
  const products = getProducts(locale);

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.cartTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{copy.cartDescription}</p>
        </div>
        <InquiryCart products={products} locale={locale} />
      </div>
    </section>
  );
}
