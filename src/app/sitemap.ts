import type { MetadataRoute } from "next";

import { getPostStaticParams, getProductStaticParams } from "@/lib/cms";
import { siteConfig } from "@/lib/site";

const staticRoutes = ["", "/products", "/cart", "/checkout", "/about", "/partnership", "/partnership/apply", "/insights", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
  const productRoutes = getProductStaticParams().map(({ slug }) => ({
    url: `${siteConfig.url}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  const insightRoutes = getPostStaticParams().map(({ slug }) => ({
    url: `${siteConfig.url}/insights/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...insightRoutes];
}
