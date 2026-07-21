import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Eye, FileSignature, FileText, Leaf, MapPin, Package, ShieldCheck, Truck, Zap } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Become a Partner",
  description: "Join CO EXPORT.ID as a local supplier or regional coordinator.",
};

const sopIcons = [Leaf, CheckCircle2, Package, Package, ShieldCheck] as const;
const onboardingIcons = [ClipboardList, Eye, MapPin, FileSignature, Truck, Zap] as const;

type PartnershipPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function PartnershipPage({ searchParams }: PartnershipPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].partnership;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef6f2] to-background py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(196,163,90,0.04), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-block rounded-full bg-[#1d6b4f]/10 px-3 py-1 text-sm font-semibold text-[#1d6b4f]">
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {copy.description}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-[#1d6b4f] px-8 text-base font-semibold text-white shadow-lg shadow-[#1d6b4f]/25 transition-transform hover:scale-105 hover:bg-[#174f3b]">
                <Link href={hrefWithLocale("/partnership/apply", locale)}>
                  Apply as Supplier
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
                <span className="inline-block h-px w-8 bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" aria-hidden="true" />
                <span className="gradient-text">{copy.onboardingEyebrow}</span>
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {copy.onboardingTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-0 md:grid-cols-6">
            {copy.onboardingSteps.map((step, index) => {
              const Icon = onboardingIcons[index];
              const stepNumber = index + 1;

              return (
                <Reveal key={step.title} delay={index * 0.1} className="relative">
                  <div className="group flex flex-col items-center text-center px-2">
                    {/* Step number badge */}
                    <div className="relative">
                      <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1d6b4f] to-[#2a9d6f] text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                        <Icon className="size-7" aria-hidden="true" />
                      </div>
                      <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-[#c4a35a] text-xs font-bold text-white shadow-md">
                        {stepNumber}
                      </span>
                    </div>
                    {/* Connector line (hidden on mobile, visible on md+) */}
                    {index < copy.onboardingSteps.length - 1 && (
                      <div className="absolute left-[60%] top-8 -z-10 hidden h-[2px] w-[calc(100%-20%)] bg-gradient-to-r from-[#1d6b4f]/30 to-[#1d6b4f]/10 md:block" />
                    )}
                    <h3 className="mt-5 text-sm font-bold leading-tight">{step.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
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
                  <div className="marketplace-card group h-full rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#1d6b4f]/30 hover:shadow-lg">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#eef6f2] text-[#1d6b4f] shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#1d6b4f] group-hover:text-white">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
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
                    <Link href={hrefWithLocale("/partnership/apply", locale)}>
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
