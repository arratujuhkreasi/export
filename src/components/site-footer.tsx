import Link from "next/link";
import { Mail, MapPin, MessageCircle, ShipWheel } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#f3f4ed]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShipWheel className="size-4" aria-hidden="true" />
            </span>
            Nusantara Harvest Co.
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            B2B export storefront for Indonesian marine and agricultural commodities, built for traceable sourcing, clear specifications, and global-ready documentation.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Navigation</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-foreground">Products</Link>
            <Link href="/about" className="hover:text-foreground">Our Company</Link>
            <Link href="/insights" className="hover:text-foreground">Insights</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Sales Desk</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <span className="flex gap-2"><MapPin className="mt-0.5 size-4" aria-hidden="true" /> Surabaya, East Java, Indonesia</span>
            <a href="mailto:sales@nusantaraharvest.example" className="flex gap-2 hover:text-foreground">
              <Mail className="mt-0.5 size-4" aria-hidden="true" /> sales@nusantaraharvest.example
            </a>
            <a href="https://wa.me/6281234567890" className="flex gap-2 hover:text-foreground">
              <MessageCircle className="mt-0.5 size-4" aria-hidden="true" /> WhatsApp Export Sales
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Separator className="mb-6" />
        <p className="text-xs text-muted-foreground">
          (c) 2026 Nusantara Harvest Co. Dummy brand and sample product data for PRD implementation.
        </p>
      </div>
    </footer>
  );
}
