"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * SmoothScroll — integrates Lenis with GSAP ScrollTrigger.
 *
 * Settings tuned for:
 * - Natural feel (not sluggish, not hyper-fast)
 * - 60/120 FPS compatibility via GSAP ticker (no double RAF)
 * - Works with GSAP ScrollTrigger pin/scrub without jitter
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,          // scroll inertia duration — 1.1s = natural, not sluggish
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease out
      smoothWheel: true,      // smooth mouse wheel
      touchMultiplier: 1.5,   // touch feel on mobile (1.5 = slightly more responsive)
      infinite: false,
    });

    // Sync Lenis scroll position to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker instead of requestAnimationFrame to avoid double RAF
    const gsapTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from skipping frames during lag

    // ScrollTrigger must use Lenis's scrollTop, not window.scrollY
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(gsapTick);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.body, undefined as never);
    };
  }, []);

  return null;
}
