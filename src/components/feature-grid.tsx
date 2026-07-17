import { FileCheck2, Leaf, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { type Locale, ui } from "@/lib/i18n";

const icons = [ShieldCheck, Leaf, FileCheck2] as const;

export function FeatureGrid({ locale }: { locale: Locale }) {
  const copy = ui[locale].features;

  return (
    <section className="bg-[#faf8f5] py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">{copy.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {copy.title}
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.items.map((feature, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={feature.title} delay={index * 0.08}>
                <div className="h-full rounded-lg border border-border bg-background p-6 shadow-sm">
                  <div className="flex size-11 items-center justify-center rounded-md bg-[#d7eadf] text-[#174f3b]">
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
