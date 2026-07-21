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
      shop: "Shop",
      products: "Products",
      company: "Our Company",
      partnership: "Become a Partner",
      insights: "Insights",
      contact: "Contact",
      quote: "Request Quote",
      cart: "Inquiry Cart",
      open: "Open navigation",
      searchPlaceholder: "Search export products...",
      categories: "Categories",
      deals: "Deals",
    },
    footer: {
      description:
        "A B2B export marketplace for Indonesian commodities. Build an RFQ cart, compare FOB ranges, and start verified export inquiries.",
      navigation: "Navigation",
      shopCategories: "Shop Categories",
      customerService: "Customer Service",
      salesDesk: "Sales Desk",
      whatsapp: "WhatsApp Export Sales",
      copyright:
        "© 2026 CO EXPORT.ID. Product catalog prices are indicative and subject to final quotation.",
      paymentMethods: "Accepted Payment",
      paymentList: ["T/T (Bank Transfer)", "L/C (Letter of Credit)", "D/P (Documents against Payment)"],
    },
    home: {
      metrics: [
        { metric: "5", label: "priority export commodity lines" },
        { metric: "FOB", label: "indicative export price catalog" },
        { metric: "ID/EN", label: "bilingual buyer-facing content" },
      ],
      featuredEyebrow: "Featured products",
      featuredTitle: "Featured Products",
      featuredSubtitle: "Handpicked export-quality commodities from Indonesian origins",
      viewAll: "View All",
      viewCatalog: "View Catalog",
      insightsEyebrow: "Product knowledge",
      insightsTitle: "Buyer education before quotation and trial shipment.",
      readInsights: "Read Insights",
    },
    hero: {
      badge: "Export Marketplace",
      collection: "B2B EXPORT MARKETPLACE",
      title: "Source Export-Ready Commodities",
      titleAccent: "from Indonesia",
      description:
        "Build an RFQ cart, compare indicative FOB ranges, and request export quotations with document and compliance review.",
      primaryCta: "Browse Products",
      secondaryCta: "Start RFQ",
      imageAlt: "CO EXPORT.ID commodity export sourcing from Indonesia",
      upTo: "EXPORT",
      fobLabel: "FLOW",
    },
    marketplace: {
      specialOffer: "RFQ Desk",
      getDiscount: "Build a Multi-Product RFQ",
      onBulkOrder: "For trial shipments and container orders",
      promoCode: "FOB/CIF",
      shopNow: "Browse Products",
      bulkDiscount: "Bulk Order Discount",
      bulkDesc: "RFQ for Container Orders",
      bulkSubDesc: "On Container Orders",
      newArrivals: "Compliance Review",
      newDesc: "Fresh Arrivals",
      hurryUp: "Hurry Up!",
      hours: "Hours",
      mins: "Mins",
      secs: "Secs",
      topBrands: "Our Supply Partners",
      addToInquiry: "Add to Inquiry",
      addedToInquiry: "Added",
      viewInquiryCart: "View inquiry cart",
      requestQuote: "Request Quote",
      chatWhatsapp: "Chat on WhatsApp",
      checkout: "RFQ Checkout",
      cartTitle: "Inquiry Cart",
      cartDescription: "Review selected products, quantities, destination ports, and trade terms before sending an RFQ.",
      emptyCart: "Your inquiry cart is empty.",
      continueShopping: "Continue browsing products",
      proceedCheckout: "Proceed to RFQ checkout",
      removeItem: "Remove",
      quantity: "Target quantity",
      destinationPort: "Destination port",
      tradeTerm: "Trade term",
      notes: "Product notes",
      checkoutTitle: "Submit export RFQ",
      checkoutDescription: "Send one consolidated request for quotation. Our sales team can respond with pricing, sample availability, document requirements, and payment terms.",
      buyerDetails: "Buyer details",
      company: "Company",
      country: "Country",
      whatsapp: "WhatsApp",
      paymentTerm: "Payment term",
      timeline: "Shipment timeline",
      additionalMessage: "Additional message",
      submitRfq: "Submit RFQ",
      rfqSubmitted: "RFQ submitted",
      rfqFallback: "RFQ saved locally. Please email the RFQ details to sales@coexport.id.",
      orderReference: "Reference",
    },
    trustBadges: {
      globalShipping: "Global Shipping",
      globalShippingDesc: "FOB/CIF to any port",
      exportSupport: "24/7 Support",
      exportSupportDesc: "We're here to help",
      qualityGuaranteed: "Quality Guaranteed",
      qualityGuaranteedDesc: "QC at every stage",
      secureTrade: "Secure Payment",
      secureTradeDesc: "RFQ, PI, T/T, L/C, and D/P support",
    },
    testimonials: {
      title: "What Our Customers Say",
      verifiedBuyer: "Verified Buyer",
    },
    newsletter: {
      title: "Subscribe to our newsletter",
      description: "Get the latest updates on new arrivals, exclusive offers and more.",
      placeholder: "Enter your email",
      button: "Subscribe",
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
    partnerForm: {
      title: "Partner Application Form",
      description: "Fill out the details below to join our supply network. Our sourcing team will contact you shortly.",
      nameLabel: "Full Name / Coordinator Name",
      namePlaceholder: "Enter your full name",
      whatsappLabel: "WhatsApp Number",
      whatsappPlaceholder: "+62 812...",
      locationLabel: "Location (City & Province)",
      locationPlaceholder: "e.g., Pangandaran, West Java",
      commodityLabel: "Commodity Type",
      commodityPlaceholder: "e.g., Coco Peat, Pinang, Ubi",
      capacityLabel: "Production Capacity (Per Month)",
      capacityPlaceholder: "e.g., 50 Tons",
      notesLabel: "Additional Notes / Farm Details",
      notesPlaceholder: "Any details about your farm size or current processing capabilities...",
      submitButton: "Submit Application",
      submitting: "Submitting...",
      successTitle: "Application Received!",
      successDesc: "We'll review your details and contact you via WhatsApp soon.",
      errorTitle: "Submission Failed",
      errorDesc: "Please try again or contact us directly on WhatsApp."
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
      pageTitle: "Export Marketplace",
      pageDescription: "Browse our full catalog of export-quality Indonesian commodities with FOB pricing, specifications, and documentation.",
      viewDetails: "View Details",
      back: "Back to Shop",
      origin: "Origin",
      exportDocuments: "Export Documents",
      applications: "Applications",
      requestQuote: "Request Quote",
      productKnowledge: "Product Knowledge",
      qualityControl: "Quality Control",
      catalog: "Export Catalog",
      catalogNote: "Quotation Note",
      priceRange: "FOB Price",
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
      filters: {
        allCategories: "All Categories",
        sortBy: "Sort by",
        sortNewest: "Newest",
        sortPriceLow: "Price: Low → High",
        sortPriceHigh: "Price: High → Low",
        sortPopular: "Most Popular",
        results: "products found",
        gridView: "Grid",
        listView: "List",
      },
    },
    about: {
      title: "About Us",
      description: "About CO EXPORT.ID and its Indonesian commodity export supply chain.",
      eyebrow: "Our Platform",
      pageTitle: "B2B Export Marketplace Platform",
      pageDescription:
        "CO EXPORT.ID connects international buyers with Indonesian suppliers through a transparent, verified, and efficient marketplace platform.",
      imageAlt: "CO EXPORT.ID marketplace platform interface and logistics",
      values: [
        {
          title: "Verified Suppliers",
          description:
            "We onboard and vet local producers to ensure they meet international export quality and capacity standards.",
        },
        {
          title: "Transparent Sourcing",
          description:
            "Clear origin mapping, indicative FOB pricing, and complete documentation requirements for every product.",
        },
        {
          title: "Seamless RFQ",
          description:
            "A consolidated cart system that allows buyers to request quotes for multiple commodities in one click.",
        },
      ],
      integrityTitle: "Platform Integrity",
      integrityDescription:
        "Our marketplace catalog separates origin, price assumptions, specification, application, product knowledge, quality control, and export documents so buyers can make informed decisions before submitting an RFQ.",
    },
    insights: {
      title: "Marketplace News",
      description: "Commodity updates and market insights for export buyers.",
      pageTitle: "Marketplace Insights & Updates",
      pageDescription:
        "Stay informed on Indonesian commodity trends, supply chain updates, and export regulations.",
      readArticle: "Read Article",
      back: "Back to Insights",
    },
    contact: {
      title: "Help & Support",
      description: "Contact the CO EXPORT.ID Support Center.",
      pageTitle: "Help & Support Center",
      pageDescription:
        "Have a question about an RFQ, bulk orders, or becoming a supplier? Our export support team is ready to help.",
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
        "Inquiry saved. Our sales workflow is not configured yet, so please email sales@coexport.id as backup.",
      error: "Inquiry could not be sent. Please email sales@coexport.id.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      shop: "Belanja",
      products: "Produk",
      company: "Perusahaan Kami",
      partnership: "Mitra Kami",
      insights: "Artikel",
      contact: "Kontak",
      quote: "Minta Penawaran",
      cart: "Inquiry Cart",
      open: "Buka navigasi",
      searchPlaceholder: "Cari produk ekspor...",
      categories: "Kategori",
      deals: "Promo",
    },
    footer: {
      description:
        "Marketplace ekspor B2B untuk komoditas Indonesia. Susun RFQ cart, bandingkan harga FOB, dan mulai inquiry ekspor terverifikasi.",
      navigation: "Navigasi",
      shopCategories: "Kategori Belanja",
      customerService: "Layanan Pelanggan",
      salesDesk: "Tim Penjualan",
      whatsapp: "WhatsApp Tim Ekspor",
      copyright:
        "© 2026 CO EXPORT.ID. Harga katalog produk bersifat indikatif dan mengikuti quotation final.",
      paymentMethods: "Pembayaran Diterima",
      paymentList: ["T/T (Transfer Bank)", "L/C (Letter of Credit)", "D/P (Documents against Payment)"],
    },
    home: {
      metrics: [
        { metric: "5", label: "lini komoditas ekspor prioritas" },
        { metric: "FOB", label: "katalog harga ekspor indikatif" },
        { metric: "ID/EN", label: "konten pembeli dua bahasa" },
      ],
      featuredEyebrow: "Produk unggulan",
      featuredTitle: "Produk Unggulan",
      featuredSubtitle: "Komoditas ekspor pilihan dari berbagai daerah di Indonesia",
      viewAll: "Lihat Semua",
      viewCatalog: "Lihat Katalog",
      insightsEyebrow: "Product knowledge",
      insightsTitle: "Edukasi pembeli sebelum quotation dan trial shipment.",
      readInsights: "Baca Artikel",
    },
    hero: {
      badge: "Marketplace Ekspor",
      collection: "MARKETPLACE EKSPOR B2B",
      title: "Sourcing Komoditas Siap Ekspor",
      titleAccent: "dari Indonesia",
      description:
        "Susun RFQ cart, bandingkan harga FOB indikatif, dan minta quotation ekspor dengan review dokumen serta compliance.",
      primaryCta: "Lihat Produk",
      secondaryCta: "Mulai RFQ",
      imageAlt: "CO EXPORT.ID komoditas ekspor dari Indonesia",
      upTo: "ALUR",
      fobLabel: "EKSPOR",
    },
    marketplace: {
      specialOffer: "RFQ Desk",
      getDiscount: "Susun RFQ Multi-Produk",
      onBulkOrder: "Untuk trial shipment dan order kontainer",
      promoCode: "FOB/CIF",
      shopNow: "Lihat Produk",
      bulkDiscount: "Diskon Order Besar",
      bulkDesc: "RFQ untuk Order Kontainer",
      bulkSubDesc: "Untuk Order Kontainer",
      newArrivals: "Review Compliance",
      newDesc: "Baru Tersedia",
      hurryUp: "Jangan Lewatkan!",
      hours: "Jam",
      mins: "Menit",
      secs: "Detik",
      topBrands: "Mitra Pasok Kami",
      addToInquiry: "Tambah ke Inquiry",
      addedToInquiry: "Ditambahkan",
      viewInquiryCart: "Lihat inquiry cart",
      requestQuote: "Minta Penawaran",
      chatWhatsapp: "Chat WhatsApp",
      checkout: "Checkout RFQ",
      cartTitle: "Inquiry Cart",
      cartDescription: "Tinjau produk pilihan, kuantitas, pelabuhan tujuan, dan trade term sebelum mengirim RFQ.",
      emptyCart: "Inquiry cart masih kosong.",
      continueShopping: "Lanjut lihat produk",
      proceedCheckout: "Lanjut ke checkout RFQ",
      removeItem: "Hapus",
      quantity: "Target kuantitas",
      destinationPort: "Pelabuhan tujuan",
      tradeTerm: "Trade term",
      notes: "Catatan produk",
      checkoutTitle: "Kirim RFQ ekspor",
      checkoutDescription: "Kirim satu request for quotation gabungan. Tim sales dapat menindaklanjuti harga, sampel, kebutuhan dokumen, dan payment terms.",
      buyerDetails: "Data buyer",
      company: "Perusahaan",
      country: "Negara",
      whatsapp: "WhatsApp",
      paymentTerm: "Payment term",
      timeline: "Timeline shipment",
      additionalMessage: "Pesan tambahan",
      submitRfq: "Kirim RFQ",
      rfqSubmitted: "RFQ terkirim",
      rfqFallback: "RFQ tersimpan lokal. Mohon email detail RFQ ke sales@coexport.id sebagai backup.",
      orderReference: "Referensi",
    },
    trustBadges: {
      globalShipping: "Pengiriman Global",
      globalShippingDesc: "FOB/CIF ke semua pelabuhan",
      exportSupport: "Dukungan 24/7",
      exportSupportDesc: "Kami siap membantu",
      qualityGuaranteed: "Kualitas Terjamin",
      qualityGuaranteedDesc: "QC di setiap tahap",
      secureTrade: "Pembayaran Aman",
      secureTradeDesc: "Dukungan RFQ, PI, T/T, L/C, dan D/P",
    },
    testimonials: {
      title: "Kata Pelanggan Kami",
      verifiedBuyer: "Pembeli Terverifikasi",
    },
    newsletter: {
      title: "Langganan newsletter kami",
      description: "Dapatkan info terbaru tentang produk baru, penawaran eksklusif, dan lainnya.",
      placeholder: "Masukkan email Anda",
      button: "Langganan",
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
    partnerForm: {
      title: "Formulir Pendaftaran Mitra",
      description: "Lengkapi data di bawah ini untuk bergabung dengan jaringan pasok kami. Tim sourcing kami akan segera menghubungi Anda.",
      nameLabel: "Nama Lengkap / Nama Koordinator",
      namePlaceholder: "Masukkan nama lengkap Anda",
      whatsappLabel: "Nomor WhatsApp",
      whatsappPlaceholder: "+62 812...",
      locationLabel: "Lokasi (Kota/Kabupaten & Provinsi)",
      locationPlaceholder: "Contoh: Pangandaran, Jawa Barat",
      commodityLabel: "Jenis Komoditas",
      commodityPlaceholder: "Contoh: Coco Peat, Pinang, Ubi",
      capacityLabel: "Kapasitas Produksi (Per Bulan)",
      capacityPlaceholder: "Contoh: 50 Ton",
      notesLabel: "Catatan Tambahan / Detail Lahan",
      notesPlaceholder: "Informasi mengenai luas lahan atau fasilitas pengolahan Anda...",
      submitButton: "Kirim Pendaftaran",
      submitting: "Mengirim...",
      successTitle: "Pendaftaran Diterima!",
      successDesc: "Kami akan meninjau data Anda dan segera menghubungi via WhatsApp.",
      errorTitle: "Pengiriman Gagal",
      errorDesc: "Silakan coba lagi atau hubungi kami langsung via WhatsApp."
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
      pageTitle: "Marketplace Ekspor",
      pageDescription: "Jelajahi katalog lengkap komoditas ekspor Indonesia dengan harga FOB, spesifikasi, dan dokumentasi.",
      viewDetails: "Lihat Detail",
      back: "Kembali ke Toko",
      origin: "Asal",
      exportDocuments: "Dokumen Ekspor",
      applications: "Aplikasi",
      requestQuote: "Minta Penawaran",
      productKnowledge: "Product Knowledge",
      qualityControl: "Quality Control",
      catalog: "Katalog Ekspor",
      catalogNote: "Catatan Quotation",
      priceRange: "Harga FOB",
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
      filters: {
        allCategories: "Semua Kategori",
        sortBy: "Urut berdasarkan",
        sortNewest: "Terbaru",
        sortPriceLow: "Harga: Rendah → Tinggi",
        sortPriceHigh: "Harga: Tinggi → Rendah",
        sortPopular: "Terpopuler",
        results: "produk ditemukan",
        gridView: "Grid",
        listView: "List",
      },
    },
    about: {
      title: "Tentang Kami",
      description: "Tentang CO EXPORT.ID dan rantai pasok ekspor komoditas Indonesia.",
      eyebrow: "Platform Kami",
      pageTitle: "Platform Marketplace Ekspor B2B",
      pageDescription:
        "CO EXPORT.ID menghubungkan pembeli internasional dengan pemasok Indonesia melalui platform marketplace yang transparan, terverifikasi, dan efisien.",
      imageAlt: "Antarmuka platform marketplace CO EXPORT.ID dan logistik",
      values: [
        {
          title: "Supplier Terverifikasi",
          description:
            "Kami menyaring dan memverifikasi produsen lokal untuk memastikan mereka memenuhi standar kualitas dan kapasitas ekspor internasional.",
        },
        {
          title: "Sourcing Transparan",
          description:
            "Pemetaan asal yang jelas, indikasi harga FOB, dan persyaratan dokumentasi lengkap untuk setiap produk.",
        },
        {
          title: "RFQ yang Mudah",
          description:
            "Sistem cart terpusat yang memungkinkan pembeli meminta penawaran untuk berbagai komoditas dalam satu klik.",
        },
      ],
      integrityTitle: "Integritas Platform",
      integrityDescription:
        "Katalog marketplace kami memisahkan origin, asumsi harga, spesifikasi, aplikasi, product knowledge, quality control, dan dokumen ekspor agar pembeli dapat membuat keputusan tepat sebelum mengirim RFQ.",
    },
    insights: {
      title: "Berita & Info",
      description: "Update komoditas dan wawasan pasar untuk pembeli ekspor.",
      pageTitle: "Berita & Wawasan Marketplace",
      pageDescription:
        "Dapatkan informasi terbaru seputar tren komoditas Indonesia, rantai pasok, dan regulasi ekspor.",
      readArticle: "Baca Artikel",
      back: "Kembali ke Artikel",
    },
    contact: {
      title: "Pusat Bantuan",
      description: "Hubungi Pusat Bantuan CO EXPORT.ID.",
      pageTitle: "Pusat Bantuan & Dukungan",
      pageDescription:
        "Ada pertanyaan tentang RFQ, order kontainer, atau menjadi supplier? Tim dukungan ekspor kami siap membantu.",
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
        "Inquiry tersimpan. Workflow sales belum dikonfigurasi, jadi mohon email sales@coexport.id sebagai backup.",
      error: "Inquiry tidak dapat dikirim. Silakan email sales@coexport.id.",
    },
  },
} as const;
