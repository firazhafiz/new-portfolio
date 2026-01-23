"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { contactInfo } from "../../constant";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopied(type);

    setTimeout(() => setCopied(null), 2000); // hilang setelah 2 detik
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-linear-to-b from-gray-800 to-gray-900 sm:rounded-t-[64px] rounded-t-4xl text-white overflow-hidden"
    >
      {/* Header */}
      <div className="pt-10 pb-24">
        <AnimatedHeaderSection
          subtitle="YOU DREAM IT. I EXECUTE IT"
          title="CONTACT"
          text="Got a question, how or project idea? We'd love to hear from you and discuss further!"
          textColor="text-gray-400"
          titleColor="text-[#FFE093]"
        />
      </div>

      {/* Contact Info */}
      <div className="space-y-20 pb-40">
        {/* E-MAIL */}
        <div className="contact-line border-t border-white/20 pt-10">
          <div className="px-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
              E-mail
            </p>
            <div className="flex items-center justify-between">
              <p className="sm:text-3xl text-lg font-extralight tracking-wide">
                {contactInfo.email}
              </p>

              <button
                onClick={() => handleCopy(contactInfo.email, "email")}
                className="group relative p-3 hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Copy email"
              >
                {copied === "email" ? (
                  <FaCheck className="w-6 h-6 text-green-400 animate-pulse" />
                ) : (
                  <FaRegCopy className="w-6 h-6 text-gray-500 group-hover:text-white transition" />
                )}
                {copied === "email" && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-green-800/90 px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* PHONE */}
        <div className="contact-line border-t border-white/20 pt-10">
          <div className="px-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
              Phone
            </p>
            <div className="flex items-center justify-between">
              <p className="sm:text-3xl text-lg font-extralight tracking-wide">
                +62 823-3267-6848
              </p>

              <button
                onClick={() => handleCopy("+6282332676848", "phone")}
                className="group relative p-3 hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Copy phone"
              >
                {copied === "phone" ? (
                  <FaCheck className="w-6 h-6 text-green-400 animate-pulse" />
                ) : (
                  <FaRegCopy className="w-6 h-6 text-gray-500 group-hover:text-white transition" />
                )}
                {copied === "phone" && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-green-800/90 px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="contact-line border-t border-white/20 pt-10">
          <div className="px-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">
              Social Media
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4 sm:text-xl text-sm">
              {contactInfo.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition font-bold text-gray-100 hover:text-[#FFE093] duration-300"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE – MULUS, TIDAK NUMPUK */}
      <div className="border-t border-white/10 overflow-hidden py-10">
        <div className="flex animate-marquee-infinite whitespace-nowrap">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="flex items-center shrink-0 px-16">
              <span className="text-4xl font-black tracking-wider text-white/10">
                LEt&apos;S CONNECT
              </span>
              <span className="mx-16 text-6xl  text-white/10">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
