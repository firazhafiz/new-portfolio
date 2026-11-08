"use client";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { projects } from "../../constant";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "programming" | "creative">("all");
  const [isSticky, setIsSticky] = useState(false);

  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null); // Untuk deteksi sticky

  const mouse = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const currentIndexRef = useRef<number | null>(null);
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  const text = `Seamlessly Transforming Ideas into Reality.`;

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Deteksi filter tabs sticky sinkron dengan scroll Projects
  useGSAP(() => {
    if (!sentinelRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sentinelRef.current,
      start: "top top+=16",
      endTrigger: "#projects",
      end: "bottom top+=70",
      onToggle: (self) => setIsSticky(self.isActive),
    });
    return () => st.kill();
  }, []);

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

  // Desktop animations
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

  // Deteksi elemen project di bawah kursor saat scroll / wheel
  const checkElementUnderCursor = useCallback(
    (clientX: number, clientY: number) => {
      if (window.innerWidth < 768) return;

      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return;

      const projectRow = el.closest<HTMLElement>("[data-project-index]");
      if (projectRow) {
        const idxAttr = projectRow.getAttribute("data-project-index");
        const newIndex = idxAttr !== null ? parseInt(idxAttr, 10) : null;

        if (newIndex !== null && newIndex !== currentIndexRef.current) {
          // Tutup overlay project lama
          if (currentIndexRef.current !== null) {
            const prevEl = overlayRefs.current[currentIndexRef.current];
            if (prevEl) {
              gsap.killTweensOf(prevEl);
              gsap.to(prevEl, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                duration: 0.3,
                ease: "power2.in",
              });
            }
          }

          // Buka overlay project baru & ganti preview seketika
          currentIndexRef.current = newIndex;
          setCurrentIndex(newIndex);

          const nextEl = overlayRefs.current[newIndex];
          if (nextEl) {
            gsap.killTweensOf(nextEl);
            gsap.fromTo(
              nextEl,
              { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.15,
                ease: "power2.out",
              }
            );
          }

          if (previewRef.current) {
            gsap.to(previewRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
            });
          }
        }
      } else {
        // Kursor keluar dari baris project (misal scroll ke header / luar section)
        if (currentIndexRef.current !== null) {
          const prevEl = overlayRefs.current[currentIndexRef.current];
          if (prevEl) {
            gsap.killTweensOf(prevEl);
            gsap.to(prevEl, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              duration: 0.4,
              ease: "power2.in",
            });
          }
          currentIndexRef.current = null;
          setCurrentIndex(null);

          if (previewRef.current) {
            gsap.to(previewRef.current, {
              opacity: 0,
              scale: 0.95,
              duration: 0.25,
              ease: "power2.out",
            });
          }
        }
      }
    },
    []
  );

  // Rekam posisi mouse secara global & re-check saat scroll / wheel
  useEffect(() => {
    const onGlobalMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    let ticking = false;
    const onScrollOrWheel = () => {
      if (!lastMousePos.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastMousePos.current) {
            checkElementUnderCursor(
              lastMousePos.current.x,
              lastMousePos.current.y
            );
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", onGlobalMouseMove, { passive: true });
    window.addEventListener("scroll", onScrollOrWheel, { passive: true });
    window.addEventListener("wheel", onScrollOrWheel, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onGlobalMouseMove);
      window.removeEventListener("scroll", onScrollOrWheel);
      window.removeEventListener("wheel", onScrollOrWheel);
    };
  }, [checkElementUnderCursor]);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    if (currentIndexRef.current === index) return;

    if (currentIndexRef.current !== null && currentIndexRef.current !== index) {
      const prevEl = overlayRefs.current[currentIndexRef.current];
      if (prevEl) {
        gsap.killTweensOf(prevEl);
        gsap.to(prevEl, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
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
    if (currentIndexRef.current === index) {
      currentIndexRef.current = null;
      setCurrentIndex(null);

      const el = overlayRefs.current[index];
      if (el) {
        gsap.killTweensOf(el);
        gsap.to(el, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.7,
          ease: "power2.in",
        });
      }

      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;

    lastMousePos.current = { x: e.clientX, y: e.clientY };

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

    if (moveX.current) moveX.current(mouse.current.x);
    if (moveY.current) moveY.current(mouse.current.y);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset["fallbackApplied"]) return;
    img.src = "/assets/header-profile.webp";
    img.dataset["fallbackApplied"] = "true";
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    projects.forEach((p) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = p.image;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <section className="flex flex-col min-h-screen relative" id="projects">
      <AnimatedHeaderSection
        subtitle=""
        title="Projects"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />

      {/* Sentinel: 1px invisible div tepat sebelum filter tabs */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      {/* Filter Tabs — sticky ketika sentinel meninggalkan viewport */}
      <div
        className={`sticky top-3 z-30 flex justify-center transition-all duration-300 pointer-events-none ${
          isSticky ? "py-2" : "pb-6 pt-0"
        }`}
      >
        <div
          className={`flex items-center gap-2 rounded-full border transition-all duration-300 pointer-events-auto ${
            isSticky
              ? "bg-white/80 backdrop-blur-md border-black/10 px-3 py-1.5"
              : "bg-transparent border-transparent px-2 py-0"
          }`}
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full font-sans font-medium text-sm transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-[#2056F7] text-white shadow-sm"
                : "bg-black-100/5 text-black-100 hover:bg-black-100/10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("programming")}
            className={`px-5 py-2 rounded-full font-sans font-medium text-sm transition-all duration-300 ${
              activeFilter === "programming"
                ? "bg-[#2056F7] text-white shadow-sm"
                : "bg-black-100/5 text-black-100 hover:bg-black-100/10"
            }`}
          >
            Programmer
          </button>
          <button
            onClick={() => setActiveFilter("creative")}
            className={`px-5 py-2 rounded-full font-sans font-medium text-sm transition-all duration-300 ${
              activeFilter === "creative"
                ? "bg-[#2056F7] text-white shadow-sm"
                : "bg-black-100/5 text-black-100 hover:bg-black-100/10"
            }`}
          >
            Creative
          </button>
        </div>
      </div>

      {/* Desktop Layout - tetap seperti semula */}
      <div
        className="relative hidden md:flex md:flex-col font-sans font-light"
        onMouseMove={handleMouseMove}
      >
        {filteredProjects.map((project, index) => {
          const isActive = currentIndex === index;
          return (
          <div
            className="relative flex flex-col gap-1 py-5 cursor-pointer md:gap-4"
            key={`desktop-${project.id}`}
            id="project-desktop"
            data-project-index={index}
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

            {/* Title + Description with Zigzag */}
            <div
              className={`flex justify-between transition-all duration-300 flex-row ${
                isActive ? "md:px-12" : "px-10"
              } ${
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
                <h2 className={`lg:text-4xl text-[26px] font-sans font-bold leading-none transition-colors duration-300 ${
                  isActive ? "text-[#FFE093]" : "text-black-100"
                }`}>
                  {project.name}
                </h2>
                {project.description && (
                  <p className={`mt-2 max-w-[60ch] text-xs md:text-sm font-sans font-light leading-relaxed transition-colors duration-300 ${
                    isActive ? "text-white" : "text-black-100/80"
                  }`}>
                    {project.description}
                  </p>
                )}
              </div>

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
                  className={`md:size-6 transition-colors duration-300 ${
                    isActive ? "text-[#FFE093]" : "text-black-100"
                  }`}
                />
              </div>

              <Icon icon="uim:arrow-up-right" className="size-5 md:hidden" />
            </div>

            {/* Divider */}
            <div className="w-full border-t border-black-100" />

            {/* Frameworks row + Desktop Buttons */}
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                isActive ? "md:px-12" : "px-10"
              }`}
            >
              <div
                className={`flex text-xs font-sans font-light leading-loose uppercase md:text-sm gap-x-5 ${
                  index % 2 === 1 ? "md:order-2 md:text-right" : "md:order-1"
                }`}
              >
                {project.frameworks.map((framework) => (
                  <p
                    key={framework.id}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-white" : "text-black-100"
                    }`}
                  >
                    {framework.name}
                  </p>
                ))}
              </div>

              <div
                className={`hidden md:flex gap-3 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                } ${
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
              </div>
            </div>

            {/* Mobile Preview */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[200px] sm:h-[400px]">
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
            {project.preview && (
              <div className="px-10 md:hidden mt-3 flex gap-3">
                <a
                  href={project.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#2056F7] text-white text-xs font-bold"
                >
                  Preview
                </a>
              </div>
            )}
          </div>
          );
        })}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 overflow-hidden aspect-video rounded-lg border border-black/20 pointer-events-none w-[360px] lg:w-[400px] hidden md:block opacity-0"
        >
          {currentIndex !== null && (
            <Image
              src={filteredProjects[currentIndex].image}
              alt="preview"
              width={1200}
              height={800}
              sizes="(min-width: 768px) 400px, 100vw"
              quality={90}
              className="object-cover w-full h-full"
              onError={handleImgError}
            />
          )}
        </div>
        {/* Hidden prefetcher */}
        <div
          aria-hidden
          className="pointer-events-none absolute w-px h-px overflow-hidden -m-px opacity-0"
        >
          {filteredProjects.map((p, i) => (
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
        {filteredProjects.map((project, index) => (
          <div
            key={`mobile-${project.id}`}
            className="mobile-project-card flex flex-col gap-5"
          >
            {/* Project Image - 16:9 Aspect Ratio */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
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
