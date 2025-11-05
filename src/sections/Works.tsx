"use client";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { projects } from "../../constant";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Works() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // FIX 1: Definisikan ref array dengan tipe yang benar
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // FIX 2: previewRef harus HTMLDivElement | null
  const previewRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  const text = `Seamlessly Transforming Ideas into Reality.`;

  // FIX 3: Tambahkan dependency array kosong agar hanya jalan sekali
  useGSAP(() => {
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

    // Animasi masuk project
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
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

    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;

    // FIX 5: Pastikan moveX dan moveY sudah ada
    if (moveX.current) moveX.current(mouse.current.x);
    if (moveY.current) moveY.current(mouse.current.y);
  };

  return (
    <section className="flex flex-col min-h-screen" id="works">
      <AnimatedHeaderSection
        subtitle=""
        title="Works"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />

      <div
        className="relative flex flex-col font-sans font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-4"
            key={project.id}
            id="project"
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

            {/* Title */}
            <div className="flex justify-between px-10 text-black-100 transition-all duration-500 md:group-hover:px-12 md:group-hover:text-[#FFE093]">
              <h2 className="lg:text-4xl text-[26px] font-sans font-bold leading-none">
                {project.name}
              </h2>
              <Icon icon="uim:arrow-up-right" className="md:size-6 size-5" />
            </div>

            {/* Divider */}
            <div className="w-full border-t border-black-100" />

            {/* Frameworks */}
            <div className="flex px-10 text-xs font-sans font-light leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black-100 transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            {/* Mobile Preview */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
              <Image
                src={project.bgImage}
                alt={project.name}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-xl brightness-50"
              />
              <Image
                src={project.image}
                alt={project.name}
                width={800}
                height={400}
                className="absolute object-contain w-3/4 rounded-md"
              />
            </div>
          </div>
        ))}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-4 rounded-xl border-black-100 pointer-events-none w-[780px] hidden md:block opacity-0"
        >
          {currentIndex !== null && (
            <Image
              src={projects[currentIndex].image}
              alt="preview"
              width={2000}
              height={2000}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
