import ServiceSummary from "@/sections/ServiceSummary";
import Navbar from "../sections/Navbar";
import Services from "@/sections/Services";
import ReactLenis from "lenis/react";
import About from "@/sections/About";

export default function Home() {
  return (
    <ReactLenis
      root
      className="relative w-screen min-h-screen max-w-full overflow-x-hidden"
    >
      <div className="overflow-hidden">
        <Navbar />
        <ServiceSummary />
      </div>
      <Services />
      <About />
    </ReactLenis>
  );
}
