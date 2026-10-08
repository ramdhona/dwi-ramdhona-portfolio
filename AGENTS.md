<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Standard Operating Procedures (SOP) for AI Coding Agents
## Project: Dwi Ramdhona — Personal Portfolio

**Subject:** Dwi Ramdhona, S.Kom  
**Status:** Mandatory Agent Guidelines & Rules of Engagement  
**Source of Truth:** `Brief_Portfolio_Dwi_Ramdhona.pdf`  
**Governing Documents:**
- [PRD.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/PRD.md)
- [DESIGN_SYSTEM.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/DESIGN_SYSTEM.md)
- [ARCHITECTURE.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/ARCHITECTURE.md)
- [StyleGuide.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/StyleGuide.md)
- [Tasks.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/Tasks.md)

---

## 1. Prime Directives (Non-Negotiable Rules)

Setiap AI Coding Agent yang bekerja pada repositori ini **WAJIB** tunduk pada aturan operasional berikut tanpa pengecualian:

1. **Wajib Membaca Dokumentasi Sebelum Bertindak:**
   - Baca [PRD.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/PRD.md) sebelum memulai atau merancang fitur baru.
   - Baca [DESIGN_SYSTEM.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/DESIGN_SYSTEM.md) sebelum membuat atau memodifikasi komponen UI.
   - Baca [ARCHITECTURE.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/ARCHITECTURE.md) sebelum memodifikasi struktur file, data flow, atau boundaries.
   - Baca [StyleGuide.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/StyleGuide.md) sebelum menulis kelas CSS atau styling komponen.
   - Periksa [Tasks.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/Tasks.md) untuk mengetahui task yang sedang aktif dan memperbarui progresnya.

2. **Dilarang Menambahkan Database / CMS / Backend Kompleks:**
   - Dilarang membuat skema PostgreSQL, MySQL, SQLite, MongoDB, Supabase, Prisma, atau ORM lainnya.
   - Dilarang menginstal atau mengonfigurasi CMS pihak ketiga (Sanity, Strapi, Contentful, dsb.).
   - Dilarang membuat sistem autentikasi (NextAuth, Clerk, JWT, session cookies).
   - Dilarang membuat panel dashboard admin atau CRUD backend. Seluruh konten statis dikelola melalui folder `data/*.ts`.

3. **Integritas Background & Elemen 3D:**
   - **React Bits Shape Grid:** Hanya boleh ada **SATU INSTANCE** global di level root layout/page wrapper. Dilarang keras merender Shape Grid di dalam masing-masing section.
   - **React Bits Lanyard:** Hanya boleh ditempatkan di **Hero Section**. Dilarang menggunakan Lanyard di section lain. Lanyard harus diisolasi dalam client component terpisah dengan dynamic import (`ssr: false`).

4. **Kepatuhan Token Desain & Palet Warna:**
   - Gunakan HANYA token warna resmi:
     - Primary Blue: `#4F7FCF`
     - Primary Dark: `#315DA8`
     - Background: `#F7F9FC`
     - Accent Gold: `#D4AF6A`
     - Text Primary: `#1F2937`
     - Text Secondary: `#64748B`
     - Border: `#E2E8F0`
     - White: `#FFFFFF`
   - Dilarang menggunakan warna hex random atau Tailwind arbitrary colors yang tidak terdaftar di [DESIGN_SYSTEM.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/DESIGN_SYSTEM.md).

5. **Kepatuhan Tipografi:**
   - Hanya gunakan **Space Grotesk** (Heading / Display) dan **Manrope** (Body / UI / Form / Navigation).
   - Dilarang mengimpor atau menggunakan jenis font lain.

6. **Kepatuhan Server Components & Performa:**
   - Pertahankan Server Components sebagai default di Next.js 16 App Router.
   - Dilarang menambahkan `"use client"` di level halaman (`page.tsx`) atau komponen pembungkus besar. `"use client"` hanya untuk leaf components yang benar-benar membutuhkan state browser.

7. **Keamanan & Secrets:**
   - Dilarang keras menaruh API Key Resend di kode sumber.
   - Selalu gunakan environment variable `process.env.RESEND_API_KEY`.
   - Pastikan file `.env*.local` berada dalam `.gitignore`.

8. **Kualitas Kode & Type Safety:**
   - Wajib menggunakan TypeScript murni dengan tipe data yang ketat.
   - Hindari penggunaan tipe `any`. Gunakan interface atau generics yang tepat.
   - Penamaan React Components wajib PascalCase (`Button.tsx`, `ProjectCard.tsx`).
   - Hindari duplikasi kode, styling, atau abstraction berlebih.

---

## 2. Reusable Component SOP (Mandatory)

Sebelum membuat komponen UI baru, AI Coding Agent **WAJIB** mengeksekusi 5 langkah berikut:

```
[LANGKAH 1: SEARCH EXISTING COMPONENTS]
  └── Telusuri folder components/ui/, components/layout/, dan komponen yang sudah ada.

[LANGKAH 2: EVALUASI PENGGUNAAN ULANG]
  └── Tentukan apakah komponen yang ada sudah mampu memenuhi kebutuhan antarmuka.

[LANGKAH 3: PROPS UNTUK PERBEDAAN KONTEN]
  └── Jika komponen memiliki struktur visual sama namun beda isi, kirimkan konten via props.

[LANGKAH 4: VARIANTS UNTUK PERBEDAAN VISUAL]
  └── Jika komponen memiliki variasi styling (misal: primary vs outline), gunakan variant prop.

[LANGKAH 5: PEMBUATAN HANYA BILA BEDA RESPONSIBILITY]
  └── Hanya buat file komponen baru jika tanggung jawab fungsionalnya memang sepenuhnya berbeda.
```

### DILARANG KERAS MEMBUAT DUPLIKAT:
- ❌ Duplicate **Button** (dilarang membuat `PrimaryButton.tsx`, `SecondaryButton.tsx`, `OutlineButton.tsx`).
- ❌ Duplicate **Card** (gunakan `Card.tsx` atau specialized `ProjectCard.tsx`).
- ❌ Duplicate **Input / Textarea** (gunakan `Input.tsx` dan `Textarea.tsx`).
- ❌ Duplicate **Badge / Tag** (gunakan `Badge.tsx` dengan variant kategori/tech).
- ❌ Duplicate **Container** (gunakan `Container.tsx`).
- ❌ Duplicate **Section Heading** (gunakan `SectionHeading.tsx`).
- ❌ Duplicate **Form Field** (gunakan `FormField.tsx`).
- ❌ Duplicate **Navigation Component**.
- ❌ Copy-paste markup styling komponen yang sama ke berbagai section.

---

## 3. Pre-Coding Workflow Checklist

Sebelum menulis atau mengedit file kode apapun, AI Agent **WAJIB** mengeksekusi tahapan berikut:

1. **Baca Dokumentasi:** Periksa PRD.md, DESIGN_SYSTEM.md, ARCHITECTURE.md, dan StyleGuide.md.
2. **Pahami Requirement:** Pastikan batasan teknis dan ruang lingkup dipahami.
3. **Cek Existing Implementation:** Periksa komponen yang sudah ada di workspace.
4. **Cek Reusable Components:** Pastikan tidak membuat duplikasi komponen.
5. **Cek Dependency:** Pastikan hanya menggunakan library yang telah disetujui.
6. **Rancang Rencana Perubahan:** Tentukan struktur file dan boundary yang rapi.
7. **Baru Implementasi:** Tulis kode yang semantik, type-safe, dan modular.

---

## 4. Post-Coding Verification Checklist

Setelah melakukan perubahan kode, AI Agent **WAJIB** melakukan validasi sebelum menyatakan task selesai:

1. **TypeScript Check:** Jalankan `tsc --noEmit` untuk memastikan nol error tipe data.
2. **ESLint Check:** Jalankan `npm run lint` untuk memastikan nol pelanggaran linting.
3. **Build Check:** Pastikan `npm run build` berhasil tanpa kendala prerendering.
4. **Responsive Verification:** Uji pada resolusi mobile (360px), tablet (768px), dan desktop (1280px).
5. **Accessibility Check:**
   - Form inputs memiliki `<label>` terkait.
   - Tombol dan tautan memiliki accessible name.
   - Visible focus ring berfungsi via keyboard traversal.
   - Kontras warna memenuhi standar WCAG AA.
6. **Design Consistency:** Pastikan warna, spacing, dan font sesuai token resmi.
7. **Component Reuse Check:** Pastikan tidak ada markup UI yang terduplikasi.
8. **Update Task Progress:** Perbarui checklist di [Tasks.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/Tasks.md) dengan menandai `[x]`.

---

## 5. Conflict Resolution Protocol

Jika terdapat instruksi pengguna atau prompt yang tampak bertentangan dengan dokumentasi resmi:
1. **Identifikasi Konflik:** Tentukan bagian brief atau spesifikasi mana yang dilanggar.
2. **Jelaskan Konsekuensi:** Sampaikan secara sopan risiko teknis, performa, atau inkonsistensi yang ditimbulkan.
3. **Konfirmasi Sebelum Mengubah:** Jangan pernah melakukan *silent override* pada arsitektur atau design token.

---

## 6. Summary Table: What to Do vs What NEVER to Do

| Aspek | ✅ AI Agent WAJIB Lakukan | ❌ AI Agent DILARANG KERAS Lakukan |
| :--- | :--- | :--- |
| **Arsitektur** | Server Components default, reusable primitives di `components/ui/` | Menjadikan root page `"use client"`, over-engineering |
| **Komponen** | Cek existing component, gunakan props/variant | Buat file duplicate button/card, copy-paste markup |
| **Data** | Simpan di `data/*.ts` terstruktur dengan TypeScript types | Buat database, ORM, koneksi SQL/NoSQL, CMS, admin |
| **Background** | 1 instance `ShapeGrid` di root layout | Render Shape Grid berulang di tiap section |
| **Hero 3D** | Lanyard via dynamic import khusus di Hero | Pasang Lanyard di section lain, render di server |
| **Form** | Server Action + Resend API + validasi server | Simpan pesan ke database, hardcode API key |
| **Styling** | Tailwind CSS 4 dengan token resmi di [DESIGN_SYSTEM.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/DESIGN_SYSTEM.md) | Warna hex acak, font selain Space Grotesk & Manrope |
| **Aksesibilitas** | Navigasi keyboard, visible focus, ARIA labels | `outline: none` tanpa ring, low contrast colors |
| **Dependencies** | Gunakan package yang ditentukan dalam brief | Install library tambahan tanpa justifikasi teknis |
