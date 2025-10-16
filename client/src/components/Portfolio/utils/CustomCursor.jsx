import React, { useEffect, useState, useContext, useRef } from "react";
import { PortfolioContext } from "../../../Context/Portfolio.context.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CustomCursor = () => {
  const { setCursor, Cursor } = useContext(PortfolioContext);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const [currentCursorPxSize, setCurrentCursorPxSize] = useState(40);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  let { isOn, size, isImg, imgSrc } = Cursor();

  useGSAP(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: position.x - currentCursorPxSize / 2,
        y: position.y - currentCursorPxSize / 2,
        scale: isOn ? size : 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [position, currentCursorPxSize]);

  useEffect(() => {
    if (cursorRef.current) {
      const computedWidth = cursorRef.current.offsetWidth;
      setCurrentCursorPxSize(computedWidth);
    }
  }, [setCursor]);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          mixBlendMode: "difference",
          pointerEvents: "none",
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 border-2 border-white
        ${isImg ? "w-60 h-30" : "w-10 h-10"}
        ${isOn ? "bg-white" : "bg-transparent"}
        `}
      >
        {isOn && isImg && imgSrc ? (
          <img
            src={imgSrc}
            alt="Custom Cursor"
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CustomCursor;
