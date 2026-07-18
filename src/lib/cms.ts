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
  priceRange: string;
  minOrder: string;
  incoterm: string;
  leadTime: string;
  hsCode: string;
  supplyCapacity: string;
  catalogNote: string;
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

type PostRecord = Omit<Post, "title" | "excerpt" | "readTime" | "content"> & {
  title: Localized;
  excerpt: Localized;
  readTime: Localized;
  content: Localized<string[]>;
};

const productRecords: ProductRecord[] = [
  {
    id: "prd-coco-peat",
    slug: "coco-peat-pangandaran",
    name: { en: "Coco Peat", id: "Coco Peat" },
    category: { en: "Coconut Growing Medium", id: "Media Tanam Kelapa" },
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
    priceRange: { en: "USD 180-260 / MT", id: "USD 180-260 / MT" },
    minOrder: { en: "1 x 40' HC container", id: "1 kontainer 40' HC" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "21-30 days after deposit and specification approval", id: "21-30 hari setelah DP dan approval spesifikasi" },
    hsCode: "5305.00 / buyer confirmation required",
    supplyCapacity: { en: "Up to 80 MT per month by schedule", id: "Hingga 80 MT per bulan berdasarkan jadwal" },
    catalogNote: {
      en: "Indicative export range. Final quotation depends on EC, block size, washing level, palletizing, order volume, and destination requirements.",
      id: "Rentang ekspor indikatif. Penawaran final bergantung pada EC, ukuran blok, level washing, palletizing, volume order, dan syarat negara tujuan.",
    },
    specs: {
      grade: { en: "Washed / unwashed, fine pith", id: "Washed / unwashed, serbuk halus" },
      moisture: { en: "Max 18-20%", id: "Maks 18-20%" },
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
    priceRange: { en: "USD 220-340 / MT", id: "USD 220-340 / MT" },
    minOrder: { en: "18-20 MT per 40' HC container", id: "18-20 MT per kontainer 40' HC" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "20-30 days after deposit", id: "20-30 hari setelah DP" },
    hsCode: "5305.00 / buyer confirmation required",
    supplyCapacity: { en: "Up to 100 MT per month by schedule", id: "Hingga 100 MT per bulan berdasarkan jadwal" },
    catalogNote: {
      en: "Indicative export range. Final quotation depends on fiber length, bale density, cleaning level, packing, and loading plan.",
      id: "Rentang ekspor indikatif. Penawaran final bergantung pada panjang serat, densitas bale, level cleaning, kemasan, dan rencana loading.",
    },
    specs: {
      grade: { en: "Golden brown, mixed long and medium fiber", id: "Cokelat keemasan, campuran serat panjang dan sedang" },
      moisture: { en: "Max 15-18%", id: "Maks 15-18%" },
      packaging: { en: "100-125 kg pressed bale", id: "Bale press 100-125 kg" },
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
    slug: "legal-wood-pangandaran",
    name: { en: "Legal Wood", id: "Kayu Legal" },
    category: { en: "Certified Timber", id: "Kayu Bersertifikat" },
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
    priceRange: { en: "USD 420-900 / CBM", id: "USD 420-900 / CBM" },
    minOrder: { en: "1 x 20' container or project-based lot", id: "1 kontainer 20' atau lot berbasis proyek" },
    incoterm: { en: "Indicative FOB Tanjung Priok / Tanjung Perak", id: "Indikatif FOB Tanjung Priok / Tanjung Perak" },
    leadTime: { en: "30-45 days after species, dimension, and legality approval", id: "30-45 hari setelah approval jenis, dimensi, dan legalitas" },
    hsCode: "4407 / 4418 by product type",
    supplyCapacity: { en: "Project-based, subject to legal stock availability", id: "Berbasis proyek, tergantung stok legal tersedia" },
    catalogNote: {
      en: "Indicative export range. Timber can only be quoted after species, dimensions, drying level, SVLK/legal documents, and destination rules are confirmed.",
      id: "Rentang ekspor indikatif. Kayu hanya dapat di-quote setelah jenis, dimensi, level pengeringan, dokumen SVLK/legal, dan aturan negara tujuan dikonfirmasi.",
    },
    specs: {
      grade: { en: "Sawn timber / components by buyer specification", id: "Sawn timber / komponen sesuai spesifikasi pembeli" },
      moisture: { en: "KD 10-14% or AD by request", id: "KD 10-14% atau AD sesuai permintaan" },
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
    slug: "ubi-sumedang",
    name: { en: "Sumedang Sweet Potato", id: "Ubi Sumedang" },
    category: { en: "Fresh Agricultural Produce", id: "Hasil Pertanian Segar" },
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
    priceRange: { en: "USD 850-1,250 / MT", id: "USD 850-1,250 / MT" },
    minOrder: { en: "5 MT trial or 1 x 20' reefer/dry by product form", id: "Trial 5 MT atau 1 kontainer 20' reefer/dry sesuai bentuk produk" },
    incoterm: { en: "Indicative FOB Tanjung Priok", id: "Indikatif FOB Tanjung Priok" },
    leadTime: { en: "14-25 days after harvest schedule confirmation", id: "14-25 hari setelah konfirmasi jadwal panen" },
    hsCode: "0714 / 0714.20 by product form",
    supplyCapacity: { en: "Seasonal, coordinated by harvest window", id: "Musiman, dikoordinasikan berdasarkan window panen" },
    catalogNote: {
      en: "Indicative export range. Final price depends on variety, sizing, washing, curing, fresh or processed form, and cold-chain requirements.",
      id: "Rentang ekspor indikatif. Harga final bergantung pada varietas, ukuran, washing, curing, bentuk fresh atau olahan, dan kebutuhan cold-chain.",
    },
    specs: {
      grade: { en: "Fresh sorted A/B, buyer sizing available", id: "Fresh sortasi A/B, sizing sesuai pembeli tersedia" },
      moisture: { en: "Fresh crop, cured by request", id: "Fresh crop, curing sesuai permintaan" },
      packaging: { en: "10 kg carton, mesh bag, or processor sack", id: "Karton 10 kg, mesh bag, atau karung prosesor" },
      shelfLife: { en: "2-6 weeks depending on curing and storage", id: "2-6 minggu tergantung curing dan penyimpanan" },
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
    priceRange: { en: "USD 900-1,400 / MT", id: "USD 900-1,400 / MT" },
    minOrder: { en: "5 MT trial or 1 x 20' container", id: "Trial 5 MT atau 1 kontainer 20'" },
    incoterm: { en: "Indicative FOB Belawan / Tanjung Priok", id: "Indikatif FOB Belawan / Tanjung Priok" },
    leadTime: { en: "14-28 days after specification and destination approval", id: "14-28 hari setelah approval spesifikasi dan negara tujuan" },
    hsCode: "0802 / buyer and customs confirmation required",
    supplyCapacity: { en: "Seasonal and buyer-program based", id: "Musiman dan berbasis program pembeli" },
    catalogNote: {
      en: "Indicative export range. Final quotation requires maturity grade, fresh/dried form, packing method, destination legality, and inspection requirements.",
      id: "Rentang ekspor indikatif. Penawaran final membutuhkan grade kematangan, bentuk fresh/dried, metode kemasan, legalitas negara tujuan, dan kebutuhan inspeksi.",
    },
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



