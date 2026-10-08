"use client";

import React, { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import "./GlowCursor.css";

const GlowCursorCanvas = dynamic(() => import("./GlowCursorCanvas"), {
  ssr: false,
});

function subscribePointerMedia(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    mql.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.innerWidth >= 1024
  );
}

function getServerSnapshot() {
  return false;
}

export interface GlowCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  secondaryColor?: string;
  trailLength?: number;
  trailWidth?: number;
  trailTaper?: number;
  followSpeed?: number;
  glowIntensity?: number;
  glowSpread?: number;
  hotspot?: number;
  brightness?: number;
  opacity?: number;
  pulseSpeed?: number;
  noiseStrength?: number;
  idleFade?: boolean;
  idleTimeout?: number;
  fadeDuration?: number;
  blendMode?: "screen" | "normal";
  maxDevicePixelRatio?: number;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlowCursor({
  enabled = true,
  children,
  className = "",
  style,
  ...canvasProps
}: GlowCursorProps) {
  const isFinePointerDesktop = useSyncExternalStore(
    subscribePointerMedia,
    getPointerSnapshot,
    getServerSnapshot
  );

  const shouldRenderCanvas = enabled && isFinePointerDesktop;

  return (
    <div
      className={`glow-cursor-wrapper relative w-full min-h-screen ${className}`.trim()}
      style={style}
    >
      {shouldRenderCanvas && (
        <GlowCursorCanvas {...canvasProps} enabled={enabled} />
      )}
      {children && (
        <div className="glow-cursor-content relative flex min-h-screen w-full flex-1 flex-col">
          {children}
        </div>
      )}
    </div>
  );
}

export default GlowCursor;
