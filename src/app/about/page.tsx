import Image from "next/image";
import type { Metadata } from "next";
import { Handshake, Route, Scale } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About The Platform",
  description: "About CO EXPORT.ID's B2B marketplace platform for Indonesian commodities.",
};

const icons = [Route, Scale, Handshake] as const;
const stats = [
  { value: "5+", label: "Product Categories" },
  { value: "100%", label: "Verified Suppliers" },
  { value: "FOB", label: "Transparent Pricing" },
  { value: "24/7", label: "Export Support" },
];

type AboutPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].about;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef6f2] to-background py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(196,163,90,0.04), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-[#1d6b4f]/10 px-3 py-1 text-sm font-semibold text-[#1d6b4f]">
                  {copy.eyebrow}
                </span>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {copy.pageTitle}
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  {copy.pageDescription}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-white shadow-2xl">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <Image
                  src="/brand/co-export-logo-final.png"
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-12 transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/60 bg-white py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#1d6b4f]">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="bg-[#faf8f5] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {copy.values.map((value, index) => {
              const Icon = icons[index];
              return (
                <Reveal key={value.title} delay={index * 0.1}>
                  <div className="marketplace-card group flex h-full flex-col items-start rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#1d6b4f]/30 hover:shadow-lg">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-[#eef6f2] text-[#1d6b4f] shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#1d6b4f] group-hover:text-white">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-[#1d6b4f] to-[#124231] shadow-xl">
              <div className="px-8 py-12 sm:px-12 sm:py-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {copy.integrityTitle}
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-100">
                  {copy.integrityDescription}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
