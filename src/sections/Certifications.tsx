"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import certifications from "../../constant"; // pastikan export default
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection"; // sesuaikan path

gsap.registerPlugin(ScrollTrigger);

const text =
  "Here are some certifications and achievements I've earned throughout my learning journey.";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".cert-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <>
      {/* SECTION DENGAN ANIMATED HEADER */}
      <section ref={sectionRef} id="certifications" className="pb-32 bg-white">
        <div className="">
          {/* Animated Header */}
          <AnimatedHeaderSection
            subtitle=""
            title="Certifications"
            text={text}
            textColor="text-black-100"
            titleColor="text-navy"
          />

          {/* Grid Card – Kontrol ukuran ketat di mobile */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="cert-card group bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-400 flex flex-col overflow-hidden
                 mx-auto                           /* center di mobile */
                 w-full max-w-sm sm:max-w-none     /* batas lebar maksimal di mobile */
                 h-full"
              >
                {/* Gambar – tinggi lebih pendek di mobile */}
                <div
                  className="relative h-44 sm:h-52 md:h-56 cursor-zoom-in bg-gray-50 overflow-hidden"
                  onClick={() => setSelectedImage(cert.image)}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                    unoptimized
                    priority={index < 6}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="text-white text-xs font-medium bg-black/60 px-2.5 py-1 rounded">
                      Click to enlarge
                    </span>
                  </div>
                </div>

                {/* Konten */}
                <div className="p-5 flex flex-col grow">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-3 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 grow">
                    {cert.author}
                  </p>

                  {/* Credential link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 underline mt-auto"
                    >
                      View credential →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition"
              aria-label="Close"
            >
              ×
            </button>

            <div className="bg-white p-4 rounded-xl shadow-2xl max-h-[90vh] overflow-auto">
              <Image
                src={selectedImage}
                alt="Certificate preview"
                width={1100}
                height={800}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
