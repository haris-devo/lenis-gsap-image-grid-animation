import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ExplanationSection: React.FC = () => {
  const explanationRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (explanationRef.current) {
      const paragraphs = explanationRef.current.querySelectorAll("p");
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: explanationRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }
  }, [explanationRef]);

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-b from-stone-300 to-neutral-400 relative z-50"
      ref={explanationRef}
    >
      <h2 className="text-5xl font-bold mb-8">What We've Done</h2>
      <p className="text-xl max-w-3xl mb-6">
        Welcome to our stunning animation demo! We've utilized the power of
        React, GSAP, and Lenis to create smooth scrolling animations and
        interactive elements.
      </p>
      <p className="text-xl max-w-3xl mb-6">
        Scroll down to see the grid images animate gracefully, and watch how the
        elements respond to your scrolling.
      </p>
      <p className="text-xl max-w-3xl mb-6">
        This demo showcases how modern web technologies can be combined to
        create engaging and visually appealing user experiences.
      </p>
    </div>
  );
};

export default ExplanationSection;
