import React, { useCallback, useRef, useState } from "react";
import useInViewVideoPlayback from "../../hooks/useInViewVideoPlayback";
import useLazyMediaSrc from "../../hooks/useLazyMediaSrc";
import { getPortfolioMedia } from "../../utils/getPortfolioMedia";

const POSTER_SEEK_TIME = 0.05;

function PortfolioVideoMedia({ item }) {
  const hoverVideoRef = useRef(null);
  const [mediaRef, mediaSrc] = useLazyMediaSrc(item.file, Boolean(item.file), {
    isVideo: true,
  });
  const viewportVideoRef = useInViewVideoPlayback({
    enabled: Boolean(mediaSrc),
    mobileOnly: true,
    resetOnExit: true,
    threshold: 0.5,
    pauseAtTime: POSTER_SEEK_TIME,
  });
  const [hasVideoError, setHasVideoError] = useState(false);
  const [posterReady, setPosterReady] = useState(Boolean(item.poster));
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const staticPosterSrc =
    item.poster && mediaSrc ? getPortfolioMedia(item.poster) : null;
  const showStaticPoster = Boolean(staticPosterSrc) && !isPlaying;

  const primeVideoFrame = useCallback((video) => {
    if (!video || item.poster) {
      return;
    }

    try {
      if (video.readyState >= 1) {
        video.currentTime = POSTER_SEEK_TIME;
      }
    } catch {
      /* ignore seek errors before metadata */
    }
  }, [item.poster]);

  const handleLoadedMetadata = (event) => {
    primeVideoFrame(event.currentTarget);
  };

  const handleSeeked = (event) => {
    const video = event.currentTarget;
    if (!isPlaying && !isHovered) {
      video.pause();
      setPosterReady(true);
    }
  };

  const playVideo = () => {
    const video = hoverVideoRef.current;
    if (!video) {
      return;
    }

    setIsHovered(true);
    setIsPlaying(true);
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const stopVideo = () => {
    const video = hoverVideoRef.current;
    if (!video) {
      return;
    }

    setIsHovered(false);
    setIsPlaying(false);
    video.pause();
    primeVideoFrame(video);
  };

  const handleLoadedData = (event) => {
    if (!item.poster && !isPlaying && !isHovered) {
      event.currentTarget.pause();
      setPosterReady(true);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => {
    if (!isHovered) {
      setIsPlaying(false);
    }
  };

  const videoVisible = isPlaying || posterReady || showStaticPoster;

  return (
    <div
      ref={mediaRef}
      className="portfolio-tile__media-shell portfolio-tile__media-shell--video"
      tabIndex={0}
      aria-label={`${item.title} video preview`}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
      onFocus={playVideo}
      onBlur={stopVideo}
    >
      {!videoVisible ? (
        <div className="portfolio-tile__video-poster-placeholder" aria-hidden />
      ) : null}

      {showStaticPoster ? (
        <img
          className="portfolio-tile__video-poster"
          src={staticPosterSrc}
          alt=""
          aria-hidden
          decoding="async"
          loading="lazy"
        />
      ) : null}

      {mediaSrc ? (
        <video
          ref={(node) => {
            hoverVideoRef.current = node;
            viewportVideoRef.current = node;
          }}
          className={[
            "portfolio-tile__media",
            "portfolio-tile__media--video",
            videoVisible && !showStaticPoster ? "portfolio-tile__media--visible" : "",
            showStaticPoster ? "portfolio-tile__media--under-poster" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          src={mediaSrc}
          muted
          playsInline
          loop
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onSeeked={handleSeeked}
          onPlay={handlePlay}
          onPause={handlePause}
          onError={() => setHasVideoError(true)}
        />
      ) : (
        <div
          className="portfolio-tile__media portfolio-tile__media--placeholder"
          aria-hidden
        />
      )}

      <span
        className={[
          "portfolio-tile__play-hint",
          isPlaying ? "portfolio-tile__play-hint--hidden" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Hover to play
      </span>
      {hasVideoError ? (
        <span className="portfolio-tile__video-fallback">Video preview unavailable</span>
      ) : null}
    </div>
  );
}

export default PortfolioVideoMedia;
