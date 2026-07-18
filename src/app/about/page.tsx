import Image from "next/image";
import type { Metadata } from "next";
import { Handshake, Route, Scale } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our Company",
  description: "About CO EXPORT.ID and its Indonesian commodity export supply chain.",
};

const icons = [Route, Scale, Handshake] as const;

type AboutPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].about;

  return (
    <>
      <section className="relative overflow-hidden bg-[#eef6f2] py-20">
        {/* Mesh gradient decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(196,163,90,0.04), transparent)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.pageTitle}
              description={copy.pageDescription}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-border/60 bg-white shadow-xl shadow-black/[0.04]">
              <Image
                src="/brand/co-export-logo-final.png"
                alt={copy.imageAlt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain p-6"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {copy.values.map((value, index) => {
              const Icon = icons[index];

              return (
                <Reveal key={value.title} delay={index * 0.08}>
                  <div className="gradient-border card-lift group h-full rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2] text-[#174f3b] shadow-sm transition-transform duration-500 group-hover:scale-110">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold">{value.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className="mt-12 rounded-xl border border-border/60 bg-gradient-to-br from-card to-[#f9faf7] p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold">{copy.integrityTitle}</h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
                {copy.integrityDescription}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
