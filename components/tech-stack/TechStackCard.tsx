import React from "react";
import Image from "next/image";
import { TechStackItem } from "@/data/tech-stack";
import { MagicBentoCard } from "@/components/ui/MagicBento";

interface TechStackCardProps {
  item: TechStackItem;
}

export function TechStackCard({ item }: TechStackCardProps) {
  // Wide-ratio logos (PHP and Tailwind) receive a wider bounding container
  // to ensure consistent visual volume/optical balance with square logos.
  const isWide = item.id === "php" || item.id === "tailwind";

  return (
    <MagicBentoCard
      role="group"
      aria-label={item.name}
      className="group flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0D1525] relative z-[1] shadow-xs min-h-[136px] sm:min-h-[148px] cursor-pointer"
    >
      {/* Logo Container Area */}
      <div className="flex items-center justify-center h-12 sm:h-14 w-full mb-3 sm:mb-3.5 transition-transform duration-200 group-hover:scale-105">
        <div
          className={`relative ${
            isWide
              ? "w-14 h-9 sm:w-16 sm:h-10"
              : "w-10 h-10 sm:w-11 sm:h-11"
          }`}
        >
          {item.darkImage ? (
            <>
              <Image
                src={item.image}
                alt={`${item.name} logo`}
                fill
                sizes="(max-width: 640px) 48px, 64px"
                className="object-contain dark:hidden"
              />
              <Image
                src={item.darkImage}
                alt={`${item.name} logo`}
                fill
                sizes="(max-width: 640px) 48px, 64px"
                className="object-contain hidden dark:block"
              />
            </>
          ) : (
            <Image
              src={item.image}
              alt={`${item.name} logo`}
              fill
              sizes="(max-width: 640px) 48px, 64px"
              className="object-contain"
            />
          )}
        </div>
      </div>

      {/* Technology Name */}
      <span className="font-sans text-xs sm:text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 text-center">
        {item.name}
      </span>
    </MagicBentoCard>
  );
}
