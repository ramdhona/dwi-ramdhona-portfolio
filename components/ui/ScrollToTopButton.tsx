"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating Scroll-to-Top Button
 *
 * Appears dynamically when the user scrolls past 300px.
 * Provides smooth scrolling back to the top of the viewport,
 * with complete support for keyboard accessibility, reduced motion preferences,
 * and seamless theme integration (Light & Dark modes).
 */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial evaluation on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`group fixed z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full cursor-pointer select-none text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 border border-white/20 dark:border-white/10 right-4 bottom-4 sm:right-5 sm:bottom-5 lg:right-6 lg:bottom-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F17] transition-all duration-300 ease-out active:scale-95 motion-reduce:transition-none motion-reduce:transform-none ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-90 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp
        className="w-5 h-5 text-white transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </button>
  );
}

export default ScrollToTopButton;
