"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, ShipWheel } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hrefWithLocale, resolveLocale, type Locale, ui } from "@/lib/i18n";

const navigation = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/about", key: "company" },
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={localizedHref("/")} className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShipWheel className="size-4" aria-hidden="true" />
          </span>
          Nusantara Harvest Co.
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={localizedHref(item.href)}>{copy[item.key]}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex rounded-md border border-border p-0.5 text-xs font-medium">
            {(["en", "id"] as const).map((item) => (
              <Link
                key={item}
                href={languageHref(item)}
                className={`rounded-sm px-2 py-1 transition ${
                  locale === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <Button asChild>
            <Link href={localizedHref("/contact")}>{copy.quote}</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label={copy.open}>
              <Menu className="size-4" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 px-4">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShipWheel className="size-4" aria-hidden="true" />
                Nusantara Harvest Co.
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-2">
              {navigation.map((item) => (
                <Button key={item.href} variant="ghost" asChild className="justify-start">
                  <Link href={localizedHref(item.href)}>{copy[item.key]}</Link>
                </Button>
              ))}
              <div className="mt-3 flex rounded-md border border-border p-0.5 text-xs font-medium">
                {(["en", "id"] as const).map((item) => (
                  <Link
                    key={item}
                    href={languageHref(item)}
                    className={`flex-1 rounded-sm px-2 py-1 text-center transition ${
                      locale === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </div>
              <Button asChild className="mt-4">
                <Link href={localizedHref("/contact")}>{copy.quote}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
