import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = "CO EXPORT.ID B2B Export Marketplace";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f6faf8",
          color: "#071811",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: "#1d6b4f" }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 28, maxWidth: 860, fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          B2B Export Marketplace
        </div>
        <div style={{ marginTop: 28, maxWidth: 820, fontSize: 30, lineHeight: 1.35, color: "#365449" }}>
          Indonesian commodities, RFQ transactions, export documentation, and supplier onboarding.
        </div>
      </div>
    ),
    size
  );
}
