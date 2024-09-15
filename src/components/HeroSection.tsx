import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Ball from "./Ball";

const HeroSection: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (marqueeRef.current) {
      const marqueeContent =
        marqueeRef.current.querySelectorAll(".marquee-content");

      marqueeContent.forEach((marquee) => {
        const distance = (marquee as HTMLElement).offsetWidth / 2;

        gsap.to(marquee, {
          x: -distance,
          duration: 20,
          ease: "linear",
          repeat: -1,
        });
      });
    }
  }, [marqueeRef]);

  return (
    <div
      className="relative flex items-center w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-800 overflow-hidden z-50"
      ref={marqueeRef}
    >
      {[...Array(20)].map((_, i) => (
        <Ball key={i} balls={ballsRef} />
      ))}

      <div className="marquee-wrapper absolute flex">
        <div className="marquee-content text-6xl md:text-9xl font-bold text-white flex">
          <span className="mr-10">🚀 Thank you so much 🚀</span>
          <span className="mr-10">🌟 Explore the Possibilities 🌟</span>
          <span className="mr-10">🔥 Ignite Your Imagination 🔥</span>
        </div>
        <div className="marquee-content text-6xl md:text-9xl font-bold text-white flex">
          <span className="mr-10">🚀 Thank you so much 🚀</span>
          <span className="mr-10">🌟 Explore the Possibilities 🌟</span>
          <span className="mr-10">🔥 Ignite Your Imagination 🔥</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
