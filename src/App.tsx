// App.tsx
import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";
import HeroSection from "./components/HeroSection";
import GridSection from "./components/GridSection";
import ExplanationSection from "./components/ExplanationSection";
import LoadingScreen from "./components/LoadingScreen"; // Import the LoadingScreen component

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrame = requestAnimationFrame(raf);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {!loadingComplete && (
        <LoadingScreen onLoadingComplete={() => setLoadingComplete(true)} />
      )}
      {loadingComplete && (
        <>
          <ExplanationSection />
          <GridSection />
          <HeroSection />
        </>
      )}
    </>
  );
};

export default App;
