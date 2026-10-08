# Dwi Ramdhona — Web Portfolio

Personal web portfolio dari **Dwi Ramdhona** — seorang **Web Developer & UI/UX Designer**. Website ini dibangun sebagai wadah representasi profesional dan personal branding untuk menampilkan profil, latar belakang pendidikan, minat, keahlian teknologi (*technology stack*), karya proyek/studi kasus portofolio, sertifikasi kompetensi, linimasa perjalanan karier, hingga formulir kontak interaktif.

Website ini dapat diakses secara publik di: [https://dwiramdhona.vercel.app](https://dwiramdhona.vercel.app)

---

## Overview

Website ini dirancang dengan standar web modern yang menggabungkan estetika antarmuka elegan, performa tinggi, dan pengalaman pengguna (*user experience*) yang intuitif:

- **Tujuan Website:** Menjadi representasi digital komprehensif atas kapabilitas teknis dan kreativitas desain Dwi Ramdhona dalam membangun produk web.
- **Fokus Keahlian:** Berpusat pada perpaduan **Web Development** (arsitektur web modern, frontend responsif, integrasi API) dan **UI/UX Design** (tata letak berbasis pengguna, hierarki visual, micro-interactions).
- **Personal Branding:** Mencerminkan dedikasi profesional dalam menghadirkan solusi digital yang fungsional, bersih, dan berorientasi pada detail.
- **User-Centric & Accessible:** Pengalaman browsing yang nyaman di seluruh perangkat (Mobile, Tablet, Desktop) dengan navigasi lancar, kontras warna yang nyaman, serta transisi tema gelap dan terang yang mulus.

---

## Features

Seluruh fitur yang tertera di bawah ini diimplementasikan secara aktif dalam repositori:

### 1. Interactive 3D & Visual Elements
- **3D Lanyard ID Card:** Simulasi kartu identitas 3D interaktif pada Hero Section menggunakan Three.js, React Three Fiber, dan engine fisika WASM Rapier (`@react-three/rapier`). Kartu dan tali dapat ditarik (*draggable*) dengan pergerakan tali fisika dinamis.
- **Glow Cursor:** Efek visual kursor bercahaya (*ambient glow*) yang mengikuti pergerakan pointer di desktop untuk menambah kedalaman antarmuka.
- **Gradient Text & Typing Animation:** Teks animasi rotasi dinamis (*Rotating Text*) dan tipografi gradien modern pada headline utama.

### 2. User Interface & Theming
- **Dark & Light Mode:** Dukungan penuh tema Gelap dan Terang dengan sinkronisasi preferensi sistem operasi, penyimpanan status di `localStorage`, serta mitigasi *flash of unstyled content* (FOUC).
- **Responsive Layout:** Tampilan yang sepenuhnya adaptif mulai dari smartphone (320px+), tablet, hingga layar desktop lebar dengan fluid typography dan grid modular.
- **Scroll Spy Navigation:** Navbar cerdas dengan indikator aktif yang otomatis mendeteksi posisi section saat pengguna menggulir halaman.

### 3. Content & Case Studies
- **About Me Section:** Informasi profil diri, latar belakang akademis (S1 Teknik Informatika, Universitas Dian Nuswantoro), serta fokus minat teknologi.
- **Technology Stack Showcase:** Tampilan kartu teknologi interaktif yang dikelompokkan berdasarkan kategori, dilengkapi adaptasi aset logo otomatis untuk mode terang dan gelap.
- **Portfolio Showcase & Filter:** Katalog proyek dengan filter kategori (*All, Website, Design*), preview badge teknologi, dan ringkasan singkat.
- **Dynamic Project Detail Pages (`/portfolio/[slug]`):** Halaman studi kasus lengkap untuk setiap proyek yang di-generate secara statis (*Static Site Generation / SSG*), mencakup:
  - Mockup showcase responsif (rasio terjaga tanpa cropping).
  - Pembahasan masalah (*Problem*) dan solusi teknis (*Solution*).
  - Fitur-fitur utama proyek (*Key Features*).
  - Rincian teknologi yang digunakan (*Technology Stack*).
  - **Screenshot Gallery & Lightbox:** Galeri tangkapan layar dengan fitur pembesaran gambar layar penuh menggunakan `yet-another-react-lightbox`.
- **Certificates Section:** Dokumentasi sertifikasi profesional dan pelatihan yang telah diraih, lengkap dengan modal pratinjau sertifikat.
- **Career & Education Timeline:** Linimasa riwayat pengalaman kerja (Freelance, Industri, Magang) dan riwayat pendidikan yang tersusun kronologis dari yang terbaru.

### 4. Communication & Security
- **Contact Form & Resend Integration:** Formulir pengiriman pesan langsung terhubung ke email melalui Resend API dengan notifikasi template HTML yang rapi.
- **Anti-Spam & Security Protection:** Dilengkapi dengan *honeypot trap* untuk menangkal bot otomatis, *in-memory sliding window rate limiter* berbasis IP, validasi input sisi server (*server-side validation*), serta Content Security Policy (CSP) dan HTTP Security Headers ketat.

### 5. SEO & Performance
- **Search Engine Optimization (SEO):** Konfigurasi `metadataBase`, URL kanonikal dinamis, Open Graph, Twitter Cards, serta structured data JSON-LD (`WebSite` & `Person` schema).
- **Sitemap & Robots:** Endpoint `sitemap.xml` dan `robots.txt` otomatis berbasis rute proyek dinamis.
- **Image Optimization:** Pemanfaatan format WebP modern dan komponen `next/image` untuk waktu muat yang optimal.

---

## Technology Stack

### Core & Framework
- **[Next.js 16](https://nextjs.org/)** — React framework dengan App Router, Turbopack, dan Static Site Generation (SSG).
- **[React 19](https://react.dev/)** — Library UI berbasis komponen terbaru.
- **[TypeScript 5](https://www.typescriptlang.org/)** — Type safety ketat di seluruh modul aplikasi.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Engine styling utility-first generasi terbaru.

### 3D Graphics & Physics
- **[Three.js](https://threejs.org/)** — Library WebGL 3D JavaScript.
- **[@react-three/fiber](https://r3f.docs.pmnd.rs/)** — React renderer deklaratif untuk Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)** — Helper dan komponen pendukung ekosistem R3F.
- **[@react-three/rapier](https://github.com/pmndrs/react-three-rapier)** — Engine fisika 3D berbasis WebAssembly (WASM).
- **[meshline](https://github.com/spite/THREE.MeshLine)** — Rendering garis dan pita kurva 3D untuk tali lanyard.

### Animation & UI Utilities
- **[Motion](https://motion.dev/)** — Library animasi deklaratif untuk React.
- **[GSAP](https://greensock.com/gsap/)** — GreenSock Animation Platform untuk transisi dan efek halus.
- **[Lucide React](https://lucide.dev/)** — Set ikon SVG modern dan konsisten.
- **[Yet Another React Lightbox](https://yet-another-react-lightbox.com/)** — Komponen penampil gambar modal & lightbox interaktif.

### Backend & Integrasi Layanan
- **[Resend](https://resend.com/)** — Layanan pengiriman email transaksional untuk formulir kontak.
- **Next.js Server Actions & Route Handlers** — Penanganan form submission dan endpoint API yang aman.

### Development & Build Tools
- **ESLint 9** — Analisis statis kualitas kode.
- **Node.js & npm** — Environment eksekusi dan package manager.
- **Git & GitHub** — Version control system.
- **Vercel** — Platform deployment dan hosting serverless.

---

## Project Structure

```text
dwi-ramdhona-portfolio/
├── app/                              # Next.js App Router
│   ├── actions/                      # Server Actions (Contact Form)
│   ├── api/                          # Route Handlers (API endpoint Resend)
│   │   └── contact/
│   ├── portfolio/                    # Dynamic Routes
│   │   └── [slug]/                   # Project Detail Pages (SSG)
│   ├── favicon.ico                   # Favicon
│   ├── globals.css                   # Global styling & Tailwind CSS v4 tokens
│   ├── layout.tsx                    # Root Layout, Fonts, SEO, JSON-LD Schema
│   ├── not-found.tsx                 # Halaman kustom 404
│   ├── page.tsx                      # Halaman Beranda Utama (Single Page)
│   ├── robots.ts                     # Dynamic robots.txt
│   └── sitemap.ts                    # Dynamic sitemap.xml
├── components/                       # Komponen Antarmuka Reusable
│   ├── about/                        # Komponen About & Pendidikan
│   ├── certificates/                 # Komponen Sertifikat & Modal Preview
│   ├── contact/                      # Komponen Kontak & Formulir Pesan
│   ├── hero/                         # Komponen Hero & Wrapper 3D Lanyard
│   ├── layout/                       # Navbar, Footer, Container, MobileNav
│   ├── projects/                     # Portfolio Grid & Halaman Detail Komponen
│   ├── providers/                    # Context Providers (ThemeProvider)
│   ├── tech-stack/                   # Komponen Grid Technology Stack
│   ├── timeline/                     # Komponen Riwayat Linimasa Karier
│   └── ui/                           # UI Primitives & Interactive Effects
│       ├── Button.tsx
│       ├── GlowCursor/
│       ├── GradientText/
│       ├── Lanyard/                  # 3D Lanyard Canvas, Rapier Band & Card
│       ├── LightboxModal.tsx
│       ├── MagicBento/
│       ├── TextType/
│       └── ThemeToggle.tsx
├── data/                             # Konten Statis Berbasis TypeScript
│   ├── about.ts                      # Data biografi, pendidikan, minat
│   ├── certificates.ts               # Data daftar sertifikat
│   ├── contact.ts                    # Data tautan media sosial & kontak
│   ├── navigation.ts                 # Data item menu navigasi
│   ├── projects.ts                   # Data 19 proyek portofolio lengkap
│   ├── tech-stack.ts                 # Data daftar teknologi
│   └── timeline.ts                   # Data riwayat linimasa pengalaman
├── lib/                              # Utility Functions & Template
│   └── email-template.ts             # Template HTML email pengiriman pesan
├── public/                           # Aset Statis Publik
│   └── assets/
│       ├── certificates/             # Gambar preview sertifikat
│       ├── lanyard/                  # Model card.glb, tekstur Lanyard
│       ├── portfolio/                # Gambar mockup proyek portofolio
│       └── techstack/                # Ikon & logo teknologi (Dark/Light)
├── next.config.ts                    # Konfigurasi Next.js (Security Headers, CSP)
├── package.json                      # Daftar dependency dan npm scripts
├── tsconfig.json                     # Konfigurasi TypeScript
└── README.md                         # Dokumentasi repositori
```

&copy; 2026 Dwi Ramdhona. All rights reserved.
