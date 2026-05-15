import { useEffect, useRef, useState } from "react";
import { getPortfolioMedia } from "../utils/getPortfolioMedia";

function useLazyMediaSrc(file, enabled = true, rootMargin = "300px 0px") {
  const targetRef = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!enabled || src || !file) {
      return undefined;
    }

    const node = targetRef.current;
    if (!node) {
      return undefined;
    }

    const load = () => {
      setSrc(getPortfolioMedia(file));
    };

    if (typeof IntersectionObserver === "undefined") {
      load();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, file, rootMargin, src]);

  return [targetRef, src];
}

export default useLazyMediaSrc;
