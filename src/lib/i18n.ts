export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "en";
export const brandName = "CO EXPORT.ID";

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
      partnership: "Become a Partner",
      insights: "Insights",
      contact: "Contact",
      quote: "Request Quote",
      open: "Open navigation",
    },
    footer: {
      description:
        "Global logistics and trade partner for Indonesian natural commodities, with export catalog, buyer education, and documentation-ready sourcing.",
      navigation: "Navigation",
      salesDesk: "Sales Desk",
      whatsapp: "WhatsApp Export Sales",
      copyright:
        "(c) 2026 CO EXPORT.ID. Product catalog prices are indicative and subject to final quotation.",
    },
    home: {
      metrics: [
        { metric: "5", label: "priority export commodity lines" },
        { metric: "FOB", label: "indicative export price catalog" },
        { metric: "ID/EN", label: "bilingual buyer-facing content" },
      ],
      featuredEyebrow: "Featured products",
      featuredTitle: "Commodity lines from Indonesian origins, prepared for export inquiry.",
      viewCatalog: "View Catalog",
      insightsEyebrow: "Product knowledge",
      insightsTitle: "Buyer education before quotation and trial shipment.",
      readInsights: "Read Insights",
    },
    hero: {
      badge: "Global logistics and trade",
      title: "Connecting Indonesian Commodities to Global Buyers",
      description:
        "Premium export-ready natural resources with transparent FOB pricing and complete documentation.",
      primaryCta: "Explore Catalog",
      secondaryCta: "Start Export Inquiry",
      imageAlt: "CO EXPORT.ID commodity export sourcing from Indonesia",
    },
    howToOrder: {
      eyebrow: "Export Process",
      title: "Secure & Transparent Export Journey",
      steps: [
        {
          title: "Inquiry & Requirement",
          description: "Submit your desired specifications, volume, and target port. Our sales desk will verify capacity."
        },
        {
          title: "Quotation & Sample",
          description: "Receive a formal indicative FOB/CIF quotation. Trial samples can be arranged upon request."
        },
        {
          title: "Contract & Deposit",
          description: "Sign the Sales Contract (MoU) and secure your production schedule with the agreed deposit."
        },
        {
          title: "Production & QC",
          description: "We harvest, grade, and package strictly according to export SOP. Final QC is performed before stuffing."
        },
        {
          title: "Shipment & Documents",
          description: "Container is shipped. Original Bill of Lading, Phytosanitary, and Invoice are provided upon final payment."
        }
      ]
    },
    partnership: {
      eyebrow: "Join Our Network",
      title: "Become a Supply Partner (Mitra Daerah)",
      description: "We are actively seeking local farmers and regional coordinators across Indonesia to supply export-quality commodities.",
      onboardingEyebrow: "How It Works",
      onboardingTitle: "Your Journey to Becoming an Export Partner",
      onboardingSteps: [
        { title: "Online Registration", description: "Fill out the partner application form with your commodity type, location, production capacity, and product photos." },
        { title: "Verification & Selection", description: "Our team reviews your application. If you meet the basic criteria, we'll contact you via WhatsApp or phone." },
        { title: "Field Visit", description: "Our sourcing team visits your farm or warehouse to verify quality standards and production capacity on-site." },
        { title: "MoU Signing", description: "Both parties sign the Partnership Agreement covering pricing, DP terms, quality commitments, and supply schedule." },
        { title: "Trial Shipment", description: "You send the first batch for final QC inspection. If it passes, you become an officially active partner." },
        { title: "Active Supply", description: "Begin regular supply according to the agreed schedule and volume. Payments are settled per the MoU terms." }
      ],
      sopTitle: "Standard Operating Procedure (SOP) & Quality Control",
      sopDescription: "To maintain our international reputation, all partners must adhere to strict quality standards.",
      sopSteps: [
        { title: "Harvesting", description: "Harvest at the exact maturity stage. Avoid contamination with soil or chemicals." },
        { title: "First Grading", description: "Sort by size/grade. Remove defective, moldy, or rotten items. Ensure strict moisture control." },
        { title: "Storage", description: "Use wooden pallets (no direct floor contact). Keep in dry, shaded, and well-ventilated areas." },
        { title: "Packaging", description: "Use clean gunny or mesh bags. Label clearly with commodity type and coordinator name." },
        { title: "Final Inspection", description: "Co Export.ID performs random sampling before container loading. Strict rejection limits apply." }
      ],
      mouTitle: "Partnership Agreement (MoU)",
      mouDescription: "Our partnership is formalized through an MoU guaranteeing fair prices, clear payment terms (DP & Settlement), and mutual commitment to quality.",
      ctaTitle: "Ready to Export Your Harvest?",
      ctaDescription: "Register your commodity and production capacity to start the verification process.",
      ctaButton: "Register as Partner",
    },
    features: {
      eyebrow: "Why us",
      title: "Built for buyers who need product clarity before committing volume.",
      items: [
        {
          title: "Origin-Based Sourcing",
          description:
            "Products are structured by Indonesian origin, including Pangandaran, Sumedang, and Aceh supply programs.",
        },
        {
          title: "Export Price Catalog",
          description:
            "Each product includes indicative FOB pricing, MOQ, lead time, HS code, packing, and quotation notes.",
        },
        {
          title: "Documentation Ready",
          description:
            "Product pages map common export documents, compliance notes, and quality control checkpoints.",
        },
      ],
    },
    products: {
      title: "Products",
      description: "CO EXPORT.ID catalog for coco peat, coco fiber, legal wood, Sumedang sweet potato, and young areca nut.",
      pageTitle: "Export catalog with indicative FOB prices",
      pageDescription:
        "Browse product knowledge, origin details, specifications, documents, MOQ, and indicative export price ranges. Final price requires buyer specification and destination review.",
      viewDetails: "View Details",
      back: "Back to Products",
      origin: "Origin",
      exportDocuments: "Export Documents",
      applications: "Applications",
      requestQuote: "Request Quote",
      productKnowledge: "Product Knowledge",
      qualityControl: "Quality Control",
      catalog: "Export Catalog",
      catalogNote: "Quotation Note",
      priceRange: "Indicative Price",
      minOrder: "Minimum Order",
      incoterm: "Trade Term",
      leadTime: "Lead Time",
      hsCode: "HS Code",
      supplyCapacity: "Supply Capacity",
      tableTitle: "Indicative export price catalog",
      tableDescription:
        "Prices are planning references, not binding offers. Confirm grade, destination, documents, and logistics before purchase order.",
      specs: {
        grade: "Grade",
        moisture: "Moisture",
        packaging: "Packaging",
        shelfLife: "Shelf life",
      },
    },
    about: {
      title: "Our Company",
      description: "About CO EXPORT.ID and its Indonesian commodity export supply chain.",
      eyebrow: "Our company",
      pageTitle: "Global logistics and trade for Indonesian natural commodities.",
      pageDescription:
        "CO EXPORT.ID is built as a buyer-facing export company website for coconut derivatives, legal timber, fresh produce, and plantation commodities from selected Indonesian origins.",
      imageAlt: "CO EXPORT.ID company logo and Indonesian export brand identity",
      values: [
        {
          title: "Mission",
          description:
            "Connect Indonesian producers with international buyers through transparent specifications, indicative pricing, and disciplined export execution.",
        },
        {
          title: "Vision",
          description:
            "Become a trusted digital-first trade partner for natural commodities from West Java, Aceh, and wider Indonesian production regions.",
        },
        {
          title: "Partnerships",
          description:
            "Coordinate producers, processors, warehouses, freight partners, and buyers with clear expectations for quality, timing, and documents.",
        },
      ],
      integrityTitle: "Supply chain integrity",
      integrityDescription:
        "The product catalog separates origin, price assumptions, specification, application, product knowledge, quality control, and export documents so sales teams can discuss each buyer inquiry with more precision.",
    },
    insights: {
      title: "Insights",
      description: "Product knowledge articles for B2B commodity buyers.",
      pageTitle: "Product knowledge for export buyers",
      pageDescription:
        "Bilingual buyer education covering coconut derivatives, legal timber, fresh produce, and export readiness.",
      readArticle: "Read Article",
      back: "Back to Insights",
    },
    contact: {
      title: "Contact",
      description: "Send a B2B export inquiry to CO EXPORT.ID.",
      pageTitle: "Start a B2B export inquiry",
      pageDescription:
        "Share product interest, destination market, target quantity, specification, and timeline. The form is wired for an n8n webhook through NEXT_PUBLIC_N8N_WEBHOOK_URL.",
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
        productInterest: "Coco peat, coco fiber, legal wood, Sumedang sweet potato, young areca nut...",
        message: "Target quantity, destination port, specification, Incoterm, document needs, and shipment timeline",
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
      error: "Inquiry could not be sent. Please email sales@coexport.id.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      products: "Produk",
      company: "Perusahaan Kami",
      partnership: "Mitra Kami",
      insights: "Artikel",
      contact: "Kontak",
      quote: "Minta Penawaran",
      open: "Buka navigasi",
    },
    footer: {
      description:
        "Mitra global logistics and trade untuk komoditas natural Indonesia, dengan katalog ekspor, edukasi pembeli, dan sourcing siap dokumen.",
      navigation: "Navigasi",
      salesDesk: "Tim Penjualan",
      whatsapp: "WhatsApp Tim Ekspor",
      copyright:
        "(c) 2026 CO EXPORT.ID. Harga katalog produk bersifat indikatif dan mengikuti quotation final.",
    },
    home: {
      metrics: [
        { metric: "5", label: "lini komoditas ekspor prioritas" },
        { metric: "FOB", label: "katalog harga ekspor indikatif" },
        { metric: "ID/EN", label: "konten pembeli dua bahasa" },
      ],
      featuredEyebrow: "Produk unggulan",
      featuredTitle: "Lini komoditas dari origin Indonesia, siap untuk inquiry ekspor.",
      viewCatalog: "Lihat Katalog",
      insightsEyebrow: "Product knowledge",
      insightsTitle: "Edukasi pembeli sebelum quotation dan trial shipment.",
      readInsights: "Baca Artikel",
    },
    hero: {
      badge: "Logistik dan perdagangan global",
      title: "Menghubungkan Komoditas Indonesia ke Pembeli Global",
      description:
        "Sumber daya alam siap ekspor premium dengan harga FOB transparan dan dokumentasi lengkap.",
      primaryCta: "Jelajahi Katalog",
      secondaryCta: "Mulai Inkuiri Ekspor",
      imageAlt: "CO EXPORT.ID komoditas ekspor dari Indonesia",
    },
    howToOrder: {
      eyebrow: "Proses Ekspor",
      title: "Alur Transaksi yang Aman & Transparan",
      steps: [
        {
          title: "Inkuiri & Persyaratan",
          description: "Kirimkan spesifikasi, volume, dan pelabuhan tujuan yang Anda butuhkan. Tim sales kami akan memverifikasi kapasitas produksi."
        },
        {
          title: "Kutipan Harga & Sampel",
          description: "Terima kutipan harga indikatif FOB/CIF resmi. Sampel uji coba dapat diatur sesuai permintaan."
        },
        {
          title: "Kontrak & Deposit",
          description: "Tandatangani Kontrak Penjualan (MoU) dan amankan jadwal produksi Anda dengan deposit yang disepakati."
        },
        {
          title: "Produksi & QC",
          description: "Kami memanen, menyortir, dan mengemas secara ketat sesuai SOP ekspor. QC final dilakukan sebelum pemuatan."
        },
        {
          title: "Pengiriman & Dokumen",
          description: "Kontainer dikirim. Bill of Lading Asli, Phytosanitary, dan Invoice diserahkan setelah pelunasan."
        }
      ]
    },
    partnership: {
      eyebrow: "Bergabung Bersama Kami",
      title: "Menjadi Mitra Penyedia Komoditas",
      description: "Kami secara aktif mencari petani lokal dan koordinator daerah di seluruh Indonesia untuk menyuplai komoditas kualitas ekspor.",
      onboardingEyebrow: "Alur Pendaftaran",
      onboardingTitle: "Perjalanan Anda Menjadi Mitra Ekspor",
      onboardingSteps: [
        { title: "Pendaftaran Online", description: "Isi formulir pendaftaran mitra dengan jenis komoditas, lokasi, kapasitas produksi, dan foto produk Anda." },
        { title: "Verifikasi & Seleksi", description: "Tim kami meninjau data Anda. Jika memenuhi kriteria dasar, kami akan menghubungi via WhatsApp atau telepon." },
        { title: "Kunjungan Lapangan", description: "Tim sourcing kami mengunjungi lokasi panen/gudang untuk memverifikasi standar kualitas dan kapasitas produksi." },
        { title: "Penandatanganan MoU", description: "Kedua pihak menandatangani Surat Perjanjian Kerjasama yang mencakup harga, sistem DP, komitmen mutu, dan jadwal pasok." },
        { title: "Trial Shipment", description: "Anda mengirimkan batch pertama untuk inspeksi QC final. Jika lolos, Anda resmi menjadi mitra aktif." },
        { title: "Pasok Aktif", description: "Mulai menyuplai secara rutin sesuai jadwal dan volume yang disepakati. Pembayaran dilakukan sesuai ketentuan MoU." }
      ],
      sopTitle: "Standar Operasional Prosedur (SOP) & Quality Control",
      sopDescription: "Untuk menjaga reputasi internasional, seluruh mitra wajib mematuhi standar kualitas ketat berikut:",
      sopSteps: [
        { title: "Panen", description: "Lakukan pada waktu kematangan yang tepat. Hindari kontaminasi tanah atau bahan kimia." },
        { title: "Penyortiran (Grading)", description: "Pisahkan berdasarkan ukuran/grade. Singkirkan produk cacat, berjamur, atau busuk. Pastikan batas kadar air terpenuhi." },
        { title: "Penyimpanan", description: "Gunakan palet kayu (jangan menyentuh tanah). Simpan di area teduh, kering, dan sirkulasi udara baik." },
        { title: "Pengemasan", description: "Gunakan karung goni atau mesh bag yang bersih. Tempelkan label Jenis, Grade, dan Nama Koordinator." },
        { title: "Inspeksi Final (QC)", description: "Tim Co Export.ID melakukan pengecekan acak (Random Sampling) sebelum muat ke kontainer." }
      ],
      mouTitle: "Surat Perjanjian Kerjasama (MoU)",
      mouDescription: "Kemitraan kita diikat melalui MoU yang menjamin harga pasar yang adil, sistem pembayaran jelas (DP & Pelunasan), dan komitmen mutu.",
      ctaTitle: "Siap Mengekspor Hasil Panen Anda?",
      ctaDescription: "Daftarkan komoditas dan kapasitas produksi Anda untuk memulai proses verifikasi mitra.",
      ctaButton: "Daftar Sebagai Mitra",
    },
    features: {
      eyebrow: "Keunggulan",
      title: "Dibangun untuk pembeli yang butuh kejelasan produk sebelum komitmen volume.",
      items: [
        {
          title: "Sourcing Berbasis Origin",
          description:
            "Produk disusun berdasarkan origin Indonesia, termasuk program pasok Pangandaran, Sumedang, dan Aceh.",
        },
        {
          title: "Katalog Harga Ekspor",
          description:
            "Setiap produk memuat harga FOB indikatif, MOQ, lead time, HS code, kemasan, dan catatan quotation.",
        },
        {
          title: "Dokumentasi Siap Ekspor",
          description:
            "Halaman produk memetakan dokumen ekspor umum, catatan compliance, dan checkpoint quality control.",
        },
      ],
    },
    products: {
      title: "Produk",
      description: "Katalog CO EXPORT.ID untuk coco peat, coco fiber, kayu legal, ubi Sumedang, dan pinang muda.",
      pageTitle: "Katalog ekspor dengan harga FOB indikatif",
      pageDescription:
        "Lihat product knowledge, detail origin, spesifikasi, dokumen, MOQ, dan rentang harga ekspor indikatif. Harga final membutuhkan spesifikasi pembeli dan review negara tujuan.",
      viewDetails: "Lihat Detail",
      back: "Kembali ke Produk",
      origin: "Asal",
      exportDocuments: "Dokumen Ekspor",
      applications: "Aplikasi",
      requestQuote: "Minta Penawaran",
      productKnowledge: "Product Knowledge",
      qualityControl: "Quality Control",
      catalog: "Katalog Ekspor",
      catalogNote: "Catatan Quotation",
      priceRange: "Harga Indikatif",
      minOrder: "Minimum Order",
      incoterm: "Trade Term",
      leadTime: "Lead Time",
      hsCode: "HS Code",
      supplyCapacity: "Kapasitas Pasok",
      tableTitle: "Katalog harga ekspor indikatif",
      tableDescription:
        "Harga adalah referensi perencanaan, bukan penawaran mengikat. Konfirmasi grade, tujuan, dokumen, dan logistik sebelum purchase order.",
      specs: {
        grade: "Grade",
        moisture: "Kadar air",
        packaging: "Kemasan",
        shelfLife: "Masa simpan",
      },
    },
    about: {
      title: "Perusahaan",
      description: "Tentang CO EXPORT.ID dan rantai pasok ekspor komoditas Indonesia.",
      eyebrow: "Perusahaan",
      pageTitle: "Global logistics and trade untuk komoditas natural Indonesia.",
      pageDescription:
        "CO EXPORT.ID dibangun sebagai website perusahaan ekspor yang menghadap pembeli untuk produk turunan kelapa, kayu legal, fresh produce, dan komoditas perkebunan dari origin pilihan Indonesia.",
      imageAlt: "Logo perusahaan CO EXPORT.ID dan identitas brand ekspor Indonesia",
      values: [
        {
          title: "Misi",
          description:
            "Menghubungkan produsen Indonesia dengan pembeli internasional melalui spesifikasi transparan, harga indikatif, dan eksekusi ekspor yang disiplin.",
        },
        {
          title: "Visi",
          description:
            "Menjadi mitra perdagangan digital-first yang tepercaya untuk komoditas natural dari Jawa Barat, Aceh, dan wilayah produksi Indonesia lainnya.",
        },
        {
          title: "Kemitraan",
          description:
            "Mengoordinasikan produsen, prosesor, gudang, freight partner, dan pembeli dengan ekspektasi jelas untuk kualitas, waktu, dan dokumen.",
        },
      ],
      integrityTitle: "Integritas rantai pasok",
      integrityDescription:
        "Katalog produk memisahkan origin, asumsi harga, spesifikasi, aplikasi, product knowledge, quality control, dan dokumen ekspor agar tim sales dapat mendiskusikan setiap inquiry pembeli dengan lebih presisi.",
    },
    insights: {
      title: "Artikel",
      description: "Artikel product knowledge untuk pembeli komoditas B2B.",
      pageTitle: "Product knowledge untuk pembeli ekspor",
      pageDescription:
        "Edukasi pembeli dua bahasa tentang turunan kelapa, kayu legal, fresh produce, dan kesiapan ekspor.",
      readArticle: "Baca Artikel",
      back: "Kembali ke Artikel",
    },
    contact: {
      title: "Kontak",
      description: "Kirim inquiry ekspor B2B ke CO EXPORT.ID.",
      pageTitle: "Mulai inquiry ekspor B2B",
      pageDescription:
        "Bagikan minat produk, pasar tujuan, target kuantitas, spesifikasi, dan timeline. Form ini tersambung ke webhook n8n melalui NEXT_PUBLIC_N8N_WEBHOOK_URL.",
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
        productInterest: "Coco peat, coco fiber, kayu legal, ubi Sumedang, pinang muda...",
        message: "Target kuantitas, pelabuhan tujuan, spesifikasi, Incoterm, kebutuhan dokumen, dan timeline pengiriman",
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
      error: "Inquiry tidak dapat dikirim. Silakan email sales@coexport.id.",
    },
  },
} as const;
