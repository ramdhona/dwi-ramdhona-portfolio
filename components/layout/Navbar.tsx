"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPortfolioDetail = pathname.startsWith("/portfolio");

  const [activeHash, setActiveHash] = useState<string>("#");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const isClickScrollingRef = React.useRef<boolean>(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for subtle shadow/border elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver & Scroll Spy for automatic section detection on manual scroll
  useEffect(() => {
    if (!isHome) return;

    const sectionMap: Record<string, string> = {
      home: "#",
      about: "#about",
      portfolio: "#portfolio",
      certificates: "#portfolio",
      timeline: "#portfolio",
      "tech-stack": "#portfolio",
      contact: "#contact",
    };

    const sectionIds = ["home", "about", "portfolio", "certificates", "timeline", "tech-stack", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sectionElements.length === 0) return;

    const checkActiveSection = () => {
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Near the top of the page -> Home
      if (scrollY < 120) {
        setActiveHash("#");
        return;
      }

      // 2. Scrolled near the bottom of the page -> Contact
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveHash("#contact");
        return;
      }

      // 3. Find section currently occupying reading area (offset for sticky navbar)
      const targetY = 160;
      let activeId = "home";

      for (const el of sectionElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetY) {
          activeId = el.id;
        }
      }

      const matchedHash = sectionMap[activeId] || "#";
      setActiveHash(matchedHash);
    };

    // IntersectionObserver with upper-mid reading zone
    const observer = new IntersectionObserver(
      () => {
        checkActiveSection();
      },
      {
        root: null,
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Continuous scroll listener throttled with requestAnimationFrame for manual wheel/touch/drag
    let rafId: number | null = null;
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkActiveSection();
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check on mount
    checkActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isHome]);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    setActiveHash(href);
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Release the click lock after smooth scroll settles
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (isHome) {
      if (href === "#") {
        e?.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) {
          history.pushState(null, "", window.location.pathname);
        }
      } else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e?.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", href);
        }
      }
    }
  };

  const getItemHref = (href: string) => {
    if (isHome) return href;
    if (href === "#") return "/";
    return `/${href}`;
  };

  const currentActive = isPortfolioDetail ? "#portfolio" : activeHash;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "border-b border-slate-200/80 dark:border-white/[0.08] bg-[#F8FAFC]/80 dark:bg-[#0B0F17]/80 backdrop-blur-md shadow-sm shadow-black/[0.03] dark:shadow-black/25"
          : "border-b border-transparent bg-transparent backdrop-blur-none shadow-none"
      }`}
    >
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#3B82F6] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
      >
        Lewati ke konten utama
      </a>

      {/* 3-Column Grid ensuring Center Area is mathematically and geometrically centered */}
      <Container className="grid h-16 grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">
        {/* Left Area: Brand "Portofolio" */}
        <div className="flex items-center justify-start">
          <Link
            href="/"
            onClick={isHome ? (e) => handleNavClick("#", e) : undefined}
            className="font-heading text-xl font-bold tracking-tight text-[#3B82F6] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-md py-1"
            aria-label="Portofolio — Halaman Beranda"
          >
            Portofolio
          </Link>
        </div>

        {/* Center Area: Navigation Links (Strictly Centered relative to Viewport) */}
        <div className="hidden md:flex items-center justify-center">
          <nav aria-label="Navigasi Utama">
            <ul className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = currentActive === item.href;
                return (
                  <li key={item.href}>
                    {isHome ? (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(item.href, e)}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex items-center justify-center text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "rounded-md border border-[#3B82F6] bg-[#3B82F6]/10 px-3.5 py-1 text-[#3B82F6]"
                            : "px-1.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={getItemHref(item.href)}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex items-center justify-center text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "rounded-md border border-[#3B82F6] bg-[#3B82F6]/10 px-3.5 py-1 text-[#3B82F6]"
                            : "px-1.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right Area: Theme Toggle (Desktop) & Mobile Toggle */}
        <div className="flex items-center justify-end">
          {/* Desktop Sun/Moon Theme Toggle */}
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <MobileNav
            items={NAV_ITEMS}
            activeHash={currentActive}
            onNavigate={handleNavClick}
          />
        </div>
      </Container>
    </header>
  );
}
