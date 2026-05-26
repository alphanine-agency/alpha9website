import React, { useEffect, useRef, useState } from "react";
import useMobileLite from "../../hooks/useMobileLite";
import "./DeferredSection.css";

function DeferredSection({
  children,
  className = "",
  minHeight = "16rem",
  rootMargin = "280px 0px",
  as: Tag = "div",
}) {
  const mobileLite = useMobileLite();
  const shellRef = useRef(null);
  const [isVisible, setIsVisible] = useState(mobileLite);

  useEffect(() => {
    if (mobileLite) {
      setIsVisible(true);
      return undefined;
    }

    const node = shellRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mobileLite, rootMargin]);

  return (
    <Tag
      ref={shellRef}
      className={`deferred-section ${className}`.trim()}
      style={{ "--deferred-min-height": minHeight }}
    >
      {isVisible ? children : <div className="deferred-section__placeholder" aria-hidden />}
    </Tag>
  );
}

export default DeferredSection;
