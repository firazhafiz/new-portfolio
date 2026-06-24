"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
  onHalfway?: () => void;
}

const C = { bg: "#F2F0EA", ink: "#111111", blue: "#2056F7" } as const;
const MARQUEE_ITEMS = [
  "Firaz Fulvian Hafiz",
  "Fullstack Developer",
  "Creative Direction",
  "Web & UI Design",
  "Portfolio 2026",
  "React · Motion · Craft",
  "Surabaya, ID",
  "Code × Concept",
];
const STATUS_PAIRS: [string, string][] = [
  ["Booting canvas", "Initializing"],
  ["Loading assets", "Loading"],
  ["Composing scene", "Rendering"],
  ["Crafting pixels", "Crafting"],
  ["Almost there", "Finalizing"],
];

export default function Preloader({
  progress,
  onComplete,
  onHalfway,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null); // full-screen blue curtain
  const vectorStageRef = useRef<HTMLDivElement>(null); // center stage for intro vector
  const introBloomRef = useRef<HTMLDivElement>(null);
  const introRingRef = useRef<HTMLDivElement>(null);
  const introSweepRef = useRef<HTMLDivElement>(null);
  const introVecRef = useRef<HTMLDivElement>(null); // the floating vector in intro
  const exitFillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const nameRowRef = useRef<HTMLDivElement>(null); // horizontal name row
  const nameFRef = useRef<HTMLSpanElement>(null);
  const nameFuRef = useRef<HTMLSpanElement>(null);
  const nameHRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mainBodyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const iconSpinRef = useRef<HTMLDivElement>(null);
  const botStatusRef = useRef<HTMLSpanElement>(null);
  const rStatusRef = useRef<HTMLSpanElement>(null);

  const [statusIdx, setStatusIdx] = useState(0);
  const [winReady, setWinReady] = useState(false);
  const [done, setDone] = useState(false);
  const [termLines, setTermLines] = useState<string[]>([]);
  const [introReady, setIntroReady] = useState(false);

  const pVal = useRef(0);
  const halfFired = useRef(false);
  const exiting = useRef(false);
  const finishing = useRef(false);
  const finishScheduled = useRef(false);
  const mountTime = useRef(Date.now());
  const MIN_DURATION = 14500;
  const synthTweens = useRef<gsap.core.Animation[]>([]);

  // ── Scroll lock ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Window ready ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (document.readyState === "complete") {
      setWinReady(true);
      return;
    }
    const fn = () => setWinReady(true);
    window.addEventListener("load", fn);
    return () => window.removeEventListener("load", fn);
  }, []);

  // ── Terminal logs ────────────────────────────────────────────────────────
  useEffect(() => {
    const LOGS = [
      "> Booting creative runtime...",
      "> Mounting type system [OK]",
      "> Composing visual layers...",
      "> Syncing motion curves [OK]",
      "> Rendering pixel geometry...",
      "> Resolving design tokens [OK]",
      "> Preflight checks [OK]",
      "> Canvas ready — enter",
    ];
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        if (i < LOGS.length) {
          setTermLines((p) => [...p.slice(-3), LOGS[i]]);
          i++;
        } else clearInterval(id);
      }, 1800);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  // ── Status cycling ────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setStatusIdx((i) => (i + 1) % STATUS_PAIRS.length),
      1600,
    );
    return () => clearInterval(id);
  }, []);

  // ── Sync progress UI ─────────────────────────────────────────────────────
  const syncUI = useCallback(
    (v: number) => {
      const clamped = Math.min(100, Math.max(0, Math.round(v)));
      if (pctRef.current)
        pctRef.current.textContent = String(clamped).padStart(2, "0");
      if (barFillRef.current)
        barFillRef.current.style.right = `${100 - clamped}%`;
      if (clamped >= 50 && !halfFired.current && onHalfway) {
        halfFired.current = true;
        onHalfway();
      }
    },
    [onHalfway],
  );

  // ── CINEMATIC INTRO ───────────────────────────────────────────────────────
  // Phase 1: vector floats in center on blue curtain
  // Phase 2: curtain + vector scale/expand → blob covers screen
  // Phase 3: curtain dissolves away revealing UI beneath
  // Phase 4: UI panels reveal staggered
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ onComplete: () => setIntroReady(true) });

      // ── Phase 0: container eases in from slight scale — feels organic not abrupt
      tl.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.97, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "expo.out",
        },
      );

      // ── Phase 1: curtain starts full, vector floats in center
      tl.set(curtainRef.current, {
        scaleX: 1,
        scaleY: 1,
        yPercent: 0,
        borderRadius: "0%",
        opacity: 1,
      });
      tl.set(vectorStageRef.current, { opacity: 1 });
      tl.set(introBloomRef.current, { scale: 0.18, opacity: 0 });
      tl.set(introRingRef.current, { scale: 0.35, opacity: 0, rotation: -18 });
      tl.set(introSweepRef.current, { scaleX: 0, opacity: 0 });

      // Vector drifts up with slow float
      tl.fromTo(
        introVecRef.current,
        { y: 72, opacity: 0, scale: 0.42, rotation: -16 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.0,
          ease: "expo.out",
        },
      );

      // Bloom and sweep make the intro feel like it becomes the background
      tl.to(
        introBloomRef.current,
        {
          scale: 9,
          opacity: 0.18,
          duration: 1.05,
          ease: "expo.out",
        },
        "<-=0.08",
      );
      tl.to(
        introSweepRef.current,
        {
          scaleX: 1,
          opacity: 0.35,
          duration: 0.75,
          ease: "expo.out",
        },
        "<+=0.08",
      );
      tl.to(
        introRingRef.current,
        {
          scale: 1.55,
          opacity: 0.55,
          rotation: 32,
          duration: 0.9,
          ease: "expo.out",
        },
        "<+=0.04",
      );
      tl.to(
        introVecRef.current,
        {
          scale: 1.14,
          duration: 0.45,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        "-=0.18",
      );

      // ── Phase 2: vector breaks into the blue field, then the field leaves
      tl.to(
        introVecRef.current,
        {
          scale: 1.85,
          opacity: 0,
          rotation: 120,
          duration: 0.5,
          ease: "expo.inOut",
        },
        "+=0.08",
      );
      tl.to(
        [introBloomRef.current, introRingRef.current, introSweepRef.current],
        {
          opacity: 0,
          scale: 2.4,
          duration: 0.45,
          ease: "sine.out",
        },
        "<",
      );

      tl.set(vectorStageRef.current, { opacity: 0 });

      // ── Phase 3: curtain exits as one solid panel
      tl.to(curtainRef.current, {
        yPercent: -102,
        duration: 0.95,
        ease: "power4.inOut",
      });

      // ── Phase 4: UI reveals — staggered panels slide in
      // Header clips down
      tl.fromTo(
        headerRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "expo.out" },
        "-=0.5",
      );

      // Footer clips up
      tl.fromTo(
        footerRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        { clipPath: "inset(0% 0 0 0)", duration: 0.55, ease: "expo.out" },
        "<",
      );

      // Right panel wipes in from right
      tl.fromTo(
        rightPanelRef.current,
        { clipPath: "inset(0 0 0 100%)", opacity: 1 },
        { clipPath: "inset(0 0 0 0%)", duration: 0.6, ease: "expo.out" },
        "-=0.35",
      );

      // Name row letters: each word drops from above with stagger
      tl.fromTo(
        [nameFRef.current, nameFuRef.current, nameHRef.current],
        { y: 42, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.12,
        },
        "-=0.45",
      );
      tl.fromTo(
        nameRowRef.current,
        { filter: "blur(8px)" },
        { filter: "blur(0px)", duration: 0.5, ease: "sine.out" },
        "<",
      );

      // Bottom info section slides up
      tl.fromTo(
        mainBodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
        "-=0.5",
      );
    },
    { scope: containerRef, dependencies: [] },
  );

  // ── Continuous idle animations ───────────────────────────────────────────
  useGSAP(
    () => {
      if (!introReady) return;

      // Subtle y-breathe on name words
      gsap.to(nameFRef.current, {
        y: -4,
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0,
      });
      gsap.to(nameFuRef.current, {
        y: -4,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.6,
      });
      gsap.to(nameHRef.current, {
        y: -4,
        duration: 3.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.1,
      });
    },
    { scope: containerRef, dependencies: [introReady] },
  );

  // ── Synthetic progress ────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!introReady) return;
      // Do NOT reset if finishing or done — just stop here
      if (finishing.current || done) return;
      pVal.current = 0;
      syncUI(0);

      const obj = { v: 0 };
      const tl = gsap.timeline({ delay: 0.15 });
      const push = () => {
        if (finishing.current || done || exiting.current) return;
        pVal.current = obj.v;
        syncUI(obj.v);
      };
      tl.to(obj, {
        v: 32,
        duration: 3.2,
        ease: "power1.inOut",
        onUpdate: push,
      });
      tl.to(obj, {
        v: 58,
        duration: 3.4,
        ease: "power1.inOut",
        onUpdate: push,
      });
      tl.to(obj, {
        v: 78,
        duration: 3.0,
        ease: "power1.inOut",
        onUpdate: push,
      });
      tl.to(obj, {
        v: 92,
        duration: 4.8,
        ease: "power2.out",
        onUpdate: push,
        onComplete: () => {
          if (finishing.current || done || exiting.current) return;
          pVal.current = 92;
          syncUI(92);
        },
      });
      synthTweens.current = [tl];
    },
    { scope: containerRef, dependencies: [introReady, syncUI] },
  );

  // ── External progress → 100 ──────────────────────────────────────────────
  useEffect(() => {
    if (
      progress >= 100 &&
      winReady &&
      !done &&
      !exiting.current &&
      !finishScheduled.current
    ) {
      finishScheduled.current = true;
      const elapsed = Date.now() - mountTime.current;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      const finish = () => {
        if (done || exiting.current) return;
        finishing.current = true;
        synthTweens.current.forEach((t) => t.kill());
        synthTweens.current = [];
        const obj = { v: pVal.current };
        gsap.to(obj, {
          v: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => {
            pVal.current = obj.v;
            syncUI(obj.v);
          },
          onComplete: () => setDone(true),
        });
      };
      if (remaining > 0) {
        const t = setTimeout(finish, remaining);
        return () => clearTimeout(t);
      } else finish();
    }
  }, [progress, winReady, done, syncUI]);

  // ── Exit ─────────────────────────────────────────────────────────────────
  useGSAP(() => {
    if (!done || exiting.current || !exitFillRef.current) return;
    exiting.current = true;
    // Freeze counter at 100 immediately
    syncUI(100);
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });
    tl.fromTo(
      exitFillRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 1.1, ease: "expo.inOut" },
    );
    tl.to(
      containerRef.current,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0.98,
        duration: 0.95,
        ease: "expo.inOut",
      },
      "-=0.55",
    );
  }, [done, onComplete]);

  const [botStatus, rStatus] = STATUS_PAIRS[statusIdx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap');

        /* ─── Marquee ─────────────────────────────────── */
        @keyframes pl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .pl-marquee-inner {
          display: flex; white-space: nowrap;
          animation: pl-marquee 12s linear infinite;
          will-change: transform;
        }

        /* ─── Stripe drift ──────────────────────────── */
        @keyframes pl-stripe-drift {
          from { background-position: 0 0; }
          to   { background-position: 44px 0; }
        }
        .pl-stripes {
          position: absolute; inset: 0; pointer-events: none;
          background-image: repeating-linear-gradient(
            -55deg,
            rgba(32,86,247,0.04) 0px, rgba(32,86,247,0.04) 1px,
            transparent 1px, transparent 22px
          );
          animation: pl-stripe-drift 5s linear infinite;
        }

        /* ─── Vector spin wrapper — CSS driven from load ─ */
        @keyframes pl-wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .pl-icon-spin-wrap {
          display: flex; align-items: center; justify-content: center;
          will-change: transform;
          animation: pl-wheel-spin 6s linear infinite;
          transform-origin: center;
        }

        /* ─── Intro vector float ────────────────────── */
        @keyframes pl-intro-float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%  { transform: translateY(-14px) rotate(8deg); }
          66%  { transform: translateY(-6px)  rotate(-5deg); }
        }
        .pl-intro-float {
          animation: pl-intro-float 3s ease-in-out infinite;
        }

        /* ─── Vector glow ───────────────────────────── */
        @keyframes pl-glow {
          0%,100% { filter: brightness(0) invert(1) drop-shadow(0 0 0px rgba(255,255,255,0)); }
          50%      { filter: brightness(0) invert(1) drop-shadow(0 0 18px rgba(255,255,255,0.7)); }
        }
        .pl-icon-glow { animation: pl-glow 3s ease-in-out infinite; }

        /* ─── Blue box shimmer ──────────────────────── */
        @keyframes pl-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .pl-blue-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.09) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: pl-shimmer 3.5s linear infinite;
          pointer-events: none;
        }

        /* ─── Ripple dot ────────────────────────────── */
        @keyframes pl-ripple {
          0%   { box-shadow: 0 0 0 0 rgba(32,86,247,0.55); }
          70%  { box-shadow: 0 0 0 9px rgba(32,86,247,0); }
          100% { box-shadow: 0 0 0 0 rgba(32,86,247,0); }
        }
        .pl-dot-live { animation: pl-ripple 1.4s ease-out infinite; }

        /* ─── Cursor blink ──────────────────────────── */
        @keyframes pl-cursor {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        .pl-cursor {
          display: inline-block; width: 0.52em; height: 0.72em;
          background: ${C.blue}; vertical-align: middle; margin-left: 6px;
          animation: pl-cursor 1s step-end infinite;
        }

        /* ─── Status fade ───────────────────────────── */
        @keyframes pl-status-in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: none; }
        }
        .pl-status-val { animation: pl-status-in 0.25s ease; }

        /* ─── Terminal cursor ───────────────────────── */
        @keyframes pl-term-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .pl-term-cursor {
          display: inline-block; width: 7px; height: 13px;
          background: ${C.blue}; vertical-align: middle; margin-left: 4px;
          animation: pl-term-blink 0.9s step-end infinite;
        }

        /* ─── Scanline ──────────────────────────────── */
        @keyframes pl-scan { 0% { top: -4px; } 100% { top: 100%; } }
        .pl-scanline {
          position: absolute; left: 0; right: 0; height: 3px;
          background: linear-gradient(transparent, rgba(32,86,247,0.18), transparent);
          animation: pl-scan 3.5s linear infinite; pointer-events: none;
        }

        /* ─── Terminal line slide ───────────────────── */
        @keyframes pl-tick {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: none; }
        }
        .pl-tick-in { animation: pl-tick 0.22s ease forwards; }

        /* ─── Name fill sweep ───────────────────────── */
        @keyframes pl-fill-sweep {
          0%   { clip-path: inset(0 100% 0 0); }
          45%  { clip-path: inset(0 0%   0 0); }
          55%  { clip-path: inset(0 0%   0 0); }
          100% { clip-path: inset(0 100% 0 0); }
        }
        .pl-name-fill-layer {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          clip-path: inset(0 100% 0 0);
          animation: pl-fill-sweep 5s cubic-bezier(0.77,0,0.18,1) infinite;
          will-change: clip-path;
          white-space: nowrap;
          display: flex;
          align-items: center;
        }
        .pl-name-line-1 .pl-name-fill-layer { animation-delay: 0s; }
        .pl-name-line-2 .pl-name-fill-layer { animation-delay: 0.28s; }
        .pl-name-line-3 .pl-name-fill-layer { animation-delay: 0.56s; }

        /* ─── Name outline styles ───────────────────── */
        .pl-name-row {
          isolation: isolate;
        }
        .pl-name-word {
          position: relative;
          filter: drop-shadow(4px 4px 0 rgba(32,86,247,0.08));
        }
        .pl-name-word::after {
          content: "";
          position: absolute;
          left: 0.04em;
          right: -0.04em;
          bottom: -0.08em;
          height: 0.06em;
          background: ${C.blue};
          transform: scaleX(0);
          transform-origin: left;
          animation: pl-name-mark 1.8s cubic-bezier(.19,1,.22,1) forwards;
          animation-delay: 3.2s;
          z-index: -1;
        }
        .pl-name-line-2::after {
          background: ${C.ink};
          animation-delay: 3.35s;
        }
        .pl-name-line-3::after {
          animation-delay: 3.5s;
        }
        @keyframes pl-name-mark {
          to { transform: scaleX(1); }
        }
        .pl-outline   { -webkit-text-stroke: 2px ${C.ink};  color: transparent; }
        .pl-solid     { color: ${C.ink}; }
        .pl-outline-b { -webkit-text-stroke: 2px ${C.blue}; color: transparent; }

        /* ─── Corner brackets ───────────────────────── */
        .pl-corner { position: absolute; width: 14px; height: 14px; pointer-events: none; }
        .pl-corner-tl { top: 8px;    left: 8px;   border-top:    2px solid ${C.blue}; border-left:   2px solid ${C.blue}; }
        .pl-corner-tr { top: 8px;    right: 8px;  border-top:    2px solid ${C.blue}; border-right:  2px solid ${C.blue}; }
        .pl-corner-bl { bottom: 8px; left: 8px;   border-bottom: 2px solid ${C.blue}; border-left:   2px solid ${C.blue}; }
        .pl-corner-br { bottom: 8px; right: 8px;  border-bottom: 2px solid ${C.blue}; border-right:  2px solid ${C.blue}; }

        /* ─── Responsive ────────────────────────────── */
        /* Mobile: stack layout */
        @media (max-width: 639px) {
          .pl-main-grid { grid-template-columns: 1fr !important; grid-template-rows: 1fr auto !important; }

          /* Right panel: grid 3-col — [blue-box | number | bar] */
          .pl-right-panel {
            border-left: none !important;
            border-top: 2.5px solid ${C.ink} !important;
            display: grid !important;
            grid-template-columns: 120px 1fr 1.6fr !important;
            grid-template-rows: 1fr !important;
            height: 110px !important;
            flex-shrink: 0 !important;
            overflow: hidden !important;
            flex-direction: unset !important;
          }

          .pl-right-panel .pl-status-block { display: none !important; }

          .pl-right-panel .pl-blue-box {
            width: auto !important;
            flex: none !important;
            min-height: unset !important;
            height: 100% !important;
            border-bottom: none !important;
            border-right: 2.5px solid ${C.ink} !important;
          }

          .pl-right-panel .pl-pct-block {
            border-bottom: none !important;
            border-right: 2.5px solid ${C.ink} !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 6px 4px !important;
            height: 100% !important;
          }
          .pl-right-panel .pl-pct-num {
            font-size: 3rem !important;
            min-width: unset !important;
            text-align: center !important;
          }

          .pl-right-panel .pl-bar-block {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            padding: 10px 16px !important;
            border-bottom: none !important;
            height: 100% !important;
          }

          .pl-bottom-section { grid-template-columns: 1fr !important; }
          .pl-name-row {
            flex-direction: column !important;
            gap: 0 !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100% !important;
          }
          .pl-name-word {
            font-size: clamp(3.2rem, 15vw, 5rem) !important;
            display: block !important;
            text-align: center !important;
            line-height: 0.9 !important;
            overflow: hidden !important;
          }
          .pl-name-fill-layer {
            font-size: inherit !important;
            display: block !important;
            top: 0 !important;
          }
          .pl-name-sep  { display: none !important; }
          .pl-footer-left { font-size: 8px !important; }
          .pl-header-right { display: none !important; }
        }

                /* Tablet */
        @media (min-width: 640px) and (max-width: 1023px) {
          .pl-name-word { font-size: clamp(3.3rem, 7vw, 6rem) !important; }
          .pl-right-panel-w { width: 180px !important; }
        }
      `}</style>

      {/* ── Main container ── */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: C.bg,
          display: "grid",
          gridTemplateRows: "52px 1fr 48px",
          overflow: "hidden",
          willChange: "transform",
          fontFamily: "'IBM Plex Mono', monospace",
          opacity: 0,
        }}
      >
        {/* ── EXIT fill ── */}
        <div
          ref={exitFillRef}
          style={{
            position: "absolute",
            inset: 0,
            background: C.blue,
            transform: "scaleY(0)",
            transformOrigin: "bottom",
            zIndex: 50,
            pointerEvents: "none",
          }}
        />

        {/* ══════════════════════════════════════════════
            CINEMATIC CURTAIN (sits above everything)
        ══════════════════════════════════════════════ */}
        <div
          ref={curtainRef}
          style={{
            position: "absolute",
            inset: 0,
            background: C.blue,
            zIndex: 45,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center",
          }}
        >
          {/* Center stage: floating vector during intro */}
          <div
            ref={vectorStageRef}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 220,
              height: 220,
            }}
          >
            <div
              ref={introBloomRef}
              style={{
                position: "absolute",
                width: 132,
                height: 132,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.34) 35%, rgba(255,255,255,0) 72%)",
                filter: "blur(8px)",
                opacity: 0,
                transform: "scale(0.18)",
              }}
            />
            <div
              ref={introRingRef}
              style={{
                position: "absolute",
                width: 156,
                height: 156,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.55)",
                boxShadow: "0 0 0 10px rgba(255,255,255,0.05)",
                opacity: 0,
                transform: "scale(0.35) rotate(-18deg)",
              }}
            />
            <div
              ref={introSweepRef}
              style={{
                position: "absolute",
                width: 160,
                height: 2,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))",
                opacity: 0,
                transform: "scaleX(0)",
              }}
            />
            <div
              ref={introVecRef}
              className="pl-intro-float"
              style={{ opacity: 0, position: "relative", zIndex: 2 }}
            >
              <Image
                src="/preloader/vector.svg"
                alt=""
                aria-hidden
                width={96}
                height={96}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════════ */}
        <header
          ref={headerRef}
          style={{
            borderBottom: `2.5px solid ${C.ink}`,
            display: "grid",
            gridTemplateColumns: "48px 1fr auto",
            opacity: 1, // revealed by clipPath
            clipPath: "inset(0 0 100% 0)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              borderRight: `2.5px solid ${C.ink}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: C.blue,
            }}
          >
            <Image
              src="/preloader/vector.svg"
              alt="FZF"
              width={22}
              height={22}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Marquee */}
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              borderRight: `2.5px solid ${C.ink}`,
            }}
          >
            <div className="pl-marquee-inner">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.ink,
                    padding: "0 24px",
                    borderRight: "1px solid rgba(17,17,17,0.12)",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    whiteSpace: "nowrap",
                    gap: 10,
                  }}
                >
                  <span style={{ color: C.blue }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right label */}
          <div
            className="pl-header-right"
            style={{
              padding: "0 18px",
              display: "flex",
              alignItems: "center",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.ink,
              opacity: 0.4,
              whiteSpace: "nowrap",
            }}
          >
            Portfolio 2026
          </div>
        </header>

        {/* ══════════════════════════════════════════════
            MAIN
        ══════════════════════════════════════════════ */}
        <main
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 220px",
            overflow: "hidden",
          }}
          className="pl-main-grid"
        >
          {/* ── LEFT ── */}
          <div
            style={{
              borderRight: `2.5px solid ${C.ink}`,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ── NAME ROW — horizontal full-width ── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="pl-stripes" />
              <div className="pl-corner pl-corner-tl" />
              <div className="pl-corner pl-corner-tr" />
              <div className="pl-corner pl-corner-bl" />
              <div className="pl-corner pl-corner-br" />

              {/* Horizontal name: FIRAZ · FULVIAN · HAFIZ */}
              <div
                ref={nameRowRef}
                className="pl-name-row"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.15em",
                  position: "relative",
                  zIndex: 1,
                  flexWrap: "wrap",
                }}
              >
                <span
                  ref={nameFRef}
                  className="pl-outline pl-name-word pl-name-line-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3.9rem, 8vw, 8.6rem)",
                    letterSpacing: "-0.015em",
                    lineHeight: 0.9,
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  FIRAZ
                  {/* Solid fill layer sweeps left→right over outline */}
                  <span
                    className="pl-name-fill-layer"
                    aria-hidden
                    style={{
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      lineHeight: "inherit",
                      color: C.ink,
                      WebkitTextStroke: "0px",
                    }}
                  >
                    FIRAZ
                  </span>
                </span>

                {/* separator dot */}
                <span
                  className="pl-name-sep"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.2rem, 4.4vw, 5.4rem)",
                    color: C.blue,
                    lineHeight: 0.9,
                    display: "inline-block",
                    paddingBottom: "0.05em",
                  }}
                >
                  ·
                </span>

                <span
                  ref={nameFuRef}
                  className="pl-solid pl-name-word pl-name-line-2"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3.9rem, 8vw, 8.6rem)",
                    letterSpacing: "-0.015em",
                    lineHeight: 0.9,
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  FULVIAN
                  <span
                    className="pl-name-fill-layer"
                    aria-hidden
                    style={{
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      lineHeight: "inherit",
                      color: C.blue,
                      WebkitTextStroke: "0px",
                    }}
                  >
                    FULVIAN
                  </span>
                </span>

                <span
                  className="pl-name-sep"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.2rem, 4.4vw, 5.4rem)",
                    color: C.blue,
                    lineHeight: 0.9,
                    display: "inline-block",
                    paddingBottom: "0.05em",
                  }}
                >
                  ·
                </span>

                <span
                  ref={nameHRef}
                  className="pl-outline-b pl-name-word pl-name-line-3"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3.9rem, 8vw, 8.6rem)",
                    letterSpacing: "-0.015em",
                    lineHeight: 0.9,
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  HAFIZ
                  <span
                    className="pl-name-fill-layer"
                    aria-hidden
                    style={{
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      lineHeight: "inherit",
                      color: C.blue,
                      WebkitTextStroke: "0px",
                    }}
                  >
                    HAFIZ
                  </span>
                </span>
                <span className="pl-cursor" />
              </div>
            </div>

            {/* ── Bottom info section ── */}
            <div
              ref={mainBodyRef}
              style={{
                borderTop: `2.5px solid ${C.ink}`,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                flexShrink: 0,
                opacity: 0,
              }}
              className="pl-bottom-section"
            >
              {/* Terminal log */}
              <div
                style={{
                  borderRight: `1px solid rgba(17,17,17,0.15)`,
                  padding: "12px 18px",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 130,
                }}
              >
                <div className="pl-scanline" />
                <p
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.ink,
                    opacity: 0.35,
                    marginBottom: 8,
                  }}
                >
                  System Log
                </p>
                {termLines.map((line, i) => (
                  <div
                    key={line}
                    className="pl-tick-in"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.05em",
                      color: i === termLines.length - 1 ? C.blue : C.ink,
                      opacity: i === termLines.length - 1 ? 1 : 0.35 + i * 0.1,
                      marginBottom: 4,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {line}
                    {i === termLines.length - 1 && (
                      <span className="pl-term-cursor" />
                    )}
                  </div>
                ))}
              </div>

              {/* Stack info */}
              <div
                style={{
                  padding: "12px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <p
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.ink,
                    opacity: 0.35,
                    marginBottom: 2,
                  }}
                >
                  Stack
                </p>
                {[
                  ["Framework", "Next.js 14"],
                  ["Motion", "GSAP"],
                  ["Design", "Figma"],
                  ["Language", "TypeScript"],
                  ["Craft", "UI / UX"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(17,17,17,0.1)",
                      paddingBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: C.ink,
                        opacity: 0.4,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        color: C.ink,
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Left bottom strip */}
            <div
              style={{
                borderTop: `2.5px solid ${C.ink}`,
                padding: "8px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                className="pl-dot-live"
                style={{
                  display: "block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.blue,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.ink,
                  opacity: 0.45,
                }}
                className="pl-footer-left"
              >
                Fullstack Developer &amp; Creative — Surabaya, ID
              </span>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            ref={rightPanelRef}
            className="pl-right-panel pl-right-panel-w"
            style={{
              display: "flex",
              flexDirection: "column",
              clipPath: "inset(0 0 0 100%)",
            }}
          >
            {/* Status */}
            <div
              className="pl-status-block"
              style={{
                borderBottom: `2.5px solid ${C.ink}`,
                padding: "10px 14px",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.ink,
                  opacity: 0.4,
                  marginBottom: 4,
                }}
              >
                Status
              </p>
              <span
                key={statusIdx}
                ref={rStatusRef}
                className="pl-status-val"
                style={{ fontSize: 10, color: C.ink, letterSpacing: "0.1em" }}
              >
                {rStatus}
              </span>
            </div>

            {/* Blue box with vector */}
            <div
              className="pl-blue-box"
              style={{
                flex: 1,
                borderBottom: `2.5px solid ${C.ink}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: C.blue,
                position: "relative",
                overflow: "hidden",
                minHeight: 120,
              }}
            >
              <div className="pl-blue-shimmer" />
              <div
                ref={iconSpinRef}
                className="pl-icon-spin-wrap"
                style={{ position: "relative", zIndex: 2 }}
              >
                <Image
                  src="/preloader/vector.svg"
                  alt=""
                  aria-hidden
                  width={72}
                  height={72}
                  className="pl-icon-glow"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: C.bg,
                  border: `2px solid ${C.ink}`,
                  padding: "2px 7px",
                  fontSize: 8,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.ink,
                  transform: "rotate(2.5deg)",
                  boxShadow: `2px 2px 0 ${C.ink}`,
                  zIndex: 3,
                }}
              >
                FZF
              </div>
            </div>

            {/* Percentage */}
            <div
              className="pl-pct-block"
              style={{
                borderBottom: `2.5px solid ${C.ink}`,
                padding: "8px 12px 4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span
                  ref={pctRef}
                  className="pl-pct-num"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "3.8rem",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: C.ink,
                    fontVariantNumeric: "tabular-nums",
                    display: "inline-block",
                    minWidth: "2.2em",
                    textAlign: "right",
                  }}
                >
                  00
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: C.blue,
                    letterSpacing: "0.06em",
                  }}
                >
                  %
                </span>
              </div>
            </div>

            {/* Bar */}
            <div
              className="pl-bar-block"
              style={{ padding: "8px 12px", flexShrink: 0 }}
            >
              <p
                style={{
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.ink,
                  opacity: 0.4,
                  marginBottom: 6,
                }}
              >
                Loading
              </p>
              <div
                style={{
                  height: 8,
                  border: `2px solid ${C.ink}`,
                  background: C.bg,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  ref={barFillRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    right: "100%",
                    background: C.blue,
                    boxShadow: "inset -2px 0 0 rgba(0,0,0,0.22)",
                    transition: "right 0.12s linear",
                  }}
                />
              </div>
            </div>
          </div>
        </main>

        {/* ══════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════ */}
        <footer
          ref={footerRef}
          style={{
            borderTop: `2.5px solid ${C.ink}`,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            clipPath: "inset(100% 0 0 0)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRight: `2.5px solid ${C.ink}`,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.ink,
                opacity: 0.4,
                padding: "0 14px",
                borderRight: `2.5px solid ${C.ink}`,
                whiteSpace: "nowrap",
                lineHeight: "48px",
                flexShrink: 0,
              }}
            >
              Process
            </span>
            <span
              key={statusIdx}
              ref={botStatusRef}
              className="pl-status-val"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.ink,
                padding: "0 16px",
                whiteSpace: "nowrap",
              }}
            >
              {botStatus}
            </span>
          </div>
          <div
            style={{
              padding: "0 20px",
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: C.ink,
              opacity: 0.4,
              display: "flex",
              alignItems: "center",
            }}
          >
            2026
          </div>
        </footer>
      </div>
    </>
  );
}
