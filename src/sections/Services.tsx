"use client";

import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../../constant";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const text = `Behind the Scene, Beyond the Screen.`;
export default function Services() {
  const serviceRefs = useRef<HTMLDivElement[]>([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" });
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  });
  return (
    <section
      id="services"
      className="min-h-screen bg-gray-900 sm:rounded-t-[64px] rounded-t-4xl"
    >
      <AnimatedHeaderSection
        subtitle=""
        title="Services"
        text={text}
        textColor="text-white"
        titleColor="text-[#FFE093]"
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              serviceRefs.current[index] = el;
            }
          }}
          className="sticky px-10 pt-6 pb-12 text-white bg-gray-900 border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-sans font-light">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-heading lg:text-5xl">
                {service.title}
              </h2>
              <p className="text-lg leading-relaxed font-sans font-extralight text-white/60 text-pretty lg:text-xl">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    {/* Menggunakan items-end untuk membuat garis bawah (baseline) penomoran dan judul sejajar */}
                    <h3 className="flex items-end">
                      {/* Penomoran: text-lg dipertahankan */}
                      <span className="mr-8 text-lg text-white/30 w-12 flex-shrink-0">
                        0{itemIndex + 1}.
                      </span>

                      {/* Judul Item: mb-2 DIHAPUS agar sejajar rata bawah sempurna dengan nomor */}
                      <p className="flex-1 text-2xl sm:text-3xl font-bold text-white/80">
                        {item.title}
                      </p>
                    </h3>

                    {/* Deskripsi Item: Tambahkan mt-2 di sini untuk menciptakan gap antara Judul dan Deskripsi */}
                    {item.description && (
                      <p className="text-sm sm:text-base text-white/60 pl-[5rem] mt-4">
                        {item.description}
                      </p>
                    )}

                    {/* Garis pemisah */}
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
