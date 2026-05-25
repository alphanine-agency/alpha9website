import React, { useEffect, useState } from "react";
import useLazyMediaSrc from "../../hooks/useLazyMediaSrc";
import "./LazyMedia.css";

function LazyMedia({
  file,
  alt,
  className = "",
  rootMargin,
  as = "img",
  enabled = true,
  ...imgProps
}) {
  const [mediaRef, mediaSrc] = useLazyMediaSrc(file, enabled && Boolean(file), {
    rootMargin,
    isVideo: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mediaSrc) {
      setIsLoaded(false);
    }
  }, [mediaSrc]);

  const classNames = [
    "lazy-media",
    className,
    isLoaded ? "lazy-media--loaded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (as !== "img") {
    return (
      <div ref={mediaRef} className={classNames} aria-hidden={!alt}>
        {!mediaSrc ? (
          <div className="lazy-media__placeholder" />
        ) : (
          <img
            className="lazy-media__img"
            src={mediaSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            {...imgProps}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={mediaRef} className="lazy-media__shell">
      {!mediaSrc ? (
        <div className="lazy-media__placeholder" aria-hidden />
      ) : (
        <img
          className={classNames}
          src={mediaSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          {...imgProps}
        />
      )}
    </div>
  );
}

export default LazyMedia;
