import { useEffect, useRef, useState } from "react";
import { gsap, createTimeline } from "@mahalisunil1/animation";

export function useCarousel(itemCount: number, autoPlayInterval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play logic using GSAP's mathematical index wrapping
  useEffect(() => {
    if (itemCount === 0) return;

    const timer = setInterval(() => {
      // gsap.utils.wrap guarantees boundary safety efficiently
      setCurrentIndex((prev) => gsap.utils.wrap(0, itemCount, prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [itemCount, autoPlayInterval]);

  // Orchestrated Timeline Physics
  useEffect(() => {
    if (!containerRef.current || itemCount === 0) return;
    
    // Abstract the physics to the centralized timeline hook
    const tl = createTimeline();
    
    tl.to(containerRef.current, {
      xPercent: -(100 / itemCount) * currentIndex,
      duration: 0.8,
      ease: "power4.inOut" // Complex mechanical easing
    });
  }, [currentIndex, itemCount]);

  return { currentIndex, containerRef, setCurrentIndex };
}
