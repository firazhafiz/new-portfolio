"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import Hero from "./Hero";
import Image from "next/image";

export default function Navbar() {
  const navToggleRef = useRef<HTMLDivElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);
  const menuImageRef = useRef<HTMLDivElement | null>(null);
  const menuLinksWrapperRef = useRef<HTMLDivElement | null>(null);
  const linkHighlighterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const navToggle = navToggleRef.current!;
    const menuOverlay = menuOverlayRef.current!;
    const menuContent = menuContentRef.current!;
    const menuImage = menuImageRef.current!;
    const menuLinksWrapper = menuLinksWrapperRef.current!;
    const linkHighlighter = linkHighlighterRef.current!;

    // Scroll lock helpers
    const root = document.documentElement;
    const body = document.body;
    let savedScrollY = 0;
    const getScrollbarWidth = () => window.innerWidth - root.clientWidth;
    const lockScroll = () => {
      const sbw = getScrollbarWidth();
      savedScrollY = window.scrollY || window.pageYOffset;
      body.style.overflow = "hidden";
      root.style.overflow = "hidden";
      // Prevent layout shift
      if (sbw > 0) body.style.paddingRight = sbw + "px";
      // Freeze page position to avoid jumping after close
      body.style.position = "fixed";
      body.style.top = `-${savedScrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    };
    const unlockScroll = () => {
      body.style.overflow = "";
      root.style.overflow = "";
      body.style.paddingRight = "";
      // Restore scroll position
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, savedScrollY);
    };

    let currentX = 0;
    let targetX = 0;
    const lerpFactor = 0.05;

    let currentHighlighterX = 0;
    let targetHighlighterX = 0;
    let currentHighlighterWidth = 0;
    let targetHighlighterWidth = 0;

    let isMenuOpen = false;
    let isMenuAnimating = false;

    // Prepare split text and initial positions
    const menuLinks =
      menuLinksWrapper.querySelectorAll<HTMLAnchorElement>(".menu-link a");
    menuLinks.forEach((link) => {
      const spans = link.querySelectorAll("span");
      spans.forEach((span, idx) => {
        const split = new SplitText(span, { type: "chars" });
        split.chars.forEach((c: Element) =>
          (c as HTMLElement).classList.add("char")
        );
        if (idx === 1) gsap.set(split.chars, { y: "110%" });
      });
    });

    gsap.set(menuContent, { y: "50%", opacity: 0.25 });
    gsap.set(menuImage, { scale: 0.5, opacity: 0.25 });
    gsap.set(menuLinks, { y: "150%" });
    gsap.set(linkHighlighter, { y: "150%" });

    const defaultLinkText = menuLinksWrapper.querySelector(
      ".menu-link:first-child a span"
    ) as HTMLElement | null;
    if (defaultLinkText) {
      const linkWidth = defaultLinkText.offsetWidth;
      (linkHighlighter as HTMLElement).style.width = linkWidth + "px";
      currentHighlighterWidth = linkWidth;
      targetHighlighterWidth = linkWidth;

      const defaultLinkTextElement = menuLinksWrapper.querySelector(
        ".menu-link:first-child"
      ) as HTMLElement;
      const linkRect = defaultLinkTextElement.getBoundingClientRect();
      const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
      const initialX = linkRect.left - menuWrapperRect.left;
      currentHighlighterX = initialX;
      targetHighlighterX = initialX;
    }

    function toggleMenu() {
      if (isMenuAnimating) return;
      isMenuAnimating = true;

      if (!isMenuOpen) {
        // Lock scroll immediately on open (all breakpoints)
        lockScroll();

        // ANIMASI SAAT MENU BUKA - HAPUS ANIMASI PADA HERO/CONTAINER
        gsap.to(".hero-content", {
          y: "-40%",
          opacity: 0.25,
          duration: 1.25,
          ease: "expo.out",
        });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "expo.out",
          force3D: true,
          immediateRender: true,
          onComplete: () => {
            gsap.set(".hero-content", { y: "40%" });
            gsap.set(".menu-link", { overflow: "visible" });
            isMenuOpen = true;
            isMenuAnimating = false;
          },
        });

        gsap.to(menuContent, {
          y: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
        });

        gsap.to(menuImage, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
        });

        gsap.to(menuLinks, {
          y: "0%",
          duration: 1.25,
          stagger: 0.1,
          delay: 0.25,
          ease: "expo.out",
        });

        gsap.to(linkHighlighter, {
          y: "0%",
          duration: 1,
          delay: 1,
          ease: "expo.out",
        });
      } else {
        gsap.to(".hero-content", {
          y: "0%",
          opacity: 1,
          duration: 1.25,
          ease: "expo.out",
        });

        gsap.to(menuLinks, {
          y: "-200%",
          duration: 1.25,
          ease: "expo.out",
        });

        gsap.to(menuContent, {
          y: "-100%",
          opacity: 0.25,
          duration: 1.25,
          ease: "expo.out",
        });

        gsap.to(menuImage, {
          y: "-100%",
          opacity: 0.5,
          duration: 1.25,
          ease: "expo.out",
        });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "expo.out",
          force3D: true,
          immediateRender: true,
          onComplete: () => {
            gsap.set(menuOverlay, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(menuLinks, { y: "150%" });
            gsap.set(linkHighlighter, { y: "150%" });
            gsap.set(menuContent, { y: "50%", opacity: 0.25 });
            gsap.set(menuImage, { y: "0%", scale: 0.5, opacity: 0.25 });
            gsap.set(".menu-link", { overflow: "hidden" });

            gsap.set(menuLinksWrapper, { x: 0 });
            currentX = 0;
            targetX = 0;

            // Unlock on close (all breakpoints)
            unlockScroll();

            isMenuOpen = false;
            isMenuAnimating = false;
          },
        });
      }
    }
    const onToggleClick: EventListener = (e) => {
      e.preventDefault();
      toggleMenu();
    };
    navToggle.addEventListener("click", onToggleClick);

    // Add smooth scroll functionality and hover effects to menu links
    const linkContainers = menuLinksWrapper.querySelectorAll(".menu-link");
    const clickHandlers: Array<{
      anchor: HTMLAnchorElement;
      handler: (e: Event) => void;
    }> = [];
    const hoverHandlers: Array<{
      link: Element;
      onEnter: () => void;
      onLeave: () => void;
    }> = [];

    linkContainers.forEach((link) => {
      // Smooth scroll functionality
      const anchor = link.querySelector("a");
      if (anchor) {
        const clickHandler = (e: Event) => {
          e.preventDefault();
          const linkText = anchor.textContent?.trim();
          if (!linkText) return;

          // Map menu text to section IDs
          const sectionMap: { [key: string]: string } = {
            Home: "home",
            About: "about",
            Services: "services",
            Projects: "works",
            Experience: "experience",
            Certificates: "certificates",
            Contact: "contact",
          };

          const sectionId = sectionMap[linkText];
          if (sectionId) {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
              // Close menu first
              if (isMenuOpen) {
                toggleMenu();
              }
              // Smooth scroll after menu closes
              setTimeout(() => {
                targetSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 1300); // Wait for menu close animation
            }
          }
        };
        anchor.addEventListener("click", clickHandler);
        clickHandlers.push({ anchor, handler: clickHandler });
      }

      // Hover effects
      const onEnter = () => {
        if (window.innerWidth < 1000) return;
        const spans = link.querySelectorAll("a span");
        if (spans.length < 2) return;
        const visibleCopy = spans[0];
        const animatedCopy = spans[1];

        const visibleChars = visibleCopy.querySelectorAll(".char");
        gsap.to(visibleChars, {
          y: "-110%",
          duration: 0.5,
          stagger: 0.03,
          ease: "expo.inOut",
        });

        const animatedChars = animatedCopy.querySelectorAll(".char");
        gsap.to(animatedChars, {
          y: "0%",
          duration: 0.5,
          stagger: 0.03,
          ease: "expo.inOut",
        });

        // Highlighter follow
        const linkRect = (link as HTMLElement).getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
        targetHighlighterX = linkRect.left - menuWrapperRect.left;
        const firstSpan = link.querySelector("a span") as HTMLElement | null;
        targetHighlighterWidth = firstSpan
          ? firstSpan.offsetWidth
          : linkRect.width;
      };

      const onLeave = () => {
        if (window.innerWidth < 1000) return;
        const spans = link.querySelectorAll("a span");
        if (spans.length < 2) return;
        const visibleCopy = spans[0];
        const animatedCopy = spans[1];

        const animatedChars = animatedCopy.querySelectorAll(".char");
        gsap.to(animatedChars, {
          y: "110%",
          duration: 0.5,
          stagger: 0.03,
          ease: "expo.inOut",
        });

        const visibleChars = visibleCopy.querySelectorAll(".char");
        gsap.to(visibleChars, {
          y: "0%",
          duration: 0.5,
          stagger: 0.03,
          ease: "expo.inOut",
        });
      };

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      hoverHandlers.push({ link, onEnter, onLeave });
    });

    // Parallax on overlay move
    const menuOverlayMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1000) return;
      const mouseX = e.clientX;
      const viewportWidth = window.innerWidth;
      const menuLinksWrapperWidth = menuLinksWrapper.offsetWidth;

      const maxMoveLeft = 0;
      const maxMoveRight = viewportWidth - menuLinksWrapperWidth;

      const sensitivityRange = viewportWidth * 0.5;
      const startX = (viewportWidth - sensitivityRange) / 2;
      const endX = startX + sensitivityRange;

      let mousePercentage: number;
      if (mouseX <= startX) mousePercentage = 0;
      else if (mouseX >= endX) mousePercentage = 1;
      else mousePercentage = (mouseX - startX) / sensitivityRange;

      targetX = maxMoveLeft + mousePercentage * (maxMoveRight - maxMoveLeft);
    };
    menuOverlay.addEventListener("mousemove", menuOverlayMouseMove);

    const menuLinksWrapperMouseLeave = () => {
      const defaultLink = menuLinksWrapper.querySelector(
        ".menu-link:first-child"
      ) as HTMLElement;
      const defaultSpan = defaultLink.querySelector("a span") as HTMLElement;
      const linkRect = defaultLink.getBoundingClientRect();
      const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
      targetHighlighterX = linkRect.left - menuWrapperRect.left;
      targetHighlighterWidth = defaultSpan.offsetWidth;
    };
    menuLinksWrapper.addEventListener("mouseleave", menuLinksWrapperMouseLeave);

    // RAF animate loop
    let rafId = 0;
    const animate = () => {
      currentX += (targetX - currentX) * lerpFactor;
      currentHighlighterX +=
        (targetHighlighterX - currentHighlighterX) * lerpFactor;
      currentHighlighterWidth +=
        (targetHighlighterWidth - currentHighlighterWidth) * lerpFactor;

      gsap.to(menuLinksWrapper, {
        x: currentX,
        duration: 0.3,
        ease: "power4.out",
      });
      gsap.to(linkHighlighter, {
        x: currentHighlighterX,
        width: currentHighlighterWidth,
        duration: 0.3,
        ease: "power4.out",
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      navToggle.removeEventListener("click", onToggleClick);
      // Cleanup click handlers
      clickHandlers.forEach(({ anchor, handler }) => {
        anchor.removeEventListener("click", handler);
      });
      // Cleanup hover handlers
      hoverHandlers.forEach(({ link, onEnter, onLeave }) => {
        link.removeEventListener("mouseenter", onEnter);
        if (onLeave) link.removeEventListener("mouseleave", onLeave);
      });
      // Cleanup parallax and wrapper listeners
      menuOverlay.removeEventListener("mousemove", menuOverlayMouseMove);
      menuLinksWrapper.removeEventListener(
        "mouseleave",
        menuLinksWrapperMouseLeave
      );
    };
  }, []);

  return (
    <div className="relative isolate w-screen min-h-screen  text-[#2056F7] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-screen pt-4 px-4 flex justify-between mix-blend-difference z-[1000] will-change-[transform,opacity] [transform:translateZ(0)]">
        <div
          className="nav-toggle p-4 cursor-pointer tracking-wider select-none font-heading uppercase text-sm"
          ref={navToggleRef}
        >
          Menu
        </div>
        <div className="p-4 cursor-pointer font-heading  tracking-wider select-none uppercase text-sm"></div>
      </nav>

      {/* MENU OVERLAY */}
      <div
        className="menu-overlay fixed top-0 left-0 w-screen h-[100svh] overflow-hidden md:overflow-hidden overscroll-contain [touch-action:pan-y] will-change-[clip-path] [transform:translateZ(0)] bg-[#1e1e1e] text-[#fefff8] z-40 pt-26 md:pt-16 pb-0 md:pb-0 [clip-path:polygon(0%_100%,_100%_100%,_100%_100%,_0%_100%)]"
        ref={menuOverlayRef}
      >
        {/* ... menu content sama persis seperti sebelumnya ... */}
        <div
          className="menu-content hidden md:flex md:absolute md:top-[30%] lg:top-1/2 md:-translate-y-1/2 w-full px-8 pt-8 md:p-10 lg:p-8 justify-between items-start md:items-center md:mb-0"
          ref={menuContentRef}
        >
          <div className="text-left font-heading">
            <p className="uppercase text-[0.8rem] leading-none">Codegrid</p>
            <p className="uppercase text-[0.8rem] leading-none">
              Shoreline Drive
            </p>
            <p className="uppercase text-[0.8rem] leading-none">Oslo</p>
            <br />
            <p className="uppercase text-[0.8rem] leading-none">Edition</p>
            <p className="uppercase text-[0.8rem] leading-none">Vol. 03</p>
            <br />
            <p className="uppercase text-[0.8rem] leading-none">Contact</p>
            <p className="uppercase text-[0.8rem] leading-none">
              hello@codegrid.org
            </p>
            <br />
            <p className="uppercase text-[0.8rem] leading-none">Direct</p>
            <p className="uppercase text-[0.8rem] leading-none">
              +47 900 00 000
            </p>
          </div>
          <div className="text-right font-heading">
            <p className="uppercase text-[0.8rem] leading-none">Instagram</p>
            <p className="uppercase text-[0.8rem] leading-none">LinkedIn</p>
            <p className="uppercase text-[0.8rem] leading-none">GitHub</p>
            <br />
            <br />
            <p className="uppercase text-[0.8rem] leading-none">Credits</p>
            <p className="uppercase text-[0.8rem] leading-none">Imprint</p>
            <p className="uppercase text-[0.8rem] leading-none">Ref. 00492X</p>
          </div>
        </div>
        <div
          className="menu-img absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] hidden lg:block"
          ref={menuImageRef}
        >
          <Image
            src="/assets/header-profile.jpg"
            alt="menu-img"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div
          className=" menu-links-wrapper relative md:absolute md:left-0 md:bottom-0 w-full lg:w-max px-8 md:p-6 lg:p-5 flex gap-2 lg:gap-8 flex-col lg:flex-row z-20 mt-0 md:mt-0 mb-0 md:mb-6 lg:mb-0 min-h-[200px] md:min-h-[150px] lg:min-h-0"
          ref={menuLinksWrapperRef}
        >
          {[
            "Home",
            "About",
            "Services",
            "Projects",
            "Experience",
            "Certificates",
            "Contact",
          ].map((txt) => (
            <div className="menu-link relative overflow-hidden" key={txt}>
              <a className="relative uppercase text-light font-[Anton] text-6xl md:text-[4rem] lg:text-[6.5rem] tracking-[0] lg:tracking-[-0.02rem] inline-block overflow-hidden leading-none">
                <span>{txt}</span>
                <span className="absolute top-0 left-0">{txt}</span>
              </a>
            </div>
          ))}
          <div
            className="link-highlighter absolute bottom-0 left-0 w-[250px] h-[0.5rem] bg-[#fca311] z-10 hidden lg:block"
            ref={linkHighlighterRef}
          ></div>
        </div>
      </div>

      {/* HERO DI LUAR CONTAINER */}
      <Hero />
    </div>
  );
}
