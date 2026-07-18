import { FileCheck2, Leaf, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { type Locale, ui } from "@/lib/i18n";

const icons = [ShieldCheck, Leaf, FileCheck2] as const;

export function FeatureGrid({ locale }: { locale: Locale }) {
  const copy = ui[locale].features;

  return (
    <section className="relative overflow-hidden bg-[#faf8f5] py-20">
      {/* Subtle mesh gradient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(29,107,79,0.06), transparent), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(196,163,90,0.05), transparent)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="inline-block h-px w-8 bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" aria-hidden="true" />
              <span className="gradient-text">{copy.eyebrow}</span>
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {copy.title}
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.items.map((feature, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={feature.title} delay={index * 0.1}>
                <div className="gradient-border card-lift group h-full rounded-xl border border-border/60 bg-white p-6 shadow-sm">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7eadf] to-[#eef6f2] text-[#174f3b] shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
