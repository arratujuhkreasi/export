"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Use "blur" for a blur-to-clear entrance, or "slide" for a classic slide-up */
  variant?: "blur" | "slide";
};

const variants = {
  blur: {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  slide: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "blur",
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants[variant]}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
