"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { type Locale, ui } from "@/lib/i18n";
import { getTestimonials } from "@/lib/cms";

export function Testimonials({ locale }: { locale: Locale }) {
  const copy = ui[locale].testimonials;
  const items = getTestimonials(locale);
  const [page, setPage] = useState(0);

  const perPage = 3;
  const totalPages = Math.ceil(items.length / perPage);
  const visible = items.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="bg-background py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{copy.title}</h2>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-white text-muted-foreground transition-colors hover:bg-[#eef6f2] hover:text-[#1d6b4f]"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => (p + 1) % totalPages)}
                className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-white text-muted-foreground transition-colors hover:bg-[#eef6f2] hover:text-[#1d6b4f]"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <div
              key={t.id}
              className="marketplace-card rounded-xl border border-border/60 bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                &quot;{t.comment}&quot;
              </p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1d6b4f] to-[#2a9d6f] text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    {copy.verifiedBuyer}
                    <span className="ml-1 inline-block size-1 rounded-full bg-muted-foreground" />
                    {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
