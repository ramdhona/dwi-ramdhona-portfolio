import React from "react";
import Link from "next/link";

interface ProjectHeaderProps {
  title: string;
  badgeCategory: string;
  description: string;
  liveUrl?: string;
}

export function ProjectHeader({
  title,
  badgeCategory,
  description,
  liveUrl,
}: ProjectHeaderProps) {
  const isExternal = Boolean(liveUrl && liveUrl.trim() !== "" && liveUrl !== "#");

  return (
    <div className="w-full">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-md px-1 py-0.5"
          aria-label="Kembali ke daftar portofolio"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Portofolio</span>
        </Link>
      </div>

      {/* Category Badge */}
      <div className="mb-4 sm:mb-5">
        <span className="inline-flex items-center rounded-full border border-slate-200/90 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-3.5 py-1 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
          {badgeCategory}
        </span>
      </div>

      {/* Project Title */}
      <h1 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2] mb-4 sm:mb-5">
        {title}
      </h1>

      {/* Project Description */}
      <p className="font-sans text-sm sm:text-base lg:text-[17px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl mb-6 sm:mb-8">
        {description}
      </p>

      {/* CTA Button: Only rendered if a real live URL exists */}
      {isExternal && (
        <div className="mb-10 sm:mb-12">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-all duration-200 shadow-md hover:shadow-lg shadow-blue-600/20 active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
          >
            <span>Live Demo</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
