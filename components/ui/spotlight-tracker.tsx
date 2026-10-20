"use client";
import { useEffect } from "react";

/**
 * One delegated pointer listener for every `.spotlight` element on the page:
 * writes the cursor position into --mx / --my so the CSS glow can follow it.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    function onMove(e: PointerEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
