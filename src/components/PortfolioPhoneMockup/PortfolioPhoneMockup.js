import React from "react";
import useLazyMediaSrc from "../../hooks/useLazyMediaSrc";
import "./PortfolioPhoneMockup.css";

const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
    <path
      fill="currentColor"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.75 1.14 4.92 4.92 0 0 1 1.14 1.75c.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.14 1.75 4.92 4.92 0 0 1-1.75 1.14c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.75-1.14 4.92 4.92 0 0 1-1.14-1.75c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.14-1.75 4.92 4.92 0 0 1 1.75-1.14c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63a6.92 6.92 0 0 0-2.51 1.64A6.92 6.92 0 0 0 .63 4.14C.333 4.902.13 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.912a6.92 6.92 0 0 0 1.64 2.51 6.92 6.92 0 0 0 2.51 1.64c.762.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.912-.558a6.92 6.92 0 0 0 2.51-1.64 6.92 6.92 0 0 0 1.64-2.51c.297-.762.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.912a6.92 6.92 0 0 0-1.64-2.51 6.92 6.92 0 0 0-2.51-1.64c-.762-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
    />
  </svg>
);

function PortfolioPhoneMockup({ item, className = "", showCta = true, linkable = true }) {
  const [mediaRef, mediaSrc] = useLazyMediaSrc(item.file, Boolean(item.file));
  const classNames = `portfolio-phone-mockup ${className}`.trim();
  const content = (
    <>
      <div className="portfolio-phone-mockup__device">
        <span className="portfolio-phone-mockup__button portfolio-phone-mockup__button--silent" aria-hidden />
        <span className="portfolio-phone-mockup__button portfolio-phone-mockup__button--vol-up" aria-hidden />
        <span className="portfolio-phone-mockup__button portfolio-phone-mockup__button--vol-down" aria-hidden />
        <span className="portfolio-phone-mockup__button portfolio-phone-mockup__button--power" aria-hidden />
        <span className="portfolio-phone-mockup__island" aria-hidden />
        <div ref={mediaRef} className="portfolio-phone-mockup__screen">
          {mediaSrc ? (
            <img
              className="portfolio-phone-mockup__shot"
              src={mediaSrc}
              alt={`${item.title} Instagram profile preview`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="portfolio-phone-mockup__shot portfolio-phone-mockup__shot--placeholder"
              aria-hidden
            />
          )}
        </div>
        <span className="portfolio-phone-mockup__home-bar" aria-hidden />
      </div>
      {showCta ? (
        <span className="portfolio-phone-mockup__cta">
          {INSTAGRAM_ICON}
          Visit @{item.handle || "padelchase"}
        </span>
      ) : null}
    </>
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

export default PortfolioPhoneMockup;
