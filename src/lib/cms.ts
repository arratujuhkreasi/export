export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  origin: string;
  image: string;
  specs: {
    grade: string;
    moisture: string;
    packaging: string;
    shelfLife: string;
  };
  documents: string[];
  applications: string[];
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  content: string[];
};

export const products: Product[] = [
  {
    id: "prd-seaweed",
    slug: "dried-eucheuma-seaweed",
    name: "Dried Eucheuma Seaweed",
    category: "Marine Commodity",
    description:
      "Sun-dried Indonesian seaweed for carrageenan processors, food manufacturers, and hydrocolloid buyers.",
    longDescription:
      "Harvested from coastal farmer groups in eastern Indonesia, this dried eucheuma seaweed is sorted for export consistency and packed for container loading. The dummy specification mirrors common B2B requirements for processors that need traceable supply, stable moisture levels, and documentation readiness.",
    origin: "South Sulawesi and East Nusa Tenggara, Indonesia",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: "Export Grade A/B",
      moisture: "Max 38%",
      packaging: "50 kg pressed bale",
      shelfLife: "18 months in dry storage",
    },
    documents: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate"],
    applications: ["Carrageenan extraction", "Food stabilizers", "Cosmetic ingredients"],
  },
  {
    id: "prd-cocoa",
    slug: "fermented-cocoa-beans",
    name: "Fermented Cocoa Beans",
    category: "Agricultural Commodity",
    description:
      "Fermented cocoa beans with balanced acidity and traceable farmer partnership sourcing.",
    longDescription:
      "These dummy cocoa beans represent a premium Indonesian origin program for chocolate makers and ingredient distributors. The workflow emphasizes controlled fermentation, drying discipline, and batch-level origin records.",
    origin: "Central Sulawesi, Indonesia",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: "FAQ / Premium Fermented",
      moisture: "Max 7.5%",
      packaging: "62.5 kg jute bag",
      shelfLife: "24 months in cool dry storage",
    },
    documents: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Fumigation Certificate"],
    applications: ["Chocolate production", "Cocoa liquor", "Cocoa powder"],
  },
  {
    id: "prd-coconut",
    slug: "desiccated-coconut",
    name: "Desiccated Coconut",
    category: "Processed Ingredient",
    description:
      "Fine and medium grade desiccated coconut for bakery, confectionery, and snack manufacturing.",
    longDescription:
      "Sourced from mature coconuts and processed into food-grade desiccated coconut, this sample product is positioned for importers that need reliable documentation, food safety discipline, and consistent granulation.",
    origin: "North Sulawesi, Indonesia",
    image:
      "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: "Fine / Medium",
      moisture: "Max 3%",
      packaging: "25 kg kraft paper bag",
      shelfLife: "12 months from production",
    },
    documents: ["Commercial Invoice", "Packing List", "Health Certificate", "Halal Certificate"],
    applications: ["Bakery toppings", "Snack blends", "Confectionery filling"],
  },
  {
    id: "prd-coffee",
    slug: "arabica-green-coffee",
    name: "Arabica Green Coffee",
    category: "Specialty Crop",
    description:
      "Washed and natural arabica lots for roasters seeking Indonesian cup character and origin stories.",
    longDescription:
      "This dummy green coffee line is designed for B2B roasters, traders, and private-label buyers. It highlights altitude, post-harvest processing, and supplier consistency while keeping the content ready for a future CMS.",
    origin: "Aceh Gayo and West Java, Indonesia",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: "Grade 1 / Specialty",
      moisture: "10-12%",
      packaging: "60 kg GrainPro-lined jute bag",
      shelfLife: "12 months in controlled storage",
    },
    documents: ["Commercial Invoice", "Packing List", "Certificate of Origin", "ICO Certificate"],
    applications: ["Specialty roasting", "Private label coffee", "Blending"],
  },
];

export const posts: Post[] = [
  {
    id: "post-seaweed-applications",
    slug: "top-applications-of-indonesian-seaweed",
    title: "Top Applications of Indonesian Seaweed in Global Manufacturing",
    excerpt:
      "How dried eucheuma seaweed moves from coastal farms into food, cosmetics, and industrial ingredient supply chains.",
    date: "2026-07-01",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    content: [
      "Indonesian seaweed is valued by processors because the country has wide coastal farming areas, experienced smallholder groups, and access to multiple export lanes.",
      "For B2B buyers, the main evaluation points are moisture control, foreign matter sorting, bale density, and document readiness. A reliable exporter should be able to explain how each batch is harvested, dried, pressed, inspected, and loaded.",
      "The largest application is carrageenan extraction, but seaweed also supports food stabilizers, personal care formulas, and specialty ingredient development.",
    ],
  },
  {
    id: "post-farm-export",
    slug: "journey-from-farm-to-export-container",
    title: "The Journey from Farm to Export Container",
    excerpt:
      "A practical look at sourcing, sorting, documentation, and shipment preparation for Indonesian commodities.",
    date: "2026-06-18",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop",
    content: [
      "Export readiness starts before the product reaches the warehouse. Farmer relationships, harvest timing, and post-harvest handling all shape the final quality.",
      "After procurement, commodities are checked against buyer specifications, sorted, packed, labeled, and prepared for inspection. Documentation is then aligned with destination market requirements.",
      "A clean B2B export process gives importers more than a price quote. It gives them traceability, schedule confidence, and fewer surprises at customs clearance.",
    ],
  },
  {
    id: "post-buyer-checklist",
    slug: "b2b-buyer-checklist-for-indonesian-commodities",
    title: "B2B Buyer Checklist for Indonesian Commodity Sourcing",
    excerpt:
      "Questions importers should ask before confirming a trial shipment or annual supply contract.",
    date: "2026-05-29",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",
    content: [
      "Before placing a purchase order, buyers should confirm specification tolerances, packaging type, inspection process, shipment term, and document availability.",
      "The strongest suppliers can explain both quality control and operational limits. That transparency helps buyers build realistic contracts and avoid supply chain friction.",
      "A trial shipment is often the cleanest way to validate product quality, communication speed, and export execution before moving into larger volume commitments.",
    ],
  },
];

export function getFeaturedProducts() {
  return products.slice(0, 3);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRecentPosts() {
  return posts.slice(0, 3);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
