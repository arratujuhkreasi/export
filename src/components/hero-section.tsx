import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2200&auto=format&fit=crop"
        alt="Indonesian agricultural field prepared for export sourcing"
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#122218]/88 via-[#193626]/72 to-[#0d2228]/42" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/12 px-3 py-1 text-sm backdrop-blur">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Traceable Indonesian commodities
          </div>
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Bringing Indonesia&apos;s harvest to the world
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            Export-ready seaweed, cocoa, coconut, and coffee for importers that need clear specifications, dependable sourcing, and documentation before shipment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 bg-white text-[#143421] hover:bg-white/88">
              <Link href="/products">
                Explore Products <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 border-white/40 bg-white/8 text-white hover:bg-white/16 hover:text-white">
              <Link href="/contact">Start B2B Inquiry</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
