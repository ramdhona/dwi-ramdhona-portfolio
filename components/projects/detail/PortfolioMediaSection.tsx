"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LightboxModal } from "@/components/ui/LightboxModal";

interface PortfolioMediaSectionProps {
  image: string;
  gallery?: string[];
  title: string;
  children: React.ReactNode;
}

export function PortfolioMediaSection({
  image,
  gallery,
  title,
  children,
}: PortfolioMediaSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasGallery = Boolean(gallery && gallery.length > 0);
  const galleryItems = gallery || [];

  // Slide 0: Main Project Image; Slides 1..N: Screenshot Gallery images
  const slides = [
    {
      src: image,
      alt: title,
    },
    ...galleryItems.map((imgSrc, idx) => ({
      src: imgSrc,
      alt: `${title} — Screenshot ${idx + 1}`,
    })),
  ];

  const isExternalMain = image.startsWith("http");

  return (
    <>
      {/* 1. Main Project Showcase Image (Full to Border & Zoom Out on Hover) */}
      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        aria-label={`View project image: ${title}`}
        className="group relative block w-full lg:h-[calc(100vh-7rem)] lg:min-h-[720px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/[0.08] bg-slate-100/90 dark:bg-[#0D1422] shadow-xl dark:shadow-2xl dark:shadow-black/50 mb-12 sm:mb-16 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
      >
        <Image
          src={image}
          alt={`Mockup showcase untuk ${title}`}
          width={1536}
          height={1024}
          priority
          unoptimized={isExternalMain}
          sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 100vw, 1400px"
          className="block w-full h-auto object-contain lg:absolute lg:inset-0 lg:w-full lg:h-full lg:object-cover lg:object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover Zoom Overlay Hint */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 rounded-lg bg-black/75 px-3.5 py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-xs shadow-lg">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
            Perbesar Gambar
          </span>
        </div>
      </button>

      {/* 2. Middle Content: Information Cards (Server Component nodes passed via children) */}
      {children}

      {/* 3. Screenshot Gallery (Rendered only when gallery items exist) */}
      {hasGallery && (
        <section className="mt-8 mb-16" aria-label="Galeri Screenshot">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Screenshot Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((imgSrc, index) => {
              const isExternal = imgSrc.startsWith("http");
              const slideIndex = index + 1;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setLightboxIndex(slideIndex)}
                  className="group relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/[0.08] bg-slate-100 dark:bg-[#0D1422] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
                  aria-label={`View project image: ${title} — Screenshot ${index + 1}`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Screenshot ${index + 1} - ${title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={isExternal}
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xs">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                      Perbesar
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Single Lightbox Gallery Instance for Portfolio Detail (Lazy Loaded on Demand) */}
      <LightboxModal
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={slides}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
}
