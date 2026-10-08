import React from "react";
import { Container } from "@/components/layout/Container";
import { CERTIFICATES_DATA } from "@/data/certificates";
import { CertificateGrid } from "@/components/certificates/CertificateGrid";

export function Certificates() {
  const { eyebrow, heading, description, certificates } = CERTIFICATES_DATA;

  return (
    <section
      id="certificates"
      aria-label="Certificates Section"
      className="relative py-8 md:py-10 lg:py-[50px]"
    >
      <Container>
        {/* Section Header (Centered) */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <p className="font-sans text-xs sm:text-sm font-medium tracking-widest text-slate-400 dark:text-slate-400 uppercase mb-3 sm:mb-4">
            {eyebrow}
          </p>

          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-5">
            {heading}
          </h2>

          {/* Supporting Description (1-line on desktop matching reference) */}
          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        {/* 3-Column Certificate Grid with Incremental Load More */}
        <CertificateGrid certificates={certificates} />
      </Container>
    </section>
  );
}
