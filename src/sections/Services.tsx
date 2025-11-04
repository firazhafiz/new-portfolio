"use client";

import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const text = `I build secure, high-performance fullstack apps
    with smoothUX and the powerful technologies.`;

export default function Services() {
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
    </section>
  );
}
