"use client";

import Link from "next/link";
import { Menu, ShipWheel } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "Our Company" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShipWheel className="size-4" aria-hidden="true" />
          </span>
          Nusantara Harvest Co.
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/contact">Request Quote</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open navigation">
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
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <Button asChild className="mt-4">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
