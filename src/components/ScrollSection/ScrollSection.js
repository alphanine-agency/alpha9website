import React, { useEffect, useRef, useState } from "react";
import "./ScrollSection.css";

/*
  Lightweight scroll reveal: IntersectionObserver only (no animation libraries).
  Respects reduced motion via class toggle for instant visibility.
*/
function ScrollSection({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`scroll-section ${visible ? "scroll-section--visible" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

export default ScrollSection;
