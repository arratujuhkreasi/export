export const siteConfig = {
  name: "CO EXPORT.ID",
  url: "https://coexportid.com",
  email: "sales@coexport.id",
  address: "Bandung, West Java, Indonesia",
  logo: "/brand/co-export-logo-uploaded.png",
  description:
    "B2B export marketplace for verified Indonesian commodities, RFQ transactions, supplier onboarding, and export documentation support.",
  paymentTerms: ["T/T bank transfer", "L/C at sight", "D/P by agreement"],
} as const;

export function getSalesWhatsAppHref(message?: string) {
  const number = process.env.NEXT_PUBLIC_SALES_WHATSAPP?.replace(/\D/g, "");

  if (!number) {
    return null;
  }

  const text = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${number}${text}`;
}
