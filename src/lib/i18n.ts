export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "en";

export function resolveLocale(value?: string | string[]): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;

  return candidate === "id" ? "id" : "en";
}

export function hrefWithLocale(path: string, locale: Locale) {
  const separator = path.includes("?") ? "&" : "?";

  return `${path}${separator}lang=${locale}`;
}

export const ui = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      company: "Our Company",
      insights: "Insights",
      contact: "Contact",
      quote: "Request Quote",
      open: "Open navigation",
    },
    footer: {
      description:
        "B2B export storefront for Indonesian marine and agricultural commodities, built for traceable sourcing, clear specifications, and global-ready documentation.",
      navigation: "Navigation",
      salesDesk: "Sales Desk",
      whatsapp: "WhatsApp Export Sales",
      copyright:
        "(c) 2026 Nusantara Harvest Co. Dummy brand and sample product data for PRD implementation.",
    },
    home: {
      metrics: [
        { metric: "12+", label: "export-ready dummy SKUs" },
        { metric: "18", label: "common export documents mapped" },
        { metric: "Global", label: "FOB, CNF, and trial shipment support" },
      ],
      featuredEyebrow: "Featured products",
      featuredTitle: "Commodity lines prepared for B2B conversations.",
      viewCatalog: "View Catalog",
      insightsEyebrow: "Insights",
      insightsTitle: "Buyer education for commodity sourcing.",
      readInsights: "Read Insights",
    },
    hero: {
      badge: "Traceable Indonesian commodities",
      title: "Bringing Indonesia's harvest to the world",
      description:
        "Export-ready seaweed, cocoa, coconut, and coffee for importers that need clear specifications, dependable sourcing, and documentation before shipment.",
      primaryCta: "Explore Products",
      secondaryCta: "Start B2B Inquiry",
      imageAlt: "Indonesian agricultural field prepared for export sourcing",
    },
    features: {
      eyebrow: "Why us",
      title: "Built for buyers who need clarity before committing volume.",
      items: [
        {
          title: "Quality-First Sourcing",
          description:
            "Supplier batches are aligned against buyer specifications before quotation and loading.",
        },
        {
          title: "Sustainable Partnerships",
          description:
            "Dummy supply programs are framed around farmer groups, coastal communities, and long-term sourcing discipline.",
        },
        {
          title: "Global-Ready Compliance",
          description:
            "Each commodity page lists export documents commonly requested by importers and freight partners.",
        },
      ],
    },
    products: {
      title: "Products",
      description: "Export commodity catalog for Indonesian seaweed, cocoa, coconut, and coffee.",
      pageTitle: "Export commodity catalog",
      pageDescription:
        "Dummy product lines built from the PRD structure: each item includes origin, technical specifications, applications, and export document availability.",
      viewDetails: "View Details",
      back: "Back to Products",
      origin: "Origin",
      exportDocuments: "Export Documents",
      applications: "Applications",
      requestQuote: "Request Quote",
      specs: {
        grade: "Grade",
        moisture: "Moisture",
        packaging: "Packaging",
        shelfLife: "Shelf life",
      },
    },
    about: {
      title: "Our Company",
      description: "About Nusantara Harvest Co. and its dummy Indonesian export supply chain.",
      eyebrow: "Our company",
      pageTitle: "A dummy export brand shaped for real B2B workflows.",
      pageDescription:
        "Nusantara Harvest Co. is a sample brand for the PRD: a professional export company website focused on seaweed and Indonesian agricultural commodities.",
      imageAlt: "Farmers working with agricultural produce",
      values: [
        {
          title: "Mission",
          description:
            "Connect reliable Indonesian producer groups with international buyers through transparent specifications and disciplined export execution.",
        },
        {
          title: "Vision",
          description:
            "Become a trusted digital-first export partner for natural commodities from coastal and farming regions across Indonesia.",
        },
        {
          title: "Partnerships",
          description:
            "Represent farmer, processor, and warehouse relationships with clear expectations for quality, timing, and documentation.",
        },
      ],
      integrityTitle: "Supply chain integrity",
      integrityDescription:
        "The site structure is ready for a future Supabase or Sanity CMS. Product pages separate origin, specification, application, and export document data so the sales team can update buyer-facing content without rebuilding the codebase.",
    },
    insights: {
      title: "Insights",
      description: "Educational export sourcing articles for B2B commodity buyers.",
      pageTitle: "B2B sourcing articles for global buyers",
      pageDescription:
        "SEO-ready dummy articles covering commodity applications, export preparation, and importer due diligence.",
      readArticle: "Read Article",
      back: "Back to Insights",
    },
    contact: {
      title: "Contact",
      description: "Send a B2B export inquiry to Nusantara Harvest Co.",
      pageTitle: "Start a B2B export inquiry",
      pageDescription:
        "Share product interest, destination market, target quantity, and timeline. The form is wired for an n8n webhook through NEXT_PUBLIC_N8N_WEBHOOK_URL.",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Address",
      labels: {
        name: "Name",
        company: "Company",
        email: "Email",
        productInterest: "Product Interest",
        message: "Message",
      },
      placeholders: {
        productInterest: "Dried eucheuma seaweed, cocoa beans, coconut...",
        message: "Target quantity, destination port, specification, and shipment timeline",
      },
      required: {
        name: "Name is required",
        company: "Company is required",
        email: "Email is required",
        validEmail: "Enter a valid email",
        productInterest: "Product interest is required",
        message: "Message is required",
      },
      submit: "Send Inquiry",
      successWebhook: "Inquiry sent to sales workflow.",
      successDemo:
        "Inquiry captured in demo mode. Add NEXT_PUBLIC_N8N_WEBHOOK_URL to enable n8n.",
      error: "Inquiry could not be sent. Please email sales@nusantaraharvest.example.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      products: "Produk",
      company: "Perusahaan",
      insights: "Artikel",
      contact: "Kontak",
      quote: "Minta Penawaran",
      open: "Buka navigasi",
    },
    footer: {
      description:
        "Etalase ekspor B2B untuk komoditas laut dan hasil bumi Indonesia, dirancang untuk sumber pasok terlacak, spesifikasi jelas, dan dokumentasi siap ekspor.",
      navigation: "Navigasi",
      salesDesk: "Tim Penjualan",
      whatsapp: "WhatsApp Tim Ekspor",
      copyright:
        "(c) 2026 Nusantara Harvest Co. Brand dummy dan data produk contoh untuk implementasi PRD.",
    },
    home: {
      metrics: [
        { metric: "12+", label: "SKU dummy siap ekspor" },
        { metric: "18", label: "dokumen ekspor umum dipetakan" },
        { metric: "Global", label: "dukungan FOB, CNF, dan trial shipment" },
      ],
      featuredEyebrow: "Produk unggulan",
      featuredTitle: "Lini komoditas siap untuk diskusi B2B.",
      viewCatalog: "Lihat Katalog",
      insightsEyebrow: "Artikel",
      insightsTitle: "Edukasi pembeli untuk sourcing komoditas.",
      readInsights: "Baca Artikel",
    },
    hero: {
      badge: "Komoditas Indonesia yang terlacak",
      title: "Membawa hasil bumi Indonesia ke pasar dunia",
      description:
        "Rumput laut, kakao, kelapa, dan kopi siap ekspor untuk importir yang membutuhkan spesifikasi jelas, pasokan tepercaya, dan dokumentasi sebelum pengiriman.",
      primaryCta: "Lihat Produk",
      secondaryCta: "Mulai Inquiry B2B",
      imageAlt: "Lahan pertanian Indonesia untuk sumber pasok ekspor",
    },
    features: {
      eyebrow: "Keunggulan",
      title: "Dibangun untuk pembeli yang butuh kejelasan sebelum komitmen volume.",
      items: [
        {
          title: "Sourcing Berbasis Kualitas",
          description:
            "Setiap batch pemasok diselaraskan dengan spesifikasi pembeli sebelum penawaran dan loading.",
        },
        {
          title: "Kemitraan Berkelanjutan",
          description:
            "Program pasok dummy disusun di sekitar kelompok tani, komunitas pesisir, dan disiplin sourcing jangka panjang.",
        },
        {
          title: "Kepatuhan Siap Global",
          description:
            "Setiap halaman komoditas mencantumkan dokumen ekspor yang umum diminta importir dan freight partner.",
        },
      ],
    },
    products: {
      title: "Produk",
      description: "Katalog komoditas ekspor untuk rumput laut, kakao, kelapa, dan kopi Indonesia.",
      pageTitle: "Katalog komoditas ekspor",
      pageDescription:
        "Lini produk dummy berdasarkan struktur PRD: setiap item memuat asal, spesifikasi teknis, aplikasi, dan ketersediaan dokumen ekspor.",
      viewDetails: "Lihat Detail",
      back: "Kembali ke Produk",
      origin: "Asal",
      exportDocuments: "Dokumen Ekspor",
      applications: "Aplikasi",
      requestQuote: "Minta Penawaran",
      specs: {
        grade: "Grade",
        moisture: "Kadar air",
        packaging: "Kemasan",
        shelfLife: "Masa simpan",
      },
    },
    about: {
      title: "Perusahaan",
      description: "Tentang Nusantara Harvest Co. dan rantai pasok ekspor dummy dari Indonesia.",
      eyebrow: "Perusahaan",
      pageTitle: "Brand ekspor dummy yang dibentuk untuk workflow B2B nyata.",
      pageDescription:
        "Nusantara Harvest Co. adalah brand contoh untuk PRD: website perusahaan ekspor profesional yang berfokus pada rumput laut dan hasil bumi Indonesia.",
      imageAlt: "Petani bekerja dengan hasil bumi",
      values: [
        {
          title: "Misi",
          description:
            "Menghubungkan kelompok produsen Indonesia yang andal dengan pembeli internasional melalui spesifikasi transparan dan eksekusi ekspor yang disiplin.",
        },
        {
          title: "Visi",
          description:
            "Menjadi mitra ekspor digital-first yang tepercaya untuk komoditas natural dari wilayah pesisir dan pertanian Indonesia.",
        },
        {
          title: "Kemitraan",
          description:
            "Mewakili relasi petani, prosesor, dan gudang dengan ekspektasi yang jelas untuk kualitas, waktu, dan dokumentasi.",
        },
      ],
      integrityTitle: "Integritas rantai pasok",
      integrityDescription:
        "Struktur situs siap untuk CMS Supabase atau Sanity di masa depan. Halaman produk memisahkan data asal, spesifikasi, aplikasi, dan dokumen ekspor sehingga tim sales dapat memperbarui konten pembeli tanpa membangun ulang codebase.",
    },
    insights: {
      title: "Artikel",
      description: "Artikel edukasi sourcing ekspor untuk pembeli komoditas B2B.",
      pageTitle: "Artikel sourcing B2B untuk pembeli global",
      pageDescription:
        "Artikel dummy siap SEO yang membahas aplikasi komoditas, persiapan ekspor, dan due diligence importir.",
      readArticle: "Baca Artikel",
      back: "Kembali ke Artikel",
    },
    contact: {
      title: "Kontak",
      description: "Kirim inquiry ekspor B2B ke Nusantara Harvest Co.",
      pageTitle: "Mulai inquiry ekspor B2B",
      pageDescription:
        "Bagikan minat produk, pasar tujuan, target kuantitas, dan timeline. Form ini tersambung ke webhook n8n melalui NEXT_PUBLIC_N8N_WEBHOOK_URL.",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Alamat",
      labels: {
        name: "Nama",
        company: "Perusahaan",
        email: "Email",
        productInterest: "Minat Produk",
        message: "Pesan",
      },
      placeholders: {
        productInterest: "Rumput laut eucheuma, biji kakao, kelapa...",
        message: "Target kuantitas, pelabuhan tujuan, spesifikasi, dan timeline pengiriman",
      },
      required: {
        name: "Nama wajib diisi",
        company: "Perusahaan wajib diisi",
        email: "Email wajib diisi",
        validEmail: "Masukkan email yang valid",
        productInterest: "Minat produk wajib diisi",
        message: "Pesan wajib diisi",
      },
      submit: "Kirim Inquiry",
      successWebhook: "Inquiry terkirim ke workflow sales.",
      successDemo:
        "Inquiry tersimpan dalam mode demo. Tambahkan NEXT_PUBLIC_N8N_WEBHOOK_URL untuk mengaktifkan n8n.",
      error: "Inquiry tidak dapat dikirim. Silakan email sales@nusantaraharvest.example.",
    },
  },
} as const;
