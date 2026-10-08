import React from "react";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Footer"
      className="w-full border-y border-slate-200/80 dark:border-white/[0.08] py-6 sm:py-7 transition-colors duration-200"
    >
      <div className="w-full px-4 text-center">
        <p className="font-sans text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Dwi Ramdhona. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
