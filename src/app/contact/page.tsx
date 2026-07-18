import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getProductBySlug } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

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
              <a
                href="mailto:sales@coexport.id"
                className="card-lift group flex gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-colors duration-200 hover:bg-[#eef6f2]"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2] transition-transform duration-300 group-hover:scale-110">
                  <Mail className="size-4 text-[#1d6b4f]" aria-hidden="true" />
                </div>
                <span>
                  <span className="block font-medium">{copy.email}</span>
                  <span className="text-sm text-muted-foreground">sales@coexport.id</span>
                </span>
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="card-lift group flex gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-colors duration-200 hover:bg-[#eef6f2]"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2] transition-transform duration-300 group-hover:scale-110">
                  <MessageCircle className="size-4 text-[#1d6b4f]" aria-hidden="true" />
                </div>
                <span>
                  <span className="block font-medium">{copy.whatsapp}</span>
                  <span className="text-sm text-muted-foreground">+62 812 3456 7890</span>
                </span>
              </a>
              <div className="flex gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2]">
                  <MapPin className="size-4 text-[#1d6b4f]" aria-hidden="true" />
                </div>
                <span>
                  <span className="block font-medium">{copy.address}</span>
                  <span className="text-sm text-muted-foreground">Bandung, West Java, Indonesia</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-xl border border-border/60 bg-card p-5 shadow-lg shadow-black/[0.04] sm:p-6">
            <ContactForm defaultProductInterest={selectedProduct?.name} locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
