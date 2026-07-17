import type { Locale, Localized } from "@/lib/i18n";

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

type ProductRecord = Omit<
  Product,
  | "name"
  | "category"
  | "description"
  | "longDescription"
  | "origin"
  | "specs"
  | "documents"
  | "applications"
> & {
  name: Localized;
  category: Localized;
  description: Localized;
  longDescription: Localized;
  origin: Localized;
  specs: {
    grade: Localized;
    moisture: Localized;
    packaging: Localized;
    shelfLife: Localized;
  };
  documents: Localized<string[]>;
  applications: Localized<string[]>;
};

type PostRecord = Omit<Post, "title" | "excerpt" | "readTime" | "content"> & {
  title: Localized;
  excerpt: Localized;
  readTime: Localized;
  content: Localized<string[]>;
};

const productRecords: ProductRecord[] = [
  {
    id: "prd-seaweed",
    slug: "dried-eucheuma-seaweed",
    name: {
      en: "Dried Eucheuma Seaweed",
      id: "Rumput Laut Eucheuma Kering",
    },
    category: {
      en: "Marine Commodity",
      id: "Komoditas Laut",
    },
    description: {
      en: "Sun-dried Indonesian seaweed for carrageenan processors, food manufacturers, and hydrocolloid buyers.",
      id: "Rumput laut Indonesia kering matahari untuk prosesor carrageenan, produsen makanan, dan pembeli hydrocolloid.",
    },
    longDescription: {
      en: "Harvested from coastal farmer groups in eastern Indonesia, this dried eucheuma seaweed is sorted for export consistency and packed for container loading. The dummy specification mirrors common B2B requirements for processors that need traceable supply, stable moisture levels, and documentation readiness.",
      id: "Dipanen dari kelompok petani pesisir di Indonesia timur, rumput laut eucheuma kering ini disortir untuk konsistensi ekspor dan dikemas untuk loading kontainer. Spesifikasi dummy ini mencerminkan kebutuhan umum B2B untuk prosesor yang membutuhkan pasokan terlacak, kadar air stabil, dan kesiapan dokumen.",
    },
    origin: {
      en: "South Sulawesi and East Nusa Tenggara, Indonesia",
      id: "Sulawesi Selatan dan Nusa Tenggara Timur, Indonesia",
    },
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: { en: "Export Grade A/B", id: "Grade Ekspor A/B" },
      moisture: { en: "Max 38%", id: "Maks 38%" },
      packaging: { en: "50 kg pressed bale", id: "Bale press 50 kg" },
      shelfLife: { en: "18 months in dry storage", id: "18 bulan di gudang kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari"],
    },
    applications: {
      en: ["Carrageenan extraction", "Food stabilizers", "Cosmetic ingredients"],
      id: ["Ekstraksi carrageenan", "Stabilizer makanan", "Bahan kosmetik"],
    },
  },
  {
    id: "prd-cocoa",
    slug: "fermented-cocoa-beans",
    name: { en: "Fermented Cocoa Beans", id: "Biji Kakao Fermentasi" },
    category: { en: "Agricultural Commodity", id: "Komoditas Pertanian" },
    description: {
      en: "Fermented cocoa beans with balanced acidity and traceable farmer partnership sourcing.",
      id: "Biji kakao fermentasi dengan keasaman seimbang dan sumber pasok kemitraan petani yang terlacak.",
    },
    longDescription: {
      en: "These dummy cocoa beans represent a premium Indonesian origin program for chocolate makers and ingredient distributors. The workflow emphasizes controlled fermentation, drying discipline, and batch-level origin records.",
      id: "Biji kakao dummy ini merepresentasikan program origin Indonesia premium untuk pembuat cokelat dan distributor bahan baku. Workflow menekankan fermentasi terkontrol, disiplin pengeringan, dan catatan asal per batch.",
    },
    origin: { en: "Central Sulawesi, Indonesia", id: "Sulawesi Tengah, Indonesia" },
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: { en: "FAQ / Premium Fermented", id: "FAQ / Premium Fermentasi" },
      moisture: { en: "Max 7.5%", id: "Maks 7,5%" },
      packaging: { en: "62.5 kg jute bag", id: "Karung goni 62,5 kg" },
      shelfLife: { en: "24 months in cool dry storage", id: "24 bulan di gudang sejuk dan kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Fumigation Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fumigasi"],
    },
    applications: {
      en: ["Chocolate production", "Cocoa liquor", "Cocoa powder"],
      id: ["Produksi cokelat", "Cocoa liquor", "Bubuk kakao"],
    },
  },
  {
    id: "prd-coconut",
    slug: "desiccated-coconut",
    name: { en: "Desiccated Coconut", id: "Kelapa Parut Kering" },
    category: { en: "Processed Ingredient", id: "Bahan Olahan" },
    description: {
      en: "Fine and medium grade desiccated coconut for bakery, confectionery, and snack manufacturing.",
      id: "Kelapa parut kering grade fine dan medium untuk bakery, confectionery, dan manufaktur snack.",
    },
    longDescription: {
      en: "Sourced from mature coconuts and processed into food-grade desiccated coconut, this sample product is positioned for importers that need reliable documentation, food safety discipline, and consistent granulation.",
      id: "Bersumber dari kelapa tua dan diproses menjadi desiccated coconut food-grade, produk contoh ini diposisikan untuk importir yang membutuhkan dokumentasi andal, disiplin keamanan pangan, dan granulation konsisten.",
    },
    origin: { en: "North Sulawesi, Indonesia", id: "Sulawesi Utara, Indonesia" },
    image:
      "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: { en: "Fine / Medium", id: "Fine / Medium" },
      moisture: { en: "Max 3%", id: "Maks 3%" },
      packaging: { en: "25 kg kraft paper bag", id: "Kantong kraft 25 kg" },
      shelfLife: { en: "12 months from production", id: "12 bulan sejak produksi" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Health Certificate", "Halal Certificate"],
      id: ["Commercial Invoice", "Packing List", "Health Certificate", "Sertifikat Halal"],
    },
    applications: {
      en: ["Bakery toppings", "Snack blends", "Confectionery filling"],
      id: ["Topping bakery", "Campuran snack", "Isian confectionery"],
    },
  },
  {
    id: "prd-coffee",
    slug: "arabica-green-coffee",
    name: { en: "Arabica Green Coffee", id: "Green Bean Arabika" },
    category: { en: "Specialty Crop", id: "Tanaman Specialty" },
    description: {
      en: "Washed and natural arabica lots for roasters seeking Indonesian cup character and origin stories.",
      id: "Lot arabika washed dan natural untuk roaster yang mencari karakter cup Indonesia dan cerita origin.",
    },
    longDescription: {
      en: "This dummy green coffee line is designed for B2B roasters, traders, and private-label buyers. It highlights altitude, post-harvest processing, and supplier consistency while keeping the content ready for a future CMS.",
      id: "Lini green coffee dummy ini dirancang untuk roaster B2B, trader, dan pembeli private label. Konten menonjolkan ketinggian, proses pascapanen, dan konsistensi pemasok sambil tetap siap untuk CMS di masa depan.",
    },
    origin: { en: "Aceh Gayo and West Java, Indonesia", id: "Aceh Gayo dan Jawa Barat, Indonesia" },
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop",
    specs: {
      grade: { en: "Grade 1 / Specialty", id: "Grade 1 / Specialty" },
      moisture: { en: "10-12%", id: "10-12%" },
      packaging: { en: "60 kg GrainPro-lined jute bag", id: "Karung goni 60 kg dengan GrainPro" },
      shelfLife: { en: "12 months in controlled storage", id: "12 bulan di penyimpanan terkontrol" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "ICO Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat ICO"],
    },
    applications: {
      en: ["Specialty roasting", "Private label coffee", "Blending"],
      id: ["Specialty roasting", "Kopi private label", "Blending"],
    },
  },
];

const postRecords: PostRecord[] = [
  {
    id: "post-seaweed-applications",
    slug: "top-applications-of-indonesian-seaweed",
    title: {
      en: "Top Applications of Indonesian Seaweed in Global Manufacturing",
      id: "Aplikasi Utama Rumput Laut Indonesia dalam Manufaktur Global",
    },
    excerpt: {
      en: "How dried eucheuma seaweed moves from coastal farms into food, cosmetics, and industrial ingredient supply chains.",
      id: "Bagaimana rumput laut eucheuma kering bergerak dari tambak pesisir ke rantai pasok makanan, kosmetik, dan bahan industri.",
    },
    date: "2026-07-01",
    readTime: { en: "4 min read", id: "4 menit baca" },
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    content: {
      en: [
        "Indonesian seaweed is valued by processors because the country has wide coastal farming areas, experienced smallholder groups, and access to multiple export lanes.",
        "For B2B buyers, the main evaluation points are moisture control, foreign matter sorting, bale density, and document readiness. A reliable exporter should be able to explain how each batch is harvested, dried, pressed, inspected, and loaded.",
        "The largest application is carrageenan extraction, but seaweed also supports food stabilizers, personal care formulas, and specialty ingredient development.",
      ],
      id: [
        "Rumput laut Indonesia dihargai oleh prosesor karena Indonesia memiliki area budidaya pesisir yang luas, kelompok petani berpengalaman, dan akses ke berbagai jalur ekspor.",
        "Untuk pembeli B2B, poin evaluasi utama adalah kontrol kadar air, sortir foreign matter, kepadatan bale, dan kesiapan dokumen. Eksportir yang andal harus dapat menjelaskan bagaimana setiap batch dipanen, dikeringkan, dipress, diperiksa, dan dimuat.",
        "Aplikasi terbesarnya adalah ekstraksi carrageenan, tetapi rumput laut juga mendukung stabilizer makanan, formula personal care, dan pengembangan bahan khusus.",
      ],
    },
  },
  {
    id: "post-farm-export",
    slug: "journey-from-farm-to-export-container",
    title: {
      en: "The Journey from Farm to Export Container",
      id: "Perjalanan dari Kebun ke Kontainer Ekspor",
    },
    excerpt: {
      en: "A practical look at sourcing, sorting, documentation, and shipment preparation for Indonesian commodities.",
      id: "Gambaran praktis tentang sourcing, sortir, dokumentasi, dan persiapan pengiriman komoditas Indonesia.",
    },
    date: "2026-06-18",
    readTime: { en: "5 min read", id: "5 menit baca" },
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop",
    content: {
      en: [
        "Export readiness starts before the product reaches the warehouse. Farmer relationships, harvest timing, and post-harvest handling all shape the final quality.",
        "After procurement, commodities are checked against buyer specifications, sorted, packed, labeled, and prepared for inspection. Documentation is then aligned with destination market requirements.",
        "A clean B2B export process gives importers more than a price quote. It gives them traceability, schedule confidence, and fewer surprises at customs clearance.",
      ],
      id: [
        "Kesiapan ekspor dimulai sebelum produk masuk gudang. Relasi petani, waktu panen, dan penanganan pascapanen ikut membentuk kualitas akhir.",
        "Setelah pengadaan, komoditas diperiksa terhadap spesifikasi pembeli, disortir, dikemas, diberi label, dan disiapkan untuk inspeksi. Dokumentasi kemudian diselaraskan dengan persyaratan pasar tujuan.",
        "Proses ekspor B2B yang rapi memberi importir lebih dari sekadar harga. Mereka mendapatkan traceability, keyakinan jadwal, dan lebih sedikit kejutan saat customs clearance.",
      ],
    },
  },
  {
    id: "post-buyer-checklist",
    slug: "b2b-buyer-checklist-for-indonesian-commodities",
    title: {
      en: "B2B Buyer Checklist for Indonesian Commodity Sourcing",
      id: "Checklist Pembeli B2B untuk Sourcing Komoditas Indonesia",
    },
    excerpt: {
      en: "Questions importers should ask before confirming a trial shipment or annual supply contract.",
      id: "Pertanyaan yang perlu diajukan importir sebelum mengonfirmasi trial shipment atau kontrak pasokan tahunan.",
    },
    date: "2026-05-29",
    readTime: { en: "3 min read", id: "3 menit baca" },
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",
    content: {
      en: [
        "Before placing a purchase order, buyers should confirm specification tolerances, packaging type, inspection process, shipment term, and document availability.",
        "The strongest suppliers can explain both quality control and operational limits. That transparency helps buyers build realistic contracts and avoid supply chain friction.",
        "A trial shipment is often the cleanest way to validate product quality, communication speed, and export execution before moving into larger volume commitments.",
      ],
      id: [
        "Sebelum membuat purchase order, pembeli perlu mengonfirmasi toleransi spesifikasi, tipe kemasan, proses inspeksi, shipment term, dan ketersediaan dokumen.",
        "Pemasok yang kuat dapat menjelaskan quality control sekaligus batas operasional. Transparansi itu membantu pembeli membuat kontrak realistis dan menghindari friksi rantai pasok.",
        "Trial shipment sering menjadi cara paling bersih untuk memvalidasi kualitas produk, kecepatan komunikasi, dan eksekusi ekspor sebelum masuk ke komitmen volume lebih besar.",
      ],
    },
  },
];

function localizeProduct(product: ProductRecord, locale: Locale): Product {
  return {
    id: product.id,
    slug: product.slug,
    image: product.image,
    name: product.name[locale],
    category: product.category[locale],
    description: product.description[locale],
    longDescription: product.longDescription[locale],
    origin: product.origin[locale],
    specs: {
      grade: product.specs.grade[locale],
      moisture: product.specs.moisture[locale],
      packaging: product.specs.packaging[locale],
      shelfLife: product.specs.shelfLife[locale],
    },
    documents: product.documents[locale],
    applications: product.applications[locale],
  };
}

function localizePost(post: PostRecord, locale: Locale): Post {
  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    image: post.image,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    readTime: post.readTime[locale],
    content: post.content[locale],
  };
}

export function getProducts(locale: Locale = "en") {
  return productRecords.map((product) => localizeProduct(product, locale));
}

export function getFeaturedProducts(locale: Locale = "en") {
  return getProducts(locale).slice(0, 3);
}

export function getProductBySlug(slug: string, locale: Locale = "en") {
  const product = productRecords.find((item) => item.slug === slug);

  return product ? localizeProduct(product, locale) : undefined;
}

export function getProductStaticParams() {
  return productRecords.map((product) => ({ slug: product.slug }));
}

export function getPosts(locale: Locale = "en") {
  return postRecords.map((post) => localizePost(post, locale));
}

export function getRecentPosts(locale: Locale = "en") {
  return getPosts(locale).slice(0, 3);
}

export function getPostBySlug(slug: string, locale: Locale = "en") {
  const post = postRecords.find((item) => item.slug === slug);

  return post ? localizePost(post, locale) : undefined;
}

export function getPostStaticParams() {
  return postRecords.map((post) => ({ slug: post.slug }));
}

export const products = getProducts("en");
export const posts = getPosts("en");
