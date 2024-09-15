import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BallProps {
  balls: React.MutableRefObject<HTMLDivElement[]>;
}

const Ball: React.FC<BallProps> = ({ balls }) => {
  const ballRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ballRef.current) {
      const ball = ballRef.current;
      const size = gsap.utils.random(20, 60);
      const xPos = gsap.utils.random(0, window.innerWidth - size);
      const yPos = gsap.utils.random(0, window.innerHeight - size);

      let speedX = gsap.utils.random(-2, 2) || 0.5;
      let speedY = gsap.utils.random(-2, 2) || 0.5;

      gsap.set(ball, {
        width: size,
        height: size,
        x: xPos,
        y: yPos,
        backgroundColor: gsap.utils.random([
          "#FF6B6B",
          "#FFD93D",
          "#6BCB77",
          "#4D96FF",
          "#843B62",
        ]),
      });

      balls.current.push(ball);

      function animate() {
        let x = gsap.getProperty(ball, "x") as number;
        let y = gsap.getProperty(ball, "y") as number;

        x += speedX;
        y += speedY;

        if (x <= 0 || x >= window.innerWidth - size) {
          speedX *= -1;
        }
        if (y <= 0 || y >= window.innerHeight - size) {
          speedY *= -1;
        }

        gsap.set(ball, { x, y });

        balls.current.forEach((otherBall) => {
          if (otherBall !== ball) {
            const otherX = gsap.getProperty(otherBall, "x") as number;
            const otherY = gsap.getProperty(otherBall, "y") as number;
            const dx = x - otherX;
            const dy = y - otherY;
            const distance = Math.hypot(dx, dy);

            if (
              distance <
              (size + (gsap.getProperty(otherBall, "width") as number)) / 2
            ) {
              speedX *= -1;
              speedY *= -1;
            }
          }
        });

        requestAnimationFrame(animate);
      }

      animate();

      return () => {
        balls.current = balls.current.filter((b) => b !== ball);
      };
    }
  }, [balls]);

  return (
    <div
      ref={ballRef}
      className="ball absolute rounded-full cursor-pointer"
    ></div>
  );
};

export default Ball;
