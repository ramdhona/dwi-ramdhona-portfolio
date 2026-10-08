"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

export interface MagicBentoCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  disableAnimations?: boolean;
  glowColor?: string;
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}

export const DEFAULT_MAGIC_BENTO_CONFIG = {
  textAutoHide: false,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: false,
  enableMagnetism: false,
  clickEffect: true,
  spotlightRadius: 350,
  particleCount: 8,
  disableAnimations: false,
  glowColor: "37, 99, 235",
};

// Module-level single check to avoid 25+ independent resize listeners
let isMobileCached: boolean | null = null;
function checkIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  if (isMobileCached === null) {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth <= 768;
    isMobileCached = isCoarse || isSmallScreen;

    window.addEventListener(
      "resize",
      () => {
        isMobileCached =
          window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
      },
      { passive: true }
    );
  }
  return isMobileCached;
}

const createParticleElement = (x: number, y: number, color: string): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "magic-bento-particle";
  const isSecondary = Math.random() > 0.45;
  const particleColor = isSecondary ? "96, 165, 250" : color;
  el.style.cssText = `
    position: absolute;
    width: 3.5px;
    height: 3.5px;
    border-radius: 50%;
    background: rgba(${particleColor}, 0.85);
    box-shadow: 0 0 5px rgba(${particleColor}, 0.7), 0 0 10px rgba(${particleColor}, 0.25);
    pointer-events: none;
    z-index: 3;
    left: ${x}px;
    top: ${y}px;
    will-change: transform, opacity;
  `;
  return el;
};

export const MagicBentoCard: React.FC<MagicBentoCardProps> = ({
  as = "div",
  children,
  className = "",
  style,
  textAutoHide = DEFAULT_MAGIC_BENTO_CONFIG.textAutoHide,
  enableStars = DEFAULT_MAGIC_BENTO_CONFIG.enableStars,
  enableSpotlight = DEFAULT_MAGIC_BENTO_CONFIG.enableSpotlight,
  enableBorderGlow = DEFAULT_MAGIC_BENTO_CONFIG.enableBorderGlow,
  enableTilt = DEFAULT_MAGIC_BENTO_CONFIG.enableTilt,
  enableMagnetism = DEFAULT_MAGIC_BENTO_CONFIG.enableMagnetism,
  clickEffect = DEFAULT_MAGIC_BENTO_CONFIG.clickEffect,
  spotlightRadius = DEFAULT_MAGIC_BENTO_CONFIG.spotlightRadius,
  particleCount = DEFAULT_MAGIC_BENTO_CONFIG.particleCount,
  disableAnimations = DEFAULT_MAGIC_BENTO_CONFIG.disableAnimations,
  glowColor = DEFAULT_MAGIC_BENTO_CONFIG.glowColor,
  ...restProps
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.85, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 50,
          y: (Math.random() - 0.5) * 50,
          duration: 1.2 + Math.random() * 0.8,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 75);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    const isMobile = checkIsMobile();
    const shouldDisable = disableAnimations || isMobile;

    if (shouldDisable || !cardRef.current) return;

    const element = cardRef.current;
    const spotlightEl = spotlightRef.current;

    let rafId: number | null = null;
    let pendingEvent: MouseEvent | null = null;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      element.style.setProperty("--glow-intensity", "1");
      if (spotlightEl) {
        spotlightEl.style.opacity = "1";
      }

      if (enableStars) {
        animateParticles();
      }

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 4,
          rotateY: 4,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      pendingEvent = null;

      element.style.setProperty("--glow-intensity", "0");
      if (spotlightEl) {
        spotlightEl.style.opacity = "0";
      }

      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const updateGlowPosition = (e: MouseEvent) => {
      if (!isHoveredRef.current || !cardRef.current) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;

      element.style.setProperty("--glow-x", `${relativeX}%`);
      element.style.setProperty("--glow-y", `${relativeY}%`);
      element.style.setProperty("--glow-intensity", "1");
      element.style.setProperty("--glow-radius", `${spotlightRadius}px`);

      if (spotlightEl) {
        spotlightEl.style.setProperty("--spotlight-x", `${x}px`);
        spotlightEl.style.setProperty("--spotlight-y", `${y}px`);
      }

      if (enableTilt) {
        const tiltX = (y / rect.height - 0.5) * -8;
        const tiltY = (x / rect.width - 0.5) * 8;
        gsap.to(element, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 0.15,
          ease: "power1.out",
        });
      }

      if (enableMagnetism) {
        const moveX = (x / rect.width - 0.5) * 10;
        const moveY = (y / rect.height - 0.5) * 10;
        magnetismAnimationRef.current = gsap.to(element, {
          x: moveX,
          y: moveY,
          duration: 0.2,
          ease: "power1.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingEvent = e;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (pendingEvent) {
            updateGlowPosition(pendingEvent);
          }
          rafId = null;
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("div");
      ripple.className = "magic-bento-ripple";
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 2;
      `;
      element.appendChild(ripple);

      gsap.to(ripple, {
        scale: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });

      gsap.fromTo(
        element,
        { scale: 0.985 },
        { scale: 1, duration: 0.25, ease: "back.out(2)" }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      pendingEvent = null;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableStars,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    spotlightRadius,
  ]);

  const borderGlowClass = enableBorderGlow ? "magic-bento-card--border-glow" : "";
  const autoHideClass = textAutoHide ? "magic-bento-card--text-autohide" : "";

  const Component = (as || "div") as "div";

  return (
    <Component
      ref={cardRef as React.Ref<HTMLDivElement>}
      className={`magic-bento-card ${borderGlowClass} ${autoHideClass} ${className}`.trim()}
      style={
        {
          "--glow-color": glowColor,
          "--glow-radius": `${spotlightRadius}px`,
          ...style,
        } as React.CSSProperties
      }
      {...restProps}
    >
      {enableSpotlight && (
        <div
          ref={spotlightRef}
          className="magic-bento-spotlight"
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
};

export default MagicBentoCard;
