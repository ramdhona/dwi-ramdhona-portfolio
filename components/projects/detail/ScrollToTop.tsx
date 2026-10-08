"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop Component
 * Ensures the Portfolio Detail page always begins at scrollY = 0 upon entering,
 * navigating between projects, or browser refresh, with zero console errors or hydration mismatch.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Prevent the browser from retaining/restoring previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Instantly reset scroll coordinates to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. Restore auto scroll restoration when unmounting/leaving detail page
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;
