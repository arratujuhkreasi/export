import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Leaf, Package, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Become a Partner",
  description: "Join CO EXPORT.ID as a local supplier or regional coordinator.",
};

const sopIcons = [Leaf, CheckCircle2, Package, Package, ShieldCheck] as const;

type PartnershipPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function PartnershipPage({ searchParams }: PartnershipPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].partnership;

  return (
    <>
      <section className="relative overflow-hidden bg-[#eef6f2] py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(196,163,90,0.04), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-[#2a9d6f]" aria-hidden="true" />
              <span className="gradient-text">{copy.eyebrow}</span>
              <span className="inline-block h-px w-8 bg-gradient-to-l from-transparent to-[#2a9d6f]" aria-hidden="true" />
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {copy.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Quality Control"
              title={copy.sopTitle}
              description={copy.sopDescription}
            />
          </Reveal>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.sopSteps.map((step, index) => {
              const Icon = sopIcons[index];
              return (
                <Reveal key={step.title} delay={index * 0.1}>
                  <div className="group h-full rounded-2xl border border-border/50 bg-[#faf8f5] p-6 transition-all duration-300 hover:border-[#1d6b4f]/30 hover:bg-[#eef6f2] hover:shadow-md">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-[#1d6b4f] shadow-sm">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#faf8f5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d6b4f] to-[#124231] p-12 text-white shadow-2xl">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                <FileText className="mb-8 size-16 text-emerald-300" />
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.mouTitle}</h2>
                <p className="mt-6 text-lg leading-relaxed text-emerald-50">
                  {copy.mouDescription}
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400" />
                    <span>Fair market pricing locks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400" />
                    <span>Clear Down Payment (DP) terms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400" />
                    <span>Guaranteed off-take for QC-passed goods</span>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.ctaTitle}</h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {copy.ctaDescription}
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95">
                    <Link href={hrefWithLocale("/contact?subject=supplier", locale)}>
                      {copy.ctaButton} <ArrowRight className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
