"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/cms";
import { hrefWithLocale, type Locale, ui } from "@/lib/i18n";
import {
  type BuyerDetails,
  type InquiryCartItem,
  type InquiryOrder,
  type PaymentTerm,
  type TradeTerm,
  clearInquiryCart,
  createInquiryId,
  readInquiryCart,
  saveInquiryOrder,
} from "@/lib/marketplace";

type RfqCheckoutProps = {
  products: Product[];
  locale: Locale;
};

const paymentTerms: PaymentTerm[] = ["T/T", "L/C", "D/P", "Negotiable"];
const tradeTerms: TradeTerm[] = ["FOB", "CIF", "CFR", "EXW"];

const emptyBuyer: BuyerDetails = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  country: "",
  destinationPort: "",
  tradeTerm: "FOB",
  paymentTerm: "T/T",
  timeline: "",
  message: "",
};

export function RfqCheckout({ products, locale }: RfqCheckoutProps) {
  const copy = ui[locale].marketplace;
  const [items, setItems] = useState<InquiryCartItem[]>([]);
  const [buyer, setBuyer] = useState<BuyerDetails>(emptyBuyer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<InquiryOrder | null>(null);
  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const validItems = items.filter((item) => productMap.has(item.productId));

  useEffect(() => {
    setItems(readInquiryCart());
  }, []);

  function updateBuyer<K extends keyof BuyerDetails>(key: K, value: BuyerDetails[K]) {
    setBuyer((current) => ({ ...current, [key]: value }));
  }

  async function submitRfq(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    const order: InquiryOrder = {
      id: createInquiryId(),
      createdAt: new Date().toISOString(),
      buyer,
      items: validItems,
      status: "RFQ submitted",
    };

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order,
          products: validItems.map((item) => productMap.get(item.productId)),
          locale,
        }),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };
      saveInquiryOrder(order);
      clearInquiryCart();
      setItems([]);
      setSubmittedOrder(order);
      toast.success(copy.rfqSubmitted, {
        description: result.message ?? order.id,
      });
    } catch {
      saveInquiryOrder(order);
      setSubmittedOrder(order);
      toast.error(copy.rfqFallback, {
        description: order.id,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedOrder) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-border/60 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#eef6f2] text-[#1d6b4f]">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-bold">{copy.rfqSubmitted}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{copy.orderReference}: <span className="font-mono font-semibold text-foreground">{submittedOrder.id}</span></p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-[#1d6b4f] text-white hover:bg-[#174f3b]">
            <Link href={hrefWithLocale("/products", locale)}>{copy.continueShopping}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hrefWithLocale("/contact", locale)}>Contact sales</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (validItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-border/60 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{copy.checkoutTitle}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{copy.emptyCart}</p>
        <Button asChild className="mt-6 bg-[#1d6b4f] text-white hover:bg-[#174f3b]">
          <Link href={hrefWithLocale("/products", locale)}>{copy.continueShopping}</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submitRfq} className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="rounded-xl border border-border/60 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold">{copy.buyerDetails}</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required value={buyer.name} onChange={(event) => updateBuyer("name", event.target.value)} />
          </label>
          <label className="grid gap-2">
            <Label htmlFor="company">{copy.company}</Label>
            <Input id="company" required value={buyer.company} onChange={(event) => updateBuyer("company", event.target.value)} />
          </label>
          <label className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" required type="email" value={buyer.email} onChange={(event) => updateBuyer("email", event.target.value)} />
          </label>
          <label className="grid gap-2">
            <Label htmlFor="whatsapp">{copy.whatsapp}</Label>
            <Input id="whatsapp" required type="tel" value={buyer.whatsapp} onChange={(event) => updateBuyer("whatsapp", event.target.value)} />
          </label>
          <label className="grid gap-2">
            <Label htmlFor="country">{copy.country}</Label>
            <Input id="country" required value={buyer.country} onChange={(event) => updateBuyer("country", event.target.value)} />
          </label>
          <label className="grid gap-2">
            <Label htmlFor="destinationPort">{copy.destinationPort}</Label>
            <Input id="destinationPort" required value={buyer.destinationPort} onChange={(event) => updateBuyer("destinationPort", event.target.value)} />
          </label>
          <label className="grid gap-2">
            <Label htmlFor="tradeTerm">{copy.tradeTerm}</Label>
            <select
              id="tradeTerm"
              value={buyer.tradeTerm}
              onChange={(event) => updateBuyer("tradeTerm", event.target.value as TradeTerm)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {tradeTerms.map((term) => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <Label htmlFor="paymentTerm">{copy.paymentTerm}</Label>
            <select
              id="paymentTerm"
              value={buyer.paymentTerm}
              onChange={(event) => updateBuyer("paymentTerm", event.target.value as PaymentTerm)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {paymentTerms.map((term) => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <Label htmlFor="timeline">{copy.timeline}</Label>
            <Input id="timeline" required placeholder="Example: Trial shipment in September 2026" value={buyer.timeline} onChange={(event) => updateBuyer("timeline", event.target.value)} />
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <Label htmlFor="message">{copy.additionalMessage}</Label>
            <Textarea id="message" rows={5} value={buyer.message} onChange={(event) => updateBuyer("message", event.target.value)} />
          </label>
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-border/60 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">{copy.checkout}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.checkoutDescription}</p>
        <div className="mt-5 space-y-3">
          {validItems.map((item) => {
            const product = productMap.get(item.productId);
            if (!product) return null;

            return (
              <div key={item.productId} className="rounded-lg border border-border/60 p-3">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.quantity} · {item.tradeTerm} · {item.destinationPort || buyer.destinationPort || "Destination TBD"}</p>
              </div>
            );
          })}
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-5 w-full bg-[#1d6b4f] text-white hover:bg-[#174f3b]">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          {copy.submitRfq}
        </Button>
      </aside>
    </form>
  );
}
