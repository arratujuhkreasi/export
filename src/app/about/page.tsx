import Image from "next/image";
import type { Metadata } from "next";
import { Handshake, Route, Scale } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Our Company",
  description: "About Nusantara Harvest Co. and its dummy Indonesian export supply chain.",
};

const values = [
  {
    title: "Mission",
    description:
      "Connect reliable Indonesian producer groups with international buyers through transparent specifications and disciplined export execution.",
    icon: Route,
  },
  {
    title: "Vision",
    description:
      "Become a trusted digital-first export partner for natural commodities from coastal and farming regions across Indonesia.",
    icon: Scale,
  },
  {
    title: "Partnerships",
    description:
      "Represent farmer, processor, and warehouse relationships with clear expectations for quality, timing, and documentation.",
    icon: Handshake,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#eef6f2] py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our company"
              title="A dummy export brand shaped for real B2B workflows."
              description="Nusantara Harvest Co. is a sample brand for the PRD: a professional export company website focused on seaweed and Indonesian agricultural commodities."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-border">
              <Image
                src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1600&auto=format&fit=crop"
                alt="Farmers working with agricultural produce"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className="h-full rounded-lg border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-md bg-[#d7eadf] text-[#174f3b]">
                    <value.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold">{value.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 rounded-lg border border-border bg-card p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Supply chain integrity</h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
                The site structure is ready for a future Supabase or Sanity CMS. Product pages separate origin, specification, application, and export document data so the sales team can update buyer-facing content without rebuilding the codebase.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
