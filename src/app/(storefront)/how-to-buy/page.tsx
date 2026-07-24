import type { Metadata } from "next";
import { CheckCircle2, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "How to Buy",
  description: "Learn how to order, request quotations, and process shipments through CO EXPORT.ID B2B marketplace.",
};

type HowToBuyPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function HowToBuyPage({ searchParams }: HowToBuyPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].howToOrder;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef6f2] to-background py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(196,163,90,0.04), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#1d6b4f]/10 px-3 py-1 text-sm font-semibold text-[#1d6b4f]">
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {copy.pageTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {copy.pageDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {copy.title}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-8">
            {copy.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1}>
                <div className="relative flex gap-6 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:border-[#1d6b4f]/30 hover:shadow-md sm:p-8">
                  {/* Step Number Badge */}
                  <div className="absolute -left-3 -top-3 flex size-8 items-center justify-center rounded-full bg-[#1d6b4f] font-bold text-white shadow-sm ring-4 ring-white">
                    {index + 1}
                  </div>
                  
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#eef6f2] text-[#1d6b4f]">
                    <CheckCircle2 className="size-6" aria-hidden="true" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < copy.steps.length - 1 && (
                  <div className="flex justify-center py-2 text-[#1d6b4f]/30">
                    <ChevronRight className="size-6 rotate-90" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
