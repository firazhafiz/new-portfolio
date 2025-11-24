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

  // Mobile horizontal scroll refs
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileProjectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  const text = `Seamlessly Transforming Ideas into Reality.`;

  // Mobile horizontal scroll dengan ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const setupMobileScroll = (): MobileScrollTween | null => {
      if (window.innerWidth >= 768) {
        // Desktop: cleanup jika ada ScrollTrigger mobile yang masih aktif
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.id === "mobile-horizontal-scroll") {
            st.kill();
          }
        });
        return null;
      }

      // Mobile: setup horizontal scroll
      if (!mobileContainerRef.current || !mobileWrapperRef.current) return null;

      const container = mobileContainerRef.current;
      const wrapper = mobileWrapperRef.current;

      // Hitung dimensi
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const projectWidth = viewportWidth;
      const totalWidth = projectWidth * projects.length;
      // Scroll distance: geser wrapper dari 0 ke -(totalWidth - viewportWidth)
      const scrollDistance = Math.max(0, totalWidth - viewportWidth);

      // Set container dan wrapper dimensions
      gsap.set(container, {
        height: viewportHeight,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#ffffff",
      });
      // Wrapper width harus tepat = jumlah project * viewport width
      gsap.set(wrapper, {
        width: `${totalWidth}px`,
        x: 0,
        display: "flex",
        position: "relative",
        height: "100%",
      });

      // Setup horizontal scroll dengan pin
      // Panjang scroll disetarakan dengan jarak geser horizontal
      const endDistance = Math.max(
        scrollDistance,
        viewportHeight * Math.max(0, projects.length - 1)
      );

      const hostSection = container.closest("section");
      if (hostSection instanceof HTMLElement) {
        hostSection.dataset.prevMinHeight = hostSection.style.minHeight;
        hostSection.style.minHeight = `${viewportHeight + endDistance}px`;
      }

      const scrollTween: GSAPTween = gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          id: "mobile-horizontal-scroll",
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${endDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          markers: false, // Set true untuk debugging
        },
      });

      // Setup animasi untuk setiap project saat scroll
      const animationTriggers: ScrollTrigger[] = [];
      const totalProjects = projects.length;
      const step = totalProjects > 1 ? 1 / (totalProjects - 1) : 1;

      mobileProjectRefs.current.forEach((projectEl, index) => {
        if (!projectEl) return;

        const imageEl = mobileImageRefs.current[index];
        if (!imageEl) return;

        // Set initial state untuk gambar (kecuali project pertama)
        if (index > 0) {
          gsap.set(imageEl, { opacity: 0, scale: 0.95 });
        }

        // Range progress untuk tiap project
        const projectStartProgress = Math.max(0, (index - 1) * step);
        const projectEndProgress = Math.min(1, index * step);

        // Animasi gambar dengan fade + scale yang smooth
        const trigger = ScrollTrigger.create({
          id: `mobile-project-animation-${index}`,
          trigger: container,
          start: "top top",
          end: `+=${endDistance}`,
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            // Trigger animasi saat project masuk viewport
            if (index === 0) {
              // Project pertama langsung visible
              gsap.set(imageEl, { opacity: 1, scale: 1 });
            } else if (
              progress >= projectStartProgress &&
              progress <= projectEndProgress
            ) {
              const localProgress =
                (progress - projectStartProgress) /
                (projectEndProgress - projectStartProgress);
              // Smooth fade in dan scale
              const opacity = Math.min(1, localProgress * 1.2);
              const scale = 0.95 + localProgress * 0.05;

              gsap.to(imageEl, {
                opacity: opacity,
                scale: scale,
                duration: 0.1,
                ease: "none",
              });
            } else if (progress < projectStartProgress) {
              // Reset jika belum masuk
              gsap.set(imageEl, { opacity: 0, scale: 0.95 });
            } else {
              // Pastikan fully visible jika sudah lewat
              gsap.set(imageEl, { opacity: 1, scale: 1 });
            }
          },
        });
        animationTriggers.push(trigger);
      });

      // FIX 171-195: Store animation triggers dan hostSection dengan tipe kustom
      const customScrollTween = scrollTween as MobileScrollTween;
      customScrollTween.animationTriggers = animationTriggers;
      if (hostSection instanceof HTMLElement) {
        customScrollTween.hostSection = hostSection;
      }
      return customScrollTween;
    };

    // Setup initial setelah DOM ready
    let scrollTween: MobileScrollTween | null = null;

    // Setup setelah DOM ready dan images loaded
    const setupAfterReady = () => {
      // Cleanup existing
      if (scrollTween) {
        // FIX 242: Ganti (scrollTween as any)
        const hostSection = scrollTween.hostSection;
        if (hostSection) {
          hostSection.style.minHeight = hostSection.dataset.prevMinHeight ?? "";
          delete hostSection.dataset.prevMinHeight;
        }
        scrollTween.kill();
        // Cleanup animation triggers
        // FIX 250, 251: Ganti (scrollTween as any)
        if (scrollTween.animationTriggers) {
          (scrollTween.animationTriggers as ScrollTrigger[]).forEach(
            (trigger) => trigger.kill()
          );
        }
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.vars.id === "mobile-horizontal-scroll" ||
          st.vars.id?.toString().startsWith("mobile-project-animation")
        ) {
          st.kill();
        }
      });

      scrollTween = setupMobileScroll();
      if (scrollTween) {
        // Refresh setelah setup
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    const timeoutId = setTimeout(setupAfterReady, 800);

    // Juga setup saat window load
    const loadHandler = setupAfterReady;
    if (document.readyState === "complete") {
      setupAfterReady();
    } else {
      window.addEventListener("load", loadHandler, { once: true });
    }

    // Re-setup saat resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.getAll().forEach((st) => {
          if (
            st.vars.id === "mobile-horizontal-scroll" ||
            st.vars.id?.toString().startsWith("mobile-project-animation")
          ) {
            st.kill();
          }
        });
        if (scrollTween) {
          // FIX 271, 280, 281: Ganti (scrollTween as any)
          const hostSection = scrollTween.hostSection;
          if (hostSection) {
            hostSection.style.minHeight =
              hostSection.dataset.prevMinHeight ?? "";
            delete hostSection.dataset.prevMinHeight;
          }
          if (scrollTween.animationTriggers) {
            (scrollTween.animationTriggers as ScrollTrigger[]).forEach(
              (trigger) => trigger.kill()
            );
          }
        }
        scrollTween = setupMobileScroll();
        if (scrollTween) {
          ScrollTrigger.refresh();
        }
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", loadHandler);
      if (scrollTween) {
        const hostSection = scrollTween.hostSection;
        if (hostSection) {
          hostSection.style.minHeight = hostSection.dataset.prevMinHeight ?? "";
          delete hostSection.dataset.prevMinHeight;
        }
        scrollTween.kill();
        // Cleanup animation triggers
        if (scrollTween.animationTriggers) {
          (scrollTween.animationTriggers as ScrollTrigger[]).forEach(
            (trigger) => trigger.kill()
          );
        }
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.vars.id === "mobile-horizontal-scroll" ||
          st.vars.id?.toString().startsWith("mobile-project-animation")
        ) {
          st.kill();
        }
      });
    };
    // FIX 295: Hapus projects.length dari dependency array
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
    <section className="flex flex-col bg-gray-50 min-h-screen" id="projects">
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

      {/* Mobile Layout - Horizontal Scroll */}
      <div
        ref={mobileContainerRef}
        className="md:hidden"
        style={{
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          ref={mobileWrapperRef}
          className="flex h-full"
          style={{ willChange: "transform" }}
        >
          {projects.map((project, index) => (
            <div
              key={`mobile-${project.id}`}
              ref={(el) => {
                if (el) mobileProjectRefs.current[index] = el;
              }}
              className="relative flex flex-col shrink-0 justify-center items-center"
              style={{
                width: "100vw",
                maxWidth: "100vw",
                height: "100vh",
                minHeight: "100vh",
                flexShrink: 0,
              }}
            >
              <div className="flex flex-col w-full px-8 sm:px-12 max-w-xl mx-auto justify-center gap-y-5">
                {/* Title + Description - Fixed height untuk konsistensi */}
                <div
                  className="flex flex-col items-center text-center"
                  style={{ height: "140px", minHeight: "140px" }}
                >
                  {/* Title dengan fixed height untuk 1-2 baris */}
                  <div
                    className="flex items-center gap-2 mb-3 justify-center flex-wrap"
                    style={{
                      height: "64px",
                      minHeight: "64px",
                      maxHeight: "64px",
                    }}
                  >
                    <h2 className="text-2xl sm:text-[28px] font-sans font-bold leading-tight text-black-100 text-center line-clamp-2 flex-1 min-w-0">
                      {project.name}
                    </h2>
                    <Icon
                      icon="uim:arrow-up-right"
                      className="size-4 sm:size-5 text-black-100 shrink-0"
                    />
                  </div>
                  {/* Description dengan fixed height - selalu ada untuk konsistensi */}
                  <div style={{ height: "72px", minHeight: "72px" }}>
                    {project.description && (
                      <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-black-100/70 max-w-[95%] line-clamp-3">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="w-full border-t border-black-100/30"
                  style={{ height: "1px" }}
                />

                {/* Frameworks row - Center dengan fixed height */}
                <div
                  className="flex items-center justify-center"
                  style={{ minHeight: "40px" }}
                >
                  <div className="flex flex-wrap text-[10px] sm:text-xs font-sans font-light leading-loose uppercase gap-x-3 sm:gap-x-5 justify-center">
                    {project.frameworks.map((framework) => (
                      <p key={framework.id} className="text-black-100/80">
                        {framework.name}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Mobile Preview - Fixed height untuk konsistensi */}
                <div
                  ref={(el) => {
                    if (el) mobileImageRefs.current[index] = el;
                  }}
                  className="relative flex items-center justify-center"
                  style={{ height: "320px", minHeight: "320px" }}
                >
                  <Image
                    src={project.bgImage}
                    alt={project.name}
                    width={600}
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
                    height={500}
                    sizes="(max-width: 767px) 75vw, 0px"
                    priority={index < 2}
                    className="absolute object-contain w-4/5 h-auto max-h-[85%] rounded-md"
                    style={{ maxWidth: "85%" }}
                    onError={handleImgError}
                  />
                </div>

                {/* Buttons - Center dengan fixed height dan proporsi - selalu ada untuk konsistensi */}
                <div
                  className="flex gap-3 justify-center items-center"
                  style={{ height: "44px", minHeight: "44px" }}
                >
                  {project.preview ? (
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#2056F7] text-white text-xs font-bold hover:bg-[#1a45d6] transition-colors whitespace-nowrap flex items-center justify-center"
                      style={{ height: "40px", minHeight: "40px" }}
                    >
                      Preview
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#2056F7] text-white text-xs font-bold hover:bg-[#1a45d6] transition-colors whitespace-nowrap flex items-center justify-center"
                      style={{ height: "40px", minHeight: "40px" }}
                    >
                      Github
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
