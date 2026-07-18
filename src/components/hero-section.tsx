"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function HeroSection({ locale }: { locale: Locale }) {
  const copy = ui[locale].hero;

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden bg-white">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Responsive iframe wrapper to maintain coverage without black bars */}
        <div className="absolute left-1/2 top-1/2 h-[150vh] w-[266vh] -translate-x-1/2 -translate-y-1/2 sm:w-[177vw] sm:h-[100vw]">
          <iframe
            src="https://www.youtube.com/embed/AHrCI9eSJGQ?autoplay=1&mute=1&loop=1&playlist=AHrCI9eSJGQ&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            className="h-full w-full"
            style={{ pointerEvents: "none" }}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
        {/* Elegant Overlays for Readability & Premium Glass Effect */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#f4f9f6]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1d6b4f]/20 bg-[#1d6b4f]/5 px-4 py-1.5 text-sm font-medium text-[#1d6b4f] backdrop-blur-md shadow-sm">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              {copy.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold tracking-tight text-[#071811] sm:text-6xl lg:text-7xl lg:leading-[1.1]"
          >
            {copy.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#143421]/75 sm:text-xl font-medium"
          >
            {copy.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-[#1d6b4f] px-8 text-white shadow-lg shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-xl hover:shadow-[#1d6b4f]/30 active:scale-[0.98]"
            >
              <Link href={hrefWithLocale("/products", locale)}>
                {copy.primaryCta} <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-[#1d6b4f]/20 bg-white/70 px-8 text-[#143421] backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[#1d6b4f]/40 hover:bg-white hover:shadow-md active:scale-[0.98]"
            >
              <Link href={hrefWithLocale("/contact", locale)}>{copy.secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
