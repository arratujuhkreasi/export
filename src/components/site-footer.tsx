"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CreditCard, Mail, MapPin, MessageCircle } from "lucide-react";

import { brandName, hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";
import { getCategories } from "@/lib/cms";
import { getSalesWhatsAppHref, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale];
  const categories = getCategories(locale).filter(
    (c) => !["cat-bulk", "cat-docs", "cat-featured"].includes(c.id)
  );
  const whatsappHref = getSalesWhatsAppHref();

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

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Column 1: Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="relative h-20 w-72 overflow-hidden rounded-md bg-white/95 shadow-lg shadow-black/10">
              <Image
                src={siteConfig.logo}
                alt={`${brandName} logo`}
                fill
                sizes="288px"
                className="object-contain"
              />
            </span>
            <span className="sr-only">{brandName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
            {copy.footer.description}
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h2 className="text-sm font-semibold text-white">{copy.footer.navigation}</h2>
          <div className="mt-4 grid gap-2.5 text-sm">
            <Link href={localizedHref("/")} className="link-underline inline-block w-fit text-white/50 transition-colors duration-200 hover:text-white">
              {copy.nav.home}
            </Link>
            <Link href={localizedHref("/products")} className="link-underline inline-block w-fit text-white/50 transition-colors duration-200 hover:text-white">
              {copy.nav.shop}
            </Link>
            <Link href={localizedHref("/about")} className="link-underline inline-block w-fit text-white/50 transition-colors duration-200 hover:text-white">
              {copy.nav.company}
            </Link>
            <Link href={localizedHref("/insights")} className="link-underline inline-block w-fit text-white/50 transition-colors duration-200 hover:text-white">
              {copy.nav.insights}
            </Link>
            <Link href={localizedHref("/contact")} className="link-underline inline-block w-fit text-white/50 transition-colors duration-200 hover:text-white">
              {copy.nav.contact}
            </Link>
          </div>
        </div>

        {/* Column 3: Shop Categories */}
        <div>
          <h2 className="text-sm font-semibold text-white">{copy.footer.shopCategories}</h2>
          <div className="mt-4 grid gap-2.5 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={localizedHref(`/products?category=${cat.slug}`)}
                className="link-underline inline-block w-fit text-white/50 transition-colors duration-200 hover:text-white"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4: Contact + Payment */}
        <div>
          <h2 className="text-sm font-semibold text-white">{copy.footer.salesDesk}</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/50">
            <span className="flex gap-2">
              <MapPin className="mt-0.5 size-4 flex-none text-emerald-400/60" aria-hidden="true" /> {siteConfig.address}
            </span>
            <a href={`mailto:${siteConfig.email}`} className="flex gap-2 transition-colors duration-200 hover:text-white">
              <Mail className="mt-0.5 size-4 flex-none text-emerald-400/60" aria-hidden="true" /> {siteConfig.email}
            </a>
            {whatsappHref ? (
              <a href={whatsappHref} className="flex gap-2 transition-colors duration-200 hover:text-white">
                <MessageCircle className="mt-0.5 size-4 flex-none text-emerald-400/60" aria-hidden="true" /> {copy.footer.whatsapp}
              </a>
            ) : (
              <span className="flex gap-2">
                <MessageCircle className="mt-0.5 size-4 flex-none text-emerald-400/60" aria-hidden="true" /> WhatsApp sales pending setup
              </span>
            )}
          </div>

          {/* Payment methods */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-white/60">{copy.footer.paymentMethods}</h3>
            <div className="mt-2 grid gap-1.5">
              {copy.footer.paymentList.map((method) => (
                <span key={method} className="flex items-center gap-2 text-xs text-white/40">
                  <CreditCard className="size-3.5 text-emerald-400/40" aria-hidden="true" />
                  {method}
                </span>
              ))}
            </div>
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
