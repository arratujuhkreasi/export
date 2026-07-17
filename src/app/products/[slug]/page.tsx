import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileText, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, products } from "@/lib/cms";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="bg-background py-10 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 px-0">
          <Link href="/products">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Products
          </Link>
        </Button>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Badge variant="secondary" className="rounded-md">
              {product.category}
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.longDescription}</p>
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <MapPin className="mt-1 size-5 text-[#1d6b4f]" aria-hidden="true" />
              <div>
                <p className="font-medium">Origin</p>
                <p className="text-sm leading-6 text-muted-foreground">{product.origin}</p>
              </div>
            </div>
            <Separator className="my-8" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(product.specs).map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-card p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                  <p className="mt-2 font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8 h-11">
              <Link href={`/contact?product=${product.slug}`}>Request Quote</Link>
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <FileText className="size-5 text-[#1d6b4f]" aria-hidden="true" />
              Export Documents
            </h2>
            <div className="mt-5 grid gap-3">
              {product.documents.map((document) => (
                <div key={document} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2 className="size-5 text-[#1d6b4f]" aria-hidden="true" />
                  <span className="text-sm font-medium">{document}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Applications</h2>
            <div className="mt-5 grid gap-3">
              {product.applications.map((application) => (
                <div key={application} className="rounded-lg border border-border bg-card p-4 text-sm font-medium">
                  {application}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
