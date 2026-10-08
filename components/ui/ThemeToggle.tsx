"use client";

import React from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
        isDark
          ? "border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#3B82F6]/60 hover:bg-white/[0.08] hover:text-white"
          : "border-slate-300 bg-black/[0.04] text-slate-700 hover:border-[#3B82F6]/60 hover:bg-black/[0.08] hover:text-slate-950"
      } ${className}`.trim()}
    >
      {isDark ? (
        // SUN Icon (Active in Dark Mode to switch to Light)
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            strokeLinecap="round"
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        </svg>
      ) : (
        // MOON Icon (Active in Light Mode to switch to Dark)
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}
