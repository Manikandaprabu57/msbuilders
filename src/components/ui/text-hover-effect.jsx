import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  className = "",
  duration = 0.5
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const letters = text.split("");

  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            scale: hoveredIndex === index ? 1.4 : 1,
            y: hoveredIndex === index ? -8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: duration,
          }}
          className="inline-block cursor-default"
          style={{
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : 'normal'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};
