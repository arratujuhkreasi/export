import type { Metadata } from "next";
import { Suspense } from "react";

import ShopContent from "./shop-content";

export const metadata: Metadata = {
  title: "Shop",
  description: "CO EXPORT.ID export marketplace for coco peat, coco fiber, Albasia wood, Ubi Cilembu Sumedang, and young areca nut.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-[#1d6b4f]/20 border-t-[#1d6b4f]" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
