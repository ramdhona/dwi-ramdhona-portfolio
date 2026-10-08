# System Architecture & Technical Specifications
## Dwi Ramdhona — Personal Portfolio

**Version:** 1.0.0  
**Framework:** Next.js 16 (App Router) + React 19 + TypeScript  
**Status:** Approved Technical Architecture  
**Date:** 24 September 2026 (Updated: 26 September 2026)  
**Subject:** Dwi Ramdhona, S.Kom  

---

## 1. High-Level Architecture Overview
Website ini dirancang sebagai aplikasi web modern performa tinggi berarsitektur **Jamstack / Static-First** yang memanfaatkan kapabilitas **Next.js 16 App Router** dan **React 19 Server Components**. 

Arsitektur sistem dibangun di atas prinsip:
- **Zero Database, Zero CMS, Zero Admin:** Konten portfolio bersifat statis dan tersimpan sebagai TypeScript data models di dalam source code repository.
- **Server-First by Default:** Seluruh halaman dan section utama dirender sebagai React Server Components (RSC) untuk meminimalkan ukuran bundle JavaScript yang dikirimkan ke peramban.
- **Isolasi Client Components:** Direktif `"use client"` hanya diaplikasikan pada leaf components yang secara eksplisit membutuhkan browser APIs, state interaktif (misal: mobile menu toggle, form submission), atau WebGL canvas (React Bits Lanyard).
- **Serverless Form Processing:** Pengiriman pesan contact form diproses melalui Next.js Server Actions yang berkomunikasi langsung dengan Resend API tanpa perantara database.

```
+-------------------------------------------------------------------------+
|                              USER BROWSER                               |
|                                                                         |
|  +------------------+  +---------------------------------------------+  |
|  | Global ShapeGrid |  | Content Layer (HTML + CSS from RSC)        |  |
|  | (1x Root Canvas) |  | - Navbar (Client Leaf: Mobile Toggle)       |  |
|  +------------------+  | - Hero (Client Leaf: Isolated 3D Lanyard)   |  |
|                        | - About / Education / Interests (Server)    |  |
|                        | - Tech Stack / Projects (Server)            |  |
|                        | - Certificates (Server)                     |  |
|                        | - Contact Form (Client Leaf: Form State)    |  |
|                        | - Footer (Server)                           |  |
|                        +---------------------------------------------+  |
+---------------------------------------|---------------------------------+
                                        | (Contact Form Submission via Server Action)
                                        v
+-------------------------------------------------------------------------+
|                     NEXT.JS 16 SERVERLESS RUNTIME                       |
|                                                                         |
|  Server Action: app/actions/contact.ts                                  |
|  1. Runtime Input Validation (Zod / TypeScript guard)                   |
|  2. Server Sanitization & Honeypot Spam Check                           |
|  3. Call Resend SDK (lib/resend.ts) using RESEND_API_KEY                |
+---------------------------------------|---------------------------------+
                                        | HTTPS / REST
                                        v
+-------------------------------------------------------------------------+
|                               RESEND API                                |
|  - Sender: onboarding@resend.dev                                        |
|  - Reply-To: user@example.com                                           |
|  - Destination: ramdhona13@gmail.com                                    |
+-------------------------------------------------------------------------+
```

---

## 2. Next.js 16 App Router Structure

Struktur App Router memanfaatkan sistem layout hierarkis:

```
app/
├── actions/
│   └── contact.ts          # Server Action untuk pemrosesan contact form
├── layout.tsx              # Root Layout: HTML tag, Fonts (next/font), Metadata, Global Shape Grid
├── page.tsx                # Single-Page Portfolio Assembly (Server Component)
├── globals.css             # Tailwind CSS 4 stylesheet & token variables
├── icon.svg / favicon.ico  # Branding favicon
└── robots.ts / sitemap.ts  # Dynamic SEO generator
```

### 2.1 Peran Root Layout (`layout.tsx`)
- Mengonfigurasi font **Space Grotesk** dan **Manrope** melalui `next/font/google` dengan variabel CSS (`--font-space-grotesk`, `--font-manrope`).
- Menyediakan metadata global (Title, Description, Open Graph, Twitter Cards).
- Menempatkan **Global Shape Grid Background** pada level paling luar sehingga canvas hanya di-mount satu kali.

### 2.2 Peran Root Page (`page.tsx`)
- Berfungsi sebagai orchestrator utama yang menyatukan seluruh section secara berurutan.
- Bertindak sebagai **Server Component**, memuat data statis dari folder `data/` dan meneruskannya sebagai props ke masing-masing komponen section.

---

## 3. Reusable Component Architecture & UI Hierarchy

Arsitektur antarmuka mengikuti pendekatan modular berjenjang (*Component-Based Architecture*):

```
Primitive UI (Button, Badge, Card, Input, Textarea)
      ↓
Reusable UI (ProjectCard, CertificateCard, SectionHeading, Container, FormField)
      ↓
Feature Component (HeroContent, ContactForm, TechCategory, MobileNav)
      ↓
Section (HeroSection, AboutSection, ProjectsSection, ContactSection)
      ↓
Page (Root Page)
```

### Prinsip Komponen Pakai Ulang:
1. **Reuse First:** Jika UI element digunakan lebih dari satu kali dan memiliki visual/behavior yang sama, gunakan reusable component.
2. **Props Over Duplication:** Jika komponen memiliki visual yang sama namun konten berbeda, gunakan typed props.
3. **Variants Over Separate Files:** Hindari membuat file terpisah untuk variasi visual (misal: gunakan satu `Button.tsx` dengan variant `primary`, `secondary`, `outline`, bukan membuat `PrimaryButton.tsx` dan `SecondaryButton.tsx`).
4. **Single Responsibility:** Setiap komponen memiliki satu tanggung jawab yang jelas.
5. **Strict Type Safety:** Semua props diketik dengan interface TypeScript murni tanpa `any`.

---

## 4. Component Organization

Struktur pengorganisasian komponen di direktori `components/`:

```
components/
├── ui/                        # Atomic reusable primitive components
│   ├── Button.tsx             # Variant: primary, secondary, outline, ghost
│   ├── Badge.tsx              # Pill/tag badge (tech, category)
│   ├── Card.tsx               # Reusable card container (hover elevation, borders)
│   ├── Input.tsx              # Reusable text/email input with label & error
│   ├── Textarea.tsx           # Reusable textarea with label & error
│   └── SectionHeading.tsx     # Reusable section title (Space Grotesk) & subtitle
│
├── layout/                    # Page structural layout components
│   ├── Container.tsx          # Max-width wrapper (max-w-7xl) & horizontal responsive padding
│   ├── Navbar.tsx             # Sticky navigation header
│   ├── MobileNav.tsx          # Client leaf component untuk drawer/hamburger
│   └── Footer.tsx             # Social links, copyright, tech attribution
│
├── background/
│   └── ShapeGrid.tsx          # React Bits Shape Grid (Single Global Instance)
│
├── hero/
│   ├── Hero.tsx               # Hero headline, positioning, CTA buttons
│   └── Lanyard.tsx            # Client leaf component (Dynamic import React Bits 3D Lanyard)
│
├── about/
│   └── About.tsx              # Profile summary, philosophy, value proposition
│
├── education/
│   ├── Education.tsx          # Section container
│   └── EducationItem.tsx      # Timeline / card riwayat pendidikan
│
├── interests/
│   └── Interests.tsx          # Minat teknologi & cards
│
├── tech-stack/
│   ├── TechStack.tsx          # Section container
│   └── TechCategory.tsx       # Grouping card per kategori teknologi
│
├── projects/
│   ├── Projects.tsx           # Showcase grid
│   └── ProjectCard.tsx        # Reusable project card (Thumbnail, tags, demo/github links)
│
├── certificates/
│   ├── Certificates.tsx       # Showcase grid
│   └── CertificateCard.tsx    # Reusable certificate card & verification links
│
└── contact/
    ├── Contact.tsx            # Section container & copy
    ├── ContactForm.tsx        # Client leaf component (State, action, feedback)
    └── FormField.tsx          # Reusable wrapper for label, input/textarea, and error message
```

*Catatan:* Komponen yang hanya digunakan oleh satu fitur spesifik diletakkan dekat dengan fitur tersebut untuk menjaga kohesi kode tanpa over-engineering.

---

## 5. Global Background Architecture (React Bits Shape Grid)

### Aturan Ketat & Pencegahan Regresi
- **Single Source Mount:** Komponen `ShapeGrid` hanya diletakkan **SATU KALI** di tingkat root container halaman.
- **CSS Stacking Context:**
  ```tsx
  <div className="relative min-h-screen bg-[#F7F9FC] text-[#1F2937]">
    {/* Global Background Layer (1x Instance) */}
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
      <ShapeGrid />
    </div>

    {/* Content Layer */}
    <div className="relative z-10 flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content">
        {/* All Sections */}
      </main>
      <Footer />
    </div>
  </div>
  ```
- **Larangan Keras:** Dilarang memasukkan komponen Shape Grid ke dalam `Hero`, `About`, `Projects`, atau section manapun. Tidak boleh terjadi instansiasi ganda (*duplicate rendering*).

---

## 6. Focal Visual Hero Architecture (React Bits Lanyard)

### Strategi Isolasi & Optimasi Performa
1. **Pemisahan Boundary:** Komponen Lanyard yang memanfaatkan WebGL / Three.js diisolasi ke dalam file terpisah `components/hero/Lanyard.tsx` dengan tanda `"use client"`.
2. **Dynamic Import with SSR Disabled:**
   ```tsx
   import dynamic from 'next/dynamic';

   const HeroLanyard = dynamic(
     () => import('@/components/hero/Lanyard'),
     { 
       ssr: false, 
       loading: () => <div className="h-[360px] w-full animate-pulse rounded-2xl bg-white/40" /> 
     }
   );
   ```
3. **Pengendalian Touch & Scroll:** Pada perangkat layar sentuh (<768px), interaksi canvas Lanyard dikonfigurasi agar tidak membajak (*hijack*) event gestur scroll pengguna (`touch-action: pan-y`).
4. **Pembatasan Section:** Lanyard hanya boleh dimuat pada Hero Section. Dilarang diletakkan pada section lain.

---

## 7. Client vs Server Component Boundaries

| Komponen | Tipe | Alasan Pemilihan |
| :--- | :--- | :--- |
| `app/layout.tsx` | **Server** | Optimasi font loading, streaming HTML dasar |
| `app/page.tsx` | **Server** | Mengalirkan HTML statis tanpa JS hydration overhead |
| `components/layout/Navbar.tsx` | **Server** | Render markup navigasi dasar |
| `components/layout/MobileNav.tsx` | **Client** | Membutuhkan event listener klik untuk open/close menu |
| `components/hero/Hero.tsx` | **Server** | Render heading, teks profil, dan anchor buttons |
| `components/hero/Lanyard.tsx` | **Client** | Render canvas 3D WebGL di browser |
| `components/about/*` | **Server** | Konten teks murni statis |
| `components/education/*` | **Server** | Konten statis terstruktur |
| `components/interests/*` | **Server** | Konten statis terstruktur |
| `components/tech-stack/*` | **Server** | List dan badge statis |
| `components/projects/*` | **Server** | Render card proyek dan gambar |
| `components/certificates/*` | **Server** | Render data sertifikat |
| `components/contact/ContactForm.tsx` | **Client** | Mengelola input user, `useActionState`, validasi instan, status loading/feedback |
| `components/layout/Footer.tsx` | **Server** | Tautan statis dan hak cipta |

---

## 8. Data & Content Architecture

Seluruh data portofolio dipisahkan secara ketat dari komponen UI dan disimpan di direktori `data/`:

```
data/
├── personal.ts      # Profil dasar, headline, social links, kontak
├── education.ts     # Riwayat pendidikan (S.Kom, institusi, tahun, detail)
├── interests.ts     # Minat teknologi & deskripsi ringkas
├── tech-stack.ts    # Kategori tools & bahasa pemrograman
├── projects.ts      # Daftar proyek, thumbnail, tech tags, live demo & repo URLs
└── certificates.ts  # Daftar sertifikat, issuing org, credential URL
```

### Keuntungan Arsitektur Data Ini:
- Type-safe dengan TypeScript Interface yang ketat.
- Mudah diperbarui tanpa perlu mengedit komponen JSX/TSX.
- Tidak membutuhkan koneksi database atau kueri runtime, menjaga response time secepat kilat.

---

## 9. Contact Form Data Flow & Resend Integration

### Alur Eksekusi:
1. **User Input:** Pengunjung mengisi field Nama, Email, dan Pesan pada `<ContactForm />`.
2. **Client Submission:** Form dikirimkan ke Next.js Server Action (`sendContactEmail`) menggunakan form submission / React 19 `useActionState`.
3. **Server Validation (`app/actions/contact.ts`):**
   - Sanitasi input dari script berbahaya.
   - Pengecekan field wajib, panjang teks, dan format email.
   - Pengecekan honeypot (field tersembunyi untuk menangkal bot spam).
4. **Resend Dispatch:**
   - Server Action menginisialisasi Resend client dengan `process.env.RESEND_API_KEY`.
   - Mengirimkan email dengan parameter:
     - `from`: `onboarding@resend.dev`
     - `to`: `ramdhona13@gmail.com`
     - `reply_to`: Email pengunjung
     - `subject`: `[Portfolio Contact] Pesan Baru dari ${name}`
     - `text` / `html`: Format pesan yang rapi dan mudah dibaca.
5. **Response Feedback:**
   - Server Action mengembalikan status `{ success: true }` atau `{ success: false, error: "Pesan error" }`.
   - Client Component menampilkan notifikasi sukses/gagal secara elegan tanpa refresh halaman.

---

## 10. CI/CD & Deployment Flow (GitHub → Vercel)

```
[ Local Development ]
         │
         ▼ git commit & git push
[ GitHub Repository (main) ]
         │
         ▼ Webhook Trigger
[ Vercel Build Pipeline ]
         │
         ├── 1. Install Dependencies (package-lock.json)
         ├── 2. Run TypeScript Type Check (`tsc --noEmit`)
         ├── 3. Run ESLint Validation (`next lint`)
         ├── 4. Next.js Production Build (`next build`)
         │
         ▼ Zero-Downtime Deployment
[ Production Edge Network ]
 URL: dwi-ramdhona.vercel.app
```

---

## 11. Naming Conventions & Code Standards
- **React Components:** Menggunakan **PascalCase** (`Button.tsx`, `ProjectCard.tsx`, `SectionHeading.tsx`).
- **Data & Utility Files:** Menggunakan **camelCase** atau lowercase (`projects.ts`, `personal.ts`, `resend.ts`, `utils.ts`).
- **Variables & Functions:** Menggunakan **camelCase** (`sendContactEmail`, `isMenuOpen`).
- **TypeScript Types & Interfaces:** Menggunakan **PascalCase** (`ProjectItem`, `CertificateItem`, `ButtonProps`).
- **Constants:** Menggunakan **UPPER_SNAKE_CASE** atau camelCase konsisten (`MAX_MESSAGE_LENGTH`, `NAV_LINKS`).

---

## 12. Dependency Strategy
- **Prinsip Minimalis:** Dilarang menginstal library pihak ketiga hanya karena tren.
- **Kriteria Penerimaan Dependency:**
  1. Benar-benar diperlukan untuk memenuhi requirement fungsional.
  2. Kompatibel penuh dengan Next.js 16 App Router dan React 19.
  3. Memiliki justifikasi teknis yang jelas.
  4. Tidak dapat digantikan secara sederhana oleh utilitas bawaan Next.js atau CSS standar.
