"use client";

import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addInquiryCartItem } from "@/lib/marketplace";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";

type AddToInquiryButtonProps = {
  productId: string;
  productName: string;
  minOrder: string;
  locale: Locale;
  className?: string;
};

export function AddToInquiryButton({
  productId,
  productName,
  minOrder,
  locale,
  className,
}: AddToInquiryButtonProps) {
  const [added, setAdded] = useState(false);
  const copy = ui[locale].marketplace;

  function handleAdd() {
    addInquiryCartItem({
      productId,
      quantity: minOrder,
      destinationPort: "",
      tradeTerm: "FOB",
      notes: "",
    });
    setAdded(true);
    toast.success(locale === "id" ? "Produk masuk inquiry cart." : "Product added to inquiry cart.", {
      description: productName,
      action: {
        label: locale === "id" ? "Lihat" : "View",
        onClick: () => {
          window.location.href = hrefWithLocale("/cart", locale);
        },
      },
    });
  }

  return (
    <div className={className}>
      <Button
        type="button"
        size="sm"
        className="w-full bg-[#1d6b4f] text-white hover:bg-[#174f3b]"
        onClick={handleAdd}
      >
        {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
        {added ? copy.addedToInquiry : copy.addToInquiry}
      </Button>
      {added ? (
        <Link
          href={hrefWithLocale("/cart", locale)}
          className="mt-2 block text-center text-xs font-semibold text-[#1d6b4f] hover:underline"
        >
          {copy.viewInquiryCart}
        </Link>
      ) : null}
    </div>
  );
}
