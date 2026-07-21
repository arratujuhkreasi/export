"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartIndicator } from "@/components/cart-indicator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brandName, hrefWithLocale, resolveLocale, type Locale, ui } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const navigation = [
  { href: "/", key: "home" },
  { href: "/products", key: "shop" },
  { href: "/about", key: "company" },
  { href: "/partnership", key: "partnership" },
  { href: "/insights", key: "insights" },
  { href: "/contact", key: "contact" },
  { href: "/cart", key: "cart" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].nav;
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") ?? "");

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

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    const params = new URLSearchParams();
    params.set("lang", locale);
    if (query) params.set("query", query);
    router.push(`/products?${params.toString()}`);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-border/60 shadow-sm">
      {/* Top bar */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Logo */}
        <Link
          href={localizedHref("/")}
          className="group flex flex-none items-center gap-3 font-semibold"
        >
          <span className="relative h-16 w-56 overflow-hidden transition-transform duration-300 group-hover:scale-105 sm:w-64 lg:h-20 lg:w-80">
            <Image
              src={siteConfig.logo}
              alt={`${brandName} logo`}
              fill
              priority
              sizes="(min-width: 1024px) 320px, 256px"
              className="object-contain object-left"
            />
          </span>
          <span className="sr-only">{brandName}</span>
        </Link>

        {/* Center: Search Bar (desktop) */}
        <div className="hidden flex-1 items-center justify-center px-6 md:flex lg:px-12">
          <form onSubmit={submitSearch} className="search-bar flex w-full max-w-lg items-center gap-2 px-4 py-2.5">
            <Search className="size-4 flex-none text-muted-foreground" aria-hidden="true" />
            <input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </form>
        </div>

        {/* Right: Icons + Lang */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="flex overflow-hidden rounded-lg border border-border/60 p-0.5 text-xs font-medium bg-background">
            {(["en", "id"] as const).map((item) => (
              <Link
                key={item}
                href={languageHref(item)}
                className={`rounded-md px-2 py-1.5 transition-all duration-200 ${
                  locale === item
                    ? "bg-[#1d6b4f] text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <CartIndicator locale={locale} />
          <Button asChild className="ml-1 bg-[#1d6b4f] text-white shadow-md shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-lg hover:shadow-[#1d6b4f]/30">
            <Link href={localizedHref("/contact")}>{copy.quote}</Link>
          </Button>
        </div>

        {/* Mobile: Search + Menu */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={copy.open}>
                <Menu className="size-5 text-foreground" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 px-4">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="relative h-14 w-48 overflow-hidden">
                    <Image
                      src={siteConfig.logo}
                      alt={`${brandName} logo`}
                      fill
                      sizes="192px"
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
      </div>

      {/* Desktop nav row */}
      <nav className="hidden border-t border-border/40 bg-white/80 md:block">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild size="sm" className="h-10">
              <Link
                href={localizedHref(item.href)}
                className={`relative text-sm transition-colors duration-200 ${
                  isActive(item.href) ? "text-[#1d6b4f] font-semibold" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {copy[item.key]}
                {isActive(item.href) && (
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" />
                )}
              </Link>
            </Button>
          ))}
        </div>
      </nav>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="border-t border-border/40 bg-white px-4 py-3 md:hidden">
          <form onSubmit={submitSearch} className="search-bar flex items-center gap-2 px-4 py-2.5">
            <Search className="size-4 flex-none text-muted-foreground" aria-hidden="true" />
            <input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
}
