import type { Metadata } from "next";

import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Products",
  description: "Export commodity catalog for Indonesian seaweed, cocoa, coconut, and coffee.",
};

export default function ProductsPage() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Products"
            title="Export commodity catalog"
            description="Dummy product lines built from the PRD structure: each item includes origin, technical specifications, applications, and export document availability."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} imageLoading={index < 4 ? "eager" : "lazy"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
