import { useEffect, useRef } from "react";

function isMobileViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  const isNarrowScreen = window.matchMedia("(max-width: 820px)").matches;
  const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  return isNarrowScreen && isTouchLike;
}

function useInViewVideoPlayback({
  enabled = true,
  mobileOnly = false,
  resetOnExit = true,
  threshold = 0.45,
  rootMargin = "0px 0px -10% 0px",
} = {}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    if (mobileOnly && !isMobileViewport()) {
      return undefined;
    }

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo = () => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    const stopVideo = () => {
      video.pause();

      if (resetOnExit) {
        video.currentTime = 0;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            playVideo();
          } else {
            stopVideo();
          }
        });
      },
      {
        rootMargin,
        threshold: [0, threshold, 0.75],
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      stopVideo();
    };
  }, [enabled, mobileOnly, resetOnExit, rootMargin, threshold]);

  return videoRef;
}

export default useInViewVideoPlayback;
