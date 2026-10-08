# Practical UI Implementation Style Guide
## Dwi Ramdhona — Personal Portfolio

**Document Type:** Practical UI & Code Implementation Guide  
**Subject:** Dwi Ramdhona, S.Kom  
**Version:** 1.0.0  
**Companion File:** [DESIGN_SYSTEM.md](file:///d:/laragon/www/portfolio/dwi-ramdhona-portfolio/DESIGN_SYSTEM.md)  

---

## 1. General UI Rules
File ini adalah panduan praktis implementasi UI bagi developer dan AI coding agent dalam menulis kode CSS, Tailwind classes, dan komponen React TSX.
- **Konsistensi di Atas Inovasi Visual Sepihak:** Jangan membuat style baru secara tiba-tiba. Setiap elemen harus mengikuti pola terdefinisi.
- **Micro-Interactions yang Terkendali:** Setiap interaksi hover, active, dan focus harus memberikan umpan balik halus dengan durasi transisi `150ms - 250ms ease-out`.
- **Z-Index Layering yang Terstruktur:**
  - `z-0`: Global Background (Shape Grid).
  - `z-10`: Content Layer (Sections, Cards, Text).
  - `z-40`: Sticky Navigation Header.
  - `z-50`: Mobile Navigation Drawer / Modals.

---

## 2. Page Layout Rules
Setiap halaman portfolio disusun dalam struktur kontainer berjenjang:
```tsx
// Pattern Root Layout Structure:
<div className="relative min-h-screen bg-[#F7F9FC] text-[#1F2937] font-sans antialiased selection:bg-[#4F7FCF]/20 selection:text-[#315DA8]">
  {/* Layer 1: Background Global (1x mount) */}
  <ShapeGrid />

  {/* Layer 2: Main Wrapper */}
  <div className="relative z-10 flex min-h-screen flex-col justify-between">
    <Navbar />
    <main id="main-content" className="flex-1">
      {/* Sections 1 s/d 9 */}
    </main>
    <Footer />
  </div>
</div>
```

---

## 3. Section Layout
Setiap section portfolio wajib dibungkus dengan komponen layout standar agar padding dan spacing selalu seragam di seluruh halaman.

### Standar Section Wrapper:
```tsx
export function SectionWrapper({ id, children, className = "" }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 scroll-mt-20 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
```

### Standar Section Header:
```tsx
export function SectionHeading({ 
  badge, 
  title, 
  subtitle 
}: { 
  badge?: string; 
  title: string; 
  subtitle?: string; 
}) {
  return (
    <div className="mb-12 md:mb-16 max-w-3xl">
      {badge && (
        <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-wider text-[#4F7FCF]">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-[#64748B] sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

---

## 4. Typography Usage

### Aturan Penerapan Font:
- Font Heading: **Space Grotesk** (`font-heading` atau `font-['Space_Grotesk']`).
- Font Body/UI: **Manrope** (`font-sans` atau `font-['Manrope']`).

### Pola Kelas Tailwind:
- **Hero Title:** `font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] tracking-tight leading-[1.1]`
- **Section Heading:** `font-heading text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight`
- **Card Title:** `font-heading text-xl font-semibold text-[#1F2937]`
- **Body Text:** `font-sans text-base text-[#1F2937] leading-relaxed`
- **Secondary / Meta Text:** `font-sans text-sm text-[#64748B] leading-normal`
- **Labels / Badges:** `font-sans text-xs font-medium tracking-wide`

---

## 5. Color Usage

Terapkan kode warna hex sesuai peruntukan resminya:

```tsx
// Text Colors
const textPrimary = "text-[#1F2937]";    // Headings, body utama
const textSecondary = "text-[#64748B]";  // Subtitle, keterangan, waktu
const textAccent = "text-[#4F7FCF]";     // Link aktif, tag penegas

// Background Colors
const bgPage = "bg-[#F7F9FC]";           // Halaman utama
const bgCard = "bg-white";               // Kartu konten
const bgAccentSubtle = "bg-[#4F7FCF]/10";// Background badge/chip

// Border Colors
const borderDefault = "border-[#E2E8F0]";// Border pembatas & form
const borderHover = "hover:border-[#4F7FCF]/60";
const borderActive = "border-[#4F7FCF]";
```

---

## 6. Button Usage

Gunakan satu komponen terpusat `Button.tsx` dengan varian:

### 6.1 Primary CTA Button
```tsx
<Button variant="primary" onClick={handleClick}>
  Hubungi Saya
</Button>
```
*Styling internal:* `bg-[#4F7FCF] text-white hover:bg-[#315DA8] px-6 py-3 rounded-lg font-medium`

### 6.2 Secondary / Outline Button
```tsx
<Button variant="outline" href="#projects">
  Lihat Proyek
</Button>
```
*Styling internal:* `border border-[#E2E8F0] bg-white text-[#1F2937] hover:border-[#4F7FCF] hover:text-[#4F7FCF] hover:bg-[#F7F9FC]`

---

## 7. Card Usage

Gunakan `Card.tsx` atau specialized card (`ProjectCard.tsx`, `CertificateCard.tsx`):
```tsx
<div className="group relative flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4F7FCF]/50 hover:shadow-lg hover:shadow-[#315DA8]/5">
  {/* Card Content */}
</div>
```

---

## 8. Form Usage

Formulir kontak wajib mengikuti prinsip aksesibilitas dan perbedaan hierarki placeholder:
```tsx
<div className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-[#1F2937]">
      Nama Lengkap
    </label>
    <div className="mt-1.5">
      <input
        type="text"
        id="name"
        name="name"
        required
        placeholder="Masukkan nama lengkap Anda"
        className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#1F2937] placeholder:text-[#64748B]/50 transition-colors focus:border-[#4F7FCF] focus:outline-none focus:ring-2 focus:ring-[#4F7FCF]/30"
      />
    </div>
  </div>
</div>
```

---

## 9. Navigation Usage
- Navigasi desktop berupa daftar link horizontal dengan padding nyaman (`px-3 py-2`).
- Hover state: text berubah dari `#64748B` ke `#1F2937`.
- Active state: text berwarna `#4F7FCF`.
- Navigasi mobile: Tombol hamburger dengan `aria-expanded` dan menu drawer yang menutup otomatis saat link diklik.

---

## 10. Image Usage
- Gunakan selalu komponen `next/image`.
- Tetapkan dimensi `width` dan `height` atau gunakan properti `fill` bersama wrapper rasio aspek.
- Gambar proyek menggunakan format modern (WebP atau AVIF).
- Berikan atribut `alt` yang deskriptif.

---

## 11. Icon Usage
- Gunakan library **Lucide React** sebagai penyedia icon tunggal.
- Ukuran standar icon: Micro: `14px`, Button/Nav: `18px - 20px`, Feature Header: `24px`.
- Warna icon selalu disesuaikan dengan teks induk (`currentColor` atau `text-[#4F7FCF]`).

---

## 12. Reusable Component Usage

Selalu gunakan komponen pakai ulang dari direktori `components/ui/`:
```tsx
// Contoh Penerapan Reusable Components dalam Feature Section:
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExampleSection() {
  return (
    <Card className="p-6">
      <Badge variant="accent">Featured</Badge>
      <SectionHeading title="Judul Reusable" subtitle="Subtitle informatif" />
      <Button variant="primary">Aksi Utama</Button>
    </Card>
  );
}
```

---

## 13. Component Reuse Rules
1. **Search Before Create:** Cari komponen yang sudah ada sebelum menulis markup baru.
2. **Props Over Duplicate Files:** Jika antarmuka sama tetapi teks berbeda, oper via props.
3. **Variants Over New Components:** Gunakan varian prop (`variant="primary" | "secondary" | "outline"`).
4. **Single Source of Truth:** Jangan meng-hardcode styling button atau badge secara berulang di setiap file section.

---

## 14. Motion Usage
- Gunakan library **Motion** (Framer Motion).
- Batasi animasi pada entrance halus:
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
  ```
- Dukung `prefers-reduced-motion` untuk aksesibilitas.

---

## 15. Lanyard Usage (React Bits)
1. **Khusus Hero Section:** Lanyard adalah visual focal point khusus Hero. Dilarang diletakkan di section lain.
2. **Client Leaf Component:** Ditempatkan di file `components/hero/Lanyard.tsx` dengan `"use client"`.
3. **Dynamic Import di Hero:**
   ```tsx
   import dynamic from 'next/dynamic';
   const HeroLanyard = dynamic(() => import('./Lanyard'), {
     ssr: false,
     loading: () => <div className="h-[360px] w-full animate-pulse rounded-2xl bg-white/50" />
   });
   ```
4. **Mobile Touch Handling:** Berikan wrapper dengan `touch-action: pan-y` agar pengguna HP dapat scroll ke bawah dengan lancar.

---

## 16. Shape Grid Usage (React Bits)
1. **Satu Kali Mount Saja:** Diletakkan di root layout atau halaman utama sekali saja.
2. **Positioning & Opacity:**
   ```tsx
   <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50">
     <ShapeGrid />
   </div>
   ```
3. **Dilarang Dipasang Per Section:** Jangan menulis `<ShapeGrid />` di Hero, About, Projects, dsb.

---

## 17. Responsive Design Rules
- Mulai penulisan styling dari **Mobile-First** (tanpa prefix breakpoint), kemudian tambahkan `sm:`, `md:`, dan `lg:`.
- **Kolom Grid:**
  - Tech Stack: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
  - Projects: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - Certificates: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Hindari overflow horizontal (`overflow-x-hidden` pada root layout).

---

## 18. Accessibility Implementation Rules
- **Color Contrast:** Teks harus selalu kontras terhadap background.
- **Focus Rings:** Jangan pernah menulis `outline-none` tanpa menyertakan `focus-visible:ring-2 focus-visible:ring-[#4F7FCF]`.
- **Form Labels:** Setiap input wajib memiliki `<label htmlFor="id">` yang sesuai.
- **Keyboard Traversal:** Semua link dan button harus dapat ditab dan dieksekusi via keyboard.

---

## 19. Common Mistakes to Avoid
- ❌ **Duplikasi Shape Grid:** Meletakkan Shape Grid di setiap section.
- ❌ **Lanyard Bocor:** Menaruh Lanyard di About atau Footer.
- ❌ **Duplikasi Komponen Button/Card:** Membuat `PrimaryButton.tsx`, `SecondaryButton.tsx`, dsb.
- ❌ **Warna Hex Random:** Menulis `text-[#333333]` atau `bg-slate-900` alih-alih token resmi (`#1F2937`, `#F7F9FC`).
- ❌ **Font Random:** Menggunakan Inter, Roboto, atau font bawaan browser.
- ❌ **Client Component Berlebih:** Memberi `"use client"` di `app/page.tsx`.
- ❌ **Database Hallucination:** Mencoba membuat file koneksi Prisma, Supabase, atau SQL.

---

## 20. UI Review Checklist
Sebelum menyerahkan hasil pengerjaan antarmuka, periksa 8 hal berikut:
1. [ ] Apakah semua warna sesuai dengan 8 core tokens?
2. [ ] Apakah font heading adalah Space Grotesk dan font body adalah Manrope?
3. [ ] Apakah komponen menggunakan Reusable UI (`Button`, `Card`, `Badge`, `Input`) alih-alih markup duplikat?
4. [ ] Apakah Shape Grid hanya muncul 1 kali sebagai latar global?
5. [ ] Apakah Lanyard hanya ada di Hero Section dan terisolasi dengan dynamic import?
6. [ ] Apakah tata letak responsif di viewport mobile (375px), tablet (768px), dan desktop (1280px)?
7. [ ] Apakah status focus-visible berfungsi saat tombol `Tab` ditekan?
8. [ ] Apakah tidak ada error TypeScript atau peringatan console browser?
