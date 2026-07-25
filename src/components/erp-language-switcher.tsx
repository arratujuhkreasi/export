"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { resolveLocale, type Locale } from "@/lib/i18n";
import { Suspense } from "react";

function LanguageSwitcherContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);

  function languageHref(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex overflow-hidden rounded-lg border border-slate-700 p-0.5 text-xs font-medium bg-slate-900 mx-4 mt-2">
      {(["en", "id"] as const).map((item) => (
        <Link
          key={item}
          href={languageHref(item)}
          className={`flex-1 text-center rounded-md px-2 py-1.5 transition-all duration-200 ${
            locale === item
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export function ERPLanguageSwitcher() {
  return (
    <Suspense fallback={<div className="h-8 mx-4 mt-2 bg-slate-800 rounded-lg animate-pulse" />}>
      <LanguageSwitcherContent />
    </Suspense>
  );
}
