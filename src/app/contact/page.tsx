import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getProductBySlug } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";
import { getSalesWhatsAppHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a B2B export inquiry to CO EXPORT.ID.",
};

type ContactPageProps = {
  searchParams: Promise<{ product?: string; lang?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product: productSlug, lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].contact;
  const selectedProduct = productSlug ? getProductBySlug(productSlug, locale) : undefined;
  const whatsappHref = getSalesWhatsAppHref();

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <span className="inline-block rounded-full bg-[#1d6b4f]/10 px-3 py-1 text-sm font-semibold text-[#1d6b4f]">
              {copy.title}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {copy.pageTitle}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {copy.pageDescription}
            </p>
          </div>
        </Reveal>
        
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="marketplace-card group flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#1d6b4f]/30 hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#eef6f2] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#1d6b4f] group-hover:text-white">
                  <Mail className="size-5 text-[#1d6b4f] group-hover:text-white" aria-hidden="true" />
                </div>
                <div>
                  <span className="block font-semibold text-foreground">{copy.email}</span>
                  <span className="text-sm text-muted-foreground">{siteConfig.email}</span>
                </div>
              </a>
              {whatsappHref ? (
              <a
                href={whatsappHref}
                className="marketplace-card group flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#1d6b4f]/30 hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#eef6f2] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#1d6b4f] group-hover:text-white">
                  <MessageCircle className="size-5 text-[#1d6b4f] group-hover:text-white" aria-hidden="true" />
                </div>
                <div>
                  <span className="block font-semibold text-foreground">{copy.whatsapp}</span>
                  <span className="text-sm text-muted-foreground">WhatsApp Export Sales</span>
                </div>
              </a>
              ) : null}
              <div className="marketplace-card flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#eef6f2]">
                  <MapPin className="size-5 text-[#1d6b4f]" aria-hidden="true" />
                </div>
                <div>
                  <span className="block font-semibold text-foreground">{copy.address}</span>
                  <span className="text-sm text-muted-foreground">{siteConfig.address}</span>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-border/60 bg-white p-6 shadow-xl shadow-black/[0.04] sm:p-10">
              <ContactForm defaultProductInterest={selectedProduct?.name} locale={locale} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
