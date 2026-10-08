# Product Requirements Document (PRD)
## Dwi Ramdhona — Personal Portfolio

**Document Status:** Approved Specification  
**Owner / Subject:** Dwi Ramdhona, S.Kom  
**Date:** 24 September 2026 (Updated: 26 September 2026)  
**Version:** 1.0.0  
**Source of Truth:** `Brief_Portfolio_Dwi_Ramdhona.pdf`

---

## 1. Product Overview
Website ini adalah personal portfolio profesional milik **Dwi Ramdhona, S.Kom**, seorang programmer dan web developer. Website dirancang sebagai representasi identitas digital yang modern, minimalis, futuristik, bersih, interaktif, dan berorientasi teknologi. 

Platform ini berfungsi sebagai showcase karya, rekam jejak teknis, latar belakang pendidikan, minat bidang teknologi, serta kanal komunikasi langsung melalui formulir kontak tanpa bergantung pada infrastruktur backend yang kompleks, database, ataupun dashboard admin (CMS). Seluruh data portfolio dikelola secara statis/konfiguratif di dalam source code, disimpan di repository GitHub, dan dideploy secara otomatis menggunakan Vercel.

---

## 2. Background
Dalam industri teknologi informasi yang kompetitif, kehadiran digital profesional yang kredibel, cepat diakses, dan memiliki impresi visual yang kuat sangat penting. Kebanyakan web developer menggunakan template standar atau platform pihak ketiga yang sering kali generik, sarat overhead, lambat dimuat, atau membutuhkan biaya operasional bulanan (database cloud, CMS berbayar).

Dwi Ramdhona, S.Kom membutuhkan portfolio kustom yang:
1. Mencerminkan keahlian teknis modern dan cita rasa estetika visual tingkat tinggi.
2. Memadukan elemen visual interaktif 3D (React Bits Lanyard) dan ambient background (React Bits Shape Grid) tanpa mengorbankan performa ataupun aksesibilitas.
3. Memberikan kemudahan pemeliharaan konten secara langsung melalui Git tanpa beban pemeliharaan database atau panel admin.

---

## 3. Problem Statement
1. **Kurangnya Representasi Digital Terpadu:** Informasi profil profesional, proyek unggulan, sertifikasi, keahlian teknis, dan riwayat pendidikan masih terpisah-pisah di berbagai platform (LinkedIn, GitHub, CV statis).
2. **Over-Engineering pada Solusi Tradisional:** Banyak portfolio mengimplementasikan database relasional/CMS berbayar yang menambah latency, kompleksitas deployment, serta risiko kerentanan keamanan dan biaya bulanan.
3. **Keseimbangan Visual vs Performa:** Elemen interaktif canggih (seperti WebGL/3D Lanyard) kerap menurunkan performa (Core Web Vitals), lambat diakses di perangkat seluler, atau merusak navigasi keyboard.

---

## 4. Product Goals
1. **Membangun Personal Branding Kuat:** Menampilkan kredibilitas Dwi Ramdhona, S.Kom sebagai programmer/web developer yang kompeten, teliti, dan menguasai teknologi modern.
2. **Katalog Proyek & Kemampuan Teknis yang Komprehensif:** Menyajikan portfolio proyek interaktif dengan detail arsitektur, teknologi yang digunakan, serta tautan langsung ke demo/repositori.
3. **Pengalaman Pengguna Superior:** Menghasilkan website dengan skor performa tinggi, navigasi mulus, desain responsif (mobile, tablet, desktop), dan micro-interaction yang menyenangkan.
4. **Kanal Kontak Langsung yang Andal:** Memfasilitasi komunikasi dari recruiter, klien, atau kolaborator melalui form kontak tanpa database yang terhubung langsung ke email pribadi melalui Resend.
5. **Zero Maintenance & Cost-Efficient:** Mengeliminasi kebutuhan database dan server mandiri; memanfaatkan ekosistem Next.js, GitHub, Vercel, dan Resend free tier.

---

## 5. Target Users
1. **Technical Recruiters & HR Specialists:** Mencari ringkasan kualifikasi, riwayat pendidikan, sertifikat terverifikasi, dan kontak cepat.
2. **Engineering Managers & Tech Leads:** Menilai kualitas kode, arsitektur solusi, pemilihan tech stack, dan kedalaman teknis proyek yang dikerjakan.
3. **Klien Potensial & Rekan Kolaborator:** Mencari programmer terpercaya untuk proyek pembuatan aplikasi web modern.
4. **Peer Developers & Tech Community:** Menjadikan portfolio sebagai referensi implementasi modern web app (Next.js 16 + React 19 + React Bits).

---

## 6. User Needs
- **Aksesibilitas Cepat:** Halaman harus termuat instan (< 1.5 detik) tanpa layout shifting (CLS < 0.1).
- **Navigasi Intuitif:** Pengunjung dapat melompat ke section yang relevan dengan satu klik melalui sticky navigation.
- **Informasi Proyek Transparan:** Detail deskripsi, peran, tech stack, dan akses tautan live/source code.
- **Verifikasi Kredensial:** Kemudahan memverifikasi sertifikat keaslian melalui link eksternal.
- **Kanal Komunikasi Mudah:** Form kontak yang sederhana, bebas spam, dengan umpan balik visual instan saat pengiriman berhasil atau gagal.

---

## 7. Value Proposition
- **Modern & Futuristic Visual Identity:** Menggabungkan interaktivitas 3D Lanyard dan Shape Grid global berkelas industri teknologi tinggi.
- **High-Performance Architecture:** Didukung Next.js 16 App Router dengan React Server Components (RSC) secara default untuk meminimalkan beban JavaScript pada client.
- **Data Configuration Pattern:** Konten statis yang terstruktur rapi mempermudah pembaruan data tanpa risiko regresi kode.
- **Direct-to-Inbox Communication:** Transmisi pesan cepat dan aman menggunakan Server Actions terisolasi dan Resend API.

---

## 8. Scope
Proyek ini mencakup pengembangan website personal portfolio satu halaman (*single-page portfolio experience*) dengan struktur:
- Global Shape Grid Background (satu instance di tingkat root page container).
- Sticky Header & Responsive Navbar.
- Hero Section (termasuk visual 3D Lanyard dari React Bits).
- About Section.
- Education Section.
- Interests Section.
- Tech Stack Section.
- Projects / Portfolio Section.
- Certificates Section.
- Contact Section (Form Nama, Email, Pesan terhubung ke Resend).
- Footer Section.
- SEO Metadata & Open Graph tags.
- Desain responsif untuk Mobile (<768px), Tablet (768px - 1024px), dan Desktop (>1024px).
- Penerapan standar aksesibilitas WCAG 2.1 Level AA (kontras warna, navigasi keyboard, visible focus, ARIA labels).

---

## 9. Out of Scope
Hal-hal berikut secara eksplisit **DILARANG** dan **TIDAK TERMASUK** dalam ruang lingkup proyek:
- Database dalam bentuk apapun (PostgreSQL, MySQL, SQLite, MongoDB, Supabase, Prisma, dsb.).
- Dashboard Admin atau Content Management System (CMS) pihak ketiga (Sanity, Strapi, WordPress, dsb.).
- Sistem Autentikasi Pengguna (Login, Register, Session, JWT, OAuth, NextAuth, Clerk).
- Operasi Backend CRUD atau REST API kustom untuk manipulasi data konten.
- Blog engine / CMS dynamic routing.
- Sistem komentar publik atau forum diskusi.
- Custom domain setup pada tahap rilis awal (domain default: `dwi-ramdhona.vercel.app`).
- Multi-language / Internationalization (i18n) pada fase awal.

---

## 10. Core Features
1. **Interactive Global Canvas:** Shape Grid ambient background yang stabil di latar belakang seluruh halaman.
2. **Interactive 3D Hero Focal Point:** Lanyard physics simulation interaktif khusus pada Hero Section dengan fallback yang ringan.
3. **Structured Technical Showcase:** Pengelompokan Tech Stack berdasarkan kategori keahlian.
4. **Comprehensive Project Cards:** Kartu proyek responsif dengan thumbnail, badge kategori, sinopsis, tech stack chips, serta link demo & repositori.
5. **Verified Certification Gallery:** Rekam jejak pencapaian akademik dan profesional yang dilengkapi tautan verifikasi kredensial.
6. **Zero-Database Server Action Contact Form:** Form pengiriman pesan yang memvalidasi input di server dan meneruskan pesan langsung ke email penerima menggunakan Resend.

---

## 11. Page & Section Requirements

### 11.1 Navbar
- Bersifat fixed atau sticky di bagian atas dengan efek latar belakang subtle blur (*glassmorphism* lembut sesuai warna background #F7F9FC).
- Berisi logo/nama inisial "Dwi Ramdhona" dan link navigasi cepat ke setiap section (`#hero`, `#about`, `#education`, `#interests`, `#tech-stack`, `#projects`, `#certificates`, `#contact`).
- Tombol/Menu Hamburger pada tampilan mobile dengan transisi yang halus dan ramah aksesibilitas.
- Active state yang jelas saat section berada dalam viewport.

### 11.2 Hero Section
- **Identitas & Positioning:** Menampilkan nama lengkap "Dwi Ramdhona, S.Kom", gelar, dan positioning profesional sebagai Web Developer / Programmer.
- **Headline & Tagline:** Teks penjelas berorientasi teknologi yang kuat menggunakan font *Space Grotesk*.
- **Call-to-Action (CTA):** Tombol utama "Hubungi Saya" (mengarah ke `#contact`) dan tombol sekunder "Lihat Proyek" (mengarah ke `#projects`).
- **Lanyard 3D Component:** Diletakkan sebagai focal visual interaktif di sisi hero (desktop) atau terintegrasi secara proporsional (mobile/tablet).
- **Aturan Lanyard:** Hanya boleh muncul di Hero Section. Client component diisolasi secara ketat dan menggunakan dynamic loading (`next/dynamic` dengan ssr: false).

### 11.3 About Section
- Narasi ringkas profil profesional Dwi Ramdhona, S.Kom.
- Latar belakang pengalaman, etos kerja, filosofi problem-solving, dan fokus industri.
- Value proposition profesional yang ditawarkan kepada tim atau klien.

### 11.4 Education Section
- Menampilkan riwayat pendidikan formal yang relevan (Sarjana Komputer / S.Kom).
- Informasi institusi, periode kelulusan, dan highlight akademik/pencapaian.

### 11.5 Interests Section
- Bidang minat teknologi yang menunjang branding profesional (misal: Web Architecture, Modern Frontend, Cloud Deployment, UI/UX Engineering, System Optimization).
- Disajikan dalam bentuk kartu/pills informatif dengan ikon tematik.

### 11.6 Tech Stack Section
- Daftar bahasa pemrograman, framework, runtime, tools, dan platform yang dikuasai.
- Pengelompokan terstruktur (misal: Languages, Frontend, Backend/Utilities, Tools & DevOps).
- Menggunakan ikon yang konsisten (Lucide React) dan badge berdesain bersih.

### 11.7 Projects / Portfolio Section
- Grid proyek yang responsif.
- Setiap card memuat:
  - Thumbnail gambar berformat modern (WebP/AVIF) dengan aspect ratio terjaga.
  - Kategori proyek.
  - Judul proyek (*Space Grotesk*).
  - Deskripsi ringkas (*Manrope*).
  - Daftar teknologi yang digunakan (tags/badges).
  - Tombol/tautan akses ke Live Demo dan Source Code (GitHub) jika tersedia.

### 11.8 Certificates Section
- Showcase sertifikat kompetensi profesional, bootcamp, atau kejuaraan.
- Memuat judul sertifikat, penerbit (issuing organization), tanggal penerbitan, dan link verifikasi kredensial resmi bila ada.

### 11.9 Contact Section
- Pengantar komunikasi ramah dan profesional.
- Formulir dengan 3 field wajib:
  - **Nama Lengkap:** Input text valid.
  - **Email:** Input email berformat valid.
  - **Pesan:** Textarea pesan yang jelas.
- Indikator status (Idle, Loading/Submitting, Success, Error).
- Penanganan server-side validasi dan sanitasi data sebelum dikirimkan.

### 11.10 Footer Section
- Informasi hak cipta © 2026 Dwi Ramdhona, S.Kom.
- Tautan akun profesional (GitHub, LinkedIn, Email).
- Catatan teknologi pendukung (Built with Next.js & Tailwind CSS).

---

## 12. Contact Form Requirements
1. **Infrastruktur Tanpa Database:** Pesan tidak disimpan di database manapun.
2. **Mekanisme Transmisi:** Next.js Server Action (`sendContactEmail`).
3. **Layanan Pengiriman:** Resend API (Free Tier).
4. **Spesifikasi Email:**
   - **Target Email:** `ramdhona13@gmail.com`
   - **Pengirim (From) Tahap Awal:** `onboarding@resend.dev`
   - **Reply-To:** Diisi otomatis dengan alamat email pengunjung yang mengisi form.
   - **Subject:** `[Portfolio Contact] Pesan Baru dari {Nama Pengunjung}`
5. **Validasi Server-side:**
   - Nama: Wajib diisi, minimal 2 karakter, maksimal 100 karakter.
   - Email: Wajib diisi, format alamat email valid (RFC 5322), maksimal 150 karakter.
   - Pesan: Wajib diisi, minimal 10 karakter, maksimal 2000 karakter.
6. **Keamanan:**
   - API Key Resend disimpan secara rahasia di environment variable: `RESEND_API_KEY`.
   - Dilarang keras melakukan hardcoding API key atau mengeksposnya ke client bundle.
   - Rate limiting sederhana / anti-spam honeypot untuk mencegah abuse bot.

---

## 13. Responsive Requirements
- **Pendekatan Mobile-First:** Perancangan dimulai dari layar terkecil (360px) ke atas.
- **Breakpoints (Tailwind CSS 4):**
  - Mobile: `< 640px` (sm)
  - Small Tablet: `640px - 767px`
  - Tablet: `768px - 1023px` (md)
  - Desktop: `1024px - 1279px` (lg)
  - Large Desktop: `1280px+` (xl)
- **Komponen Kritis:**
  - Lanyard Hero: Pada layar mobile (<768px), canvas 3D disesuaikan skala dan tingginya agar tidak menghalangi headline, CTA, ataupun proses scrolling layar sentuh (touch interaction).
  - Navigasi: Beralih ke drawer / collapsible menu pada layar di bawah 768px.
  - Project Cards: Menyesuaikan dari 1 kolom (mobile) menjadi 2 atau 3 kolom (desktop).

---

## 14. Accessibility Requirements (A11y)
1. **WCAG 2.1 Level AA Compliance:**
   - Rasio kontras teks utama (`#1F2937`) terhadap background (`#F7F9FC`) minimal 4.5:1 (mencapai > 10:1).
   - Rasio kontras teks sekunder (`#64748B`) terhadap background memenuhi standar minimal 4.5:1.
   - Rasio kontras teks putih (`#FFFFFF`) di atas Primary Blue (`#4F7FCF`) dan Primary Dark (`#315DA8`) memenuhi standar.
2. **Keyboard Navigation:** Seluruh elemen interaktif (link, button, input) dapat diakses dengan tombol `Tab` dan dioperasikan dengan `Enter` / `Space`.
3. **Visible Focus State:** Dilarang menghilangkan outline fokus (`outline: none` tanpa pengganti). Wajib menyediakan focus ring kontras (`ring-2 ring-primary-blue`).
4. **Semantic Structure:** Menggunakan tag semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
5. **Reduced Motion:** Mendukung preferensi pengguna `prefers-reduced-motion: reduce` untuk menonaktifkan atau menyederhanakan animasi dan transisi.

---

## 15. Performance Requirements
1. **Core Web Vitals Target:**
   - **LCP (Largest Contentful Paint):** < 2.0s
   - **FID / INP (Interaction to Next Paint):** < 100ms
   - **CLS (Cumulative Layout Shift):** < 0.05
2. **Arsitektur Rendering:**
   - Seluruh halaman utama (`page.tsx`) dan section konten statis berstatus **React Server Components (RSC)**.
   - `use client` dibatasi hanya untuk komponen interaktif terisolasi (misal: Lanyard, Mobile Navbar toggle, Contact Form).
3. **Pengendalian Background Canvas:**
   - Global Shape Grid dirender satu kali di root layout/page wrapper. Dilarang merender ulang di setiap section.
4. **Optimasi Asset:**
   - Font Google (Space Grotesk & Manrope) diimpor melalui `next/font/google` dengan `display: 'swap'` dan subset `'latin'`.
   - Gambar diproses menggunakan komponen `next/image` dengan properti `sizes` yang tepat untuk mencegah overfetching.

---

## 16. Success Criteria
1. Website berhasil dipublikasikan di Vercel pada URL publik `dwi-ramdhona.vercel.app`.
2. Tidak ada error saat `npm run build` dan `npm run lint`.
3. Seluruh 10 section tampil lengkap sesuai hierarki brief.
4. Lanyard hanya tampil di Hero Section dan beroperasi lancar tanpa lag.
5. Shape Grid tampil mulus sebagai satu background terpadu dari atas hingga bawah halaman.
6. Form kontak berhasil mengirimkan email ke `ramdhona13@gmail.com` dengan header Reply-To terpasang valid.
7. Skor Google Lighthouse (Desktop): Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 95.

---

## 17. Technical Constraints
1. **Next.js 16 + React 19:** Harus mematuhi konvensi modern Next.js 16 App Router.
2. **Tailwind CSS 4:** Menggunakan arsitektur CSS engine modern Tailwind v4 tanpa konfigurasi usang.
3. **No Database & No CMS:** Semua data portofolio harus bersumber dari file konfigurasi statis (`data/*.ts`).
4. **Zero Secret Leaks:** Tidak ada API key atau kredensial yang masuk ke repository Git publik.

---

## 18. Deployment
- **Platform:** Vercel.
- **Repository:** GitHub (`main` branch as production).
- **CI/CD:** Otomatis memicu build Vercel setiap commit baru di-push ke branch `main`.
- **Environment Variables di Vercel:**
  - `RESEND_API_KEY`: API Key rahasia dari dashboard Resend.
- **Public URL Awal:** `https://dwi-ramdhona.vercel.app`.

---

## 19. Future Considerations (Post-MVP)
- Penambahan custom domain kustom (misal: `dwiramdhona.com` atau `dwiramdhona.dev`).
- Penambahan verifikasi domain sendiri di Resend untuk menggantikan sender default `onboarding@resend.dev`.
- Fitur multi-bahasa (ID / EN) jika target rekrutmen internasional bertambah.
- Mode gelap (Dark Mode) opsional jika dibutuhkan, dengan tetap mempertahankan rasio kontras tinggi dan palet warna selaras.
