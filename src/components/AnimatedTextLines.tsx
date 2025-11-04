import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTextLines({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: "100%",
        duration: 1,
        opacity: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });
  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          className="block leading-relaxed tracking-wide text-pretty"
          ref={(el) => {
            if (el) {
              lineRefs.current[index] = el;
            }
          }}
          key={index}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
