"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { TIMELINE_DATA, TimelineItem, TimelineIconType } from "@/data/timeline";
import { MagicBentoCard } from "@/components/ui/MagicBento";

export function Timeline() {
  const { eyebrow, heading, description, items } = TIMELINE_DATA;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let rafId: number | null = null;
    let isAttached = false;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          rafId = null;
          return;
        }

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.65;
        const totalHeight = rect.height;

        const distanceScrolled = triggerPoint - rect.top;
        const progress = Math.min(Math.max(distanceScrolled / totalHeight, 0), 1);
        setScrollProgress(progress);

        const newActiveState: Record<string, boolean> = {};
        items.forEach((item) => {
          const nodeEl = document.getElementById(`timeline-node-${item.id}`);
          if (nodeEl) {
            const nodeRect = nodeEl.getBoundingClientRect();
            newActiveState[item.id] = nodeRect.top <= triggerPoint;
          }
        });
        setActiveItems(newActiveState);

        rafId = null;
      });
    };

    const attach = () => {
      if (!isAttached) {
        isAttached = true;
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
      }
    };

    const detach = () => {
      if (isAttached) {
        isAttached = false;
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          attach();
        } else {
          detach();
        }
      },
      { rootMargin: "300px 0px 300px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      detach();
    };
  }, [items]);

  return (
    <section
      id="timeline"
      aria-label="Timeline Section"
      className="relative py-12 md:py-16 lg:py-24 transition-colors duration-200 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-14 sm:mb-20">
          <p className="font-sans text-xs sm:text-sm font-medium tracking-widest text-slate-400 dark:text-slate-400 uppercase mb-3 sm:mb-4">
            {eyebrow}
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-5">
            {heading}
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Timeline Flow Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto pt-4 pb-8">
          {/* Base Inactive Track Line */}
          <div
            className="absolute top-4 bottom-4 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-[#DBEAFE] dark:bg-white/[0.08] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Active Progress Gradient Line */}
          <div
            style={{ height: `${scrollProgress * 100}%` }}
            className="absolute top-4 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#60A5FA] shadow-[0_0_12px_rgba(37,99,235,0.4)] dark:shadow-[0_0_12px_rgba(59,130,246,0.6)] rounded-full transition-[height] duration-75 ease-out pointer-events-none"
            aria-hidden="true"
          >
            {/* Glowing tracer head at the tip */}
            {scrollProgress > 0 && scrollProgress < 1 && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#60A5FA] shadow-[0_0_10px_#2563EB] dark:shadow-[0_0_10px_#3B82F6]" />
            )}
          </div>

          {/* Timeline Items */}
          <div className="space-y-10 sm:space-y-14 md:space-y-20 relative">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              const isActive = Boolean(activeItems[item.id]);

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Central Timeline Node / Icon */}
                  <div
                    id={`timeline-node-${item.id}`}
                    className={`absolute z-20 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-[#EFF6FF] border-2 border-[#2563EB] text-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.25)] dark:bg-[#0B0F17] dark:border-[#3B82F6] dark:text-[#3B82F6] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110"
                        : "bg-[#EFF6FF]/70 border border-[#DBEAFE] text-[#2563EB]/50 dark:bg-[#0B0F17] dark:border-white/10 dark:text-slate-500 scale-100"
                    }`}
                  >
                    <TimelineIcon type={item.icon} className="w-5 h-5" />
                  </div>

                  {/* Timeline Card */}
                  <div
                    className={`w-full pl-12 sm:pl-16 md:pl-0 md:w-[calc(50%-2.5rem)] transition-all duration-700 ease-out ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    } ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-60 translate-y-4"
                    }`}
                  >
                    <TimelineCard item={item} isActive={isActive} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

interface TimelineCardProps {
  item: TimelineItem;
  isActive: boolean;
}

function TimelineCard({ item, isActive }: TimelineCardProps) {
  return (
    <MagicBentoCard
      as="article"
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect={true}
      spotlightRadius={400}
      particleCount={12}
      glowColor="37, 99, 235"
      disableAnimations={false}
      className={`group relative z-[1] rounded-2xl p-5 sm:p-7 border transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-white dark:bg-[#0D1525] border-[#DBEAFE] dark:border-white/[0.12] shadow-sm hover:shadow-md dark:shadow-black/40 hover:border-[#2563EB]/50 dark:hover:border-[#3B82F6]/60 hover:-translate-y-1"
          : "bg-white dark:bg-[#0D1525] border-[#DBEAFE]/70 dark:border-white/[0.06] shadow-xs"
      }`}
    >
      {/* Header: Period Pill */}
      <div className="mb-2 sm:mb-2.5">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-sans text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#EFF6FF] dark:bg-white/[0.04] text-[#2563EB] dark:text-slate-400 border border-[#DBEAFE] dark:border-white/[0.08]">
          {item.period}
        </span>
      </div>

      {/* Main Title */}
      <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#1E293B] dark:text-white mb-1.5 transition-colors group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6]">
        {item.title}
      </h3>

      {/* Organization / Company */}
      <p className="font-sans text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#3B82F6] mb-3">
        {item.organization}
      </p>

      {/* Description */}
      <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-4 sm:mb-5">
        {item.description}
      </p>

      {/* Skills / Tech Badges */}
      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 border-t border-[#DBEAFE]/80 dark:border-white/[0.06]">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-[#EFF6FF] hover:bg-[#DBEAFE] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-[#DBEAFE] dark:border-white/[0.08] text-[#1E293B] dark:text-slate-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </MagicBentoCard>
  );
}

function TimelineIcon({
  type,
  className = "w-5 h-5",
}: {
  type: TimelineIconType;
  className?: string;
}) {
  switch (type) {
    case "education":
      // Graduation Cap
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-5.25 6.557q-.001.272.008.543m0 0a60.07 60.07 0 0 0 10.484 0m-10.492-.543v-2.25"
          />
        </svg>
      );

    case "work":
      // Briefcase
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      );

    case "project":
      // Code / Laptop
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>
      );

    default:
      // Building / Organization
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
      );
  }
}
