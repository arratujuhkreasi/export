"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";

import { MarketplaceProductCard } from "@/components/marketplace-product-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getProducts, getCategories } from "@/lib/cms";
import { resolveLocale, ui } from "@/lib/i18n";

export default function ShopContent() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang") ?? undefined);
  const copy = ui[locale].products;
  const filterCopy = copy.filters;
  const allProducts = useMemo(() => getProducts(locale), [locale]);
  const categories = useMemo(() => getCategories(locale), [locale]);

  const urlCategory = searchParams.get("category") ?? "";
  const query = (searchParams.get("query") ?? "").trim().toLowerCase();

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category slug
    if (selectedCategory) {
      products = products.filter((p) => p.categorySlug === selectedCategory);
    }

    if (query) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query) ||
          p.hsCode.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        products = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew));
        break;
      case "popular":
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
    }

    return products;
  }, [allProducts, selectedCategory, sortBy, query]);

  const mainCategories = categories.filter(
    (c) => !["cat-bulk", "cat-docs", "cat-featured"].includes(c.id)
  );

  return (
    <section className="bg-background py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <Reveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.pageTitle}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {copy.pageDescription}
            </p>
          </div>
        </Reveal>

        <div className="flex gap-6">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden w-56 flex-none lg:block">
            <div className="sticky top-36 space-y-6">
              {/* Categories */}
              <div className="rounded-xl border border-border/60 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold">{ui[locale].nav.categories}</h3>
                <div className="mt-3 grid gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("")}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      !selectedCategory
                        ? "bg-[#eef6f2] font-semibold text-[#1d6b4f]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {filterCopy.allCategories}
                  </button>
                  {mainCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-[#eef6f2] font-semibold text-[#1d6b4f]"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{cat.icon}</span> {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="rounded-xl border border-border/60 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold">{filterCopy.sortBy}</h3>
                <div className="mt-3 grid gap-1.5">
                  {[
                    { value: "popular", label: filterCopy.sortPopular },
                    { value: "newest", label: filterCopy.sortNewest },
                    { value: "rating", label: "⭐ Rating" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSortBy(opt.value)}
                      className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        sortBy === opt.value
                          ? "bg-[#eef6f2] font-semibold text-[#1d6b4f]"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
                {filterCopy.results}
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="mr-1.5 size-3.5" /> Filter
                </Button>
                {/* View mode toggle */}
                <div className="flex overflow-hidden rounded-lg border border-border/60 p-0.5 text-xs font-medium bg-white">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-[#1d6b4f] text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3X3 className="size-3.5" /> {filterCopy.gridView}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-[#1d6b4f] text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="size-3.5" /> {filterCopy.listView}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filters drawer */}
            {showFilters && (
              <div className="mb-6 rounded-xl border border-border/60 bg-white p-4 shadow-sm lg:hidden">
                <h3 className="text-sm font-semibold">{ui[locale].nav.categories}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      !selectedCategory
                        ? "bg-[#1d6b4f] text-white"
                        : "bg-muted text-muted-foreground hover:bg-[#eef6f2] hover:text-[#1d6b4f]"
                    }`}
                  >
                    {filterCopy.allCategories}
                  </button>
                  {mainCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-[#1d6b4f] text-white"
                          : "bg-muted text-muted-foreground hover:bg-[#eef6f2] hover:text-[#1d6b4f]"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
                <h3 className="mt-4 text-sm font-semibold">{filterCopy.sortBy}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { value: "popular", label: filterCopy.sortPopular },
                    { value: "newest", label: filterCopy.sortNewest },
                    { value: "rating", label: "⭐ Rating" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSortBy(opt.value)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        sortBy === opt.value
                          ? "bg-[#1d6b4f] text-white"
                          : "bg-muted text-muted-foreground hover:bg-[#eef6f2] hover:text-[#1d6b4f]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid / List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid gap-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.04}>
                  <MarketplaceProductCard
                    product={product}
                    locale={locale}
                    imageLoading={index < 8 ? "eager" : "lazy"}
                  />
                </Reveal>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg font-semibold text-muted-foreground">No products found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing filters or browse all categories
                </p>
              </div>
            )}

            {/* Export Price Table */}
            <Reveal>
              <div className="mt-14 overflow-hidden rounded-xl border border-border/60 bg-white shadow-lg shadow-black/[0.03]">
                <div className="border-b border-border/60 p-5 sm:p-6">
                  <h2 className="text-2xl font-semibold">{copy.tableTitle}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{copy.tableDescription}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[920px] text-left text-sm">
                    <thead className="bg-gradient-to-r from-[#eef6f2] to-[#f6f9f7] text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-5 py-4 font-semibold">{copy.title}</th>
                        <th className="px-5 py-4 font-semibold">{copy.origin}</th>
                        <th className="px-5 py-4 font-semibold">{copy.priceRange}</th>
                        <th className="px-5 py-4 font-semibold">{copy.minOrder}</th>
                        <th className="px-5 py-4 font-semibold">{copy.leadTime}</th>
                        <th className="px-5 py-4 font-semibold">{copy.supplyCapacity}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {allProducts.map((product) => (
                        <tr key={product.id} className="align-top transition-colors duration-200 hover:bg-[#faf8f5]">
                          <td className="px-5 py-4 font-medium">{product.name}</td>
                          <td className="px-5 py-4 text-muted-foreground">{product.origin}</td>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-[#143421]">{product.priceRange}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">{product.incoterm}</span>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">{product.minOrder}</td>
                          <td className="px-5 py-4 text-muted-foreground">{product.leadTime}</td>
                          <td className="px-5 py-4 text-muted-foreground">{product.supplyCapacity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
