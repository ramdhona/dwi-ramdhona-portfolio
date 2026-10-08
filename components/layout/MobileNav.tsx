"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/data/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface MobileNavProps {
  items: NavItem[];
  activeHash: string;
  onNavigate: (href: string, e?: React.MouseEvent) => void;
}

export function MobileNav({ items, activeHash, onNavigate }: MobileNavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on ESC key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close when clicking outside menu container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (href: string, e?: React.MouseEvent) => {
    onNavigate(href, e);
    setIsOpen(false);
  };

  const getItemHref = (href: string) => {
    if (isHome) return href;
    if (href === "#") return "/";
    return `/${href}`;
  };

  return (
    <div className="flex items-center gap-2 md:hidden">
      {/* Theme Toggle Button on Mobile */}
      <ThemeToggle />

      {/* Accessible Hamburger / Close Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-dialog"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 transition-colors hover:border-[#3B82F6]/60 hover:text-slate-950 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] cursor-pointer"
      >
        {isOpen ? (
          // Close Icon (X)
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[65px] z-30 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-dialog"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Mobile"
        className={`fixed inset-x-0 top-[65px] z-40 max-h-[calc(100vh-70px)] overflow-y-auto border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0B0F17]/95 px-6 py-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Navigasi Mobile">
          <ul className="flex flex-col space-y-2">
            {items.map((item) => {
              const isActive = activeHash === item.href;
              const linkClasses = `flex min-h-[44px] items-center justify-between rounded-md px-4 py-2 text-base font-medium transition-colors ${
                isActive
                  ? "border border-[#3B82F6] bg-[#3B82F6]/10 font-medium text-[#3B82F6]"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]`;

              return (
                <li key={item.href}>
                  {isHome ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleItemClick(item.href, e)}
                      className={linkClasses}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                      )}
                    </a>
                  ) : (
                    <Link
                      href={getItemHref(item.href)}
                      onClick={() => setIsOpen(false)}
                      className={linkClasses}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
