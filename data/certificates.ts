export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export interface CertificatesData {
  eyebrow: string;
  heading: string;
  description: string;
  certificates: CertificateItem[];
}

export const CERTIFICATES_DATA: CertificatesData = {
  eyebrow: "CONTINUOUS LEARNING",
  heading: "Certificates",
  description:
    "Dokumentasi pembelajaran dan sertifikasi yang saya peroleh untuk terus mengembangkan kemampuan di bidang teknologi.",
  certificates: [
    // 1. Bimbingan Teknis Penanganan Insiden Siber Perguruan Tinggi
{
  id: "bimtek-penanganan-insiden-siber-2026",
  title: "Bimbingan Teknis Penanganan Insiden Siber Perguruan Tinggi Tahun 2026",
  issuer: "Badan Siber dan Sandi Negara (BSSN)",
  date: "2026",
  image:
    "/assets/certificates/Dwi Ramdhona - Universitas Dian Nuswantoro_sign_sign.webp",
  credentialUrl: "#",
},

// 2. Magang Kuliah Kerja Industri BTIK UDINUS
{
  id: "magang-kki-btik-udinus-2026",
  title: "Sertifikat Magang Kuliah Kerja Industri",
  issuer: "Biro Teknologi Informasi dan Komunikasi (BTIK) Universitas Dian Nuswantoro",
  date: "2026",
  image: "/assets/certificates/Sertifikat KKI BTIK.webp",
  credentialUrl: "#",
},

// 3. Sertifikasi Kompetensi BNSP - Web Developer
{
  id: "sertifikasi-kompetensi-web-developer-bnsp-2025",
  title: "Sertifikasi Kompetensi Web Developer",
  issuer: "BNSP - LSP Universitas Dian Nuswantoro",
  date: "2025",
  image: "/assets/certificates/Sertifikat BNSP.webp",
  credentialUrl: "#",
},

// 4. SQL for Beginners - BuildWithAngga
{
  id: "sql-for-beginners-mysql-database-design",
  title: "SQL for Beginners: Learn SQL using MySQL and Database Design",
  issuer: "BuildWithAngga",
  date: "2025",
  image:
    "/assets/certificates/sql-for-beginners-learn-sql-using-mysql-and-database-design-dwi-ramdhona.webp",
  credentialUrl: "https://buildwithangga.com/cek-sertifikat",
},

// 5. Laravel 11 & Spatie User Roles - BuildWithAngga
{
  id: "laravel-11-spatie-user-roles",
  title: "Laravel 11 & Spatie User Roles: Bikin Website Apotek Online",
  issuer: "BuildWithAngga",
  date: "2024",
  image:
    "/assets/certificates/laravel-11-spatie-user-roles-bikin-website-apotek-online-dwi-ramdhona.webp",
  credentialUrl: "https://buildwithangga.com/cek-sertifikat",
},

// 6. Figma to Elementor - BuildWithAngga
{
  id: "figma-to-elementor-low-code-development",
  title: "Figma to Elementor Low Code Development: Buat Website Menarik",
  issuer: "BuildWithAngga",
  date: "2024",
  image:
    "/assets/certificates/figma-to-elementor-low-code-development-buat-website-menarik-dwi-ramdhona.webp",
  credentialUrl: "https://buildwithangga.com/cek-sertifikat",
},

// 7. Complete UI Designer - BuildWithAngga
{
  id: "complete-ui-designer-visual-design-prototype-usability-test",
  title: "Complete UI Designer: Visual Design, Prototype, Usability Tes",
  issuer: "BuildWithAngga",
  date: "2024",
  image:
    "/assets/certificates/complete-ui-designervisual-design-prototype-usability-tes-dwi-ramdhona.webp",
  credentialUrl: "https://buildwithangga.com/cek-sertifikat",
},

// 8. Internship Seven Media Technology
{
  id: "internship-seven-media-technology-2022",
  title: "Sertifikat Internship",
  issuer: "CV. Seven Media Technology",
  date: "2022",
  image: "/assets/certificates/Sertifikat Instenship SMT.webp",
  credentialUrl: "#",
},
    
  ],
};
