import type { Metadata } from "next";

import { RfqCheckout } from "@/components/rfq-checkout";
import { getProducts } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "RFQ Checkout",
  description: "Submit a consolidated export RFQ to CO EXPORT.ID.",
};

type CheckoutPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].marketplace;
  const products = getProducts(locale);

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.checkoutTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{copy.checkoutDescription}</p>
        </div>
        <RfqCheckout products={products} locale={locale} />
      </div>
    </section>
  );
}
