"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { readInquiryCart } from "@/lib/marketplace";
import { hrefWithLocale, type Locale } from "@/lib/i18n";

export function CartIndicator({ locale }: { locale: Locale }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function syncCount() {
      setCount(readInquiryCart().length);
    }

    syncCount();
    window.addEventListener("storage", syncCount);
    window.addEventListener("coexportid-cart-updated", syncCount);

    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener("coexportid-cart-updated", syncCount);
    };
  }, []);

  return (
    <Button asChild variant="ghost" size="icon" className="relative text-foreground/70 hover:text-[#1d6b4f]" aria-label="Inquiry cart">
      <Link href={hrefWithLocale("/cart", locale)}>
        <ShoppingCart className="size-5" aria-hidden="true" />
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#1d6b4f] text-[10px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
