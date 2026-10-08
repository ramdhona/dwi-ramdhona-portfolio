"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { LanyardProps } from "@/components/ui/Lanyard";

function LanyardCardPreview({ onInteract }: { onInteract: () => void }) {
  return (
    <div
      onClick={onInteract}
      onTouchStart={onInteract}
      className="lanyard-wrapper flex flex-col items-center justify-center w-full h-full min-h-[300px] xs:min-h-[330px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[580px] xl:min-h-[620px] 2xl:min-h-[760px] relative select-none cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label="Kartu Identitas 3D Dwi Ramdhona"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onInteract();
        }
      }}
    >
      {/* Lanyard Strap */}
      <div className="w-4 sm:w-5 h-12 xs:h-14 sm:h-16 lg:h-20 bg-[#0F172A] border border-white/10 rounded-t-sm shadow-md flex items-center justify-center overflow-hidden relative z-10 transition-transform duration-300 group-hover:scale-105">
        <div className="w-full text-[6px] text-white/70 font-mono tracking-tighter text-center uppercase whitespace-nowrap rotate-90 select-none">
          WEB DEVELOPER • UI/UX
        </div>
      </div>

      {/* Metal Clip */}
      <div className="w-5 sm:w-6 h-3.5 sm:h-4 bg-slate-400 dark:bg-slate-600 rounded-sm -mt-0.5 shadow-inner relative z-10 flex items-center justify-center">
        <div className="w-2 sm:w-2.5 h-1 sm:h-1.5 bg-slate-500 dark:bg-slate-700 rounded-xs" />
      </div>

      {/* Card Body with Real Texture */}
      <div className="w-[150px] xs:w-[165px] sm:w-[185px] md:w-[220px] lg:w-[200px] xl:w-[240px] aspect-[1/1.5] -mt-1 rounded-2xl shadow-2xl relative overflow-hidden border border-slate-300/60 dark:border-white/10 bg-[#0B0F17] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-blue-500/20">
        <Image
          src="/assets/lanyard/card-front.webp"
          alt="Kartu Identitas Dwi Ramdhona, S.Kom - Web Developer & UI/UX Designer"
          width={400}
          height={604}
          priority
          unoptimized
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
    </div>
  );
}

export function HeroLanyard() {
  const [LanyardComponent, setLanyardComponent] =
    useState<React.ComponentType<LanyardProps> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let loaded = false;
    const loadLanyard = () => {
      if (loaded) return;
      loaded = true;
      import("@/components/ui/Lanyard").then((mod) => {
        setLanyardComponent(() => mod.default || mod.Lanyard);
      });
    };

    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      // Desktop: load immediately on user interaction (mouse move, scroll, or click)
      const onUserInteraction = () => {
        loadLanyard();
        window.removeEventListener("pointermove", onUserInteraction);
        window.removeEventListener("pointerdown", onUserInteraction);
        window.removeEventListener("scroll", onUserInteraction);
      };

      window.addEventListener("pointermove", onUserInteraction, { once: true, passive: true });
      window.addEventListener("pointerdown", onUserInteraction, { once: true, passive: true });
      window.addEventListener("scroll", onUserInteraction, { once: true, passive: true });

      // Fallback deferred background load after page is completely settled
      const timeoutId = setTimeout(() => {
        if ("requestIdleCallback" in window) {
          (window as Window).requestIdleCallback(() => loadLanyard());
        } else {
          loadLanyard();
        }
      }, 8000);

      return () => {
        window.removeEventListener("pointermove", onUserInteraction);
        window.removeEventListener("pointerdown", onUserInteraction);
        window.removeEventListener("scroll", onUserInteraction);
        clearTimeout(timeoutId);
      };
    } else {
      // Mobile / Tablet: load on touch or interaction with container
      const node = containerRef.current;
      if (node) {
        node.addEventListener("pointerdown", loadLanyard, { once: true, passive: true });
        node.addEventListener("touchstart", loadLanyard, { once: true, passive: true });
      }

      // Fallback deferred background load after page is completely settled
      const timer = setTimeout(loadLanyard, 7000);

      return () => {
        clearTimeout(timer);
        if (node) {
          node.removeEventListener("pointerdown", loadLanyard);
          node.removeEventListener("touchstart", loadLanyard);
        }
      };
    }
  }, []);

  if (!LanyardComponent) {
    return (
      <div ref={containerRef} className="w-full h-full">
        <LanyardCardPreview
          onInteract={() => {
            import("@/components/ui/Lanyard").then((mod) => {
              setLanyardComponent(() => mod.default || mod.Lanyard);
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <LanyardComponent
        position={[0, -0.35, 10.5]}
        gravity={[0, -40, 0]}
        lanyardImage="/assets/lanyard/Lanyard.png"
        cardGLB="/assets/lanyard/card.glb"
        lanyardWidth={1.2}
      />
    </div>
  );
}

export default HeroLanyard;
