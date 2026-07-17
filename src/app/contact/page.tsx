import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getProductBySlug } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a B2B export inquiry to Nusantara Harvest Co.",
};

type ContactPageProps = {
  searchParams: Promise<{ product?: string; lang?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product: productSlug, lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].contact;
  const selectedProduct = productSlug ? getProductBySlug(productSlug, locale) : undefined;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow={copy.title}
              title={copy.pageTitle}
              description={copy.pageDescription}
            />
            <div className="mt-8 grid gap-4">
              <a href="mailto:sales@nusantaraharvest.example" className="flex gap-3 rounded-lg border border-border bg-card p-4 hover:bg-muted/60">
                <Mail className="mt-0.5 size-5 text-[#1d6b4f]" aria-hidden="true" />
                <span>
                  <span className="block font-medium">{copy.email}</span>
                  <span className="text-sm text-muted-foreground">sales@nusantaraharvest.example</span>
                </span>
              </a>
              <a href="https://wa.me/6281234567890" className="flex gap-3 rounded-lg border border-border bg-card p-4 hover:bg-muted/60">
                <MessageCircle className="mt-0.5 size-5 text-[#1d6b4f]" aria-hidden="true" />
                <span>
                  <span className="block font-medium">{copy.whatsapp}</span>
                  <span className="text-sm text-muted-foreground">+62 812 3456 7890</span>
                </span>
              </a>
              <div className="flex gap-3 rounded-lg border border-border bg-card p-4">
                <MapPin className="mt-0.5 size-5 text-[#1d6b4f]" aria-hidden="true" />
                <span>
                  <span className="block font-medium">{copy.address}</span>
                  <span className="text-sm text-muted-foreground">Surabaya, East Java, Indonesia</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
            <ContactForm defaultProductInterest={selectedProduct?.name} locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
