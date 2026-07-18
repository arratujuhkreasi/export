import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Leaf, ShieldCheck, TrendingUp } from "lucide-react";

import { PartnerForm } from "@/components/partner-form";
import { Reveal } from "@/components/reveal";
import { resolveLocale, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Partner Application | CO EXPORT.ID",
  description: "Register as a supplier partner for CO EXPORT.ID",
};

type ApplyPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function PartnerApplyPage({ searchParams }: ApplyPageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const copy = ui[locale].partnerForm;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Simple Header */}
      <div className="bg-[#1d6b4f] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/partnership"
            className="group mb-8 inline-flex items-center text-sm font-medium text-emerald-100 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
            Back to Partnership Details
          </Link>
          <Reveal>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-emerald-100">
              {copy.description}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          
          {/* Form Side */}
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/50 bg-white p-6 shadow-xl sm:p-10">
                <PartnerForm locale={locale} />
              </div>
            </Reveal>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="sticky top-24 rounded-3xl bg-gradient-to-br from-[#eef6f2] to-[#d7eadf] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#174f3b] mb-6">Why Partner With Us?</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1d6b4f] shadow-sm">
                      <TrendingUp className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Global Reach</h4>
                      <p className="mt-1 text-sm text-muted-foreground">We connect your harvest directly to international buyers.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1d6b4f] shadow-sm">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Fair Trade</h4>
                      <p className="mt-1 text-sm text-muted-foreground">Transparent pricing, clear DP terms, and guaranteed off-takes.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1d6b4f] shadow-sm">
                      <Leaf className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Quality Focus</h4>
                      <p className="mt-1 text-sm text-muted-foreground">We guide you to meet international SOPs for long-term success.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 rounded-2xl bg-white/60 p-5 text-sm text-[#174f3b] backdrop-blur-sm">
                  <p className="font-semibold">Security Note:</p>
                  <p className="mt-1">Your data is strictly confidential and will only be used by our internal sourcing team to verify supply capacity.</p>
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </div>
  );
}
