export { GlowCursor } from "./GlowCursor";
export type { GlowCursorProps } from "./GlowCursor";
export { default } from "./GlowCursor";

export const GLOW_CURSOR_CONFIG = {
  color: "#67E8F9",
  secondaryColor: "#A78BFA",
  trailLength: 20,
  trailWidth: 6,
  trailTaper: 0.8,
  followSpeed: 0.22,
  glowIntensity: 1.4,
  glowSpread: 1,
  hotspot: 0.5,
  brightness: 1.1,
  opacity: 0.85,
  pulseSpeed: 0.8,
  noiseStrength: 0.02,
  idleFade: true,
  idleTimeout: 400,
  fadeDuration: 500,
  blendMode: "normal" as const,
  maxDevicePixelRatio: 1.25,
};
