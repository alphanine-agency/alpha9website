import React, { useEffect, useState } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import "./CursorGlow.css";

function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return undefined;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const finePointer = window.matchMedia("(pointer: fine)");

    const syncEnabled = () => {
      setEnabled(finePointer.matches && !coarsePointer.matches);
    };

    syncEnabled();
    coarsePointer.addEventListener("change", syncEnabled);
    finePointer.addEventListener("change", syncEnabled);

    return () => {
      coarsePointer.removeEventListener("change", syncEnabled);
      finePointer.removeEventListener("change", syncEnabled);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled || reduceMotion) return undefined;

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduceMotion, x, y]);

  if (reduceMotion || !enabled) {
    return null;
  }

  return (
    <m.div
      className="cursor-glow"
      aria-hidden
      style={{ x: smoothX, y: smoothY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.25 } }}
    >
      <span className="cursor-glow__core" />
      <span className="cursor-glow__ring" />
    </m.div>
  );
}

export default CursorGlow;
