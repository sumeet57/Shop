import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingScreen = () => {
  const loadingScreenRef = useRef(null);
  const gridContainerRef = useRef(null);
  const progressTextRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const GRID_SIZE = 8; // 8x8 grid
    const TOTAL_PARTICLES = GRID_SIZE * GRID_SIZE;

    // Create particles
    particlesRef.current = [];
    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      gridContainerRef.current.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Animation timeline
    const tl = gsap.timeline();
    const counter = { value: 0 };

    // Initial animation - particles appear from center
    tl.set(particlesRef.current, { scale: 0, opacity: 0 })
      .to(particlesRef.current, {
        duration: 1,
        scale: 1,
        opacity: 0.7,
        stagger: {
          amount: 0.6,
          grid: [GRID_SIZE, GRID_SIZE],
          from: "center",
        },
        ease: "back.out(1.2)",
      })
      // Count up animation
      .to(counter, {
        value: 100,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${Math.floor(
              counter.value
            )}%`;
          }

          // Animate grid based on progress
          const progress = counter.value / 100;
          const activeParticles = Math.floor(TOTAL_PARTICLES * progress);

          particlesRef.current.forEach((particle, i) => {
            if (i < activeParticles) {
              gsap.to(particle, {
                duration: 0.3,
                backgroundColor: "#ffffff",
                scale: 1.2,
                opacity: 1,
              });
            }
          });
        },
      })
      // Completion animation
      .to(particlesRef.current, {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        stagger: {
          amount: 0.4,
          grid: [GRID_SIZE, GRID_SIZE],
          from: "edges",
        },
        ease: "power3.in",
      })
      .to(loadingScreenRef.current, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          if (loadingScreenRef.current) {
            loadingScreenRef.current.style.display = "none";
          }
        },
      });
  }, []);

  return (
    <div
      ref={loadingScreenRef}
      className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center z-[100]"
    >
      <div className="mb-6">
        <div
          ref={gridContainerRef}
          className="grid grid-cols-8 gap-2 w-48 h-48"
        ></div>
      </div>
      <div ref={progressTextRef} className="text-white text-xl font-mono">
        0%
      </div>
      <p className="text-sm text-gray-500 font-mono mt-4 tracking-widest uppercase">
        Loading experience
      </p>

      <div className="text-lg text-gray-700 font-mono mt-52 tracking-widest uppercase">
        <p>currently under development...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
