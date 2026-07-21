"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";
import { getFeaturedProducts } from "@/lib/cms";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export function MarketplaceHero({ locale }: { locale: Locale }) {
  const copy = ui[locale].hero;
  const featured = getFeaturedProducts(locale);
  const heroProduct = featured[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f7f3] via-[#e8f5ee] to-[#f6faf8]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#1d6b4f]/[0.04]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#c4a35a]/[0.04]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 lg:py-16">
        {/* Left content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex-1 text-center lg:text-left"
        >
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1d6b4f]">
            {copy.collection}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight text-[#071811] sm:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            {copy.title}{" "}
            <span className="text-[#1d6b4f]">{copy.titleAccent}</span>{" "}
            <Heart className="mb-1 inline size-8 text-[#1d6b4f]" aria-hidden="true" />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#143421]/70 sm:text-lg lg:mx-0"
          >
            {copy.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#1d6b4f] px-8 text-white shadow-lg shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-xl hover:shadow-[#1d6b4f]/30 active:scale-[0.98]"
            >
              <Link href={hrefWithLocale("/products", locale)}>
                {copy.primaryCta} <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-[#1d6b4f]/20 bg-white/70 px-8 text-[#143421] backdrop-blur-sm transition-all duration-300 hover:border-[#1d6b4f]/40 hover:bg-white hover:shadow-md active:scale-[0.98]"
            >
              <Link href={hrefWithLocale("/products", locale)}>{copy.secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative flex-1"
        >
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-2xl shadow-[#1d6b4f]/10 backdrop-blur-sm">
            {heroProduct && (
              <Image
                src={heroProduct.image}
                alt={copy.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover p-6"
              />
            )}
            {/* Floating price badge */}
            <div className="absolute right-4 top-4 flex size-20 flex-col items-center justify-center rounded-full bg-[#1d6b4f] text-white shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wide">{copy.upTo}</span>
              <span className="text-xl font-bold leading-none">50%</span>
              <span className="text-[10px] font-medium uppercase">{copy.fobLabel}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
