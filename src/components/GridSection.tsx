import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GridItem from "./GridItem";

import p1 from "/p1.svg";
import p2 from "/p2.svg";
import p3 from "/p3.svg";
import p4 from "/p4.svg";

gsap.registerPlugin(ScrollTrigger);

const GridSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const images = [p1, p2, p3, p4];

  // Predefined row and column values for the grid items
  const gridItems = [
    { row: 1, col: 3 },
    { row: 1, col: 7 },
    { row: 2, col: 1 },
    { row: 2, col: 6 },
    { row: 3, col: 4 },
    { row: 3, col: 8 },
    { row: 4, col: 1 },
    { row: 4, col: 4 },
    { row: 5, col: 2 },
    { row: 5, col: 6 },
    { row: 6, col: 3 },
    { row: 6, col: 7 },
    { row: 7, col: 5 },
    { row: 7, col: 8 },
    { row: 8, col: 1 },
    { row: 8, col: 4 },
    { row: 9, col: 2 },
    { row: 9, col: 6 },
    { row: 10, col: 3 },
    { row: 10, col: 7 },
  ];

  // Assign images to grid items
  const gridItemsWithImages = gridItems.map((item, index) => ({
    ...item,
    image: images[index % images.length],
  }));

  useGSAP(() => {
    if (containerRef.current) {
      const elements =
        containerRef.current.querySelectorAll<HTMLDivElement>(".elem");

      elements.forEach((elem) => {
        const image = elem.querySelector<HTMLImageElement>("img");
        if (!image) return;

        const tl = gsap.timeline();
        const xTransform = gsap.utils.random(-100, 100);

        tl.set(image, {
          transformOrigin: xTransform < 0 ? "0% 50%" : "100% 50%",
        })
          .to(
            image,
            {
              scale: 0,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: image,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
            "start"
          )
          .to(
            elem,
            {
              xPercent: xTransform,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
            "start"
          );
      });
    }
  }, [containerRef]);

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden bg-gradient-to-r from-[#000813] via-[#4a0e87] to-[#000813]"
      ref={containerRef}
    >
      <div className="w-full h-full grid grid-cols-8 grid-rows-20 gap-4 p-4 main-working">
        {gridItemsWithImages.map((item, index) => (
          <GridItem
            key={index}
            row={item.row}
            col={item.col}
            image={item.image}
          />
        ))}
      </div>

      <div className="w-full h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-40 bg-transparent pointer-events-none">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-lg">
            Lenis Animation
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-white drop-shadow-md">
            Animation with React
            <span className="block text-sm mt-2">Made with ❤️ by Haris</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GridSection;
