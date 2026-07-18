"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brandName, hrefWithLocale, resolveLocale, type Locale, ui } from "@/lib/i18n";

const navigation = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/about", key: "company" },
  { href: "/partnership", key: "partnership" },
  { href: "/insights", key: "insights" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].nav;

  function localizedHref(path: string, nextLocale = locale) {
    return hrefWithLocale(path, nextLocale);
  }

  function languageHref(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);

    return `${pathname}?${params.toString()}`;
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localizedHref("/")}
          className="group flex items-center gap-3 font-semibold"
        >
          <span className="relative h-20 w-72 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/co-export-logo-final.png"
              alt={`${brandName} logo`}
              fill
              priority
              sizes="288px"
              className="object-contain object-left"
            />
          </span>
          <span className="sr-only">{brandName}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link
                href={localizedHref(item.href)}
                className={`relative transition-colors duration-200 ${
                  isActive(item.href) ? "text-[#1d6b4f]" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {copy[item.key]}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" />
                )}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex overflow-hidden rounded-lg border border-border/60 p-0.5 text-xs font-medium bg-background">
            {(["en", "id"] as const).map((item) => (
              <Link
                key={item}
                href={languageHref(item)}
                className={`rounded-md px-2.5 py-1.5 transition-all duration-200 ${
                  locale === item
                    ? "bg-[#1d6b4f] text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <Button asChild className="bg-[#1d6b4f] text-white shadow-md shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-lg hover:shadow-[#1d6b4f]/30">
            <Link href={localizedHref("/contact")}>{copy.quote}</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={copy.open}>
              <Menu className="size-5 text-foreground" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 px-4">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <span className="relative h-16 w-56 overflow-hidden">
                  <Image
                    src="/brand/co-export-logo-final.png"
                    alt={`${brandName} logo`}
                    fill
                    sizes="224px"
                    className="object-contain object-left"
                  />
                </span>
                <span className="sr-only">{brandName}</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className={`justify-start ${isActive(item.href) ? "bg-[#eef6f2] text-[#1d6b4f]" : "text-foreground"}`}
                >
                  <Link href={localizedHref(item.href)}>{copy[item.key]}</Link>
                </Button>
              ))}
              <div className="mt-3 flex overflow-hidden rounded-lg border border-border p-0.5 text-xs font-medium">
                {(["en", "id"] as const).map((item) => (
                  <Link
                    key={item}
                    href={languageHref(item)}
                    className={`flex-1 rounded-md px-2 py-1.5 text-center transition-all duration-200 ${
                      locale === item
                        ? "bg-[#1d6b4f] text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </div>
              <Button asChild className="mt-4 bg-[#1d6b4f] hover:bg-[#174f3b] text-white">
                <Link href={localizedHref("/contact")}>{copy.quote}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
