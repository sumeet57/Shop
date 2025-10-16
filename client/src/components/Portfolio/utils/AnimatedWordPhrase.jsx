import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AnimatedWordPhrase({
  phrase,
  delay = 1,
  duration = 0.1,
  stagger = 0.1,
  className,
}) {
  const phraseRef = useRef(null);
  const words = phrase.split(" ").map((word, index) => (
    <span key={index} style={{ display: "inline-block", overflow: "hidden" }}>
      {word}
      &nbsp;
    </span>
  ));

  useGSAP(() => {
    if (phraseRef.current) {
      const wordSpans = gsap.utils.toArray(phraseRef.current.children);

      gsap.from(wordSpans, {
        opacity: 0,
        y: -20,
        stagger: stagger,
        delay: delay,
        duration: duration,
        ease: "power2.out",
      });
    }
  }, [phrase, delay, duration, stagger]);

  return (
    <span ref={phraseRef} className={className}>
      {words}
    </span>
  );
}

export default AnimatedWordPhrase;
