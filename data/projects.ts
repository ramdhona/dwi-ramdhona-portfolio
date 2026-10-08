export type ProjectCategory = "Design" | "Website";

export interface Technology {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory | string;
  badgeCategory?: string;
  description: string;
  image: {
    primary: string;
  };
  technologyStack: Technology[];
  link?: string;
  problem: string;
  solution: string;
  features: string[];
  screenshotGallery: string[];
}

export type ProjectItem = Project;

export interface PortfolioData {
  eyebrow: string;
  heading: string;
  description: string;
  categories: Array<"Tampilkan Semua" | ProjectCategory>;
  projects: Project[];
}

/**
 * Sorts portfolio projects so that:
 * - Data with largest ID appears first (newest).
 * - Data with ID 0 is positioned at the very end.
 */
export function sortProjectsByNewest(projectList: Project[]): Project[] {
  return [...projectList].sort((a, b) => {
    const idA = parseInt(String(a.id), 10) || 0;
    const idB = parseInt(String(b.id), 10) || 0;

    // Rule: Data dengan ID 0 berada paling akhir
    if (idA === 0 && idB !== 0) return 1;
    if (idB === 0 && idA !== 0) return -1;

    // Rule: Data dengan ID terbesar harus tampil paling awal (terbaru)
    return idB - idA;
  });
}

export const projects: Project[] = [
  // 18.
  {
    id: "18",
    slug: "website-rt-05-rw-08-padangsari",
    title: "Website RT 05 RW 08 Kelurahan Padangsari",
    category: "Website",
    badgeCategory: "Website",
    description:
      "Website RT 05 RW 08 Kelurahan Padangsari merupakan platform informasi dan layanan digital untuk mendukung kebutuhan warga di lingkungan RT. Website ini menjadi pusat informasi mengenai kegiatan, berita, lembaga, fasilitas umum, serta layanan masyarakat yang dapat diakses secara online.",
    image: {
      primary: "/assets/portfolio/Mockup UI Website RT 05 RW 08.webp",
    },
    technologyStack: [
      {
        name: "Astro",
        icon: "/assets/techstack/astro-dark.webp",
      },
      {
        name: "Wordpress",
        icon: "/assets/techstack/wordpress.webp",
      },
      {
        name: "wpgraphql",
        icon: "/assets/techstack/wpgraphql.webp",
      },
      {
        name: "TailwindCss",
        icon: "/assets/techstack/tailwind.webp",
      },
    ],
    link: "https://webrt.rcrafted.my.id/",
    problem:
      "Informasi mengenai kegiatan dan layanan lingkungan perlu disampaikan secara mudah agar dapat diakses oleh seluruh warga. Penyampaian informasi yang masih tersebar juga dapat membuat warga kesulitan mengetahui berita, program kerja, maupun layanan yang tersedia di lingkungan RT.",
    solution:
      "Merancang website dengan struktur informasi yang sederhana, navigasi yang jelas, dan tampilan yang responsif. Berbagai informasi lingkungan dikelompokkan berdasarkan kebutuhan warga, mulai dari profil RT, berita dan kegiatan, hingga layanan serta fasilitas umum sehingga informasi dapat diakses dengan lebih mudah.",
    features: [
      "Beranda - Menyajikan informasi utama dan highlight kegiatan lingkungan RT.",
      "Tentang Kami - Menampilkan profil dan informasi mengenai RT 05 RW 08.",
      "Lembaga - Menyediakan informasi struktur dan lembaga kemasyarakatan.",
      "Galeri - Menampilkan dokumentasi kegiatan dan aktivitas warga.",
      "Informasi Berita - Menyajikan berita, pengumuman, dan kegiatan terbaru.",
      "Fasilitas Umum - Menyediakan informasi fasilitas yang tersedia di lingkungan warga.",
      "Usaha Mandiri - Menampilkan informasi dan potensi usaha masyarakat setempat.",
      "Layanan Warga - Mendukung penyampaian informasi dan layanan bagi warga secara digital.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI Website RT 05 RW 08.webp",
    ],
  },

  // 17. Najah Tour & Travel
  {
    id: "17",
    slug: "najah-tour-travel",
    title: "Website Najah Tour & Travel",
    category: "Website",
    badgeCategory: "Website",
    description:
      "Website Najah Tour & Travel merupakan website company profile yang dirancang untuk memperkenalkan layanan perjalanan Umroh dan Haji kepada calon jamaah. Website menyajikan informasi paket, jadwal keberangkatan, persyaratan, berita, serta informasi pendukung secara terstruktur dan mudah diakses.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Najah Tour & Travel.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
      {
        name: "Laravel",
        icon: "/assets/techstack/laravel.webp",
      },
      {
        name: "PHP",
        icon: "/assets/techstack/php.webp",
      },
      {
        name: "MySQL",
        icon: "/assets/techstack/mysql.webp",
      },
      {
        name: "TailwindCss",
        icon: "/assets/techstack/tailwind.webp",
      },
    ],
    link: "https://najahtour.co.id/",
    problem:
      "Calon jamaah membutuhkan informasi yang lengkap dan mudah dipahami sebelum memilih paket perjalanan Umroh atau Haji. Banyaknya pilihan paket, jadwal keberangkatan, serta informasi persyaratan membuat penyajian konten perlu dibuat lebih terorganisir agar pengguna dapat menemukan informasi yang relevan dengan cepat.",
    solution:
      "Merancang website dengan navigasi yang sederhana, informasi paket yang terstruktur, dan visual yang meyakinkan untuk membangun kepercayaan calon jamaah. Fitur pencarian dan filter membantu pengguna menemukan paket sesuai kebutuhan, sementara detail paket dan informasi perjalanan disajikan secara jelas pada berbagai perangkat.",
    features: [
      "Paket Umroh - Menampilkan berbagai pilihan paket Umroh beserta informasi dan detail perjalanan.",
      "Jadwal Keberangkatan - Menyediakan informasi jadwal dan periode keberangkatan jamaah.",
      "Syarat Pendaftaran - Menjelaskan persyaratan dan informasi yang diperlukan untuk pendaftaran.",
      "Cek Porsi Haji - Memudahkan pengguna mendapatkan informasi terkait porsi atau keberangkatan Haji.",
      "Berita - Menyajikan berita dan informasi terbaru seputar Umroh dan Haji.",
      "Galeri - Menampilkan dokumentasi kegiatan dan perjalanan jamaah.",
      "Kontak Kami - Memudahkan calon jamaah menghubungi pihak Najah Tour & Travel.",
      "Download Flyer - Menyediakan akses untuk mengunduh flyer informasi paket Umroh.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Najah Tour & Travel.webp",
    ],
  },

  // 16. SBI
  {
    id: "16",
    slug: "select-bintang-indonesia",
    title: "Website Company Profile PT. Select Bintang Indonesia",
    category: "Website",
    badgeCategory: "Website",
    description:
      "Description Website Company Profile PT. Select Bintang Indonesia merupakan landing page yang dirancang sebagai media profil sekaligus promosi perusahaan yang bergerak di bidang pengadaan barang dan jasa. Website ini menyajikan informasi perusahaan, layanan, serta berbagai informasi pendukung untuk membangun kepercayaan calon klien.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Website SBI.webp",
    },
    technologyStack: [
      {
        name: "Wordpress",
        icon: "/assets/techstack/wordpress.webp",
      },
    ],
    link: "",
    problem:
      "Perusahaan membutuhkan media digital yang mampu memperkenalkan profil, layanan, dan keunggulan bisnis secara profesional kepada calon klien. Informasi perusahaan juga perlu disajikan secara terstruktur agar pengunjung dapat memahami layanan dan kapabilitas perusahaan dengan mudah.",
    solution:
      "Merancang landing page dengan visual yang profesional, struktur informasi yang jelas, dan navigasi sederhana. Konten utama seperti profil, layanan, informasi perusahaan, dan kontak disusun secara strategis untuk membantu calon klien memahami bisnis sekaligus meningkatkan kredibilitas perusahaan.",
    features: [
      "Beranda - Menampilkan informasi utama dan value proposition perusahaan.",
      "Tentang Kami - Menyajikan profil, visi, misi, dan informasi perusahaan.",
      "Layanan Kami - Menampilkan layanan pengadaan barang dan jasa yang tersedia.",
      "Blog - Menyediakan artikel dan informasi terbaru dari perusahaan.",
      "Kontak - Memudahkan calon klien menghubungi perusahaan.",
      "Informasi Perusahaan - Menyajikan informasi pendukung mengenai perusahaan dan layanan.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Website SBI.webp",
    ],
  },

  // 15. JAWA SNEPER REKT
  {
    id: "15",
    slug: "jawa-sneper-rekt",
    title: "Portal Berita JAWA SNEPER REKT",
    category: "Website",
    badgeCategory: "Website",
    description:
      "Portal Berita JAWA SNEPER REKT merupakan platform artikel yang menyajikan informasi seputar koin crypto JAWA SNEPER REKT. Website dirancang sebagai media informasi yang ringan, terstruktur, dan mudah diakses untuk membantu pengguna menemukan berbagai berita, artikel, serta informasi terkait perkembangan ekosistem JAWA SNEPER REKT.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Portal Berita Kripto JAWA SNEPER REKT.webp",
    },
    technologyStack: [
      {
        name: "Wordpress",
        icon: "/assets/techstack/wordpress.webp",
      },
    ],
    link: "",
    problem:
      "Informasi seputar JAWA SNEPER REKT membutuhkan media yang dapat menyajikan konten secara terorganisir dan mudah ditemukan. Pengguna juga membutuhkan akses yang praktis untuk menjelajahi berbagai topik seperti berita, analisis, aset kripto, industri, dan informasi terkait lainnya.",
    solution:
      "Merancang portal berita dengan struktur konten yang jelas, navigasi sederhana, dan fitur pencarian yang mudah digunakan. Berbagai artikel dikelompokkan berdasarkan kategori sehingga pengguna dapat menemukan informasi yang relevan dengan lebih cepat. Desain juga dibuat responsif agar pengalaman membaca tetap nyaman melalui desktop maupun mobile.",
    features: [
      "Beranda - Menampilkan highlight dan berbagai informasi terbaru seputar JAWA SNEPER REKT.",
      "Artikel Terbaru - Menyajikan artikel dan berita terbaru secara terstruktur.",
      "Analisis - Menyediakan konten analisis seputar aset dan perkembangan kripto.",
      "Kategori - Mengelompokkan artikel berdasarkan topik seperti Aset Kripto, Industri, dan lainnya.",
      "Pencarian Artikel - Memudahkan pengguna menemukan artikel berdasarkan kata kunci.",
      "Siaran Pers & Bisnis - Menyajikan informasi bisnis dan siaran pers terkait.",
      "Responsive Design - Memberikan pengalaman membaca yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Portal Berita Kripto JAWA SNEPER REKT.webp",
    ],
  },

  // 14. Katalog Haiga Citra Digital
  {
    id: "14",
    slug: "katalog-haiga-citra-digital",
    title: "Katalog Haiga Citra Digital",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Katalog Haiga Citra Digital merupakan sistem informasi penawaran barang yang dirancang untuk membantu proses penyusunan dan penyajian penawaran produk secara digital. Sistem ini menyajikan daftar barang, spesifikasi, harga, serta total penawaran dalam format yang terstruktur dan mudah dipahami.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Katalog Haiga Citra Digital.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "",
    problem:
      "Proses penyusunan penawaran barang membutuhkan informasi yang detail dan perhitungan harga yang akurat. Penyajian data secara manual juga dapat membuat informasi produk, jumlah barang, harga, dan total penawaran menjadi kurang praktis untuk dikelola dan dibagikan.",
    solution:
      "Merancang sistem katalog dengan tampilan yang terstruktur dan responsif untuk menyajikan data barang serta informasi penawaran secara jelas. Sistem juga dilengkapi perhitungan harga otomatis dan fitur export PDF sehingga dokumen penawaran dapat dibuat dan dibagikan dengan lebih mudah.",
    features: [
      "Data Barang - Menampilkan daftar barang beserta jumlah dan informasi harganya.",
      "Penawaran Barang - Menyajikan detail penawaran berdasarkan kebutuhan pengguna.",
      "Detail Produk - Menampilkan spesifikasi dan informasi lengkap setiap produk.",
      "Perhitungan Harga - Menghitung total harga berdasarkan jumlah dan harga barang.",
      "Export PDF - Menghasilkan dokumen penawaran dalam format PDF.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Katalog Haiga Citra Digital.webp",
    ],
  },

  // 13. portal-data-kumkm-jawa-tengah
  {
    id: "13",
    slug: "portal-data-kumkm-jawa-tengah",
    title: "Portal Satu Data KUMKM Jawa Tengah",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Portal Satu Data KUMKM Jawa Tengah merupakan platform digital yang dirancang untuk mengelola dan menyajikan data Koperasi, Usaha Kecil, dan Menengah secara terpusat. Website ini membantu pengguna mengakses data, laporan, informasi kemitraan, serta berbagai statistik KUMKM secara lebih terstruktur dan informatif.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Portal Data KUMKM Jawa Tengah.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "",
    problem:
      "Data KUMKM membutuhkan sistem yang mampu menyajikan informasi dalam jumlah besar secara terorganisir dan mudah dipahami. Pengguna juga memerlukan akses yang praktis untuk mencari data, melihat laporan kinerja, serta memperoleh informasi terkait perkembangan KUMKM di Jawa Tengah.",
    solution:
      "Merancang portal dengan dashboard informatif, visualisasi data, serta navigasi yang terstruktur untuk memudahkan pengguna mengakses berbagai informasi KUMKM. Data disajikan melalui tabel, grafik, dan kategori yang jelas sehingga informasi dapat dipahami dan digunakan secara lebih efektif.",
    features: [
      "Data Koperasi - Menyediakan informasi dan data koperasi di Jawa Tengah.",
      "Laporan Kinerja - Menampilkan laporan dan statistik kinerja KUMKM.",
      "Data Kemitraan - Menyajikan informasi terkait kemitraan dan pendampingan KUMKM.",
      "Permohonan Informasi Data - Memfasilitasi permohonan akses terhadap informasi data.",
      "Dashboard Statistik - Menampilkan visualisasi dan ringkasan data KUMKM melalui grafik.",
      "Pencarian Data - Memudahkan pengguna menemukan data koperasi dan informasi terkait.",
      "Download Data - Menyediakan opsi untuk melihat dan mengunduh data yang tersedia.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Portal Data KUMKM Jawa Tengah.webp",
    ],
  },

  // 12. Website Tengoku — Custom Keychain
  {
    id: "12",
    slug: "tengoku-custom-keychain",
    title: "Website Tengoku — Custom Keychain",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Website Tengoku merupakan toko online yang menyediakan produk custom keychain akrilik dengan desain unik dan personal. Website dirancang untuk memberikan pengalaman belanja yang sederhana dan menarik, mulai dari menjelajahi produk hingga menyelesaikan proses checkout dan pembayaran.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Tengoku Pastel.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/kOE9O9xbygsAmutGk6He4y/e-commerce?node-id=0-1&p=f&t=NZbliCtbzSi576Dv-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=397%3A2020",
    problem:
      "Pengguna membutuhkan platform yang memudahkan proses menemukan produk custom, melihat detail produk, dan melakukan pembelian secara praktis. Selain itu, informasi produk, pilihan pengiriman, serta metode pembayaran perlu disajikan secara jelas agar proses transaksi dapat berjalan dengan nyaman.",
    solution:
      "Merancang e-commerce dengan visual yang playful, navigasi sederhana, dan alur pembelian yang terstruktur. Produk ditampilkan melalui katalog yang menarik, sementara proses checkout mengintegrasikan informasi alamat, pengiriman, dan pembayaran dalam satu alur yang mudah dipahami.",
    features: [
      "Katalog Produk - Menampilkan berbagai pilihan custom keychain akrilik.",
      "Detail Produk - Menyediakan informasi produk, harga, rating, dan jumlah terjual.",
      "Checkout - Memudahkan pengguna menyelesaikan pesanan dalam satu alur.",
      "Metode Pembayaran - Menyediakan berbagai pilihan metode pembayaran digital.",
      "Pengiriman - Menyediakan pilihan ekspedisi dan informasi biaya pengiriman.",
      "Blog - Menyajikan artikel dan informasi seputar produk.",
      "Akun Pengguna - Memungkinkan pengguna mengelola akun dan aktivitas pembelian.",
      "Keamanan Transaksi - Mendukung proses transaksi yang aman dan terstruktur.",
      "Responsive Design - Memberikan pengalaman belanja yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Tengoku Pastel.webp",
    ],
  },

  // 11. Surya Cipta Gakkou
  {
    id: "11",
    slug: "surya-cipta-gakkou",
    title: "Website Surya Cipta Gakkou",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Website Surya Cipta Gakkou merupakan platform informasi dan pencarian data siswa yang dirancang khusus untuk membantu perusahaan Jepang menemukan kandidat siswa yang sesuai. Website menyediakan informasi siswa secara terstruktur dengan fitur pencarian, perbandingan kandidat, serta detail profil untuk mendukung proses seleksi.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Website Surya Cipta Gakkou.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/1s2oa9x0AZgGszG9IYwDI1/LPK?node-id=0-1&p=f&t=UM8f8AHHiqKcoGjt-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=183%3A7583",
    problem:
      "Pihak perusahaan membutuhkan cara yang lebih praktis untuk mencari dan memahami profil siswa berdasarkan kriteria tertentu. Banyaknya data siswa juga memerlukan sistem yang mampu menyajikan informasi secara terstruktur sehingga proses pencarian dan perbandingan kandidat dapat dilakukan dengan lebih mudah.",
    solution:
      "Merancang website dengan fitur pencarian berbasis filter, tampilan profil yang informatif, dan fitur perbandingan siswa. Setiap data siswa disajikan secara terstruktur sehingga perusahaan dapat menemukan kandidat yang sesuai, membandingkan beberapa kandidat, serta melihat detail profil sebelum menentukan pilihan.",
    features: [
      "Find Student - Mencari siswa berdasarkan berbagai kriteria dan filter.",
      "Student Data - Menampilkan daftar dan informasi siswa secara terstruktur.",
      "Compare Student - Membandingkan profil beberapa siswa untuk membantu proses seleksi.",
      "Detail Student - Menampilkan informasi lengkap mengenai profil dan biodata siswa.",
      "CV & Video - Menyediakan akses ke CV dan video profil siswa.",
      "Article - Menyajikan artikel dan informasi terbaru dari Surya Cipta Gakkou.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Website Surya Cipta Gakkou.webp",
    ],
  },

  // 10. I-Branch Bank BTN
  {
    id: "10",
    slug: "i-branch-bank-btn",
    title: "I-Branch Bank BTN",
    category: "Design",
    badgeCategory: "Design",
    description:
      "I-Branch Bank BTN merupakan konsep aplikasi mobile untuk mendukung proses monitoring dan pelaporan operasional branch Bank BTN. Aplikasi ini dirancang untuk membantu pengguna memantau data, kondisi perangkat, project, serta laporan bulanan secara lebih praktis melalui perangkat mobile.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX I-Branch Bank BTN.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/e13vgkaTcQV5yDsRs0bQ4k/mobile-apps?node-id=0-1&p=f&t=OvwkSn09cl0tpF1b-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=153%3A2",
    problem:
      "Proses monitoring dan pelaporan operasional branch membutuhkan akses terhadap berbagai data secara cepat dan terorganisir. Pengguna juga perlu mencatat kondisi perangkat, melaporkan aktivitas, serta memantau perkembangan project tanpa harus bergantung pada perangkat desktop.",
    solution:
      "Merancang antarmuka mobile yang terstruktur, informatif, dan mudah digunakan untuk mengintegrasikan berbagai kebutuhan monitoring dalam satu aplikasi. Dashboard menyajikan ringkasan data melalui grafik dan visualisasi, sementara formulir laporan dirancang agar proses input kondisi perangkat dan dokumentasi dapat dilakukan langsung melalui perangkat mobile.",
    features: [
      "Laporan Bulanan - Mengelola dan menginput laporan operasional branch secara digital.",
      "Monitoring PC - Memantau kondisi dan status perangkat PC di branch.",
      "Project - Menampilkan informasi dan perkembangan project yang sedang berjalan.",
      "Monitoring Data - Menyajikan data monitoring melalui grafik dan visualisasi.",
      "Upload Dokumentasi - Mendukung pengunggahan foto kondisi server, rak server, dan perangkat.",
      "Lokasi - Mencatat lokasi perangkat atau branch saat melakukan pelaporan.",
      "Dashboard - Menampilkan ringkasan data monitoring dan laporan secara terpusat.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX I-Branch Bank BTN.webp",
    ],
  },

  // 9. SIMUDA PERWIRA
  {
    id: "9",
    slug: "simuda-perwira-ujian-online",
    title: "SIMUDA PERWIRA — Sistem Ujian Online CBT",
    category: "Design",
    badgeCategory: "Design",
    description:
      "SIMUDA PERWIRA merupakan platform digital yang dikembangkan sebagai wadah dan inkubator pendampingan kewirausahaan pemuda di desa oleh Pemerintah Provinsi Jawa Tengah. Pada proyek ini, sistem difokuskan pada Ujian Online berbasis Computer Based Test (CBT) untuk mendukung proses pelaksanaan ujian secara digital, terstruktur, dan efisien.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Simuda Perwira Modern.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "",
    problem:
      "Pelaksanaan ujian secara konvensional membutuhkan proses administrasi dan pengelolaan peserta yang cukup kompleks. Peserta juga membutuhkan sistem ujian yang dapat diakses dengan mudah serta memberikan informasi mengenai waktu, soal, dan status ujian secara jelas.",
    solution:
      "Merancang sistem CBT dengan antarmuka yang sederhana, informatif, dan mudah digunakan. Sistem menyediakan manajemen data peserta, halaman ujian, navigasi soal, serta countdown timer untuk membantu peserta mengikuti ujian sesuai batas waktu yang ditentukan.",
    features: [
      "Manajemen Peserta - Mengelola informasi dan data peserta ujian secara terpusat.",
      "Ujian Online - Mendukung pelaksanaan ujian berbasis Computer Based Test (CBT).",
      "Daftar Soal - Menampilkan daftar soal dan memudahkan navigasi antarsoal.",
      "Countdown Ujian - Menampilkan waktu tersisa secara real-time selama ujian berlangsung.",
      "Login & Register - Menyediakan akses autentikasi bagi peserta.",
      "Data Diri - Menampilkan informasi peserta dan menyediakan opsi untuk mencetak data diri.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Simuda Perwira Modern.webp",
    ],
  },

  // 8. Digilib Kota Semarang
  {
    id: "8",
    slug: "digilib-kota-semarang",
    title: "Digilib Kota Semarang",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Digilib Kota Semarang merupakan platform Digital Library yang dirancang untuk memudahkan pengguna dalam mengakses, mencari, dan mengelola koleksi buku secara digital. Platform ini juga mendukung proses peminjaman serta menyediakan informasi koleksi secara terpusat dengan mengutamakan kemudahan akses dan keamanan informasi.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Digilib Kota Semarang.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/aNP2xWt0EVwgNvzSlQi7ex/Digilib?node-id=0-1&p=f&t=Sf5hDaVPgGrpPvhu-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=180%3A3&show-proto-sidebar=1",
    problem:
      "Akses terhadap koleksi buku dan informasi peminjaman membutuhkan sistem yang praktis dan terorganisir. Pengguna membutuhkan cara yang lebih mudah untuk menemukan buku, mengetahui ketersediaannya, serta memantau riwayat peminjaman tanpa harus melakukan proses secara manual.",
    solution:
      "Merancang Digilib dengan antarmuka yang sederhana, navigasi terstruktur, dan fitur pencarian yang mudah digunakan. Informasi koleksi, status ketersediaan, serta riwayat peminjaman ditampilkan secara jelas sehingga pengguna dapat mengelola aktivitas perpustakaan dengan lebih efisien melalui berbagai perangkat.",
    features: [
      "Daftar Buku - Menampilkan koleksi buku beserta informasi dan status ketersediaannya.",
      "Pencarian Buku - Memudahkan pengguna menemukan buku berdasarkan kata kunci dan kategori.",
      "Peminjaman Buku - Mendukung proses peminjaman koleksi buku secara digital.",
      "Histori Peminjaman - Menampilkan riwayat peminjaman dan status pengembalian buku.",
      "Login & Register - Menyediakan akses akun untuk mengelola aktivitas pengguna.",
      "Riwayat Baca Buku - Menyimpan informasi buku yang telah dibaca atau diakses pengguna.",
      "Dashboard - Menyajikan ringkasan aktivitas dan informasi perpustakaan secara terpusat.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Digilib Kota Semarang.webp",
    ],
  },

  // 7. SIPROKUMDA
  {
    id: "7",
    slug: "siprokumda-jawa-tengah",
    title: "SIPROKUMDA Jawa Tengah",
    category: "Design",
    badgeCategory: "Design",
    description:
      "SIPROKUMDA Jawa Tengah merupakan sistem informasi yang dirancang untuk mengelola Produk Hukum Daerah secara digital dan terpusat. Platform ini membantu pemerintah daerah dalam mengatur, menyimpan, memantau, dan menyajikan data regulasi secara lebih efisien, terstruktur, dan mudah diakses.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX SIPROKUMDA Jawa Tengah.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/ZvMhqxu18F9LdgiGOovBPx/SIPROKUMDA?node-id=0-1&p=f&t=PMuXJ8DaLo68VA5w-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=307%3A711&show-proto-sidebar=1",
    problem:
      "Pengelolaan data Produk Hukum Daerah membutuhkan sistem yang mampu menangani berbagai jenis data dan proses secara terintegrasi. Tanpa pengelolaan yang terpusat, proses pencatatan, evaluasi, klasifikasi, hingga penyampaian data dapat menjadi kurang efisien dan sulit dipantau. ",
    solution:
      "Merancang antarmuka SIPROKUMDA dengan dashboard informatif dan navigasi terstruktur untuk memudahkan pengelolaan data Produk Hukum Daerah. Berbagai informasi dan proses dikelompokkan berdasarkan fungsi sehingga pengguna dapat memantau data, melakukan evaluasi, serta mengelola regulasi secara lebih efektif.",
    features: [
      "Dashboard - Menampilkan ringkasan dan statistik data Produk Hukum Daerah.",
      "Fasilitasi - Mengelola informasi dan proses fasilitasi Produk Hukum Daerah.",
      "Data Evaluasi - Mengelola dan memantau data evaluasi produk hukum.",
      "Data Klarifikasi - Menyajikan data klarifikasi terkait Produk Hukum Daerah.",
      "Nomor Register - Mengelola data nomor register produk hukum.",
      "Data Penyampaian - Mengelola informasi penyampaian Produk Hukum Daerah.",
      "Analisis Kebutuhan Perda - Mendukung analisis kebutuhan pembentukan peraturan daerah.",
      "Persetujuan - Mengelola proses dan data persetujuan produk hukum.",
      "Data Kab/Kota - Mengelola data Produk Hukum berdasarkan kabupaten dan kota.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX SIPROKUMDA Jawa Tengah.webp",
    ],
  },

  // 6. pelita
  {
    id: "6",
    slug: "web-jdih-dprd-jateng",
    title: "Website JDIH DPRD Jawa Tengah",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Website JDIH DPRD Jawa Tengah dirancang sebagai pusat informasi hukum yang transparan, akuntabel, dan mudah diakses oleh masyarakat. Platform ini menyediakan dokumentasi produk hukum DPRD, informasi kelembagaan, serta fitur pencarian regulasi dalam satu platform yang terintegrasi dan responsif.",
    image: {
      primary: "/assets/portfolio/Mockup UI JDIH DPRD Jawa Tengah.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/13QV4varjzpzjgZ3lr8LdR/JDIH-DPRD-Jateng?node-id=0-1&p=f&t=eHAutYsrfOUKLKxb-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=5%3A72",
    problem:
      "Masyarakat membutuhkan akses yang lebih mudah untuk menemukan dan memahami berbagai produk hukum serta dokumentasi DPRD Jawa Tengah. Banyaknya dokumen dan informasi hukum juga memerlukan sistem penyajian yang terstruktur agar pengguna dapat menemukan regulasi yang relevan secara cepat.",
    solution:
      "Merancang website dengan navigasi yang sederhana, sistem pencarian yang terstruktur, dan penyajian dokumen yang informatif. Produk hukum dikelompokkan dan dilengkapi fitur pencarian serta filter untuk membantu pengguna menemukan dokumen berdasarkan kebutuhan. Tampilan juga dibuat modern dan responsif untuk mendukung akses melalui berbagai perangkat.",
    features: [
      "Produk Hukum - Menyediakan akses ke berbagai produk hukum DPRD Jawa Tengah.",
      "Monografi DPRD - Menyajikan informasi dan dokumentasi terkait DPRD Jawa Tengah.",
      "Pencarian Dokumen - Memudahkan pengguna menemukan dokumen berdasarkan kata kunci dan filter.",
      "Detail Dokumen - Menampilkan informasi lengkap mengenai produk hukum dan dokumen terkait.",
      "Statistik Pengunjung - Menampilkan data statistik akses dan kunjungan website.",
      "Informasi Kelembagaan - Menyediakan informasi mengenai kelembagaan DPRD Jawa Tengah.",
      "Download & Print - Memudahkan pengguna mengunduh dan mencetak dokumen hukum.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI JDIH DPRD Jawa Tengah.webp",
    ],
  },

  // 5. mangku
  {
    id: "5",
    slug: "apikasi-mangku",
    title: "Aplikasi Mangku",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Mangku merupakan aplikasi keuangan sekolah yang dirancang untuk membantu siswa mengelola dan melakukan berbagai pembayaran sekolah secara digital. Aplikasi ini mengintegrasikan informasi tagihan, status pembayaran, serta layanan administrasi dalam satu platform yang praktis dan mudah digunak",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Aplikasi Mangku.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "",
    problem:
      "Proses pembayaran sekolah dapat menjadi kurang praktis ketika informasi tagihan dan status pembayaran tidak tersedia secara terpusat. Siswa membutuhkan cara yang lebih mudah untuk mengetahui jumlah tagihan, melihat riwayat pembayaran, dan menyelesaikan pembayaran tanpa proses yang rumit.",
    solution:
      "Merancang UI/UX Mangku dengan dashboard yang menampilkan ringkasan tagihan dan status pembayaran secara langsung. Setiap kebutuhan utama dikelompokkan dalam navigasi yang sederhana sehingga siswa dapat dengan mudah melihat tagihan, melakukan pembayaran, memperoleh informasi, serta mengelola pengaturan akun.",
    features: [
      "Tagihan - Menampilkan daftar tagihan dan rincian pembayaran sekolah.",
      "Pembayaran - Memudahkan siswa melakukan pembayaran sekolah secara digital.",
      "Status Pembayaran - Menampilkan status tagihan seperti belum lunas, pending, dan sudah dibayar.",
      "Informasi - Menyediakan informasi dan pengumuman terbaru dari sekolah.",
      "Pengaturan - Mengelola pengaturan dan kebutuhan akun pengguna.",
      "Dashboard - Menampilkan ringkasan total tagihan dan pembayaran secara terpusat.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Aplikasi Mangku.webp",
    ],
  },

  // 4. BBJT
  {
    id: "4",
    slug: "web-balai-bahasa-jateng",
    title: "Website Balai Bahasa Jawa Tengah",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Redesign Website Balai Bahasa Provinsi Jawa Tengah merupakan perancangan ulang website sebagai pusat informasi layanan kebahasaan, kesastraan, dan kegiatan Balai Bahasa Jawa Tengah. Redesign berfokus pada tampilan yang lebih modern, informatif, dan mudah dinavigasi untuk membantu masyarakat mengakses informasi secara lebih efektif.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Balai Bahasa Jateng.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/3Y9zw06DxNt5AbOhaBle7M/Web?node-id=151-4689",
    problem:
      "Website membutuhkan penyajian informasi yang lebih terstruktur agar pengguna dapat menemukan layanan, program kerja, hasil kegiatan, berita, dan laporan dengan lebih mudah. Banyaknya jenis informasi juga memerlukan struktur navigasi yang jelas agar pengalaman pengguna tetap sederhana dan nyaman.",
    solution:
      "Melakukan redesign dengan memperbaiki struktur navigasi, visual hierarchy, dan pengelompokan konten berdasarkan kebutuhan pengguna. Tampilan dibuat lebih modern dan responsif dengan menyediakan akses yang jelas ke layanan utama, berita, program kerja, serta informasi kelembagaan pada berbagai perangkat.",
    features: [
      "Beranda - Menyajikan informasi utama dan highlight kegiatan Balai Bahasa Jawa Tengah.",
      "Program Kerja - Menampilkan program dan kegiatan kebahasaan serta kesastraan.",
      "Hasil Kerja - Menyajikan hasil kegiatan dan capaian Balai Bahasa Jawa Tengah.",
      "Pelayanan - Menyediakan informasi berbagai layanan kebahasaan dan kesastraan.",
      "Berita - Menampilkan berita dan informasi kegiatan terbaru.",
      "Laporan - Menyediakan akses terhadap laporan dan informasi kelembagaan.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Balai Bahasa Jateng.webp",
    ],
  },

  // 3. Website SMK Texmaco Semarang
  {
    id: "3",
    slug: "web-smk-texmaco-semarang",
    title: "Website Company Profile SMK Texmaco Semarang",
    category: "Design",
    badgeCategory: "Design",
    description:
      "Website Company Profile SMK Texmaco Semarang merupakan website yang dirancang sebagai pusat informasi digital sekolah. Website ini membantu siswa, guru, dan masyarakat memperoleh informasi seputar profil, program keahlian, kegiatan, fasilitas, serta layanan sekolah dengan lebih mudah dan terstruktur.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX SMK Texmaco Semarang.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/EjNCyq97fKYAOb4CwoER1W/SMK-TEXMACO?node-id=3-2",
    problem:
      "Informasi sekolah perlu disajikan dalam satu platform yang mudah diakses oleh berbagai pengguna. Tanpa struktur informasi yang jelas, pengguna dapat kesulitan menemukan informasi mengenai program keahlian, kegiatan, fasilitas, maupun profil sekolah.",
    solution:
      "Merancang website dengan struktur navigasi yang sederhana dan penyajian informasi yang lebih terorganisir. Setiap informasi utama dikelompokkan berdasarkan kebutuhan pengguna, didukung tampilan yang responsif agar dapat diakses dengan nyaman melalui desktop maupun perangkat mobile.",
    features: [
      "Profil Sekolah - Menyediakan informasi profil dan identitas SMK Texmaco Semarang.",
      "Program Keahlian - Menampilkan informasi program dan konsentrasi keahlian yang tersedia.",
      "Berita & Kegiatan - Menyajikan berita serta berbagai kegiatan sekolah.",
      "Galeri - Menampilkan dokumentasi kegiatan dan aktivitas sekolah.",
      "Fasilitas - Memberikan informasi mengenai fasilitas yang tersedia di sekolah.",
      "Hubungi Kami - Memudahkan pengguna mendapatkan informasi kontak dan menghubungi pihak sekolah.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX SMK Texmaco Semarang.webp",
    ],
  },

  // 2. pelita
  {
    id: "2",
    slug: "pelita-Jateng",
    title: "Aplikasi Pelita Jateng",
    category: "Design",
    badgeCategory: "Design",
    description:
      "PELITA JATENG (Pencari Literatur Peraturan Jawa Tengah) merupakan platform digital untuk mencari dan mengakses berbagai regulasi serta produk hukum di Jawa Tengah. Proyek ini merupakan redesign dari aplikasi sebelumnya yang dikembangkan oleh Biro Hukum JDIH Jawa Tengah, dengan fokus pada tampilan yang lebih modern, terstruktur, dan mudah digunakan.",
    image: {
      primary: "/assets/portfolio/Mockup Aplikasi Produk Hukum Jawa Tengah.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/tszV4dJoBLtGryj4UeNrKo/Pelita?node-id=308-2",
    problem:
      "Versi aplikasi sebelumnya membutuhkan peningkatan pada sisi tampilan dan pengalaman pengguna agar proses pencarian serta akses produk hukum menjadi lebih mudah. Pengguna juga membutuhkan cara yang lebih praktis untuk menemukan regulasi berdasarkan kategori, wilayah, maupun informasi terkait lainnya.",
    solution:
      "Melakukan redesign UI/UX dengan menyederhanakan navigasi dan mengelompokkan informasi berdasarkan kebutuhan pengguna. Tampilan dirancang dengan visual hierarchy yang jelas, fitur pencarian yang lebih menonjol, serta akses cepat ke produk hukum, agenda, dan dokumen sehingga pengguna dapat menemukan informasi secara lebih efisien.",
    features: [
      "Produk Hukum - Mengakses berbagai regulasi dan produk hukum Jawa Tengah.",
      "Agenda - Menampilkan informasi agenda dan kegiatan terkait produk hukum.",
      "Dokumen - Melihat dan mengakses dokumen produk hukum secara digital.",
      "Berita Terbaru - Menyajikan informasi dan berita terbaru seputar JDIH Jawa Tengah.",
      "Pencarian - Memudahkan pengguna menemukan produk hukum berdasarkan kata kunci.",
      "Kategori Kab/Kota - Menjelajahi produk hukum berdasarkan wilayah kabupaten atau kota.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup Aplikasi Produk Hukum Jawa Tengah.webp",
    ],
  },

  // 1. Siatex Mobile
  {
    id: "1",
    slug: "siatex-mobile",
    title: "Aplikasi SIATEX Mobile",
    category: "Design",
    badgeCategory: "UI/UX Design",
    description:
      "SIATEX adalah aplikasi Sistem Informasi Akademik untuk SMK TEXMACO Semarang yang dirancang untuk memudahkan siswa mengakses berbagai kebutuhan akademik dalam satu platform yang modern, intuitif, dan responsif.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Aplikasi SIATEX Semarang.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/AKgPleaNtMVcxD0Maq48B2/m.siatex?node-id=5-7",
    problem:
      "Informasi akademik masih tersebar dan kurang praktis untuk diakses siswa, sehingga diperlukan sebuah platform yang dapat menyatukan berbagai layanan akademik dalam satu aplikasi.",
    solution:
      "Merancang UI/UX SIATEX dengan mobile-first approach yang menyederhanakan akses informasi akademik melalui navigasi yang intuitif, visual yang jelas, serta fitur yang terorganisir dalam satu platform.",
    features: [
      "Akademik - Akses informasi akademik dengan lebih mudah.",
      "Ujian Online - Mendukung pelaksanaan dan akses ujian secara digital.",
      "Kelulusan - Informasi kelulusan dan status akademik siswa.",
      "Pengajuan PKL - Memudahkan proses pengajuan dan informasi PKL.",
      "Media Pembelajaran - Akses materi pembelajaran secara terpusat.",
      "Keuangan - Informasi pembayaran dan status keuangan siswa.",
      "Raport - Melihat hasil dan informasi raport secara digital.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Aplikasi SIATEX Semarang.webp",
    ],
  },

  // 0. SMT Magang (Design) - ID 0 (Initial / Base project - Positioned at the end)
  {
    id: "0",
    slug: "smt",
    title: "Website Pendaftaran Magang SMT",
    category: "Design",
    badgeCategory: "UI/UX Design",
    description:
      "Website Pendaftaran Magang SMT merupakan website yang dirancang untuk memudahkan calon peserta mendapatkan informasi sekaligus melakukan pendaftaran program magang dan internship di SMT. Desain dibuat modern, informatif, dan responsif agar nyaman diakses melalui berbagai perangkat.",
    image: {
      primary: "/assets/portfolio/Mockup UI_UX Website Magang SMT.webp",
    },
    technologyStack: [
      {
        name: "Figma",
        icon: "/assets/techstack/figma.webp",
      },
    ],
    link: "https://www.figma.com/proto/FcWxO5rrVc6nu1cx70MXpW/Internship-New?node-id=252-1329",
    problem:
      "Proses pencarian informasi dan pendaftaran magang membutuhkan akses yang mudah serta informasi yang terstruktur. Calon peserta juga perlu mengetahui kuota, program, posisi, dan persyaratan sebelum melakukan pendaftaran.",
    solution:
      "Merancang website dengan navigasi sederhana dan informasi yang terorganisir dalam satu platform. Halaman pendaftaran dibuat lebih praktis melalui formulir online yang responsif, sementara informasi kuota, program, dan artikel magang disajikan secara jelas agar pengguna dapat mengambil keputusan dengan lebih mudah.",
    features: [
      "Pendaftaran Online - Memudahkan calon peserta melakukan pendaftaran magang secara digital.",
      "Informasi Kuota - Menampilkan ketersediaan kuota magang dan internship secara jelas.",
      "Program & Posisi - Menyediakan informasi program dan posisi yang tersedia.",
      "Detail Program - Menjelaskan informasi dan ketentuan program magang secara terstruktur.",
      "Blog & Artikel - Menyediakan informasi dan insight seputar magang dan internship.",
      "Responsive Design - Memberikan pengalaman yang optimal pada desktop, tablet, dan mobile.",
    ],
    screenshotGallery: [
      "/assets/portfolio/Mockup UI_UX Website Magang SMT.webp",
    ],
  },
];

/**
 * Returns portfolio items sorted by newest (highest ID first, ID 0 at the very end).
 */
export function getSortedProjects(): Project[] {
  return sortProjectsByNewest(projects);
}

export const PORTFOLIO_DATA: PortfolioData = {
  eyebrow: "Portfolio",
  heading: "Featured Projects",
  description:
    "Eksplorasi berbagai project yang telah saya kembangkan, mulai dari web development hingga UI/UX design, dengan fokus pada tampilan yang modern, responsif, dan user-friendly.",
  categories: ["Tampilkan Semua", "Design", "Website"],
  projects: sortProjectsByNewest(projects),
};

/**
 * Retrieves a specific project strictly by slug or ID.
 * Returns undefined if not found - NO default fallback data is used.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;

  return projects.find((p) => {
    return (
      p.slug === slug ||
      p.id === slug ||
      (slug === "smt-magang" && p.slug === "smt")
    );
  });
}

export default projects;
