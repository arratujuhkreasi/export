export const inquiryCartKey = "coexportid.inquiryCart.v1";
export const inquiryOrderKey = "coexportid.inquiryOrders.v1";

export type TradeTerm = "FOB" | "CIF" | "CFR" | "EXW";
export type PaymentTerm = "T/T" | "L/C" | "D/P" | "Negotiable";

export type InquiryCartItem = {
  productId: string;
  quantity: string;
  destinationPort: string;
  tradeTerm: TradeTerm;
  notes: string;
  addedAt: string;
};

export type BuyerDetails = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  destinationPort: string;
  tradeTerm: TradeTerm;
  paymentTerm: PaymentTerm;
  timeline: string;
  message: string;
};

export type InquiryOrder = {
  id: string;
  createdAt: string;
  buyer: BuyerDetails;
  items: InquiryCartItem[];
  status: "RFQ submitted" | "Draft";
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function parseJsonArray<T>(value: string | null): T[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function readInquiryCart(): InquiryCartItem[] {
  if (!canUseStorage()) return [];

  return parseJsonArray<InquiryCartItem>(window.localStorage.getItem(inquiryCartKey));
}

export function writeInquiryCart(items: InquiryCartItem[]) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(inquiryCartKey, JSON.stringify(items));
  window.dispatchEvent(new Event("coexportid-cart-updated"));
}

export function addInquiryCartItem(item: Omit<InquiryCartItem, "addedAt">) {
  const existing = readInquiryCart();
  const index = existing.findIndex((entry) => entry.productId === item.productId);
  const nextItem: InquiryCartItem = {
    ...item,
    addedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    existing[index] = {
      ...existing[index],
      ...nextItem,
      notes: item.notes || existing[index].notes,
    };
  } else {
    existing.push(nextItem);
  }

  writeInquiryCart(existing);
  return existing;
}

export function removeInquiryCartItem(productId: string) {
  writeInquiryCart(readInquiryCart().filter((item) => item.productId !== productId));
}

export function clearInquiryCart() {
  writeInquiryCart([]);
}

export function readInquiryOrders(): InquiryOrder[] {
  if (!canUseStorage()) return [];

  return parseJsonArray<InquiryOrder>(window.localStorage.getItem(inquiryOrderKey));
}

export function saveInquiryOrder(order: InquiryOrder) {
  if (!canUseStorage()) return;

  const orders = readInquiryOrders();
  window.localStorage.setItem(inquiryOrderKey, JSON.stringify([order, ...orders].slice(0, 12)));
}

export function createInquiryId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `RFQ-${stamp}-${random}`;
}
