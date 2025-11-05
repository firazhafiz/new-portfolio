import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTextLines from "./AnimatedTextLines";

export default function AnimatedHeaderSection({
  title,
  subtitle,
  text,
  textColor,
  titleColor,
  withScrollTrigger = false,
}: {
  title: string;
  subtitle: string;
  text: string;
  textColor: string;
  titleColor: string;
  withScrollTrigger?: boolean;
}) {
  const contextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<=0.2"
    );
  }, []);
  return (
    <div ref={contextRef}>
      <div
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        className=""
      >
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-12 sm:gap-16"
        >
          <p
            className={`text-sm font-light font-sans tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subtitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-col font-heading text-6xl sm:text-8xl flex-wrap gap-12 ${titleColor} uppercase banner-text-responsive sm:gap-16 md:block`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-1"></div>
        <div className="py-12 sm:py-18 text-end">
          <AnimatedTextLines
            className={`font-light font-sans sm:text-lg text-md uppercase value-text-responsive ${textColor}`}
            text={text}
          />
        </div>
      </div>
    </div>
  );
}
