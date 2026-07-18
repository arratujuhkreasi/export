import { CheckCircle2, ClipboardCheck, FileSignature, PackageCheck, Ship } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { type Locale, ui } from "@/lib/i18n";

const icons = [ClipboardCheck, CheckCircle2, FileSignature, PackageCheck, Ship] as const;

export function HowToOrderSection({ locale }: { locale: Locale }) {
  const copy = ui[locale].howToOrder;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
        
        <div className="mt-16 grid gap-8 md:grid-cols-5">
          {copy.steps.map((step, index) => {
            const Icon = icons[index];
            const isLast = index === copy.steps.length - 1;

            return (
              <Reveal key={step.title} delay={index * 0.1} className="relative">
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d7eadf] to-[#eef6f2] text-[#174f3b] shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-8" aria-hidden="true" />
                  </div>
                  {!isLast && (
                    <div className="absolute left-[60%] top-8 -z-10 hidden h-[2px] w-[calc(100%-20%)] -translate-y-1/2 bg-gradient-to-r from-[#d7eadf] to-transparent md:block" />
                  )}
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
