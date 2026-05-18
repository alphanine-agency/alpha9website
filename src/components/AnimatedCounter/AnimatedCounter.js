import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./AnimatedCounter.css";

function AnimatedCounter({ value, suffix = "", duration = 1600, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, value]);

  useEffect(() => {
    if (!started || reduceMotion) return undefined;

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration, reduceMotion]);

  return (
    <div ref={ref} className="animated-counter">
      <p className="animated-counter__value" aria-hidden>
        {display}
        {suffix}
      </p>
      <p className="sr-only">
        {value}
        {suffix} {label}
      </p>
      {label ? <p className="animated-counter__label">{label}</p> : null}
    </div>
  );
}

export default AnimatedCounter;
