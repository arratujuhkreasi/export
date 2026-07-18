"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Mail, MapPin, MessageCircle } from "lucide-react";

import { brandName, hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";

export function SiteFooter() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale];

  function localizedHref(path: string) {
    return hrefWithLocale(path, locale);
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0f2a1e] to-[#091a12] text-white/80">
      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 dot-pattern" />

      {/* Subtle gradient decorations */}
      <div
        className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #2a9d6f, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 size-80 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #c4a35a, transparent 70%)" }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative h-16 w-64 overflow-hidden rounded-md bg-white/95 shadow-lg shadow-black/10">
              <Image
                src="/brand/co-export-logo-final.png"
                alt={`${brandName} logo`}
                fill
                sizes="256px"
                className="object-contain"
              />
            </span>
            <span className="sr-only">{brandName}</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/55">
            {copy.footer.description}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{copy.footer.navigation}</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href={localizedHref("/products")} className="link-underline inline-block w-fit text-white/55 transition-colors duration-200 hover:text-white">
              {copy.nav.products}
            </Link>
            <Link href={localizedHref("/about")} className="link-underline inline-block w-fit text-white/55 transition-colors duration-200 hover:text-white">
              {copy.nav.company}
            </Link>
            <Link href={localizedHref("/insights")} className="link-underline inline-block w-fit text-white/55 transition-colors duration-200 hover:text-white">
              {copy.nav.insights}
            </Link>
            <Link href={localizedHref("/contact")} className="link-underline inline-block w-fit text-white/55 transition-colors duration-200 hover:text-white">
              {copy.nav.contact}
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{copy.footer.salesDesk}</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/55">
            <span className="flex gap-2">
              <MapPin className="mt-0.5 size-4 text-emerald-400/60" aria-hidden="true" /> Bandung, West Java, Indonesia
            </span>
            <a href="mailto:sales@coexport.id" className="flex gap-2 transition-colors duration-200 hover:text-white">
              <Mail className="mt-0.5 size-4 text-emerald-400/60" aria-hidden="true" /> sales@coexport.id
            </a>
            <a href="https://wa.me/6281234567890" className="flex gap-2 transition-colors duration-200 hover:text-white">
              <MessageCircle className="mt-0.5 size-4 text-emerald-400/60" aria-hidden="true" /> {copy.footer.whatsapp}
            </a>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="divider-gradient mb-6" />
        <p className="text-xs text-white/35">
          {copy.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
