/**
 * theme.ts — AetherLogik premium motion + brand tokens for the Remotion composer.
 *
 * Single source of truth so components stop hand-coding easing curves, spring
 * configs, and hex values. Mirrors `styles/aetherlogik-ember.yaml` and the
 * craft numbers in the aetherlogik-video `premium-craft-standards` reference.
 * Ember-only brand: near-black background, ember accent, near-white text.
 */
import { Easing } from "remotion";

/** Ember-only brand palette. */
export const BRAND = {
  bg: "#0A0A0A",
  surface: "#141414",
  accent: "#FF6B1A",
  text: "#F5F5F5",
  muted: "#9AA0A6",
} as const;

/** Premium easing curves as Remotion easing functions (pass to interpolate({easing})). */
export const EASING = {
  /** easeOutExpo — the signature entrance (fast in, soft settle). The default. */
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  /** easeOutQuart — softer/slower hero entrance. */
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
  /** easeInOutQuint — symmetric reveals / mask wipes. */
  inOutQuint: Easing.bezier(0.83, 0, 0.17, 1),
  /** general camera / pan movement. */
  camera: Easing.bezier(0.65, 0, 0.35, 1),
  /** exit — faster than entrance (accelerate out). */
  exit: Easing.bezier(0.32, 0, 0.67, 0),
} as const;

/** Raw cubic-bezier strings (for CSS transition-timing-function / HyperFrames). */
export const EASING_CSS = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  inOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
  camera: "cubic-bezier(0.65, 0, 0.35, 1)",
  exit: "cubic-bezier(0.32, 0, 0.67, 0)",
} as const;

/** spring() configs — premium (no overshoot) by default. */
export const SPRINGS = {
  /** default brand entrance — enters and settles, no overshoot. */
  premium: { mass: 1, stiffness: 100, damping: 26 },
  /** guaranteed no bounce (clamped). */
  crisp: { mass: 1, stiffness: 120, damping: 30, overshootClamping: true },
  /** a touch of life (minimal overshoot) — reserve for a single keyword. */
  alive: { mass: 0.8, stiffness: 120, damping: 18 },
  /** snappy micro-elements / ticks. */
  snappy: { mass: 0.6, stiffness: 200, damping: 22 },
} as const;

/** Target seconds for common premium timings (multiply by fps for frames). */
export const TIMING = {
  maskRevealSeconds: 0.8,
  lineStaggerSeconds: 0.1,
  exitSeconds: 0.3,
  minTextHoldSeconds: 1.3,
} as const;
