"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { hrefWithLocale, resolveLocale, ui } from "@/lib/i18n";
import { getCategories } from "@/lib/cms";

export function CategoryBar() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const categories = getCategories(locale).filter(
    (cat) => !["cat-bulk", "cat-docs", "cat-featured"].includes(cat.id)
  );

  return (
    <section className="border-b border-border/60 bg-white py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="category-scroll flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={hrefWithLocale(`/products?category=${cat.slug}`, locale)}
              className="group flex flex-none flex-col items-center gap-2 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[#eef6f2]"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#eef6f2] to-[#d7eadf] text-xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                {cat.icon}
              </span>
              <span className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors group-hover:text-[#1d6b4f]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
