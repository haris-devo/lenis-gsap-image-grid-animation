// components/LoadingScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const layersRef = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null); // Add this line

  useEffect(() => {
    // Set initial position of layers
    if (layersRef.current) {
      const layers = Array.from(layersRef.current.children);
      gsap.set(layers, { yPercent: 0 });
    }

    // Animate the loading percentage
    gsap.to(
      { value: 0 },
      {
        value: 100,
        duration: 3,
        ease: "linear",
        onUpdate: function () {
          setPercentage(Math.round(this.targets()[0].value));
        },
        onComplete: layersAnimation,
      }
    );
  }, []);

  const layersAnimation = () => {
    if (layersRef.current) {
      const layers = Array.from(layersRef.current.children);

      // Animate layers to create parallax effect
      gsap.to(layers, {
        yPercent: -100,
        stagger: 0.2,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Fade out the loading screen
          gsap.to(loadingScreenRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onLoadingComplete,
          });
        },
      });
    }
  };

  return (
    <div className="loading-screen" ref={loadingScreenRef}>
      <div className="layers" ref={layersRef}>
        <div className="layer layer1 text-white">
          <div className="quote text-2xl">
            "The journey of a thousand miles begins with a single step."
          </div>
          <div className="percentage">{percentage}%</div>
        </div>
        <div className="layer layer2"></div>
        <div className="layer layer3"></div>
        <div className="layer layer4"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
