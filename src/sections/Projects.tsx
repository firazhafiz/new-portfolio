"use client";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { projects } from "../../constant";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Definisikan tipe untuk GSAP/ScrollTrigger yang digunakan di sini
type GSAPTween = gsap.core.Tween;
type GSAPTimeline = gsap.core.Timeline;
type GSAPAnimation = GSAPTween | GSAPTimeline;

// Definisikan tipe untuk ScrollTrigger Tween yang menyimpan properti tambahan
interface MobileScrollTween extends GSAPTween {
  animationTriggers?: ScrollTrigger[];
  hostSection?: HTMLElement;
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // FIX 1: Definisikan ref array dengan tipe yang benar
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // FIX 2: previewRef harus HTMLDivElement | null (namun di code sudah ada default null)
  // Berdasarkan penggunaan, previewRef memang akan berisi HTMLDivElement.
  const previewRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  const text = `Seamlessly Transforming Ideas into Reality.`;

  // Simple vertical animation for mobile
  useGSAP(() => {
    if (window.innerWidth >= 768) return;

    const mobileCards = document.querySelectorAll(".mobile-project-card");
    mobileCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // FIX 3: Desktop animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!previewRef.current) return;

    // Buat quickTo hanya sekali
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    // Animasi masuk project (desktop only)
    if (window.innerWidth >= 768) {
      gsap.from("#project-desktop", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: "#project-desktop",
          start: "top 90%",
        },
      });
    }
  }, []); // <--- PENTING: hanya sekali

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    // FIX 4: Tambahkan spasi di polygon! (0% vs 0 %)
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.7,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;

    const previewEl = previewRef.current;
    const previewWidth = previewEl ? previewEl.offsetWidth : 0;
    const previewHeight = previewEl ? previewEl.offsetHeight : 0;

    const margin = 8;

    let x = e.clientX - previewWidth / 2;
    let y = e.clientY - previewHeight - margin;

    const maxX = Math.max(margin, window.innerWidth - previewWidth - margin);
    x = Math.min(Math.max(margin, x), maxX);
    y = Math.max(margin, y);

    mouse.current.x = x;
    mouse.current.y = y;

    // FIX 5: Pastikan moveX dan moveY sudah ada
    if (moveX.current) moveX.current(mouse.current.x);
    if (moveY.current) moveY.current(mouse.current.y);
  };

  // Fallback handler untuk kegagalan pemuatan gambar (production-safe)
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset["fallbackApplied"]) return;
    img.src = "/assets/header-profile.jpg";
    img.dataset["fallbackApplied"] = "true";
  };

  // Preload semua gambar preview (desktop) dengan kualitas tinggi sejak awal
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Preload semua gambar desktop preview dengan kualitas tinggi
    // Menggunakan link prefetch untuk memanfaatkan Next.js Image optimization
    projects.forEach((p) => {
      // Preload gambar utama untuk desktop preview
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = p.image;
      document.head.appendChild(link);

      // Juga preload bg untuk mobile
      if (p.bgImage) {
        const bgLink = document.createElement("link");
        bgLink.rel = "prefetch";
        bgLink.as = "image";
        bgLink.href = p.bgImage;
        document.head.appendChild(bgLink);
      }
    });
  }, []);

  return (
    <section className="flex flex-col  min-h-screen" id="projects">
      <AnimatedHeaderSection
        subtitle=""
        title="Projects"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />

      {/* Desktop Layout - tetap seperti semula */}
      <div
        className="relative hidden md:flex md:flex-col font-sans font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-4"
            key={`desktop-${project.id}`}
            id="project-desktop"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block bg-black-100 -z-10"
              style={{
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
            />

            {/* Title + Description with Zigzag, Icon opposite side */}
            <div
              className={`flex justify-between px-10 text-black-100 transition-all duration-500 md:group-hover:px-12 md:group-hover:text-[#FFE093] flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div
                className={`flex flex-col items-start ${
                  index % 2 === 1
                    ? "md:items-end md:text-right"
                    : "md:items-start"
                }`}
              >
                <h2 className="lg:text-4xl text-[26px] font-sans font-bold leading-none">
                  {project.name}
                </h2>
                {project.description && (
                  <p className="mt-2 max-w-[60ch] text-xs md:text-sm font-sans font-light leading-relaxed text-black-100/80 transition-colors duration-500 md:group-hover:text-white">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Right/Left side (desktop): arrow only; buttons moved to frameworks row */}
              <div
                className={`hidden md:flex ${
                  index % 2 === 1
                    ? "items-start justify-start"
                    : "items-start justify-end"
                }`}
              >
                <Icon
                  icon={
                    index % 2 === 1 ? "uim:arrow-up-left" : "uim:arrow-up-right"
                  }
                  className="md:size-6"
                />
              </div>

              {/* Icon mobile */}
              <Icon icon="uim:arrow-up-right" className="size-5 md:hidden" />
            </div>

            {/* Divider */}
            <div className="w-full border-t border-black-100" />

            {/* Frameworks row + Desktop Buttons (same row, buttons on arrow side) */}
            <div
              className={`flex items-center justify-between px-10 transition-all duration-500 md:group-hover:px-12`}
            >
              {/* Frameworks list */}
              <div
                className={`flex text-xs font-sans font-light leading-loose uppercase md:text-sm gap-x-5 ${
                  index % 2 === 1 ? "md:order-2 md:text-right" : "md:order-1"
                }`}
              >
                {project.frameworks.map((framework) => (
                  <p
                    key={framework.id}
                    className="text-black-100 transition-colors duration-500 md:group-hover:text-white"
                  >
                    {framework.name}
                  </p>
                ))}
              </div>

              {/* Desktop buttons on arrow side, only visible on hover */}
              <div
                className={`hidden md:flex gap-3 opacity-0 group-hover:opacity-100 ${
                  index % 2 === 1
                    ? "md:order-1 justify-start"
                    : "md:order-2 justify-end"
                }`}
              >
                {project.preview && (
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#2056F7] text-white text-xs font-bold"
                    onMouseEnter={() => {
                      if (previewRef.current)
                        gsap.to(previewRef.current, {
                          opacity: 0,
                          duration: 0.15,
                        });
                    }}
                    onMouseLeave={() => {
                      if (currentIndex !== null && previewRef.current)
                        gsap.to(previewRef.current, {
                          opacity: 1,
                          duration: 0.15,
                        });
                    }}
                  >
                    Preview
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#2056F7] text-white text-xs font-bold"
                    onMouseEnter={() => {
                      if (previewRef.current)
                        gsap.to(previewRef.current, {
                          opacity: 0,
                          duration: 0.15,
                        });
                    }}
                    onMouseLeave={() => {
                      if (currentIndex !== null && previewRef.current)
                        gsap.to(previewRef.current, {
                          opacity: 1,
                          duration: 0.15,
                        });
                    }}
                  >
                    Github
                  </a>
                )}
              </div>
            </div>

            {/* Mobile Preview (di desktop hidden) */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[200px] sm:h-[400px]">
              <Image
                src={project.bgImage}
                alt={project.name}
                width={400}
                height={400}
                sizes="(max-width: 767px) 100vw, 0px"
                priority={index < 2}
                className="object-cover w-full h-full rounded-xl brightness-50"
                onError={handleImgError}
              />
              <Image
                src={project.image}
                alt={project.name}
                width={800}
                height={400}
                sizes="(max-width: 767px) 75vw, 0px"
                priority={index < 2}
                className="absolute object-contain w-3/4 rounded-md"
                onError={handleImgError}
              />
            </div>
            {(project.preview || project.github) && (
              <div className="px-10 md:hidden mt-3 flex gap-3">
                {project.preview && (
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#2056F7] text-white text-xs font-bold"
                  >
                    Preview
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#2056F7] text-white text-xs font-bold"
                  >
                    Github
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 overflow-hidden border-2 rounded-xl border-black-100 pointer-events-none w-[600px] hidden md:block opacity-0"
        >
          {currentIndex !== null && (
            <Image
              src={projects[currentIndex].image}
              alt="preview"
              width={2000}
              height={2000}
              sizes="(min-width: 768px) 600px, 100vw"
              quality={100}
              className="object-cover w-full h-full"
              onError={handleImgError}
            />
          )}
        </div>
        {/* Hidden prefetcher for desktop hover previews - render semua gambar dengan kualitas tinggi sejak awal */}
        <div
          aria-hidden
          className="pointer-events-none absolute w-px h-px overflow-hidden -m-px opacity-0"
        >
          {projects.map((p, i) => (
            <Image
              key={`prefetch-${p.id}`}
              src={p.image}
              alt=""
              width={2000}
              height={2000}
              sizes="(min-width: 768px) 600px, 0px"
              quality={100}
              priority={i < 3}
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover"
            />
          ))}
        </div>
      </div>

      {/* Mobile Layout - Vertical List */}
      <div className="md:hidden flex flex-col gap-12 px-6 pb-10 mt-8">
        {projects.map((project, index) => (
          <div
            key={`mobile-${project.id}`}
            className="mobile-project-card flex flex-col gap-5"
          >
            {/* Project Image - 16:9 Aspect Ratio & HD */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-black-100/10">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                quality={100}
                className="object-cover"
                priority={index < 3}
                onError={handleImgError}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-2xl font-bold font-sans text-black-100 leading-tight">
                  {project.name}
                </h2>
                <div className="flex gap-2 shrink-0 pt-1">
                  {project.preview && (
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#2056F7] text-white rounded-full hover:bg-black-100 transition-colors"
                      aria-label="Preview"
                    >
                      <Icon icon="mdi:eye" className="w-4 h-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black-100 text-white rounded-full hover:bg-[#2056F7] transition-colors"
                      aria-label="Github"
                    >
                      <Icon icon="mdi:github" className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {project.description && (
                <p className="text-sm font-light text-black-100/70 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              )}

              {/* Frameworks */}
              <div className="flex flex-wrap gap-2 mt-1">
                {project.frameworks.map((fw) => (
                  <span
                    key={fw.id}
                    className="text-[10px] uppercase tracking-wider font-medium text-black-100/60 bg-black-100/5 px-2 py-1 rounded-md"
                  >
                    {fw.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
