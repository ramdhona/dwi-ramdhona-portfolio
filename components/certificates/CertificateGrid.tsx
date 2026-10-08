"use client";

import React, { useState } from "react";
import { CertificateItem } from "@/data/certificates";
import { CertificateCard } from "@/components/certificates/CertificateCard";
import { Button } from "@/components/ui/Button";
import { LightboxModal } from "@/components/ui/LightboxModal";

interface CertificateGridProps {
  certificates: CertificateItem[];
}

const INITIAL_CERTIFICATES = 6;
const LOAD_MORE_COUNT = 6;

export function CertificateGrid({ certificates }: CertificateGridProps) {
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_CERTIFICATES);
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  const visibleCertificates = certificates.slice(0, visibleCount);
  const hasMore = visibleCount < certificates.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, certificates.length)
    );
  };

  const slides = certificates.map((certificate) => ({
    src: certificate.image,
    alt: certificate.title,
  }));

  return (
    <div>
      {/* 2-Column Mobile, 3-Column Desktop Certificates Grid */}
      <div className="interactive-card-grid grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 items-stretch pt-2 pb-3">
        {visibleCertificates.map((certificate, index) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onClick={() => setSelectedCertificate(index)}
          />
        ))}
      </div>

      {/* Bottom Button: Lihat Selengkapnya (Conditional: only when hasMore is true) */}
      {hasMore && (
        <div className="flex justify-center mt-12 sm:mt-16">
          <Button
            variant="secondary"
            size="md"
            pill
            onClick={handleLoadMore}
            className="border-slate-300 dark:border-white/10 bg-slate-100/90 dark:bg-[#0D1525] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#152037] hover:text-slate-950 dark:hover:text-white px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2"
          >
            <span>Lihat Selengkapnya</span>
            <svg
              className="w-4 h-4 text-slate-500 dark:text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </div>
      )}

      {/* Lightbox Gallery for Certificates (Lazy Loaded on Demand) */}
      <LightboxModal
        open={selectedCertificate !== null}
        close={() => setSelectedCertificate(null)}
        index={selectedCertificate ?? 0}
        slides={slides}
      />
    </div>
  );
}
