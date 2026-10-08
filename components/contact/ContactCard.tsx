import React from "react";
import { ContactCardItem } from "@/data/contact";
import { MagicBentoCard } from "@/components/ui/MagicBento";

interface ContactCardProps {
  item: ContactCardItem;
}

export function ContactCard({ item }: ContactCardProps) {
  const renderIcon = (icon: ContactCardItem["icon"]) => {
    switch (icon) {
      case "email":
        return (
          <svg
            className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8] transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        );

      case "github":
        return (
          <svg
            className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8] transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        );

      case "linkedin":
        return (
          <svg
            className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8] transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );

      case "instagram":
        return (
          <svg
            className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8] transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <MagicBentoCard
      as="a"
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-[#DBEAFE] hover:border-[#2563EB]/40 dark:border-white/[0.08] dark:hover:border-white/15 bg-white dark:bg-[#0D1525] relative z-[1] shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer transition-colors duration-200"
    >
      {/* Icon Container */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#EFF6FF] group-hover:bg-[#DBEAFE] dark:bg-[#132A52] dark:group-hover:bg-[#163366] border border-[#DBEAFE] dark:border-blue-500/20 shadow-xs transition-all duration-200 group-hover:scale-105">
        {renderIcon(item.icon)}
      </div>

      {/* Label and Value */}
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          {item.label}
        </span>
        <span className="text-sm sm:text-base font-semibold text-[#1E293B] group-hover:text-[#2563EB] dark:text-white dark:group-hover:text-[#38BDF8] transition-colors truncate">
          {item.value}
        </span>
      </div>
    </MagicBentoCard>
  );
}
