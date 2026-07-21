"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";

export function PromoBanners({ locale }: { locale: Locale }) {
  const copy = ui[locale].marketplace;

  return (
    <section className="bg-background py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1d6b4f] via-[#1d6b4f] to-[#2a9d6f] p-6 text-white shadow-lg sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-white/[0.04]" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold sm:text-xl">{copy.bulkDiscount}</h3>
              <p className="mt-1 text-2xl font-extrabold sm:text-3xl">
                {locale === "id" ? "RFQ untuk order kontainer" : "RFQ for container orders"}
              </p>
              <p className="mt-1 text-sm text-white/70">{copy.bulkSubDesc}</p>
              <Button
                asChild
                size="sm"
                className="mt-5 rounded-full bg-white px-6 text-[#1d6b4f] shadow-md hover:bg-white/90"
              >
                <Link href={hrefWithLocale("/products", locale)}>
                  {copy.shopNow} <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="absolute -bottom-6 -right-6 size-40 opacity-20">
              <Image
                src="/products/coco-peat-final.jpg"
                alt=""
                fill
                className="rounded-full object-cover"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#143421] via-[#0f2a1e] to-[#091a12] p-6 text-white shadow-lg sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[#2a9d6f]/10" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold sm:text-xl">{copy.newArrivals}</h3>
              <p className="mt-1 max-w-md text-sm leading-6 text-white/60">
                {locale === "id"
                  ? "Setiap RFQ ditinjau berdasarkan spesifikasi, negara tujuan, dokumen, dan kesiapan kapasitas pasok."
                  : "Every RFQ is reviewed against specification, destination rules, export documents, and supply capacity."}
              </p>
              <div className="mt-4 grid gap-2 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <FileCheck2 className="size-4 text-emerald-300" aria-hidden="true" />
                  {locale === "id" ? "Dokumen ekspor per komoditas" : "Commodity-specific export documents"}
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-300" aria-hidden="true" />
                  {locale === "id" ? "Review compliance sebelum quotation" : "Compliance review before quotation"}
                </span>
              </div>
              <Button
                asChild
                size="sm"
                className="mt-5 rounded-full bg-[#1d6b4f] px-6 text-white shadow-md hover:bg-[#2a9d6f]"
              >
                <Link href={hrefWithLocale("/cart", locale)}>
                  {copy.viewInquiryCart} <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="absolute -bottom-4 -right-4 size-36 opacity-20">
              <Image
                src="/products/areca-nut-real.jpg"
                alt=""
                fill
                className="rounded-full object-cover"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
