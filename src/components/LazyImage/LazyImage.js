import React, { useEffect, useRef, useState } from "react";

function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  sizes,
  fetchPriority,
  rootMargin = "280px 0px",
}) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(fetchPriority === "high");

  useEffect(() => {
    if (isVisible || !imgRef.current) {
      return undefined;
    }

    const node = imgRef.current;

    if (typeof IntersectionObserver === "undefined") {
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
  }, [isVisible, rootMargin]);

  return (
    <img
      ref={imgRef}
      className={className}
      src={isVisible ? src : undefined}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={fetchPriority === "high" ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  );
}

export default LazyImage;
