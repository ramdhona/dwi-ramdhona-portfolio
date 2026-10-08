"use client";

import React, { useEffect, useRef } from "react";
import type { GlowCursorProps } from "./GlowCursor";

interface Point {
  x: number;
  y: number;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export default function GlowCursorCanvas({
  color = "#67E8F9",
  secondaryColor = "#A78BFA",
  trailLength = 20,
  trailWidth = 6,
  trailTaper = 0.8,
  followSpeed = 0.22,
  glowIntensity = 1.4,
  glowSpread = 1,
  hotspot = 0.5,
  brightness = 1.1,
  opacity = 0.85,
  pulseSpeed = 0.8,
  idleFade = true,
  idleTimeout = 400,
  fadeDuration = 500,
  blendMode = "normal",
  maxDevicePixelRatio = 1.5,
  enabled = true,
}: GlowCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const propsRef = useRef({
    color,
    secondaryColor,
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    idleFade,
    idleTimeout,
    fadeDuration,
    blendMode,
    maxDevicePixelRatio,
    enabled,
  });

  useEffect(() => {
    propsRef.current = {
      color,
      secondaryColor,
      trailLength,
      trailWidth,
      trailTaper,
      followSpeed,
      glowIntensity,
      glowSpread,
      hotspot,
      brightness,
      opacity,
      pulseSpeed,
      idleFade,
      idleTimeout,
      fadeDuration,
      blendMode,
      maxDevicePixelRatio,
      enabled,
    };
  });

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Guarantee absolute transparency
    canvas.style.background = "transparent";
    canvas.style.backgroundColor = "transparent";

    let destroyed = false;
    let isVisible = true;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, propsRef.current.maxDevicePixelRatio);

    const maxPts = 32;
    const points: Point[] = Array.from({ length: maxPts }, () => ({ x: 0, y: 0 }));
    const target: Point = { x: 0, y: 0 };
    const head: Point = { x: 0, y: 0 };

    let initialized = false;
    let pointerInside = false;
    let fade = 0;
    let lastInputTime = performance.now();
    let lastFrameTime = performance.now();

    const resize = () => {
      if (destroyed || !canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, propsRef.current.maxDevicePixelRatio);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.background = "transparent";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const initializeTrail = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      head.x = x;
      head.y = y;
      for (const pt of points) {
        pt.x = x;
        pt.y = y;
      }
      initialized = true;
    };

    const startLoop = () => {
      if (destroyed || !isVisible) return;
      if (rafRef.current === null) {
        lastFrameTime = performance.now();
        rafRef.current = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const x = event.clientX;
      const y = event.clientY;

      if (!initialized || fade <= 0.001) {
        initializeTrail(x, y);
      }

      target.x = x;
      target.y = y;
      pointerInside = true;
      lastInputTime = performance.now();
      startLoop();
    };

    const handlePointerLeave = () => {
      pointerInside = false;
    };

    const handleWindowBlur = () => {
      pointerInside = false;
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (!isVisible) {
        stopLoop();
      } else if (pointerInside) {
        startLoop();
      }
    };

    const render = (now: number) => {
      rafRef.current = null;

      if (destroyed || !isVisible) {
        return;
      }

      const config = propsRef.current;
      const delta = Math.min(Math.max((now - lastFrameTime) / 16.667, 0.1), 3);
      lastFrameTime = now;

      // Update fade state
      const idleDuration = now - lastInputTime;
      const isIdle = config.idleFade && idleDuration > config.idleTimeout;
      const targetFade = pointerInside && !isIdle ? 1 : 0;

      const fadeSpeed = 16.667 / Math.max(config.fadeDuration, 1);
      if (fade < targetFade) {
        fade = Math.min(targetFade, fade + fadeSpeed * delta);
      } else if (fade > targetFade) {
        fade = Math.max(targetFade, fade - fadeSpeed * delta);
      }

      // If idle/outside and fade completely decayed, clear and pause RAF loop until next pointer move
      if (targetFade === 0 && fade <= 0.001) {
        fade = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const pointCount = clamp(Math.round(config.trailLength), 2, maxPts);

      if (initialized) {
        const headEase = 1 - Math.pow(1 - clamp(config.followSpeed, 0.01, 0.99), delta);
        const chainBase = clamp(0.28 + config.followSpeed * 0.35, 0.08, 0.92);
        const chainEase = 1 - Math.pow(1 - chainBase, delta);

        head.x += (target.x - head.x) * headEase;
        head.y += (target.y - head.y) * headEase;

        points[0].x = head.x;
        points[0].y = head.y;

        for (let i = 1; i < pointCount; i++) {
          const lead = points[i - 1];
          const curr = points[i];
          curr.x += (lead.x - curr.x) * chainEase;
          curr.y += (lead.y - curr.y) * chainEase;
        }
      }

      // Clear previous frame to complete transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Blend mode
      ctx.globalCompositeOperation = config.blendMode === "screen" ? "screen" : "source-over";

      const currentAlpha = config.opacity * fade;
      const pulseAmount = Math.min(Math.abs(config.pulseSpeed), 1);
      const pulse = 1 + Math.sin(now * 0.003 * config.pulseSpeed) * 0.15 * pulseAmount;

      const primaryColor = config.color;
      const accentColor = config.secondaryColor;

      // 1. Draw Large Ambient Glow around Head
      const ambientRadius = Math.max(config.trailWidth * 6 * config.glowSpread * pulse, 24);
      const ambientGrad = ctx.createRadialGradient(
        points[0].x,
        points[0].y,
        0,
        points[0].x,
        points[0].y,
        ambientRadius
      );
      ambientGrad.addColorStop(0, hexToRgba(primaryColor, 0.45 * currentAlpha * config.glowIntensity));
      ambientGrad.addColorStop(0.4, hexToRgba(accentColor, 0.25 * currentAlpha * config.glowIntensity));
      ambientGrad.addColorStop(1, hexToRgba(accentColor, 0));

      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, ambientRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Tapered Glowing Trail Segments
      for (let i = 0; i < pointCount - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const progress = i / (pointCount - 1);
        const life = Math.pow(Math.max(1 - progress, 0), config.trailTaper);
        const segWidth = Math.max(config.trailWidth * life, 1.2);
        const segAlpha = currentAlpha * life;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = segWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const strokeColor = progress < 0.5 ? primaryColor : accentColor;
        ctx.strokeStyle = hexToRgba(strokeColor, segAlpha * 0.85);
        ctx.stroke();

        // Subtle glow along segment
        if (i % 2 === 0 && life > 0.2) {
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const glowR = segWidth * 2.8 * config.glowSpread;
          const segGrad = ctx.createRadialGradient(midX, midY, 0, midX, midY, glowR);
          segGrad.addColorStop(0, hexToRgba(strokeColor, segAlpha * 0.4 * config.glowIntensity));
          segGrad.addColorStop(1, hexToRgba(strokeColor, 0));
          ctx.fillStyle = segGrad;
          ctx.beginPath();
          ctx.arc(midX, midY, glowR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw Core Hotspot at Cursor Position
      const coreRadius = Math.max(config.trailWidth * 1.5 * pulse, 5);
      const coreGrad = ctx.createRadialGradient(
        points[0].x,
        points[0].y,
        0,
        points[0].x,
        points[0].y,
        coreRadius
      );
      coreGrad.addColorStop(0, hexToRgba("#FFFFFF", currentAlpha * config.brightness));
      coreGrad.addColorStop(config.hotspot, hexToRgba(primaryColor, currentAlpha * 0.9));
      coreGrad.addColorStop(1, hexToRgba(primaryColor, 0));

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handleWindowBlur, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      destroyed = true;
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (canvas) {
        const c = canvas.getContext("2d");
        if (c) c.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="glow-cursor-canvas pointer-events-none fixed inset-0 z-[45] block h-full w-full select-none"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        userSelect: "none",
        background: "transparent",
        backgroundColor: "transparent",
        zIndex: 45,
      }}
      aria-hidden="true"
    />
  );
}
