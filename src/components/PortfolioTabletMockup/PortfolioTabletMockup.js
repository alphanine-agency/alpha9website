import React, { useState } from "react";
import useLazyMediaSrc from "../../hooks/useLazyMediaSrc";
import "./PortfolioTabletMockup.css";

function PortfolioTabletMockup({ item, className = "", linkable = true }) {
  const [mediaRef, mediaSrc] = useLazyMediaSrc(item.file, Boolean(item.file));
  const [isLoaded, setIsLoaded] = useState(false);
  const classNames = `portfolio-tablet-mockup ${className}`.trim();
  const shotClass = [
    "portfolio-tablet-mockup__shot",
    isLoaded ? "portfolio-tablet-mockup__shot--loaded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <div className="portfolio-tablet-mockup__device">
      <span className="portfolio-tablet-mockup__camera" aria-hidden />
      <div ref={mediaRef} className="portfolio-tablet-mockup__screen">
        {mediaSrc ? (
          <img
            className={shotClass}
            src={mediaSrc}
            alt={`${item.title} Instagram profile preview`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <div
            className="portfolio-tablet-mockup__shot portfolio-tablet-mockup__shot--placeholder"
            aria-hidden
          />
        )}
      </div>
    </div>
  );

  if (linkable && item.externalUrl) {
    return (
      <a
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
        aria-label={`Visit ${item.handle || item.title} on Instagram (opens in new tab)`}
      >
        {content}
      </a>
    );
  }

  return <div className={classNames}>{content}</div>;
}

export default PortfolioTabletMockup;
