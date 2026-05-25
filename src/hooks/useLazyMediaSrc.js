import { useEffect, useRef, useState } from "react";
import { getPortfolioMedia } from "../utils/getPortfolioMedia";
import getMediaRootMargin from "../utils/getMediaRootMargin";
import scheduleHeavyTask from "../utils/scheduleHeavyTask";

function scheduleMediaLoad(callback) {
  if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
    return window.requestIdleCallback(callback, { timeout: 900 });
  }

  return window.requestAnimationFrame(callback);
}

function cancelScheduledLoad(handle) {
  if (typeof window === "undefined" || handle == null) {
    return;
  }

  if (typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(handle);
    return;
  }

  window.cancelAnimationFrame(handle);
}

function useLazyMediaSrc(file, enabled = true, options = {}) {
  const resolvedOptions =
    typeof options === "string" ? { rootMargin: options } : options;
  const isVideo = Boolean(resolvedOptions.isVideo);
  const rootMargin = resolvedOptions.rootMargin ?? getMediaRootMargin(isVideo);

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

    let idleHandle;

    const load = () => {
      idleHandle = scheduleMediaLoad(() => {
        scheduleHeavyTask(() => {
          setSrc(getPortfolioMedia(file));
        });
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      load();
      return () => cancelScheduledLoad(idleHandle);
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
    return () => {
      observer.disconnect();
      cancelScheduledLoad(idleHandle);
    };
  }, [enabled, file, rootMargin, src]);

  return [targetRef, src];
}

export default useLazyMediaSrc;
