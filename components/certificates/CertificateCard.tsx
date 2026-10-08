import React from "react";
import Image from "next/image";
import { CertificateItem } from "@/data/certificates";

interface CertificateCardProps {
  certificate: CertificateItem;
  onClick?: () => void;
}

export function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View certificate: ${certificate.title}`}
      className="interactive-card group flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0D1525] relative z-[1] shadow-xs cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
    >
      {/* Certificate Preview Frame (Full Width, 3:2 Aspect Ratio) */}
      <div className="card-image-wrapper relative w-full aspect-[3/2] overflow-hidden bg-slate-100 dark:bg-slate-900/60">
        <Image
          src={certificate.image}
          alt={`Dokumen ${certificate.title}`}
          fill
          loading="lazy"
          unoptimized={certificate.image.startsWith("http")}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="card-image object-cover object-center"
        />
      </div>

      {/* Certificate Title Area */}
      <div className="flex-1 flex items-center justify-center py-3.5 sm:py-6 px-2.5 sm:px-6 text-center">
        <h3
          id={`certificate-title-${certificate.id}`}
          className="card-title font-heading text-xs sm:text-base lg:text-lg font-semibold leading-snug text-slate-900 dark:text-white line-clamp-2"
        >
          {certificate.title}
        </h3>
      </div>
    </button>
  );
}
