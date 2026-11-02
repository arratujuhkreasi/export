import type { Locale, Localized } from "@/lib/i18n";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription: string;
  origin: string;
  image: string;
  priceRange: string;
  minOrder: string;
  incoterm: string;
  leadTime: string;
  hsCode: string;
  supplyCapacity: string;
  catalogNote: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  discount: string;
  specs: {
    grade: string;
    moisture: string;
    packaging: string;
    shelfLife: string;
  };
  documents: string[];
  applications: string[];
  knowledge: string[];
  qualityControl: string[];
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  productCount: number;
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  country: string;
  avatar: string;
  rating: number;
  comment: string;
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
  | "priceRange"
  | "minOrder"
  | "incoterm"
  | "leadTime"
  | "supplyCapacity"
  | "catalogNote"
  | "specs"
  | "documents"
  | "applications"
  | "knowledge"
  | "qualityControl"
  | "discount"
> & {
  name: Localized;
  category: Localized;
  description: Localized;
  longDescription: Localized;
  origin: Localized;
  priceRange: Localized;
  minOrder: Localized;
  incoterm: Localized;
  leadTime: Localized;
  supplyCapacity: Localized;
  catalogNote: Localized;
  discount: Localized;
  specs: {
    grade: Localized;
    moisture: Localized;
    packaging: Localized;
    shelfLife: Localized;
  };
  documents: Localized<string[]>;
  applications: Localized<string[]>;
  knowledge: Localized<string[]>;
  qualityControl: Localized<string[]>;
};

type CategoryRecord = Omit<Category, "name"> & {
  name: Localized;
};

type TestimonialRecord = Omit<Testimonial, "comment"> & {
  comment: Localized;
};

type PostRecord = Omit<Post, "title" | "excerpt" | "readTime" | "content"> & {
  title: Localized;
  excerpt: Localized;
  readTime: Localized;
  content: Localized<string[]>;
};

const categoryRecords: CategoryRecord[] = [
  { id: "cat-coconut", slug: "coconut-products", name: { en: "Coconut Products", id: "Produk Kelapa" }, icon: "🥥", productCount: 3 },
  { id: "cat-timber", slug: "certified-timber", name: { en: "Certified Timber", id: "Kayu Bersertifikat" }, icon: "🪵", productCount: 1 },
  { id: "cat-fresh", slug: "fresh-produce", name: { en: "Fresh Produce", id: "Hasil Segar" }, icon: "🍠", productCount: 1 },
  { id: "cat-plantation", slug: "plantation", name: { en: "Plantation", id: "Perkebunan" }, icon: "🌴", productCount: 1 },
  { id: "cat-coffee", slug: "gayo-coffee", name: { en: "Gayo Coffee", id: "Kopi Gayo" }, icon: "☕", productCount: 4 },
  { id: "cat-spices", slug: "spices", name: { en: "Spices", id: "Rempah" }, icon: "🌿", productCount: 1 },
  { id: "cat-biomass", slug: "biomass-fuel", name: { en: "Biomass & Fuel", id: "Biomassa & Bahan Bakar" }, icon: "🔥", productCount: 1 },
  { id: "cat-bulk", slug: "bulk-orders", name: { en: "Bulk Orders", id: "Order Besar" }, icon: "📦", productCount: 5 },
  { id: "cat-docs", slug: "documentation-ready", name: { en: "Docs Ready", id: "Siap Dokumen" }, icon: "📄", productCount: 5 },
  { id: "cat-featured", slug: "featured", name: { en: "Featured", id: "Unggulan" }, icon: "⭐", productCount: 3 },
];

const testimonialRecords: TestimonialRecord[] = [
  {
    id: "test-1",
    name: "Emily Davis",
    company: "GreenGrow Substrates Ltd.",
    country: "Australia",
    avatar: "ED",
    rating: 5,
    comment: {
      en: "Great quality products and fast delivery. The website is easy to use and has amazing collections!",
      id: "Kualitas produk luar biasa dan pengiriman cepat. Websitenya mudah digunakan dan koleksinya sangat bagus!",
    },
  },
  {
    id: "test-2",
    name: "Michael Brown",
    company: "EuroTimber Solutions GmbH",
    country: "Germany",
    avatar: "MB",
    rating: 5,
    comment: {
      en: "Clear export specifications, responsive quotation support, and practical documentation guidance.",
      id: "Spesifikasi ekspor jelas, dukungan quotation responsif, dan arahan dokumentasi yang praktis.",
    },
  },
  {
    id: "test-3",
    name: "Jessica Wilson",
    company: "AsiaPac Fresh Trading",
    country: "Singapore",
    avatar: "JW",
    rating: 5,
    comment: {
      en: "I absolutely love the product quality. Will definitely shop here again!",
      id: "Saya sangat suka kualitas produknya. Pasti akan belanja di sini lagi!",
    },
  },
];

const additionalProductRecords: ProductRecord[] = [
  {
    id: "prd-gayo-whine-coffee",
    slug: "kopi-gayo-whine",
    name: { en: "Gayo Wine Process Coffee", id: "Kopi Gayo Wine Process" },
    category: { en: "Specialty Arabica Coffee", id: "Kopi Arabika Specialty" },
    categorySlug: "gayo-coffee",
    description: {
      en: "Specialty Arabica from Aceh Gayo highlands undergoing extended natural anaerobic fermentation for distinct winey aromatics and complex fruity sweetness.",
      id: "Kopi Arabika specialty dari dataran tinggi Gayo Aceh dengan fermentasi alami anaerobik menghasilkan aroma mirip wine dan rasa manis buah kompleks.",
    },
    longDescription: {
      en: "CO EXPORT.ID sources Gayo Wine coffee from partner estates in Takengon, Central Aceh at 1,300–1,600 masl. Carefully selected ripe red cherries undergo prolonged controlled maceration before raised-bed sun drying, resulting in pronounced stone fruit notes, syrupy body, and sweet lingering finish ideal for specialty roasters.",
      id: "CO EXPORT.ID memasok kopi Gayo Wine dari kebun mitra di Takengon, Aceh Tengah pada ketinggian 1.300–1.600 mdpl. Ceri merah pilihan menjalani maserasi terkontrol sebelum penjemuran di raised bed, menghasilkan rasa buah stone fruit, body kental mirip sirup, dan aftertaste manis untuk roaster specialty.",
    },
    origin: { en: "Takengon, Central Aceh, Indonesia", id: "Takengon, Aceh Tengah, Indonesia" },
    image: "/products/kopi-gayo-whine.jpg",
    priceRange: { en: "USD 10.50–14.80 / kg", id: "USD 10.50–14.80 / kg" },
    minOrder: { en: "500 kg trial or 1 × 20' container", id: "Trial 500 kg atau 1 kontainer 20'" },
    incoterm: { en: "Indicative FOB Belawan (Medan)", id: "Indikatif FOB Belawan (Medan)" },
    leadTime: { en: "14–25 days after deposit approval", id: "14–25 hari setelah approval DP" },
    hsCode: "0901.11.00 / 0901.21.00",
    supplyCapacity: { en: "Up to 15 MT per month by schedule", id: "Hingga 15 MT per bulan sesuai jadwal" },
    catalogNote: {
      en: "Specialty micro-lot and macro-lot availability depends on seasonal harvest cycles (October–January and April–June).",
      id: "Ketersediaan micro-lot dan macro-lot specialty bergantung pada siklus panen musiman (Oktober–Januari dan April–Juni).",
    },
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isNew: true,
    discount: { en: "Specialty Lot", id: "Lot Specialty" },
    specs: {
      grade: { en: "Grade 1 Specialty (SCA 84+), Screen 16+", id: "Grade 1 Specialty (SCA 84+), Ukuran Ayakan 16+" },
      moisture: { en: "Max 11.5–12.0%", id: "Maks 11.5–12.0%" },
      packaging: { en: "30 kg / 60 kg GrainPro hermetic bag inside export jute sack", id: "Kantong hermetik GrainPro 30 kg / 60 kg dalam karung goni ekspor" },
      shelfLife: { en: "24 months in cool dry storage", id: "24 bulan di gudang kering sejuk" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin (ICO/Form D/AK)", "Phytosanitary Certificate", "Cupping Report"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin (ICO/Form D/AK)", "Sertifikat Fitosanitari", "Laporan Cupping"],
    },
    applications: {
      en: ["Specialty third-wave roasters", "Boutique cafe blends", "Single-origin retail pouches"],
      id: ["Roaster specialty third-wave", "Blend kafe butik", "Kemasan retail single-origin"],
    },
    knowledge: {
      en: [
        "The wine process relies on extended fermentation of intact ripe cherries, producing natural esters that evoke stone fruits and subtle fermented wine aroma.",
        "Moisture and water activity are carefully monitored during slow drying to protect cup clarity and shelf stability.",
        "Hermetic GrainPro packaging prevents humidity reabsorption during international maritime shipping.",
      ],
      id: [
        "Proses wine mengandalkan fermentasi ceri matang utuh yang diperpanjang, menghasilkan ester alami dengan aroma buah dan nuansa fermented wine yang khas.",
        "Kadar air dan aktivitas air dikontrol ketat selama penjemuran perlahan untuk menjaga kejernihan cup dan stabilitas simpan.",
        "Kemasan hermetik GrainPro mencegah penyerapan kelembapan udara selama pelayaran logistik laut internasional.",
      ],
    },
    qualityControl: {
      en: ["Ripe red cherry sorting", "Fermentation temperature monitoring", "Moisture meter testing", "SCA certified cupping evaluation"],
      id: ["Sortasi ceri merah matang", "Monitoring temperatur fermentasi", "Pengujian kadar air dengan moisture meter", "Evaluasi cupping bersertifikat SCA"],
    },
  },
  {
    id: "prd-gayo-grade-one",
    slug: "kopi-gayo-kualitas-1",
    name: { en: "Gayo Arabica Coffee Grade 1", id: "Kopi Arabika Gayo Grade 1" },
    category: { en: "Gayo Coffee", id: "Kopi Gayo" },
    categorySlug: "gayo-coffee",
    description: {
      en: "Premier Grade 1 Indonesian Arabica green coffee beans from Gayo highlands, double-picked for uniform size, low defects, and balanced cedar-chocolate profile.",
      id: "Biji kopi hijau Arabika Gayo Grade 1 premium pilihan ganda dengan ukuran seragam, cacat rendah, serta profil rasa cokelat dan rempah seimbang.",
    },
    longDescription: {
      en: "Gayo Grade 1 is the benchmark Indonesian specialty Arabica recognized worldwide for its full body, medium acidity, and spicy herbal nuances. Sourced from high-altitude smallholder cooperatives in Aceh Tengah and Bener Meriah, each batch is wet-hulled (Giling Basah) and hand-sorted to meet rigorous international export standards.",
      id: "Gayo Grade 1 adalah standar kopi Arabika specialty Indonesia yang diakui dunia dengan bodi tebal, keasaman sedang, dan nuansa herbal rempah. Dipasok dari koperasi petani dataran tinggi di Aceh Tengah dan Bener Meriah, diproses giling basah dan disortir tangan untuk standar ekspor internasional.",
    },
    origin: { en: "Aceh Tengah & Bener Meriah, Aceh, Indonesia", id: "Aceh Tengah & Bener Meriah, Aceh, Indonesia" },
    image: "/products/kopi-gayo-kualitas-1.jpg",
    priceRange: { en: "USD 7.50–10.20 / kg", id: "USD 7.50–10.20 / kg" },
    minOrder: { en: "1 MT trial or 1 × 20' container (18 MT)", id: "Trial 1 MT atau 1 kontainer 20' (18 MT)" },
    incoterm: { en: "Indicative FOB Belawan (Medan)", id: "Indikatif FOB Belawan (Medan)" },
    leadTime: { en: "14–21 days after deposit", id: "14–21 hari setelah DP" },
    hsCode: "0901.11.00",
    supplyCapacity: { en: "Up to 60 MT per month", id: "Hingga 60 MT per bulan" },
    catalogNote: {
      en: "Indicative FOB Belawan range. Final quotation depends on bean size sorting, contract volume, and destination requirements.",
      id: "Rentang indikatif FOB Belawan. Penawaran final bergantung pada sortasi ukuran biji, volume kontrak, dan syarat negara tujuan.",
    },
    rating: 4.8,
    reviewCount: 84,
    isFeatured: true,
    isNew: false,
    discount: { en: "Export Grade", id: "Grade Ekspor" },
    specs: {
      grade: { en: "Double Picked (DP), Defect count < 11 / 300g", id: "Double Picked (DP), Cacat < 11 / 300g" },
      moisture: { en: "Max 12.0–12.5%", id: "Maks 12.0–12.5%" },
      packaging: { en: "60 kg Jute bag with GrainPro liner", id: "Karung goni 60 kg dengan liner GrainPro" },
      shelfLife: { en: "24 months in warehouse condition", id: "24 bulan di kondisi gudang baik" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin (ICO/Form D)", "Phytosanitary Certificate", "Fumigation Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin (ICO/Form D)", "Sertifikat Fitosanitari", "Sertifikat Fumigasi"],
    },
    applications: {
      en: ["Commercial and specialty roasting", "Signature espresso blends", "Wholesale green bean distribution"],
      id: ["Roasting komersial dan specialty", "Signature espresso blend", "Distribusi green bean grosir"],
    },
    knowledge: {
      en: [
        "The wet-hulling (Giling Basah) technique produces the signature bluish jade-green bean color and heavy syrupy mouthfeel.",
        "Grade 1 requires strict sorting with fewer than 11 defects per 300-gram sample under green coffee export regulations.",
      ],
      id: [
        "Teknik giling basah menghasilkan warna biji hijau kebiruan yang khas serta mouthfeel kental yang disukai pasar global.",
        "Grade 1 mewajibkan sortasi ketat dengan jumlah cacat di bawah 11 poin per 300 gram sampel sesuai regulasi ekspor kopi.",
      ],
    },
    qualityControl: {
      en: ["Screen size density grading", "Hand defect picking", "Moisture verification", "Sensory cup assessment"],
      id: ["Grading densitas dan ukuran ayakan", "Pemisahan cacat manual tangan", "Verifikasi kadar air", "Penilaian sensori cupping"],
    },
  },
  {
    id: "prd-gayo-mid-grade",
    slug: "kopi-gayo-kualitas-menengah",
    name: { en: "Gayo Arabica Coffee Commercial Grade", id: "Kopi Arabika Gayo Kualitas Menengah" },
    category: { en: "Gayo Coffee", id: "Kopi Gayo" },
    categorySlug: "gayo-coffee",
    description: {
      en: "Cost-efficient commercial export grade Arabica coffee beans from Gayo, ideal for high-volume roasting, commercial blends, and food manufacturing.",
      id: "Biji kopi Arabika Gayo grade komersial yang efisien biaya, cocok untuk pemanggangan volume besar, racikan blend komersial, dan industri makanan.",
    },
    longDescription: {
      en: "Providing authentic Gayo cup characteristics with favorable pricing for large-scale roasters and distributors. Processed with standard semi-washed methods, graded to Commercial Grade 2/3 criteria with controlled moisture for long ocean voyages.",
      id: "Memberikan cita rasa khas Gayo dengan harga bersahabat untuk roaster dan distributor skala besar. Diproses metode semi-washed standar, dengan kriteria Grade 2/3 dan kontrol kadar air untuk pengiriman laut jarak jauh.",
    },
    origin: { en: "Aceh Tengah, Aceh, Indonesia", id: "Aceh Tengah, Aceh, Indonesia" },
    image: "/products/kopi-gayo-kualitas-menengah.jpg",
    priceRange: { en: "USD 5.60–7.20 / kg", id: "USD 5.60–7.20 / kg" },
    minOrder: { en: "1 × 20' container (18 MT)", id: "1 kontainer 20' (18 MT)" },
    incoterm: { en: "Indicative FOB Belawan", id: "Indikatif FOB Belawan" },
    leadTime: { en: "14–21 days after deposit", id: "14–21 hari setelah DP" },
    hsCode: "0901.11.00",
    supplyCapacity: { en: "Up to 80 MT per month", id: "Hingga 80 MT per bulan" },
    catalogNote: {
      en: "Best suited for volume buyers requiring dependable Arabica base components for mainstream retail and hospitality blends.",
      id: "Paling cocok untuk pembeli volume besar yang membutuhkan komponen dasar Arabika untuk blend retail dan perhotelan.",
    },
    rating: 4.5,
    reviewCount: 52,
    isFeatured: false,
    isNew: false,
    discount: { en: "Bulk Deal", id: "Harga Grosir" },
    specs: {
      grade: { en: "Commercial Grade 2 / 3, Defect 12–25", id: "Grade Komersial 2 / 3, Cacat 12–25" },
      moisture: { en: "Max 13.0%", id: "Maks 13.0%" },
      packaging: { en: "60 kg standard woven burlap sack", id: "Karung goni standar 60 kg" },
      shelfLife: { en: "18 months in dry storage", id: "18 bulan di penyimpanan kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari"],
    },
    applications: {
      en: ["High-volume commercial roasting", "Instant coffee manufacturing", "Wholesale food service"],
      id: ["Roasting komersial volume tinggi", "Produksi kopi instan", "Layanan food service grosir"],
    },
    knowledge: {
      en: [
        "Commercial grade beans deliver authentic body and aroma while maintaining a cost structure suitable for mass-market coffee blends.",
      ],
      id: [
        "Biji grade komersial memberikan bodi dan aroma kopi Arabika asli dengan struktur biaya yang kompetitif untuk pasar massal.",
      ],
    },
    qualityControl: {
      en: ["Mechanical size screening", "Moisture batch sampling", "Standard defect grading"],
      id: ["Sortasi mekanis ukuran biji", "Sampling kadar air per batch", "Grading cacat standar"],
    },
  },
  {
    id: "prd-gayo-tetangga",
    slug: "kopi-gayo-tetangga",
    name: { en: "Gayo Roasted Coffee Whole Beans", id: "Kopi Gayo Sangrai (Roasted Beans)" },
    category: { en: "Gayo Coffee", id: "Kopi Gayo" },
    categorySlug: "gayo-coffee",
    description: {
      en: "Artisan roasted 100% Gayo Arabica whole beans, masterfully roasted to medium-dark to highlight earthy dark chocolate notes and sweet cedar undertones.",
      id: "Biji kopi sangrai 100% Arabika Gayo murni, di-roast medium-dark untuk menonjolkan aroma cokelat pekat, body kuat, dan aftertaste rempah manis.",
    },
    longDescription: {
      en: "Prepared for hotel chains, cafe distributors, and private-label retail brands requiring shelf-ready roasted coffee from Sumatra. Nitrogen-flushed or one-way degassing valve bags ensure peak freshness during international dispatch.",
      id: "Disiapkan untuk jaringan hotel, distributor kafe, dan brand retail private-label yang memerlukan kopi sangrai siap saji dari Sumatera. Kemasan dengan one-way valve memastikan kesegaran optimal saat pengiriman internasional.",
    },
    origin: { en: "Aceh Tengah, Sumatra, Indonesia", id: "Aceh Tengah, Sumatera, Indonesia" },
    image: "/products/kopi-gayo-tetangga.jpg",
    priceRange: { en: "USD 12.00–16.50 / kg", id: "USD 12.00–16.50 / kg" },
    minOrder: { en: "100 kg trial or pallet order", id: "Trial 100 kg atau order pallet" },
    incoterm: { en: "FOB Tanjung Priok / Belawan or Air Freight", id: "FOB Tanjung Priok / Belawan atau Kargo Udara" },
    leadTime: { en: "7–14 days fresh roast dispatch", id: "7–14 hari kirim fresh roast" },
    hsCode: "0901.21.00",
    supplyCapacity: { en: "Up to 10 MT per month", id: "Hingga 10 MT per bulan" },
    catalogNote: {
      en: "Custom roast profiles (Medium, City+, French) and custom OEM retail pouch branding available upon request.",
      id: "Profil sangrai kustom (Medium, City+, French) dan branding kemasan OEM retail tersedia sesuai permintaan.",
    },
    rating: 4.9,
    reviewCount: 29,
    isFeatured: false,
    isNew: true,
    discount: { en: "Fresh Roast", id: "Fresh Roast" },
    specs: {
      grade: { en: "100% Arabica, Medium to Medium-Dark Roast", id: "100% Arabika, Roast Medium hingga Medium-Dark" },
      moisture: { en: "Max 2.5–3.0%", id: "Maks 2.5–3.0%" },
      packaging: { en: "1 kg / 5 kg foil valve bag in master carton", id: "Kemasan foil 1 kg / 5 kg ber-valve dalam karton master" },
      shelfLife: { en: "12 months sealed", id: "12 bulan tersegel" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Health / Food Safety Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Keamanan Pangan / Kesehatan"],
    },
    applications: {
      en: ["Specialty cafes and espresso bars", "Hospitality & hotel supplies", "Private label retail brands"],
      id: ["Kafe specialty dan bar espresso", "Pasokan hotel & perhotelan", "Brand retail private label"],
    },
    knowledge: {
      en: [
        "Medium-dark roasting Gayo Arabica brings forward caramelized sugars, muted acidity, and a prominent chocolate finish.",
        "One-way degassing valves release carbon dioxide while preventing oxygen ingress, protecting essential aromatic oils.",
      ],
      id: [
        "Roasting medium-dark pada Arabika Gayo mengeluarkan karamelisasi manis, keasaman lembut, dan rasa cokelat yang dominan.",
        "Valve satu arah mengeluarkan gas CO2 alami tanpa membiarkan oksigen masuk, menjaga minyak aromatik tetap segar.",
      ],
    },
    qualityControl: {
      en: ["Agtron roast color verification", "Moisture check", "Degassing and seal inspection"],
      id: ["Verifikasi warna roast skala Agtron", "Pengujian kadar air", "Inspeksi degassing dan kerapatan seal"],
    },
  },
  {
    id: "prd-cloves",
    slug: "cengkeh",
    name: { en: "Indonesian Whole Cloves", id: "Cengkeh Kering Utuh" },
    category: { en: "Spices", id: "Rempah" },
    categorySlug: "spices",
    description: {
      en: "High-essential-oil dried whole cloves (Syzygium aromaticum) sorted for premium spice distributors, essential oil distillers, and food industries.",
      id: "Cengkeh kering utuh berkadar minyak atsiri tinggi untuk distributor rempah premium, industri penyulingan minyak atsiri, dan industri pangan.",
    },
    longDescription: {
      en: "Indonesia produces the world's most aromatic cloves with high eugenol content. Sourced directly from certified farmer associations across Maluku, Sulawesi, and West Java, our cloves are sun-dried, winnowed, and sorted for intact heads, reddish-brown color, and minimal stems.",
      id: "Indonesia memproduksi cengkeh paling aromatik di dunia dengan kandungan eugenol tinggi. Dipasok langsung dari kelompok tani di Maluku, Sulawesi, dan Jawa Barat, cengkeh kami dijemur matahari, ditampi, dan disortir untuk kepala utuh, warna cokelat kemerahan, dan tangkai minimal.",
    },
    origin: { en: "Maluku & West Java, Indonesia", id: "Maluku & Jawa Barat, Indonesia" },
    image: "/products/cengkeh.jpg",
    priceRange: { en: "USD 7,200–8,800 / MT", id: "USD 7,200–8,800 / MT" },
    minOrder: { en: "1 × 20' container (10–12 MT)", id: "1 kontainer 20' (10–12 MT)" },
    incoterm: { en: "Indicative FOB Tanjung Priok / Tanjung Perak", id: "Indikatif FOB Tanjung Priok / Tanjung Perak" },
    leadTime: { en: "14–25 days after deposit", id: "14–25 hari setelah DP" },
    hsCode: "0907.10.00",
    supplyCapacity: { en: "Up to 50 MT per month", id: "Hingga 50 MT per bulan" },
    catalogNote: {
      en: "Indicative export range. Clove prices fluctuate with domestic seasonal harvest yields and global spice market benchmarks.",
      id: "Rentang ekspor indikatif. Harga cengkeh berfluktuasi mengikuti hasil panen musiman lokal dan patokan pasar rempah global.",
    },
    rating: 4.8,
    reviewCount: 46,
    isFeatured: true,
    isNew: true,
    discount: { en: "Export Ready", id: "Siap Ekspor" },
    specs: {
      grade: { en: "Lalpari / AB6 Grade, Headless < 2%, Stems < 1%", id: "Grade Lalpari / AB6, Bunga tanpa kepala < 2%, Tangkai < 1%" },
      moisture: { en: "Max 11.0–12.0%", id: "Maks 11.0–12.0%" },
      packaging: { en: "25 kg / 50 kg PP woven bag with inner poly liner", id: "Karung PP 25 kg / 50 kg dengan plastik liner dalam" },
      shelfLife: { en: "24 months in dry, pest-free warehouse", id: "24 bulan di gudang kering bebas hama" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate", "Fumigation Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari", "Sertifikat Fumigasi"],
    },
    applications: {
      en: ["Spice seasonings and culinary blends", "Essential oil distillation (Eugenol extraction)", "Pharmaceutical and fragrance manufacturing"],
      id: ["Bumbu rempah dan kuliner", "Penyulingan minyak atsiri (ekstraksi Eugenol)", "Industri farmasi dan wewangian"],
    },
    knowledge: {
      en: [
        "Indonesian cloves are prized globally for their essential oil content exceeding 18–20% and dominant eugenol purity.",
        "Moisture control below 12% is essential to prevent mold growth during transoceanic shipping.",
      ],
      id: [
        "Cengkeh Indonesia dihargai di pasar dunia karena kadar minyak atsirinya melebihi 18–20% dengan kemurnian eugenol yang tinggi.",
        "Kontrol kadar air di bawah 12% sangat krusial untuk mencegah timbulnya jamur selama pengapalan lintas samudera.",
      ],
    },
    qualityControl: {
      en: ["Visual head integrity sorting", "Stem and foreign matter reduction", "Moisture meter check", "Essential oil sample verification"],
      id: ["Sortir visual keutuhan kepala bunga", "Pembersihan tangkai dan kotoran asing", "Cek kadar air dengan moisture meter", "Verifikasi sampel minyak atsiri"],
    },
  },
  {
    id: "prd-charcoal",
    slug: "arang",
    name: { en: "Coconut Shell Charcoal Briquettes", id: "Briket Arang Batok Kelapa" },
    category: { en: "Biomass & Fuel", id: "Biomassa & Bahan Bakar" },
    categorySlug: "biomass-fuel",
    description: {
      en: "High-calorific coconut charcoal briquettes for premium hookah, shisha, and BBQ grilling, featuring low ash, odorless burn, and long burning duration.",
      id: "Briket arang batok kelapa berkalori tinggi untuk shisha/hookah dan BBQ, dengan kadar abu rendah, tidak berbau, dan durasi pembakaran tahan lama.",
    },
    longDescription: {
      en: "Manufactured from 100% mature coconut shells without tree timber or chemical binder. Designed for international shisha lounges and BBQ markets demanding white ash, zero smoke, and steady heat output for over 2 hours. Available in cube (25x25x25mm, 26x26x26mm) and hexagonal shapes.",
      id: "Diproduksi dari 100% batok kelapa tua tanpa campuran kayu atau zat kimia pengikat. Dirancang untuk pasar shisha dan BBQ internasional yang menuntut abu putih, tanpa asap, dan panas stabil lebih dari 2 jam. Tersedia bentuk kubus (25x25x25mm) dan heksagonal.",
    },
    origin: { en: "West Java & Central Java, Indonesia", id: "Jawa Barat & Jawa Tengah, Indonesia" },
    image: "/products/arang.jpg",
    priceRange: { en: "USD 1,150–1,420 / MT", id: "USD 1,150–1,420 / MT" },
    minOrder: { en: "1 × 20' container (~18 MT)", id: "1 kontainer 20' (~18 MT)" },
    incoterm: { en: "Indicative FOB Tanjung Priok / Tanjung Perak", id: "Indikatif FOB Tanjung Priok / Tanjung Perak" },
    leadTime: { en: "20–30 days after packaging design approval", id: "20–30 hari setelah approval desain kemasan" },
    hsCode: "4402.90.00",
    supplyCapacity: { en: "Up to 100 MT per month", id: "Hingga 100 MT per bulan" },
    catalogNote: {
      en: "OEM private-label box printing and custom sizing available with buyer packaging design files.",
      id: "Pencetakan kemasan box OEM private-label dan ukuran kustom tersedia sesuai file desain pembeli.",
    },
    rating: 4.9,
    reviewCount: 71,
    isFeatured: true,
    isNew: true,
    discount: { en: "OEM Available", id: "Bisa OEM" },
    specs: {
      grade: { en: "100% Coconut Shell, Fixed Carbon > 75%, Calorie > 7,200 kcal/kg", id: "100% Batok Kelapa, Fixed Carbon > 75%, Kalori > 7.200 kkal/kg" },
      moisture: { en: "Max 5.0%, Ash Content < 2.5% (White Ash)", id: "Maks 5.0%, Kadar Abu < 2.5% (Abu Putih)" },
      packaging: { en: "1 kg inner box with inner plastic + 10 kg master carton", id: "Inner box 1 kg dengan plastik + master carton 10 kg" },
      shelfLife: { en: "Indefinite in dry conditions", id: "Tidak terbatas di ruangan kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "SDoC", "MSDS", "Vanning Survey Report"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "SDoC", "MSDS", "Laporan Vanning Survey"],
    },
    applications: {
      en: ["Hookah and shisha lounges", "Smokeless indoor and outdoor BBQ", "Industrial clean fuel"],
      id: ["Lounge hookah dan shisha", "BBQ tanpa asap luar dan dalam ruang", "Bahan bakar industri bersih"],
    },
    knowledge: {
      en: [
        "100% coconut charcoal yields high energy density (> 7,200 kcal/kg) with minimal ash (< 2.5%) compared to wood charcoal.",
        "Shipping requires Material Safety Data Sheet (MSDS) and Vanning Survey certification to verify safe container loading.",
      ],
      id: [
        "Arang batok kelapa 100% menghasilkan kalori tinggi (> 7.200 kkal/kg) dengan abu minimal (< 2.5%) dibanding arang kayu biasa.",
        "Pengiriman memerlukan dokumen MSDS dan sertifikat Vanning Survey untuk menjamin keselamatan muatan kontainer.",
      ],
    },
    qualityControl: {
      en: ["Drop test durability check", "Calorific and ash lab analysis", "Burning time duration testing", "Dimension precision check"],
      id: ["Uji ketahanan drop test", "Analisis lab kalori dan abu", "Pengujian durasi bakar", "Pemeriksaan presisi dimensi"],
    },
  },
  {
    id: "prd-cocofit",
    slug: "cocofit",
    name: { en: "Cocofit Horticultural Growing Block", id: "Cocofit Media Tanam Kompresi" },
    category: { en: "Coconut Growing Medium", id: "Media Tanam Kelapa" },
    categorySlug: "coconut-products",
    description: {
      en: "Optimized blend of washed coconut coir pith and short fiber compressed into high-expansion horticultural blocks for greenhouse berries, flowers, and nurseries.",
      id: "Campuran terukur serbuk sabut kelapa washed dan serat pendek dipadatkan menjadi blok berdaya ekspansi tinggi untuk greenhouse buah, bunga, dan nursery.",
    },
    longDescription: {
      en: "Cocofit is engineered for precision irrigation systems. Unlike standard coco peat, Cocofit blends buffered coir pith with micro-fiber strands to optimize water retention while preventing compaction, ensuring superior oxygen diffusion at root level across multiple crop cycles.",
      id: "Cocofit dirancang khusus untuk sistem irigasi presisi. Berbeda dengan coco peat standar, Cocofit memadukan serbuk kelapa washed dengan serat mikro untuk mengoptimalkan retensi air sekaligus mencegah pemadatan media di zona perakaran.",
    },
    origin: { en: "Pangandaran, West Java, Indonesia", id: "Pangandaran, Jawa Barat, Indonesia" },
    image: "/products/cocofit.jpg",
    priceRange: { en: "USD 220–310 / MT", id: "USD 220–310 / MT" },
    minOrder: { en: "1 × 40' HC container (~24–26 MT palletized)", id: "1 kontainer 40' HC (~24–26 MT palletized)" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "21–30 days after spec approval", id: "21–30 hari setelah approval spek" },
    hsCode: "5305.00.00",
    supplyCapacity: { en: "Up to 80 MT per month", id: "Hingga 80 MT per bulan" },
    catalogNote: {
      en: "Available in low EC (< 0.5 mS/cm washed) or standard unwashed grades tailored to specific greenhouse crop requirements.",
      id: "Tersedia grade low EC (< 0.5 mS/cm washed) atau unwashed sesuai kebutuhan spesifik tanaman greenhouse.",
    },
    rating: 4.7,
    reviewCount: 35,
    isFeatured: false,
    isNew: true,
    discount: { en: "Low EC", id: "Low EC" },
    specs: {
      grade: { en: "Low EC (< 0.5 mS/cm washed), Expansion 14–16 L/kg", id: "Low EC (< 0.5 mS/cm washed), Ekspansi 14–16 L/kg" },
      moisture: { en: "Max 18.0–20.0%, pH 5.6–6.8", id: "Maks 18.0–20.0%, pH 5.6–6.8" },
      packaging: { en: "5 kg compressed block or 650 g brick, shrink-wrapped pallet", id: "Blok kempa 5 kg atau brick 650 g, pallet shrink-wrapped" },
      shelfLife: { en: "24 months in dry covered warehouse", id: "24 bulan di gudang beratap kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate", "Fumigation Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari", "Sertifikat Fumigasi"],
    },
    applications: {
      en: ["Greenhouse hydroponic berries & vegetables", "Commercial nursery potting mixes", "Soil conditioning programs"],
      id: ["Greenhouse hidroponik buah berry & sayur", "Potting mix nursery komersial", "Program pembenah tanah"],
    },
    knowledge: {
      en: [
        "Cocofit blends fine coir pith with short fibers to maintain long-term aeration and prevent waterlogging around roots.",
        "Washing and buffering lower electrical conductivity (EC) and flush sodium salts, optimizing nutrient uptake.",
      ],
      id: [
        "Cocofit memadukan serbuk halus dan serat pendek untuk menjaga aerasi jangka panjang dan mencegah genangan air di perakaran.",
        "Pencucian dan buffering menurunkan konduktivitas listrik (EC) serta garam natrium agar penyerapan nutrisi optimal.",
      ],
    },
    qualityControl: {
      en: ["EC and pH batch laboratory testing", "Expansion volume testing", "Sieve size analysis", "Compression density sampling"],
      id: ["Pengujian lab kadar EC dan pH per batch", "Uji volume ekspansi", "Analisis ukuran ayakan", "Sampling densitas kompresi"],
    },
  },
];

const productRecords: ProductRecord[] = [
  {
    id: "prd-coco-peat",
    slug: "coco-peat-pangandaran",
    name: { en: "Coco Peat", id: "Coco Peat" },
    category: { en: "Coconut Growing Medium", id: "Media Tanam Kelapa" },
    categorySlug: "coconut-products",
    description: {
      en: "Low-salt coconut coir pith for nurseries, hydroponic farms, potting mix factories, and soil conditioning programs.",
      id: "Serbuk sabut kelapa rendah garam untuk nursery, hidroponik, pabrik potting mix, dan program pembenah tanah.",
    },
    longDescription: {
      en: "CO EXPORT.ID positions coco peat as a clean, compressible, and container-efficient growing medium sourced from coconut processing partners in Pangandaran, West Java. The product is prepared for B2B buyers that need stable expansion volume, controlled moisture, low EC targets by request, and export-ready pallet loading.",
      id: "CO EXPORT.ID memposisikan coco peat sebagai media tanam bersih, mudah dipadatkan, dan efisien untuk kontainer dari mitra pengolahan kelapa di Pangandaran, Jawa Barat. Produk ini disiapkan untuk pembeli B2B yang membutuhkan volume ekspansi stabil, kadar air terkontrol, target EC rendah sesuai permintaan, dan loading pallet siap ekspor.",
    },
    origin: { en: "Pangandaran, West Java, Indonesia", id: "Pangandaran, Jawa Barat, Indonesia" },
    image: "/products/coco-peat-final.jpg",
    priceRange: { en: "USD 180–260 / MT", id: "USD 180–260 / MT" },
    minOrder: { en: "1 × 40' HC container", id: "1 kontainer 40' HC" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "21–30 days after deposit and specification approval", id: "21–30 hari setelah DP dan approval spesifikasi" },
    hsCode: "5305.00 / buyer confirmation required",
    supplyCapacity: { en: "Up to 80 MT per month by schedule", id: "Hingga 80 MT per bulan berdasarkan jadwal" },
    catalogNote: {
      en: "Indicative export range. Final quotation depends on EC, block size, washing level, palletizing, order volume, and destination requirements.",
      id: "Rentang ekspor indikatif. Penawaran final bergantung pada EC, ukuran blok, level washing, palletizing, volume order, dan syarat negara tujuan.",
    },
    rating: 4.8,
    reviewCount: 128,
    isFeatured: true,
    isNew: false,
    discount: { en: "Bulk -15%", id: "Grosir -15%" },
    specs: {
      grade: { en: "Washed / unwashed, fine pith", id: "Washed / unwashed, serbuk halus" },
      moisture: { en: "Max 18–20%", id: "Maks 18–20%" },
      packaging: { en: "5 kg block, 650 g brick, or bulk bag", id: "Blok 5 kg, brick 650 g, atau jumbo bag" },
      shelfLife: { en: "24 months in dry storage", id: "24 bulan di gudang kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate", "Fumigation Certificate by request"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari", "Sertifikat Fumigasi sesuai permintaan"],
    },
    applications: {
      en: ["Hydroponic substrate", "Seedling nursery", "Potting mix production", "Soil conditioner"],
      id: ["Substrat hidroponik", "Nursery bibit", "Produksi potting mix", "Pembenah tanah"],
    },
    knowledge: {
      en: [
        "Coco peat is the pith portion of coconut husk. Its value for growers is high water retention, root aeration, and predictable expansion after hydration.",
        "Buyers usually evaluate EC, pH, moisture, particle size, expansion ratio, foreign matter, and compression quality before confirming repeat orders.",
        "Washed coco peat is preferred for sensitive crops because washing reduces soluble salts. Unwashed grades can be suitable for cost-driven soil conditioning after buyer approval.",
      ],
      id: [
        "Coco peat adalah bagian serbuk dari sabut kelapa. Nilainya untuk grower adalah retensi air tinggi, aerasi akar, dan ekspansi yang terukur setelah hidrasi.",
        "Pembeli biasanya menilai EC, pH, kadar air, ukuran partikel, rasio ekspansi, foreign matter, dan kualitas kompresi sebelum repeat order.",
        "Coco peat washed lebih disukai untuk tanaman sensitif karena pencucian menurunkan garam terlarut. Grade unwashed dapat sesuai untuk pembenah tanah berbasis biaya setelah approval pembeli.",
      ],
    },
    qualityControl: {
      en: ["Batch moisture check", "EC/pH test by request", "Metal and plastic foreign matter sorting", "Compression and expansion sampling"],
      id: ["Cek kadar air per batch", "Tes EC/pH sesuai permintaan", "Sortir foreign matter logam dan plastik", "Sampling kompresi dan ekspansi"],
    },
  },
  {
    id: "prd-coco-fiber",
    slug: "coco-fiber-pangandaran",
    name: { en: "Coco Fiber", id: "Coco Fiber" },
    category: { en: "Natural Fiber", id: "Serat Natural" },
    categorySlug: "coconut-products",
    description: {
      en: "Baled coconut coir fiber for mattress, erosion control, geotextile, brush, and industrial fiber buyers.",
      id: "Serat sabut kelapa dalam bale untuk pembeli matras, erosion control, geotextile, sikat, dan kebutuhan industri.",
    },
    longDescription: {
      en: "Coco fiber from Pangandaran is sorted, dried, and pressed into export bales for efficient loading. The line supports industrial buyers that need consistent fiber length, controlled moisture, and predictable bale density for downstream processing.",
      id: "Coco fiber dari Pangandaran disortir, dikeringkan, dan dipress menjadi bale ekspor untuk loading efisien. Lini ini mendukung pembeli industri yang membutuhkan panjang serat konsisten, kadar air terkontrol, dan kepadatan bale yang terukur untuk proses lanjutan.",
    },
    origin: { en: "Pangandaran, West Java, Indonesia", id: "Pangandaran, Jawa Barat, Indonesia" },
    image: "/products/coco-fiber-real.jpg",
    priceRange: { en: "USD 220–340 / MT", id: "USD 220–340 / MT" },
    minOrder: { en: "18–20 MT per 40' HC container", id: "18–20 MT per kontainer 40' HC" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "20–30 days after deposit", id: "20–30 hari setelah DP" },
    hsCode: "5305.00 / buyer confirmation required",
    supplyCapacity: { en: "Up to 100 MT per month by schedule", id: "Hingga 100 MT per bulan berdasarkan jadwal" },
    catalogNote: {
      en: "Indicative export range. Final quotation depends on fiber length, bale density, cleaning level, packing, and loading plan.",
      id: "Rentang ekspor indikatif. Penawaran final bergantung pada panjang serat, densitas bale, level cleaning, kemasan, dan rencana loading.",
    },
    rating: 4.6,
    reviewCount: 96,
    isFeatured: true,
    isNew: false,
    discount: { en: "Bulk -10%", id: "Grosir -10%" },
    specs: {
      grade: { en: "Golden brown, mixed long and medium fiber", id: "Cokelat keemasan, campuran serat panjang dan sedang" },
      moisture: { en: "Max 15–18%", id: "Maks 15–18%" },
      packaging: { en: "100–125 kg pressed bale", id: "Bale press 100–125 kg" },
      shelfLife: { en: "18 months in dry storage", id: "18 bulan di gudang kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate", "Fumigation Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari", "Sertifikat Fumigasi"],
    },
    applications: {
      en: ["Mattress and cushion filling", "Erosion control mat", "Geotextile", "Brush and rope production"],
      id: ["Isi matras dan bantalan", "Erosion control mat", "Geotextile", "Produksi sikat dan tali"],
    },
    knowledge: {
      en: [
        "Coco fiber is the longer fiber fraction separated from coconut husk. Buyers value it for durability, tensile strength, biodegradability, and resistance to moisture exposure.",
        "Fiber quality is influenced by decortication, drying discipline, dust level, bale compression, and the ratio of long to medium fiber.",
        "For container planning, bale density and moisture are critical because they affect payload, odor risk, and buyer processing efficiency.",
      ],
      id: [
        "Coco fiber adalah fraksi serat panjang yang dipisahkan dari sabut kelapa. Pembeli menilai produk ini karena daya tahan, kekuatan tarik, biodegradability, dan ketahanan terhadap paparan lembap.",
        "Kualitas serat dipengaruhi oleh proses decortication, disiplin pengeringan, level debu, kompresi bale, dan rasio serat panjang ke sedang.",
        "Untuk rencana kontainer, densitas bale dan kadar air sangat penting karena memengaruhi payload, risiko bau, dan efisiensi proses pembeli.",
      ],
    },
    qualityControl: {
      en: ["Fiber length visual grading", "Dust and pith reduction check", "Moisture sampling", "Bale weight and strap inspection"],
      id: ["Grading visual panjang serat", "Cek pengurangan debu dan pith", "Sampling kadar air", "Inspeksi berat bale dan strap"],
    },
  },
  {
    id: "prd-wood",
    slug: "kayu-albasia",
    name: { en: "Albasia Wood", id: "Kayu Albasia" },
    category: { en: "Certified Timber", id: "Kayu Bersertifikat" },
    categorySlug: "certified-timber",
    description: {
      en: "Legally sourced Pangandaran timber boards and components for furniture, construction, and joinery buyers.",
      id: "Papan dan komponen kayu legal dari Pangandaran untuk pembeli furniture, konstruksi, dan joinery.",
    },
    longDescription: {
      en: "The wood catalog is presented as a compliant export line only. CO EXPORT.ID works with legal documentation paths such as SVLK readiness, species confirmation, moisture control, and dimension sorting before offering timber to international buyers.",
      id: "Katalog kayu ditampilkan sebagai lini ekspor yang patuh aturan. CO EXPORT.ID bekerja dengan jalur dokumentasi legal seperti kesiapan SVLK, konfirmasi jenis kayu, kontrol kadar air, dan sortir dimensi sebelum menawarkan timber ke pembeli internasional.",
    },
    origin: { en: "Pangandaran, West Java, Indonesia", id: "Pangandaran, Jawa Barat, Indonesia" },
    image: "/products/legal-wood-real.jpg",
    priceRange: { en: "USD 420–900 / CBM", id: "USD 420–900 / CBM" },
    minOrder: { en: "1 × 20' container or project-based lot", id: "1 kontainer 20' atau lot berbasis proyek" },
    incoterm: { en: "Indicative FOB Tanjung Priok / Tanjung Perak", id: "Indikatif FOB Tanjung Priok / Tanjung Perak" },
    leadTime: { en: "30–45 days after species, dimension, and legality approval", id: "30–45 hari setelah approval jenis, dimensi, dan legalitas" },
    hsCode: "4407 / 4418 by product type",
    supplyCapacity: { en: "Project-based, subject to legal stock availability", id: "Berbasis proyek, tergantung stok legal tersedia" },
    catalogNote: {
      en: "Indicative export range. Timber can only be quoted after species, dimensions, drying level, SVLK/legal documents, and destination rules are confirmed.",
      id: "Rentang ekspor indikatif. Kayu hanya dapat di-quote setelah jenis, dimensi, level pengeringan, dokumen SVLK/legal, dan aturan negara tujuan dikonfirmasi.",
    },
    rating: 4.9,
    reviewCount: 74,
    isFeatured: true,
    isNew: false,
    discount: { en: "", id: "" },
    specs: {
      grade: { en: "Sawn timber / components by buyer specification", id: "Sawn timber / komponen sesuai spesifikasi pembeli" },
      moisture: { en: "KD 10–14% or AD by request", id: "KD 10–14% atau AD sesuai permintaan" },
      packaging: { en: "Bundle with strap, pallet, or crate", id: "Bundle dengan strap, pallet, atau crate" },
      shelfLife: { en: "Dry indoor storage recommended", id: "Disarankan penyimpanan indoor kering" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "SVLK / legal timber documents", "Fumigation Certificate"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Dokumen SVLK / legal timber", "Sertifikat Fumigasi"],
    },
    applications: {
      en: ["Furniture components", "Interior joinery", "Construction boards", "Packaging and project materials"],
      id: ["Komponen furniture", "Interior joinery", "Papan konstruksi", "Material packaging dan proyek"],
    },
    knowledge: {
      en: [
        "Export timber is sensitive because buyers and customs authorities require species clarity, legality proof, and destination-specific compliance.",
        "Moisture content determines dimensional stability. Kiln-dried material is usually preferred for furniture and joinery because it reduces warping and mold risk.",
        "Dimensions, tolerance, grade, and finishing requirements should be agreed before production because timber pricing changes materially by species and yield.",
      ],
      id: [
        "Ekspor kayu bersifat sensitif karena pembeli dan otoritas kepabeanan membutuhkan kejelasan jenis, bukti legalitas, dan kepatuhan negara tujuan.",
        "Kadar air menentukan stabilitas dimensi. Material kiln-dried biasanya lebih disukai untuk furniture dan joinery karena menekan risiko melengkung dan jamur.",
        "Dimensi, toleransi, grade, dan kebutuhan finishing harus disepakati sebelum produksi karena harga kayu berubah signifikan berdasarkan jenis dan yield.",
      ],
    },
    qualityControl: {
      en: ["Species and legality verification", "Moisture meter check", "Dimension tolerance sampling", "Visual defect grading"],
      id: ["Verifikasi jenis dan legalitas", "Cek moisture meter", "Sampling toleransi dimensi", "Grading visual cacat kayu"],
    },
  },
  {
    id: "prd-ubi",
    slug: "ubi-cilembu-sumedang",
    name: { en: "Ubi Cilembu Sumedang", id: "Ubi Cilembu Sumedang" },
    category: { en: "Fresh Agricultural Produce", id: "Hasil Pertanian Segar" },
    categorySlug: "fresh-produce",
    description: {
      en: "Sorted sweet potato from Sumedang, West Java, for fresh produce buyers, processors, and specialty food distributors.",
      id: "Ubi sortir dari Sumedang, Jawa Barat, untuk pembeli fresh produce, prosesor, dan distributor makanan specialty.",
    },
    longDescription: {
      en: "Ubi from Sumedang is positioned for buyers that need a recognizable West Java origin, consistent sizing, clean packing, and practical options for fresh or processed supply programs. The catalog can be adapted for Ubi Cilembu style sweet potato or buyer-specific local varieties.",
      id: "Ubi dari Sumedang diposisikan untuk pembeli yang membutuhkan origin Jawa Barat yang dikenal, ukuran konsisten, kemasan bersih, dan opsi praktis untuk program pasok fresh maupun olahan. Katalog dapat disesuaikan untuk tipe Ubi Cilembu atau varietas lokal sesuai kebutuhan pembeli.",
    },
    origin: { en: "Sumedang, West Java, Indonesia", id: "Sumedang, Jawa Barat, Indonesia" },
    image: "/products/sweet-potato-real.jpg",
    priceRange: { en: "USD 850–1,250 / MT", id: "USD 850–1,250 / MT" },
    minOrder: { en: "5 MT trial or 1 × 20' reefer/dry by product form", id: "Trial 5 MT atau 1 kontainer 20' reefer/dry sesuai bentuk produk" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "14–25 days after harvest schedule confirmation", id: "14–25 hari setelah konfirmasi jadwal panen" },
    hsCode: "0714 / 0714.20 by product form",
    supplyCapacity: { en: "Seasonal, coordinated by harvest window", id: "Musiman, dikoordinasikan berdasarkan window panen" },
    catalogNote: {
      en: "Indicative export range. Final price depends on variety, sizing, washing, curing, fresh or processed form, and cold-chain requirements.",
      id: "Rentang ekspor indikatif. Harga final bergantung pada varietas, ukuran, washing, curing, bentuk fresh atau olahan, dan kebutuhan cold-chain.",
    },
    rating: 4.5,
    reviewCount: 43,
    isFeatured: false,
    isNew: true,
    discount: { en: "New Arrival", id: "Produk Baru" },
    specs: {
      grade: { en: "Fresh sorted A/B, buyer sizing available", id: "Fresh sortasi A/B, sizing sesuai pembeli tersedia" },
      moisture: { en: "Fresh crop, cured by request", id: "Fresh crop, curing sesuai permintaan" },
      packaging: { en: "10 kg carton, mesh bag, or processor sack", id: "Karton 10 kg, mesh bag, atau karung prosesor" },
      shelfLife: { en: "2–6 weeks depending on curing and storage", id: "2–6 minggu tergantung curing dan penyimpanan" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate", "Health Certificate by request"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari", "Health Certificate sesuai permintaan"],
    },
    applications: {
      en: ["Fresh retail produce", "Roasted sweet potato programs", "Snack processing", "Flour and puree processing"],
      id: ["Fresh retail produce", "Program ubi panggang", "Proses snack", "Proses tepung dan puree"],
    },
    knowledge: {
      en: [
        "Sweet potato quality depends on variety, harvest maturity, curing, skin condition, and handling after washing.",
        "For export, buyers should confirm whether they need fresh roots, cured roots, dried chips, flour, or another processed format because each format changes logistics and documents.",
        "Sizing and defect tolerance are central to retail programs, while processors usually focus more on dry matter, sweetness, and conversion yield.",
      ],
      id: [
        "Kualitas ubi bergantung pada varietas, kematangan panen, curing, kondisi kulit, dan handling setelah pencucian.",
        "Untuk ekspor, pembeli perlu mengonfirmasi apakah membutuhkan fresh roots, cured roots, chips kering, tepung, atau bentuk olahan lain karena setiap format mengubah logistik dan dokumen.",
        "Sizing dan toleransi cacat penting untuk program retail, sedangkan prosesor biasanya lebih fokus pada dry matter, rasa manis, dan yield konversi.",
      ],
    },
    qualityControl: {
      en: ["Harvest maturity sorting", "Size grading", "Skin damage and rot inspection", "Packing ventilation check"],
      id: ["Sortir kematangan panen", "Grading ukuran", "Inspeksi kerusakan kulit dan busuk", "Cek ventilasi kemasan"],
    },
  },
  {
    id: "prd-pinang-muda",
    slug: "pinang-muda-aceh",
    name: { en: "Young Areca Nut", id: "Pinang Muda" },
    category: { en: "Fresh Plantation Commodity", id: "Komoditas Perkebunan Segar" },
    categorySlug: "plantation",
    description: {
      en: "Young areca nut from Aceh in northern Sumatra, sorted for fresh commodity buyers and processors.",
      id: "Pinang muda dari Aceh di bagian utara Pulau Sumatera, disortir untuk pembeli komoditas segar dan prosesor.",
    },
    longDescription: {
      en: "Pinang muda is offered as a buyer-specific commodity program with strict destination compliance review. CO EXPORT.ID frames this product for regulated B2B trade only, with maturity sorting, packing control, and documentation matched to importer requirements.",
      id: "Pinang muda ditawarkan sebagai program komoditas sesuai kebutuhan pembeli dengan review kepatuhan negara tujuan yang ketat. CO EXPORT.ID memposisikan produk ini hanya untuk perdagangan B2B yang teregulasi, dengan sortir kematangan, kontrol kemasan, dan dokumentasi sesuai kebutuhan importir.",
    },
    origin: { en: "Aceh, northern Sumatra, Indonesia", id: "Aceh, bagian utara Pulau Sumatera, Indonesia" },
    image: "/products/areca-nut-real.jpg",
    priceRange: { en: "USD 900–1,400 / MT", id: "USD 900–1,400 / MT" },
    minOrder: { en: "5 MT trial or 1 × 20' container", id: "Trial 5 MT atau 1 kontainer 20'" },
    incoterm: { en: "Indicative FOB Belawan / Tanjung Priok", id: "Indikatif FOB Belawan / Tanjung Priok" },
    leadTime: { en: "14–28 days after specification and destination approval", id: "14–28 hari setelah approval spesifikasi dan negara tujuan" },
    hsCode: "0802 / buyer and customs confirmation required",
    supplyCapacity: { en: "Seasonal and buyer-program based", id: "Musiman dan berbasis program pembeli" },
    catalogNote: {
      en: "Indicative export range. Final quotation requires maturity grade, fresh/dried form, packing method, destination legality, and inspection requirements.",
      id: "Rentang ekspor indikatif. Penawaran final membutuhkan grade kematangan, bentuk fresh/dried, metode kemasan, legalitas negara tujuan, dan kebutuhan inspeksi.",
    },
    rating: 4.7,
    reviewCount: 61,
    isFeatured: false,
    isNew: true,
    discount: { en: "New Arrival", id: "Produk Baru" },
    specs: {
      grade: { en: "Young green nut, maturity by buyer spec", id: "Pinang hijau muda, kematangan sesuai spesifikasi pembeli" },
      moisture: { en: "Fresh crop or dried by request", id: "Fresh crop atau dried sesuai permintaan" },
      packaging: { en: "Mesh bag, carton, or processor sack", id: "Mesh bag, karton, atau karung prosesor" },
      shelfLife: { en: "Fresh: short shelf life; dried: by moisture target", id: "Fresh: masa simpan pendek; dried: sesuai target kadar air" },
    },
    documents: {
      en: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Phytosanitary Certificate", "Destination compliance documents by request"],
      id: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Sertifikat Fitosanitari", "Dokumen kepatuhan negara tujuan sesuai permintaan"],
    },
    applications: {
      en: ["Fresh commodity trade", "Processor raw material", "Traditional ingredient supply chains"],
      id: ["Perdagangan komoditas segar", "Bahan baku prosesor", "Rantai pasok bahan tradisional"],
    },
    knowledge: {
      en: [
        "Young areca nut requires buyer-specific specification because maturity level, size, color, and fresh handling change quickly after harvest.",
        "Destination regulations vary, so CO EXPORT.ID treats this as a compliance-first product and avoids health or medicinal claims.",
        "Export planning should confirm whether the buyer needs fresh green nuts, semi-processed material, or dried areca nut because documents, packing, and logistics differ.",
      ],
      id: [
        "Pinang muda membutuhkan spesifikasi khusus dari pembeli karena level kematangan, ukuran, warna, dan handling fresh cepat berubah setelah panen.",
        "Regulasi negara tujuan berbeda-beda, sehingga CO EXPORT.ID memperlakukan produk ini sebagai lini yang mengutamakan compliance dan tidak membuat klaim kesehatan atau medis.",
        "Rencana ekspor perlu mengonfirmasi apakah pembeli membutuhkan pinang hijau fresh, material semi-proses, atau pinang kering karena dokumen, kemasan, dan logistik berbeda.",
      ],
    },
    qualityControl: {
      en: ["Maturity and color sorting", "Size grading", "Freshness and rot inspection", "Destination compliance review"],
      id: ["Sortir kematangan dan warna", "Grading ukuran", "Inspeksi kesegaran dan busuk", "Review kepatuhan negara tujuan"],
    },
  },
  ...additionalProductRecords,
];

const postRecords: PostRecord[] = [
  {
    id: "post-coconut-exports",
    slug: "coconut-derivative-export-guide",
    title: {
      en: "Coco Peat and Coco Fiber Export Guide for B2B Buyers",
      id: "Panduan Ekspor Coco Peat dan Coco Fiber untuk Pembeli B2B",
    },
    excerpt: {
      en: "How buyers compare EC, moisture, bale density, packaging, and container loading for coconut derivative products.",
      id: "Cara pembeli membandingkan EC, kadar air, densitas bale, kemasan, dan loading kontainer untuk produk turunan kelapa.",
    },
    date: "2026-07-18",
    readTime: { en: "5 min read", id: "5 menit baca" },
    image: "/products/coco-peat-final.jpg",
    content: {
      en: [
        "Coco peat and coco fiber come from the same coconut husk supply chain, but buyers evaluate them differently. Coco peat is judged by EC, pH, expansion, moisture, and particle cleanliness, while coco fiber is judged by fiber length, dust level, bale compression, and moisture.",
        "For B2B importing, container planning is as important as price. Compressed blocks and bales can look attractive on a quotation, but payload, pallet style, fumigation requirements, and port handling will determine the landed cost.",
        "A practical trial shipment should lock the target specification, inspection method, packing, and documents before scaling into monthly volume.",
      ],
      id: [
        "Coco peat dan coco fiber berasal dari rantai pasok sabut kelapa yang sama, tetapi pembeli menilainya dengan cara berbeda. Coco peat dinilai dari EC, pH, ekspansi, kadar air, dan kebersihan partikel, sedangkan coco fiber dinilai dari panjang serat, level debu, kompresi bale, dan kadar air.",
        "Untuk impor B2B, rencana kontainer sama pentingnya dengan harga. Blok dan bale yang terkompresi bisa terlihat menarik di quotation, tetapi payload, gaya pallet, kebutuhan fumigasi, dan handling pelabuhan akan menentukan landed cost.",
        "Trial shipment yang praktis perlu mengunci target spesifikasi, metode inspeksi, kemasan, dan dokumen sebelum naik ke volume bulanan.",
      ],
    },
  },
  {
    id: "post-legal-timber",
    slug: "legal-timber-export-readiness",
    title: {
      en: "Legal Timber Export Readiness from West Java",
      id: "Kesiapan Ekspor Kayu Legal dari Jawa Barat",
    },
    excerpt: {
      en: "Why species confirmation, moisture control, dimensions, and SVLK/legal documents must be settled before timber quotation.",
      id: "Mengapa konfirmasi jenis, kontrol kadar air, dimensi, dan dokumen SVLK/legal harus diselesaikan sebelum quotation kayu.",
    },
    date: "2026-07-10",
    readTime: { en: "4 min read", id: "4 menit baca" },
    image: "/products/legal-wood-real.jpg",
    content: {
      en: [
        "Timber export is not a simple commodity sale. Each buyer must confirm species, dimensions, drying level, grade tolerance, finishing needs, and the destination's import rules.",
        "Legal documentation is central to the offer. A timber exporter should align Commercial Invoice, Packing List, Certificate of Origin, fumigation, and legality documents before loading.",
        "The cleanest buying process starts with a specification sheet. Without it, price comparison can become misleading because yield, moisture, and defect tolerance change the final value.",
      ],
      id: [
        "Ekspor kayu bukan sekadar penjualan komoditas biasa. Setiap pembeli perlu mengonfirmasi jenis, dimensi, level pengeringan, toleransi grade, kebutuhan finishing, dan aturan impor negara tujuan.",
        "Dokumentasi legal menjadi inti penawaran. Eksportir kayu perlu menyelaraskan Commercial Invoice, Packing List, Certificate of Origin, fumigasi, dan dokumen legalitas sebelum loading.",
        "Proses pembelian paling bersih dimulai dari specification sheet. Tanpa itu, perbandingan harga bisa menyesatkan karena yield, kadar air, dan toleransi cacat mengubah nilai akhir.",
      ],
    },
  },
  {
    id: "post-fresh-produce",
    slug: "fresh-produce-export-planning",
    title: {
      en: "Fresh Produce Export Planning for Ubi and Young Areca Nut",
      id: "Perencanaan Ekspor Fresh Produce untuk Ubi dan Pinang Muda",
    },
    excerpt: {
      en: "A practical look at harvest timing, maturity sorting, shelf life, cold chain, and destination compliance.",
      id: "Gambaran praktis tentang waktu panen, sortir kematangan, masa simpan, cold chain, dan kepatuhan negara tujuan.",
    },
    date: "2026-07-03",
    readTime: { en: "4 min read", id: "4 menit baca" },
    image: "/products/sweet-potato-real.jpg",
    content: {
      en: [
        "Fresh produce export starts at harvest planning. Sweet potato and young areca nut both need buyer-defined maturity, defect tolerance, packing method, and dispatch timing.",
        "Shelf life is not only a product issue. It is shaped by washing, curing, ventilation, loading temperature, transit days, and destination inspection requirements.",
        "For regulated or sensitive commodities, the exporter and buyer should confirm destination rules before price finalization so the shipment does not fail at document or customs stage.",
      ],
      id: [
        "Ekspor fresh produce dimulai dari rencana panen. Ubi dan pinang muda sama-sama membutuhkan definisi kematangan, toleransi cacat, metode kemasan, dan waktu pengiriman dari pembeli.",
        "Masa simpan bukan hanya isu produk. Masa simpan dibentuk oleh pencucian, curing, ventilasi, temperatur loading, hari transit, dan kebutuhan inspeksi negara tujuan.",
        "Untuk komoditas yang teregulasi atau sensitif, eksportir dan pembeli perlu mengonfirmasi aturan negara tujuan sebelum harga final agar shipment tidak gagal di tahap dokumen atau customs.",
      ],
    },
  },
];

function localizeProduct(product: ProductRecord, locale: Locale): Product {
  return {
    id: product.id,
    slug: product.slug,
    image: product.image,
    hsCode: product.hsCode,
    categorySlug: product.categorySlug,
    rating: product.rating,
    reviewCount: product.reviewCount,
    isFeatured: product.isFeatured,
    isNew: product.isNew,
    name: product.name[locale],
    category: product.category[locale],
    description: product.description[locale],
    longDescription: product.longDescription[locale],
    origin: product.origin[locale],
    priceRange: product.priceRange[locale],
    minOrder: product.minOrder[locale],
    incoterm: product.incoterm[locale],
    leadTime: product.leadTime[locale],
    supplyCapacity: product.supplyCapacity[locale],
    catalogNote: product.catalogNote[locale],
    discount: product.discount[locale],
    specs: {
      grade: product.specs.grade[locale],
      moisture: product.specs.moisture[locale],
      packaging: product.specs.packaging[locale],
      shelfLife: product.specs.shelfLife[locale],
    },
    documents: product.documents[locale],
    applications: product.applications[locale],
    knowledge: product.knowledge[locale],
    qualityControl: product.qualityControl[locale],
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

function localizeCategory(cat: CategoryRecord, locale: Locale): Category {
  return {
    id: cat.id,
    slug: cat.slug,
    icon: cat.icon,
    productCount: cat.productCount,
    name: cat.name[locale],
  };
}

function localizeTestimonial(t: TestimonialRecord, locale: Locale): Testimonial {
  return {
    id: t.id,
    name: t.name,
    company: t.company,
    country: t.country,
    avatar: t.avatar,
    rating: t.rating,
    comment: t.comment[locale],
  };
}

export function getProducts(locale: Locale = "en") {
  return productRecords.map((product) => localizeProduct(product, locale));
}

export function getFeaturedProducts(locale: Locale = "en") {
  return getProducts(locale).filter((p) => p.isFeatured);
}

export function getProductBySlug(slug: string, locale: Locale = "en") {
  const product = productRecords.find((item) => item.slug === slug);
  return product ? localizeProduct(product, locale) : undefined;
}

export function getProductStaticParams() {
  return productRecords.map((product) => ({ slug: product.slug }));
}

export function getProductsByCategory(categorySlug: string, locale: Locale = "en") {
  return getProducts(locale).filter((p) => p.categorySlug === categorySlug);
}

export function searchProducts(query: string, locale: Locale = "en") {
  const q = query.toLowerCase();
  return getProducts(locale).filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q)
  );
}

export function getCategories(locale: Locale = "en") {
  return categoryRecords.map((cat) => localizeCategory(cat, locale));
}

export function getTestimonials(locale: Locale = "en") {
  return testimonialRecords.map((t) => localizeTestimonial(t, locale));
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
