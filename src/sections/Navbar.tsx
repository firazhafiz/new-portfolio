"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import Hero from "./Hero";
import Image from "next/image";
// Sesuaikan path ini jika lokasi file constants Anda berbeda
import { socials } from "../../constant";
import Link from "next/link";
// Import tipe Lenis dari 'lenis'
import Lenis from "lenis";

interface NavbarProps {
  // Mengganti 'any' dengan tipe Lenis | null | undefined
  lenis: Lenis | null | undefined;
  startAnimation?: boolean;
}

export default function Navbar({ lenis, startAnimation = true }: NavbarProps) {
  // Refs
  const navToggleRef = useRef<HTMLDivElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);
  const menuImageRef = useRef<HTMLDivElement | null>(null);
  const menuLinksWrapperRef = useRef<HTMLDivElement | null>(null);
  const linkHighlighterRef = useRef<HTMLDivElement | null>(null);
  const mobileTopLineRef = useRef<HTMLDivElement | null>(null);
  const mobileBottomLineRef = useRef<HTMLDivElement | null>(null);
  const mobileSocialLineRef = useRef<HTMLDivElement | null>(null);
  const mobileSocialBottomLineRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLDivElement | null>(null);
  const downloadCvRef = useRef<HTMLButtonElement | null>(null);

  // Cached Selectors
  const mobileLinesRef = useRef<HTMLElement[]>([]);
  const menuLinkAsRef = useRef<HTMLElement[]>([]);
  const menuLinkContainersRef = useRef<HTMLElement[]>([]);

  // States

  const isMenuOpen = useRef(false);
  const isMenuAnimating = useRef(false);
  const pendingScrollTarget = useRef<HTMLElement | null>(null); // Parallax States (Tidak berubah)

  const targetX = useRef(0);
  const currentX = useRef(0);
  const targetHighlighterX = useRef(0);
  const currentHighlighterX = useRef(0);
  const targetHighlighterWidth = useRef(0);
  const currentHighlighterWidth = useRef(0);
  const lerpFactor = 0.05;

  const toggleMenu = useCallback(() => {
    if (isMenuAnimating.current) return;
    isMenuAnimating.current = true;

    if (!isMenuOpen.current) {
      // BUKA MENU
      if (lenis) {
        lenis.stop();
      }

      // Hide scrollbar and prevent scrolling
      document.body.style.overflow = "hidden";

      // Animate navbar text colors to white
      if (menuTextRef.current) {
        gsap.to(menuTextRef.current, {
          color: "#ffffff",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      if (downloadCvRef.current) {
        gsap.to(downloadCvRef.current, {
          color: "#ffffff",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Animasi BUKA
      if (heroContentRef.current) {
        const isMobile = window.innerWidth < 768;
        gsap.to(heroContentRef.current, {
          y: isMobile ? "0%" : "-40%", // NO SLIDING ON MOBILE (Expensive for 3D)
          opacity: 0.25,
          duration: 0.8, // FASTER
          ease: "power3.out",
          force3D: true,
          pointerEvents: "none", // Prevent interactions during menu open
        });
      }

      const isMobile = window.innerWidth < 768;
      gsap.to(menuOverlayRef.current, {
        clipPath: isMobile
          ? "none"
          : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        yPercent: isMobile ? 0 : 0,
        duration: 0.8, // FASTER
        ease: "power3.out",
        force3D: true,
        onStart: () => {
          if (isMobile) {
            gsap.set(menuOverlayRef.current, {
              clipPath: "none",
              yPercent: -100,
            });
          }
        },
        onComplete: () => {
          if (heroContentRef.current && !isMobile)
            gsap.set(heroContentRef.current, { y: "40%" });
          gsap.set(".menu-link", { overflow: "visible" });
          isMenuOpen.current = true;
          isMenuAnimating.current = false;
        },
      });
      gsap.to(menuContentRef.current, {
        y: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
        force3D: true,
      }); // 🚀 FIX YPERCENT: Animasi gambar dari yPercent:10 ke yPercent:0 (posisi tengah)

      gsap.to(menuImageRef.current, {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        duration: 1.5,
        ease: "expo.out",
        force3D: true,
      });

      gsap.to(menuLinkAsRef.current, {
        y: "0%",
        duration: 1.25,
        stagger: 0.1,
        delay: 0.25,
        ease: "expo.out",
        force3D: true,
      });
      gsap.to(linkHighlighterRef.current, {
        y: "0%",
        duration: 1,
        delay: 1,
        ease: "expo.out",
        force3D: true,
      });
      if (window.innerWidth < 768) {
        gsap.to(mobileLinesRef.current, {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.3,
          ease: "expo.out",
          force3D: true,
        });
      }
    } else {
      // TUTUP MENU

      // Animate navbar text colors back to navy
      if (menuTextRef.current) {
        gsap.to(menuTextRef.current, {
          color: "#2056F7",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      if (downloadCvRef.current) {
        gsap.to(downloadCvRef.current, {
          color: "#2056F7",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.8, // FASTER
          ease: "power3.out",
          overwrite: true,
          force3D: true,
          pointerEvents: "auto", // Restore interactions
          onComplete: () => {
            if (heroContentRef.current) {
              gsap.set(heroContentRef.current, {
                clearProps: "transform,opacity,pointer-events",
              });
            }
          },
        });
      } // Animasi TUTUP

      if (window.innerWidth < 768) {
        gsap.to(mobileLinesRef.current, {
          scaleX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "expo.in",
          force3D: true,
        });
      }
      gsap.to(menuLinkAsRef.current, {
        y: "-200%",
        duration: 1.25,
        ease: "expo.out",
        force3D: true,
      });
      gsap.to(menuContentRef.current, {
        y: "-100%",
        opacity: 0.25,
        duration: 1.25,
        ease: "expo.out",
        force3D: true,
      }); // 🚀 FIX YPERCENT: Animasi gambar ke yPercent:10 (keluar ke bawah) saat menutup

      gsap.to(menuImageRef.current, {
        yPercent: 10,
        opacity: 0.5,
        duration: 1.25,
        ease: "expo.out",
        force3D: true,
      });

      const isMobile = window.innerWidth < 768;
      gsap.to(menuOverlayRef.current, {
        clipPath: isMobile ? "none" : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        yPercent: isMobile ? -100 : 0,
        duration: 1.25,
        ease: "expo.out",
        force3D: true,
        onComplete: () => {
          // Reset states GSAP
          gsap.set(menuOverlayRef.current, {
            clipPath: isMobile
              ? "none"
              : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            yPercent: isMobile ? -100 : 0,
          });
          gsap.set(menuLinkAsRef.current, { y: "150%" });
          gsap.set(linkHighlighterRef.current, { y: "150%" });
          gsap.set(menuContentRef.current, { y: "50%", opacity: 0.25 }); // 🚀 FIX YPERCENT KRITIS: Reset posisi gambar ke yPercent: 10 (posisi awal tersembunyi)

          gsap.set(menuImageRef.current, {
            scale: 0.5,
            opacity: 0.25,
            yPercent: 10,
          });

          gsap.set(".menu-link", { overflow: "hidden" });
          gsap.set(menuLinksWrapperRef.current, { x: 0 });
          mobileLinesRef.current.forEach((el) => {
            if (el) gsap.set(el, { scaleX: 0 });
          });

          isMenuOpen.current = false;
          isMenuAnimating.current = false;

          // Restore scrollbar and scrolling
          document.body.style.overflow = "";

          // Lenis Start dan Scroll
          if (lenis) {
            lenis.start();
          }

          if (pendingScrollTarget.current && lenis) {
            lenis.scrollTo(pendingScrollTarget.current, {
              offset: 0,
              duration: 1.5,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            pendingScrollTarget.current = null;
          }
        },
      });
    }
  }, [lenis]);

  const handleMenuLinkClick = useCallback(
    (sectionId: string) => {
      const targetSection = document.getElementById(sectionId);
      if (!targetSection) return;

      if (isMenuOpen.current) {
        pendingScrollTarget.current = targetSection;
        toggleMenu();
      }
    },
    [toggleMenu],
  );
  // ----------------------------------------------------------- // 1. useEffect untuk SETUP Awal (hanya berjalan SEKALI) // -----------------------------------------------------------

  // 1. Initial Setup (Selector Caching & SplitText)
  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);

      const navToggle = navToggleRef.current!;
      const menuLinksWrapperSetup = menuLinksWrapperRef.current!;

      // Cache Selectors
      menuLinkContainersRef.current = gsap.utils.toArray(".menu-link");
      menuLinkAsRef.current = gsap.utils.toArray(".menu-link a");
      mobileLinesRef.current = [
        mobileTopLineRef.current!,
        mobileBottomLineRef.current!,
        mobileSocialLineRef.current!,
        mobileSocialBottomLineRef.current!,
      ].filter(Boolean);

      // Initial Split Text
      menuLinkAsRef.current.forEach((link) => {
        const spans = link.querySelectorAll("span");
        spans.forEach((span, idx) => {
          const split = new SplitText(span, { type: "chars" });
          split.chars.forEach((c) => (c as HTMLElement).classList.add("char"));
          if (idx === 1) gsap.set(split.chars, { y: "110%" });
        });
      });

      // Initial GSAP Set States
      const isMobile = window.innerWidth < 768;
      gsap.set(menuOverlayRef.current, {
        clipPath: isMobile
          ? "none"
          : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        yPercent: isMobile ? -100 : 0,
      });

      gsap.set(menuContentRef.current, { y: "50%", opacity: 0.25 });
      gsap.set(menuImageRef.current, {
        scale: 0.5,
        opacity: 0.25,
        yPercent: 10,
      });
      gsap.set(menuLinkAsRef.current, { y: "150%" });
      gsap.set(linkHighlighterRef.current, { y: "150%" });

      mobileLinesRef.current.forEach((el) => {
        if (el) gsap.set(el, { scaleX: 0, transformOrigin: "center" });
      });

      const firstLink = menuLinkContainersRef.current[0];
      if (firstLink) {
        const span = firstLink.querySelector("a span") as HTMLElement;
        if (span && linkHighlighterRef.current)
          linkHighlighterRef.current.style.width = span.offsetWidth + "px";
      }

      // --- EVENT LISTENERS ---
      const navToggleHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      };
      navToggle.addEventListener("click", navToggleHandler);

      // Removed manual click handlers for menu links, switching to React onClick

      const hoverHandlers: Array<{
        link: Element;
        onEnter: () => void;
        onLeave: () => void;
      }> = [];
      menuLinkContainersRef.current.forEach((link) => {
        const onEnter = () => {
          if (window.innerWidth < 1000) return;
          const spans = link.querySelectorAll("a span");
          gsap.to(spans[0].querySelectorAll(".char"), {
            y: "-110%",
            duration: 0.5,
            stagger: 0.03,
            ease: "expo.inOut",
            force3D: true,
          });
          gsap.to(spans[1].querySelectorAll(".char"), {
            y: "0%",
            duration: 0.5,
            stagger: 0.03,
            ease: "expo.inOut",
            force3D: true,
          });
          const rect = (link as HTMLElement).getBoundingClientRect();
          const wrapperRect = menuLinksWrapperSetup.getBoundingClientRect();
          targetHighlighterX.current = rect.left - wrapperRect.left;
          targetHighlighterWidth.current =
            (link.querySelector("a span") as HTMLElement)?.offsetWidth ||
            rect.width;
        };

        const onLeave = () => {
          if (window.innerWidth < 1000) return;
          const spans = link.querySelectorAll("a span");
          gsap.to(spans[1].querySelectorAll(".char"), {
            y: "110%",
            duration: 0.5,
            stagger: 0.03,
            ease: "expo.inOut",
            force3D: true,
          });
          gsap.to(spans[0].querySelectorAll(".char"), {
            y: "0%",
            duration: 0.5,
            stagger: 0.03,
            ease: "expo.inOut",
            force3D: true,
          });
          const first = menuLinkContainersRef.current[0] as HTMLElement;
          const span = first.querySelector("a span") as HTMLElement;
          targetHighlighterX.current =
            first.getBoundingClientRect().left -
            menuLinksWrapperSetup.getBoundingClientRect().left;
          targetHighlighterWidth.current = span.offsetWidth;
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        hoverHandlers.push({ link, onEnter, onLeave });
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1000) return;
        const mouseX = e.clientX;
        const vw = window.innerWidth;
        const wrapperWidth = menuLinksWrapperSetup.offsetWidth;
        const maxMove = vw - wrapperWidth;
        const sensitivity = vw * 0.5;
        const start = (vw - sensitivity) / 2;
        const percentage = Math.max(
          0,
          Math.min(1, (mouseX - start) / sensitivity),
        );
        targetX.current = percentage * maxMove;
      };
      menuOverlayRef.current?.addEventListener("mousemove", handleMouseMove);

      const handleMouseLeave = () => {
        targetX.current = 0;
      };
      menuLinksWrapperRef.current?.addEventListener(
        "mouseleave",
        handleMouseLeave,
      );

      let raf = 0;
      const animate = () => {
        currentX.current += (targetX.current - currentX.current) * lerpFactor;
        currentHighlighterX.current +=
          (targetHighlighterX.current - currentHighlighterX.current) *
          lerpFactor;
        currentHighlighterWidth.current +=
          (targetHighlighterWidth.current - currentHighlighterWidth.current) *
          lerpFactor;

        gsap.set(menuLinksWrapperRef.current, {
          x: currentX.current,
          force3D: true,
        });
        gsap.set(linkHighlighterRef.current, {
          x: currentHighlighterX.current,
          width: currentHighlighterWidth.current,
          force3D: true,
        });

        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      const menuOverlay = menuOverlayRef.current;
      const menuLinksWrapperCleanup = menuLinksWrapperRef.current;

      return () => {
        cancelAnimationFrame(raf);
        navToggle.removeEventListener("click", navToggleHandler);
        hoverHandlers.forEach(({ link, onEnter, onLeave }) => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        });
        menuOverlay?.removeEventListener("mousemove", handleMouseMove);
        menuLinksWrapperCleanup?.removeEventListener(
          "mouseleave",
          handleMouseLeave,
        );
      };
    },
    { scope: menuOverlayRef, dependencies: [toggleMenu] },
  );

  // 2. Lenis Control
  useGSAP(
    () => {
      // Empty for now, as stop/start are handled in toggleMenu
    },
    { dependencies: [lenis, toggleMenu] },
  );

  return (
    <div className="relative isolate w-screen h-screen text-[#2056F7] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-screen pt-4 px-4 flex justify-between z-1000">
        <div
          ref={(el) => {
            navToggleRef.current = el;
            menuTextRef.current = el;
          }}
          className="nav-toggle relative p-4 cursor-pointer tracking-wider select-none font-heading uppercase text-sm text-[#2056F7]"
        >
          Menu
        </div>

        <Link
          href="https://drive.google.com/file/d/1WLtyegPGCBBI3CvrGBsOCCjIFWwgyBNZ/view?usp=drive_link"
          rel="noopener noreferrer"
          target="_blank"
        >
          <button
            ref={downloadCvRef}
            className="pr-6 pt-4 tracking-wider cursor-pointer select-none font-heading uppercase text-sm text-[#2056F7]"
          >
            Download Cv
          </button>
        </Link>
      </nav>

      <div
        ref={menuOverlayRef}
        className="menu-overlay min-h-screen fixed top-0 left-0 w-screen h-svh bg-[#1e1e1e] text-[#fefff8] z-40 pt-16 [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] will-change-[clip-path,transform]"
      >
        {/* Mobile Decor */}
        <div className="md:hidden flex flex-col items-center gap-4 pt-12 pb-6 text-center">
          <div className="w-full px-6">
            <div ref={mobileTopLineRef} className="border-t border-white/15" />
          </div>

          <div className="font-heading text-3xl tracking-[0.3em] uppercase">
            FH
          </div>

          <div className="w-full px-6">
            <div
              ref={mobileBottomLineRef}
              className="border-t border-white/15"
            />
          </div>
        </div>
        {/* Desktop Content */}
        <div
          ref={menuContentRef}
          className="menu-content hidden md:flex md:absolute md:top-[30%] lg:top-1/2 md:-translate-y-1/2 w-full px-8 pt-8 md:p-10 lg:p-8 justify-between"
        >
          <div className="text-left font-heading text-[0.8rem] uppercase leading-none space-y-1">
            <p>Razhaaf</p> <p>Shoreline Drive</p>
            <p>Surabaya</p>
            <br /> <p>Edition</p>
            <p>Vol. 03</p>
            <br /> <p>Contact</p>
            <p>firazfulvianhafiz05@gmail.com</p>
            <br /> <p>Direct</p>
            <p>+62 823-3267-6848</p>
          </div>

          <div className="text-right font-heading text-[0.8rem] uppercase leading-none space-y-1">
            <Link
              href="https://www.instagram.com/razhaaf"
              rel="noopener noreferrer"
              target="_blank"
            >
              <p>Instagram</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/firazhafiz/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <p>LinkedIn</p>
            </Link>
            <Link
              href="https://github.com/firazhafiz/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <p>Github</p>
            </Link>
            <br />
            <br /> <p>Credits</p>
            <p>Imprint</p> <p>Ref. 00492X</p>
          </div>
        </div>

        <div
          ref={menuImageRef} // 🚀 FIX CSS: Kembalikan -translate-y-1/2 agar CSS menempatkan gambar di tengah. // GSAP yPercent akan menambahkan offset di atas posisi ini.
          className="menu-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[200px] hidden lg:block"
        >
          <Image
            src="/assets/header-profile.jpg"
            alt="profile"
            width={600}
            height={600}
            className="rounded-lg"
            priority
          />
        </div>

        <div
          ref={menuLinksWrapperRef}
          className="menu-links-wrapper relative md:absolute md:left-0 md:bottom-0 w-full lg:w-max px-8 md:p-6 lg:p-5 flex gap-2 lg:gap-8 flex-col lg:flex-row items-center md:items-start text-center md:text-left z-20 mb-6 lg:mb-0 min-h-[200px] md:min-h-[150px] lg:min-h-0"
        >
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Services", id: "services" },
            { name: "Projects", id: "projects" },
            { name: "Experience", id: "experiences" },
            { name: "Certificates", id: "certifications" },
            { name: "Contact", id: "contact" },
          ].map((link, idx) => (
            <div
              ref={(el) => {
                if (el) menuLinkContainersRef.current[idx] = el;
              }}
              className="menu-link relative overflow-hidden cursor-pointer"
              key={link.id}
              data-section={link.id}
              onClick={() => handleMenuLinkClick(link.id)}
            >
              <a className="relative uppercase font-[Anton] text-2xl md:text-[4rem] lg:text-[6.5rem] tracking-[0.12em] md:tracking-[0] lg:tracking-[-0.02rem] inline-block overflow-hidden leading-none">
                <span>{link.name}</span>
                <span className="absolute top-0 left-0">{link.name}</span>
              </a>
            </div>
          ))}

          <div
            ref={linkHighlighterRef}
            className="link-highlighter absolute bottom-0 left-0 h-2 bg-[#fca311] hidden lg:block"
          ></div>
        </div>
        {/* Mobile Social */}
        <div className="md:hidden flex flex-col items-center gap-3 py-10 text-xs uppercase tracking-[0.3em] text-white/70 ">
          <div className="w-full px-6">
            <div
              ref={mobileSocialLineRef}
              className="border-t border-white/15"
            />
          </div>
          {/* ✅ INTEGRASI SOSIAL MEDIA */}
          <div className="flex flex-col items-center gap-2">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                {/* <item.icon className="inline-block w-3 h-3" /> */}
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          <div className="w-full px-6">
            <div
              ref={mobileSocialBottomLineRef}
              className="border-t border-white/15"
            />
          </div>
        </div>
      </div>
      {/* HERO DIBUNGKUS REF */}
      <div ref={heroContentRef}>
        <Hero startAnimation={startAnimation} />
      </div>
    </div>
  );
}
