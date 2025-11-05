"use client";

import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../../constant";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const text = `I build secure, high-performance fullstack apps
    with smoothUX and the powerful technologies.`;
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
      className="min-h-screen bg-black-100 rounded-t-[64px]"
    >
      <AnimatedHeaderSection
        subtitle="Behind the Scene, Beyond the Screen"
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
          className="sticky px-10 pt-6 pb-12 text-white bg-black-100 border-t-2 border-white/30"
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
              <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
              <p className="text-lg leading-relaxed tracking-widest text-white/60 text-pretty lg:text-2xl">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-12 text-lg text-white/30">
                        0{itemIndex + 1}.
                      </span>
                      {item.title}
                    </h3>
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
