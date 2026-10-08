import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 bg-[var(--background)] transition-colors duration-200"
    >
      <Container className="text-center max-w-xl mx-auto">
        <p className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-[#2563EB] dark:text-[#60A5FA] uppercase mb-4">
          404 Error
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          Maaf, halaman atau proyek yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="md"
            pill
            href="/"
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-500/25 px-6 py-3 text-sm sm:text-base font-medium inline-flex items-center gap-2"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </Container>
    </main>
  );
}
