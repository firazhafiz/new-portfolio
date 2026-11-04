"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { contactInfo } from "../../constant";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  // Efek Overlap Curtain + Zoom Out Parallax:
  // Certifications berhenti saat akhir scroll dan zoom out (scale down & fade),
  // sementara Contact (Footer) meluncur naik overlap di atas Certifications
  useGSAP(
    () => {
      const certEl = document.getElementById("certifications");
      if (!certEl || !sectionRef.current) return;

      const getContactHeight = () =>
        sectionRef.current?.offsetHeight || window.innerHeight;

      // 1. Pin Certifications di viewport saat bottom-nya menyentuh bottom layar
      const pinTrigger = ScrollTrigger.create({
        trigger: certEl,
        start: "bottom bottom",
        end: () => `+=${getContactHeight()}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // 2. Efek Zoom Out halus pada Certifications saat Contact meluncur naik
      const zoomTrigger = gsap.to(certEl, {
        scale: 0.92,
        opacity: 0.55,
        filter: "blur(3px)",
        transformOrigin: "center center",
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: certEl,
          start: "bottom bottom",
          end: () => `+=${getContactHeight()}`,
          scrub: true,
        },
      });

      return () => {
        pinTrigger.kill();
        zoomTrigger.scrollTrigger?.kill();
        zoomTrigger.kill();
      };
    },
    { scope: sectionRef },
  );

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 min-h-screen bg-linear-to-b from-[#141416] via-[#0f0f11] to-[#0a0a0c] sm:rounded-t-[64px] rounded-t-3xl text-white overflow-hidden border-t border-white/10 flex flex-col justify-between"
    >
      {/* 1. Header Section - Template Konsisten */}
      <div className="pt-8 sm:pt-12 pb-8">
        <AnimatedHeaderSection
          subtitle="YOU DREAM IT. I EXECUTE IT"
          title="CONTACT"
          text="Got a question, bold vision, or project idea? Let's build something remarkable together."
          textColor="text-white/60"
          titleColor="text-[#FFE093]"
          withScrollTrigger={true}
        />
      </div>

      {/* 2. Main Contact Body - High-End Minimalist Editorial Layout */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-16 py-6 grow flex flex-col justify-center">
        {/* Featured Big Outreach Link */}
        <div className="border-t border-white/15 pt-8 pb-12 sm:pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-light text-white/40 mb-4">
            Have a project in mind? Say hello
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <a
              href={`mailto:${contactInfo.email}`}
              className="group inline-flex items-center gap-3 text-lg sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-white hover:text-[#FFE093] transition-colors duration-300 break-all"
            >
              <span>{contactInfo.email}</span>
              <span className="text-xl sm:text-3xl text-[#FFE093] transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 shrink-0">
                ↗
              </span>
            </a>

            <button
              onClick={() => handleCopy(contactInfo.email, "email")}
              className="self-start lg:self-center inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white/70 hover:text-white hover:border-[#FFE093] hover:bg-white/5 transition-all duration-300 shrink-0"
              aria-label="Copy email address"
            >
              {copied === "email" ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <FaRegCopy className="w-3.5 h-3.5" />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Minimal Editorial Two-Column Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 border-t border-white/15 pt-10 pb-6">
          {/* Kolom Kiri: Direct Details */}
          <div className="md:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-mono text-white/40 mb-3">
                Direct Line
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+6282332676848"
                  className="text-lg sm:text-xl font-sans font-light text-white/90 hover:text-[#FFE093] transition-colors"
                >
                  +62 823-3267-6848
                </a>
                <button
                  onClick={() => handleCopy("+6282332676848", "phone")}
                  className="text-xs text-white/40 hover:text-[#FFE093] transition-colors p-1"
                  title="Copy phone"
                  aria-label="Copy phone"
                >
                  {copied === "phone" ? (
                    <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <FaRegCopy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-mono text-white/40 mb-2">
                Location & Availability
              </p>
              <p className="text-sm font-sans font-light text-white/70 leading-relaxed">
                Surabaya, Indonesia{" "}
                <span className="text-white/40">(GMT+7)</span>
              </p>
              <p className="text-xs font-sans font-light text-white/50 mt-1">
                Open for full-time engineering roles, remote positions &
                selected freelance projects.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Social Links (Clean Minimal Rows) */}
          <div className="md:col-span-7 flex flex-col">
            <p className="text-xs uppercase tracking-[0.25em] font-mono text-white/40 mb-2">
              Social Presence
            </p>

            <div className="divide-y divide-white/10">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 text-base sm:text-lg font-sans font-light text-white/80 hover:text-white transition-all duration-300"
                >
                  <span className="group-hover:text-[#FFE093] group-hover:translate-x-2 transition-transform duration-300">
                    {social.label}
                  </span>
                  <span className="text-xs text-white/30 group-hover:text-[#FFE093] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Refined Fluid "LET'S CONNECT" Ambient Ribbon */}
      <div className="border-t border-white/10 bg-black/20 overflow-hidden py-6 sm:py-8">
        <div className="flex animate-marquee-infinite whitespace-nowrap">
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} className="flex items-center shrink-0 px-8 sm:px-12">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extralight tracking-[0.25em] uppercase text-white/25 hover:text-white/50 transition-colors select-none">
                Let&apos;s Connect
              </span>
              <span className="mx-8 sm:mx-12 text-sm sm:text-base text-[#FFE093]/40">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Minimalist Footer Bottom Bar (No Back to top button) */}
      <div className="border-t border-white/5 bg-black/50 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans font-light text-white/40">
          <p>© {currentYear} Firaz Fulvian Hafiz. All rights reserved.</p>
          <p>Designed & Built with precision</p>
        </div>
      </div>
    </section>
  );
}
