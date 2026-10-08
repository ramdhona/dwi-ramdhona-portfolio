import React from "react";
import Image from "next/image";
import { CodeXml, ScanSearch } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ABOUT_DATA, InterestItem } from "@/data/about";
import { MagicBentoCard } from "@/components/ui/MagicBento";

function InterestIcon({ icon }: { icon: InterestItem["icon"] }) {
  switch (icon) {
    case "codexml":
      return <CodeXml className="w-5 h-5 text-[#3B82F6] flex-shrink-0" aria-hidden="true" />;
    case "scansearch":
      return <ScanSearch className="w-5 h-5 text-[#3B82F6] flex-shrink-0" aria-hidden="true" />;
    case "design":
      return (
        <svg
          className="w-5 h-5 text-[#3B82F6] flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 19 7-7 3 3-7 7-3-3z" />
          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="m2 2 7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "code":
    default:
      return (
        <svg
          className="w-5 h-5 text-[#3B82F6] flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

export function About() {
  const {
    eyebrow,
    heading,
    bio,
    interestsHeading,
    educationHeading,
    interests,
    education,
  } = ABOUT_DATA;

  return (
    <section
      id="about"
      aria-label="About Section"
      className="relative py-8 md:py-10 lg:py-[50px]"
    >
      <Container>
        {/* Section Header (Centered) */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-sans text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal mb-2 tracking-normal">
            {eyebrow}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {heading}
          </h2>
        </div>

        {/* Responsive Grid: Mobile stacked (Bio -> Education -> Interests), Desktop 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 sm:gap-y-12 lg:gap-y-0 lg:gap-x-14 xl:gap-x-16 items-start">
          {/* 1. Biography Paragraph (Mobile: 1st, Desktop: Col 1 Row 1) */}
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed lg:mb-10">
              {bio}
            </p>
          </div>

          {/* 2. Education (Mobile: 2nd, Desktop: Col 2 Row 1 spanning 2 rows) */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col w-full">
            {/* Education Subheading */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <svg
                className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                {educationHeading}
              </h3>
            </div>

            {/* Education Cards Stack */}
            <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
              {education.map((item) => {
                const isPurple = item.theme === "purple";
                return (
                  <MagicBentoCard
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0D1525] relative z-[1] shadow-xs flex items-center gap-4 sm:gap-5 transition-colors duration-200 hover:border-slate-300 dark:hover:border-white/15 w-full cursor-pointer"
                  >
                    {/* Logo Box */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 p-2 ${
                        isPurple
                          ? "bg-indigo-50/80 dark:bg-[#2A2356]/40 border border-indigo-200/60 dark:border-indigo-500/20"
                          : "bg-cyan-50/80 dark:bg-[#16384C]/40 border border-cyan-200/60 dark:border-cyan-500/20"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={item.logo}
                          alt={`${item.institution} logo`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 48px, 56px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-heading text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
                        {item.institution}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {item.major} · {item.period}
                      </p>
                    </div>
                  </MagicBentoCard>
                );
              })}
            </div>
          </div>

          {/* 3. Interests (Mobile: 3rd, Desktop: Col 1 Row 2) */}
          <div className="lg:col-start-1 lg:row-start-2 flex flex-col w-full">
            {/* Interests Subheading */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <svg
                className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                {interestsHeading}
              </h3>
            </div>

            {/* Interests 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
              {interests.map((item) => (
                <MagicBentoCard
                  key={item.id}
                  className="h-14 sm:h-[60px] px-4 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0D1525] relative z-[1] shadow-xs flex items-center gap-3.5 text-slate-800 dark:text-slate-200 transition-colors duration-200 hover:border-slate-300 dark:hover:border-white/15 cursor-pointer"
                >
                  <InterestIcon icon={item.icon} />
                  <span className="font-sans text-sm sm:text-base font-medium">
                    {item.name}
                  </span>
                </MagicBentoCard>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
