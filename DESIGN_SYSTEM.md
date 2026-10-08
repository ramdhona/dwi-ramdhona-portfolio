# Design System Specification
## Dwi Ramdhona — Personal Portfolio

**Version:** 1.0.0  
**Status:** Single Source of Truth for Visual Design & UI Tokens  
**Approved Date:** 24 September 2026 (Updated: 26 September 2026)  
**Subject:** Dwi Ramdhona, S.Kom  

---

## 1. Design Philosophy
Desain antarmuka personal portfolio Dwi Ramdhona berlandaskan tujuh pilar utama:
1. **Modern & Futuristic:** Mengintegrasikan geometri bersih dengan aksen visual interaktif teknologi tinggi.
2. **Minimal & Clean:** Mengeliminasi elemen visual dekoratif yang tidak fungsional; setiap elemen memiliki tujuan komunikasi yang jelas.
3. **Spacious & Breathable:** Ruang negatif (*whitespace*) yang lapang untuk memberi kenyamanan membaca dan fokus hierarki.
4. **Technology-Oriented:** Merefleksikan presisi teknik, kecermatan kode, dan standar tinggi rekayasa web modern.
5. **Interactive & Alive:** Animasi halus dan micro-interaction yang responsif untuk meningkatkan *engagement* pengguna tanpa mendistraksi.
6. **Controlled Motion:** Gerakan visual hadir sebagai penambah nilai (*enhancement*), bukan pengganti fungsi dasar antarmuka (*usability*).
7. **Accessible for Everyone:** Aksesibilitas inklusif (kontras tinggi, navigasi keyboard, status fokus nyata) sebagai standar fundamental.

---

## 2. Color Tokens

### 2.1 Core Palette
Palet warna utama adalah identitas visual yang mutlak. Dilarang membuat warna baru di luar token yang telah ditentukan.

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| `color-primary-blue` | `#4F7FCF` | Main accent, primary CTA buttons, active links, active interactive state |
| `color-primary-dark` | `#315DA8` | Heading accent jika diperlukan, hover state on primary buttons, strong emphasis, dark accent |
| `color-background` | `#F7F9FC` | Main page background, outer canvas surface background |
| `color-accent-gold` | `#D4AF6A` | Micro-highlights, special achievements badge, decorative technical accents, limited emphasis |
| `color-text-primary` | `#1F2937` | Headings, titles, high-contrast readable primary body text |
| `color-text-secondary` | `#64748B` | Subtitles, metadata, supporting text |
| `color-border` | `#E2E8F0` | Card borders, form inputs outline, structural dividers, subtle outlines |
| `color-white` | `#FFFFFF` | Card surfaces, container cards, modal backgrounds, contrast elevated areas |

### 2.2 Semantic & State Colors (Subtle & Restrained)
Digunakan khusus untuk memberikan indikasi status pada interaksi form tanpa mengganggu identitas visual utama:
- **Success (Green Subtle):** Text `#15803D`, Surface `#F0FDF4`, Border `#BBF7D0`
- **Error (Red Subtle):** Text `#B91C1C`, Surface `#FEF2F2`, Border `#FECACA`
- **Focus Ring:** `#4F7FCF` dengan opacity ring 50% (`rgba(79, 127, 207, 0.5)`)

---

## 3. Typography

Portfolio menggunakan kombinasi dua font Google Fonts terpilih:

### 3.1 Space Grotesk
- **Peran:** Hero heading, Display text, Section heading, Major heading, Important visual typography.
- **Karakteristik:** Geometrik, berani, modern, terinspirasi tipografi teknologi & sains komputer.
- **Weights Digunakan:** 
  - `Bold` (700): Hero headline, Display title.
  - `SemiBold` (600): Section headings, Card titles.

### 3.2 Manrope
- **Peran:** Body text, Navigation, Label, Button, Form, Metadata, Supporting text, Placeholder.
- **Karakteristik:** Sangat mudah dibaca (*high readability*), netral, ramah, proporsi x-height yang seimbang.
- **Weights Digunakan:**
  - `Medium` (500): Navigasi, Button labels, Form labels, Tags.
  - `Regular` (400): Paragraf deskripsi panjang, secondary supporting text.
  - `SemiBold` (600): Emphasized body text, navigasi aktif.

---

## 4. Typography Scale

Sistem tipografi menggunakan skala modular dengan line-height yang nyaman untuk dibaca:

| Token / Role | Font Family | Size (px / rem) | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | Space Grotesk | `48px - 64px` (`3rem - 4rem`) | 700 (Bold) | `1.1` | `-0.02em` |
| **H1 (Section Title)** | Space Grotesk | `32px - 40px` (`2rem - 2.5rem`) | 700 (Bold) | `1.2` | `-0.01em` |
| **H2 (Subsection Title)** | Space Grotesk | `24px - 28px` (`1.5rem - 1.75rem`) | 600 (SemiBold) | `1.25` | `0` |
| **H3 (Card Title)** | Space Grotesk | `18px - 20px` (`1.125rem - 1.25rem`) | 600 (SemiBold) | `1.3` | `0` |
| **Lead / Subtitle** | Manrope | `18px - 20px` (`1.125rem - 1.25rem`) | 400 (Regular) | `1.6` | `0` |
| **Body (Default)** | Manrope | `16px` (`1rem`) | 400 (Regular) | `1.65` | `0` |
| **Body Small** | Manrope | `14px` (`0.875rem`) | 400 / 500 | `1.5` | `0` |
| **Navigation / CTA** | Manrope | `14px - 16px` (`0.875rem - 1rem`) | 500 / 600 | `1.0` | `0.01em` |
| **Caption / Badge** | Manrope | `12px` (`0.75rem`) | 500 (Medium) | `1.4` | `0.02em` |

---

## 5. Spacing System
Menggunakan skala 4-point / 8-point base grid untuk konsistensi ritme vertikal dan horizontal:

- `space-1`: `4px` (0.25rem) — micro gaps antar ikon dan teks.
- `space-2`: `8px` (0.5rem) — badge padding vertikal, tight gap.
- `space-3`: `12px` (0.75rem) — badge padding horizontal, input internal vertical padding.
- `space-4`: `16px` (1rem) — default padding elemen kecil, gap standar.
- `space-6`: `24px` (1.5rem) — card internal padding, layout gap sedang.
- `space-8`: `32px` (2rem) — card large padding, sub-section spacing.
- `space-12`: `48px` (3rem) — section content separator.
- `space-16`: `64px` (4rem) — mobile section vertical padding (`py-16`).
- `space-24`: `96px` (6rem) — desktop section vertical padding (`py-24`).
- `space-32`: `128px` (8rem) — hero top/bottom spacing.

---

## 6. Container System
Menjaga keterbacaan agar layout tidak melebar tanpa batas (*unbounded wide*):
- **Maximum Content Width:** `max-w-7xl` (`1280px`).
- **Text / Form Content Width:** `max-w-3xl` (`768px`) atau `max-w-4xl` (`896px`) untuk kenyamanan membaca.
- **Horizontal Page Padding:**
  - Mobile (<640px): `px-4` (16px)
  - Tablet (640px - 1024px): `px-6` (24px)
  - Desktop (>1024px): `px-8` (32px)

---

## 7. Border Radius
Menghadirkan kesan modern, ramah (*approachable*), dan presisi:
- `radius-sm`: `6px` (0.375rem) — tag kecil, status badge, code snippet.
- `radius-md`: `10px` (0.625rem) — form inputs, tombol standar.
- `radius-lg`: `16px` (1rem) — kartu portofolio, kartu sertifikat, kartu section.
- `radius-xl`: `24px` (1.5rem) — modal container, highlighted feature box.
- `radius-full`: `9999px` — pills, badge kategori, avatar thumbnail, floating nav capsule.

---

## 8. Border System
Gaya garis tepi yang halus (*subtle borders*) untuk memisahkan bidang tanpa kontras yang keras:
- **Default Border Width:** `1px`.
- **Default Border Color:** `#E2E8F0` (`color-border`).
- **Interactive Hover Border:** `#4F7FCF` (dengan opacity transisi) atau `#CBD5E1`.
- **Active / Focus Border:** `2px solid #4F7FCF`.

---

## 9. Shadows (Depth & Elevation)
Bayangan lembut (*soft surfaces*) berkarakter kontemporer:
- **Elevation-0 (Flat):** `none` (default card dengan 1px border `#E2E8F0`).
- **Elevation-1 (Subtle):** `0 2px 4px -1px rgba(31, 41, 55, 0.04), 0 1px 2px -1px rgba(31, 41, 55, 0.03)` (Card default).
- **Elevation-2 (Hover / Elevated):** `0 10px 25px -3px rgba(49, 93, 168, 0.08), 0 4px 6px -2px rgba(31, 41, 55, 0.04)` (Card hover & active state).
- **Elevation-Glass:** Efek glassmorphism halus pada navbar: `backdrop-blur-md bg-[#F7F9FC]/80 border-b border-[#E2E8F0]/80`.

---

## 10. Button System
Komponen Button dibuat tunggal dan terpusat (`Button.tsx`) dengan varian visual yang dikontrol via props:

### 10.1 Primary Button (CTA)
- **Background:** `#4F7FCF` (`color-primary-blue`)
- **Text:** `#FFFFFF` (`color-white`) — Manrope Medium/SemiBold
- **Hover State:** Background berganti ke `#315DA8` (`color-primary-dark`) dengan transisi 200ms ease.
- **Active State:** Scale down halus (`scale-[0.98]`).
- **Radius:** `radius-md` (10px).
- **Padding:** `px-6 py-3` (14px 24px).

### 10.2 Secondary / Outline Button
- **Background:** `#FFFFFF` (`color-white`) atau Transparan
- **Border:** `1px solid #E2E8F0`
- **Text:** `#1F2937` (`color-text-primary`) — Manrope Medium
- **Hover State:** Border `#4F7FCF`, Text `#4F7FCF`, Background `#F7F9FC`.
- **Padding:** `px-6 py-3`.

### 10.3 Ghost / Text Button
- **Background:** Transparan
- **Text:** `#4F7FCF`
- **Hover State:** Text `#315DA8`, Underline subtle.

---

## 11. Input & Form System
Formulir dirancang bersih, lapang, dan memiliki diferensiasi hierarki visual yang jelas:
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E2E8F0`
- **Radius:** `10px`
- **Padding:** `12px 16px`
- **Typography:** Manrope Regular (`16px` untuk mencegah auto-zoom di iOS safari).
- **Text Input Color:** `#1F2937`
- **Placeholder Style:** Wajib berbeda dari teks aktif menggunakan `#64748B` dengan opacity `50%` atau font weight Regular (`text-secondary/50`).
- **Focus State:** `outline-none ring-2 ring-[#4F7FCF] border-[#4F7FCF]`.
- **Validation State:**
  - Valid: Border `#E2E8F0`.
  - Error: Border `#B91C1C` dan pesan teks error kecil di bawah field (`text-xs text-red-600`).

---

## 12. Card System
Komponen Card dirancang terpusat (`Card.tsx` atau specialized like `ProjectCard.tsx`):
- **Background:** `#FFFFFF` (`color-white`)
- **Border:** `1px solid #E2E8F0`
- **Radius:** `16px` (`radius-lg`)
- **Padding:** `24px` (`p-6`) pada desktop, `20px` (`p-5`) pada mobile.
- **Hover Interaction:** Subtle elevation lift (`translate-y-[-2px]` atau `translate-y-[-4px]`), penambahan shadow `#315DA8/10`, dan aksen border `#4F7FCF/50`.

---

## 13. Badge & Tag System
Digunakan untuk kategori project, status sertifikat, dan tech stack:
- **Style Default:** Background `#F7F9FC`, Border `1px solid #E2E8F0`, Text `#315DA8` (Manrope Medium, `12px`).
- **Style Highlight / Accent:** Background `#D4AF6A/15`, Border `1px solid #D4AF6A/30`, Text `#926315` (Gold tone).
- **Padding:** `px-3 py-1` (4px 12px), Radius: `radius-full` (`rounded-full`).

---

## 14. Link System
- **Inline Link:** Menggunakan `#4F7FCF` dengan underline transisi saat hover ke `#315DA8`.
- **Nav Link:** Menggunakan `#64748B` (Text Secondary) saat idle, bertransisi ke `#1F2937` saat hover, dan `#4F7FCF` saat active section.

---

## 15. Navigation System
- **Floating / Sticky Header:** Tinggi `64px - 72px`, posisi `sticky top-0 z-40`.
- **Backdrop:** Glassmorphism halus (`bg-[#F7F9FC]/80 backdrop-blur-md border-b border-[#E2E8F0]/80`).
- **Mobile Menu:** Collapsible accordion atau slide-over drawer yang terisolasi dengan aksesibilitas ARIA attributes (`aria-expanded`, `aria-label`).

---

## 16. Section System
Setiap section mengikuti pola tata letak yang seragam:
1. **Section Badge (Opsional):** Kategori kecil di atas judul (misal: "PORTFOLIO", "ABOUT ME") dalam Manrope SemiBold Uppercase dengan warna `#4F7FCF`.
2. **Section Title:** Space Grotesk Bold (`text-3xl md:text-4xl text-[#1F2937]`).
3. **Section Subtitle:** Manrope Regular (`text-base md:text-lg text-[#64748B] max-w-2xl`).
4. **Section Spacing:** Jarak vertikal `py-16 md:py-24` untuk menjaga ritme nafas halaman.

---

## 17. Background System (Shape Grid)
- **Single Global Instance:** Shape Grid dari React Bits hanya diinstansiasi **SATU KALI** di tingkat root container halaman.
- **Positioning:** Berada pada layer background di belakang konten (`fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50`).
- **DILARANG:** Merender Shape Grid di dalam Hero, di dalam About, di dalam Projects, atau di section manapun secara terpisah.

---

## 18. Reusable Component System
Arsitektur UI dibangun berdasarkan prinsip komponen pakai ulang (*Reusable Component Architecture*):
- **Hirarki Komponen:**
  ```
  Primitive UI (Button, Badge, Input, Card)
  ↓
  Reusable UI (ProjectCard, CertificateCard, FormField, SectionHeading)
  ↓
  Feature Component (HeroContent, ContactForm, TechCategory)
  ↓
  Section (Hero, Projects, Contact)
  ↓
  Page (Root Page)
  ```
- **Aturan Varian vs Komponen Baru:**
  - Jika elemen memiliki visual/perilaku dasar sama namun peran berbeda, gunakan **props/variants** (misal: `<Button variant="primary">`, `<Button variant="secondary">`, `<Button variant="outline">`).
  - Dilarang membuat file duplikat seperti `PrimaryButton.tsx`, `SecondaryButton.tsx`, atau `OutlineButton.tsx`.
- **Sentralisasi Design Token:** Seluruh komponen pakai ulang wajib terikat langsung pada design token resmi. Perubahan pada token akan langsung tersinkronisasi ke seluruh antarmuka.

---

## 19. Motion Principles
Animasi dibangun menggunakan library `Motion` (Framer Motion) dengan prinsip:
1. **Subtle & Purposeful:** Durasi antara `200ms` hingga `400ms`.
2. **Easing Natural:** Menggunakan cubic-bezier `easeOut` atau `easeInOut` (`[0.25, 0.1, 0.25, 1.0]`).
3. **Fade & Slight Drift:** Animasi kemunculan section berupa fade in dengan pergeseran vertikal halus `y: [12, 0]`.
4. **Reduced Motion:** Wajib menyertakan fallback untuk pengguna dengan `prefers-reduced-motion: reduce`. Animasi dinonaktifkan atau diganti dengan transisi opacity instan.

---

## 20. Responsive Breakpoints

| Breakpoint | Nilai Pixel | Deskripsi Perangkat |
| :--- | :--- | :--- |
| `sm` | `640px` | Large phones, portrait mini-tablets |
| `md` | `768px` | Tablets, iPad portrait, foldable screens |
| `lg` | `1024px` | Small laptops, iPad Pro landscape |
| `xl` | `1280px` | Standard desktops, large laptops |
| `2xl` | `1536px` | Ultra-wide monitors |

---

## 21. Accessibility Rules (A11y)
1. **Contrast Ratio:** Teks utama terhadap background harus melebihi rasio 7:1 (standar AAA) dan teks sekunder minimal 4.5:1 (standar AA).
2. **Keyboard Navigation:** Setiap interaksi mouse wajib memiliki padanan keyboard yang setara.
3. **Focus Indicators:** Dilarang menggunakan `outline: none` tanpa menyediakan `focus-visible:ring-2 focus-visible:ring-[#4F7FCF]`.
4. **Touch Target Size:** Tombol dan link pada tampilan mobile memiliki ukuran area sentuh minimal `44px x 44px`.
5. **Alt Text:** Semua elemen gambar wajib memiliki deskripsi alternatif (`alt`) yang bermakna.

---

## 22. Do & Don't Guidelines

### DO:
- ✅ Selalu gunakan 8 token warna resmi (`#4F7FCF`, `#315DA8`, `#F7F9FC`, `#D4AF6A`, `#1F2937`, `#64748B`, `#E2E8F0`, `#FFFFFF`).
- ✅ Gunakan `Space Grotesk` untuk heading dan `Manrope` untuk teks isi/form/navigasi/tombol.
- ✅ Gunakan arsitektur komponen pakai ulang (Reusable UI) dengan variant props.
- ✅ Pastikan Shape Grid hanya di-mount satu kali sebagai global background.
- ✅ Letakkan visual 3D Lanyard hanya di Hero Section.
- ✅ Pisahkan data konten ke dalam file terstruktur di folder `data/`.

### DON'T:
- ❌ Dilarang membuat warna hex baru atau arbitrary Tailwind colors di luar token resmi.
- ❌ Dilarang membuat komponen duplikat (misal `PrimaryButton.tsx`, `SecondaryButton.tsx`, atau copy-paste markup Card).
- ❌ Dilarang menduplikasi Shape Grid di tiap section.
- ❌ Dilarang menggunakan Lanyard di luar Hero Section.
- ❌ Dilarang menggunakan font acak selain Space Grotesk dan Manrope.
- ❌ Dilarang menghapus focus ring pada input atau tombol.
- ❌ Dilarang membuat animasi berkecepatan tinggi atau berlebihan yang mengganggu proses membaca.
