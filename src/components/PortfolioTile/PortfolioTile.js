import React from "react";
import PortfolioPhoneMockup from "../PortfolioPhoneMockup/PortfolioPhoneMockup";
import PortfolioTabletMockup from "../PortfolioTabletMockup/PortfolioTabletMockup";
import LazyMedia from "../LazyMedia/LazyMedia";
import PortfolioVideoMedia from "./PortfolioVideoMedia";
import "./PortfolioTile.css";

export function PortfolioMedia({ item }) {
  if (item.type === "video") {
    return <PortfolioVideoMedia item={item} />;
  }

  return (
    <div className="portfolio-tile__media-shell">
      <LazyMedia
        file={item.file}
        alt={item.title}
        className="portfolio-tile__media"
        enabled={Boolean(item.file)}
      />
    </div>
  );
}

const INSTAGRAM_LINK_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
    <path
      fill="currentColor"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.75 1.14 4.92 4.92 0 0 1 1.14 1.75c.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.14 1.75 4.92 4.92 0 0 1-1.75 1.14c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.75-1.14 4.92 4.92 0 0 1-1.14-1.75c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.14-1.75 4.92 4.92 0 0 1 1.75-1.14c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63a6.92 6.92 0 0 0-2.51 1.64A6.92 6.92 0 0 0 .63 4.14C.333 4.902.13 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.912a6.92 6.92 0 0 0 1.64 2.51 6.92 6.92 0 0 0 2.51 1.64c.762.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.912-.558a6.92 6.92 0 0 0 2.51-1.64 6.92 6.92 0 0 0 1.64-2.51c.297-.762.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.912a6.92 6.92 0 0 0-1.64-2.51 6.92 6.92 0 0 0-2.51-1.64c-.762-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
    />
  </svg>
);

function PortfolioTileMeta({ item, placement = "overlay" }) {
  const className =
    placement === "foot" ? "portfolio-tile__foot" : "portfolio-tile__overlay";

  return (
    <div className={className}>
      <div className="portfolio-tile__chips">
        <span className="portfolio-tile__chip">{item.tag}</span>
        <span className="portfolio-tile__chip portfolio-tile__chip--ghost">
          {item.campaign}
        </span>
      </div>
      <h3 className="portfolio-tile__title">{item.title}</h3>
    </div>
  );
}

function PortfolioTile({ item, metaPlacement = "overlay", className = "" }) {
  const stacked = metaPlacement === "foot";
  const tileClass = [
    "portfolio-tile",
    className,
    stacked ? "portfolio-tile--stacked" : "",
    item.type === "instagram" ? "portfolio-tile--instagram" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (item.type === "instagram") {
    return (
      <article className={tileClass}>
        {item.externalUrl ? (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-tile__social-link"
            aria-label={`Visit @${item.handle || "padelchase"} on Instagram (opens in new tab)`}
          >
            {INSTAGRAM_LINK_ICON}
          </a>
        ) : null}
        {item.mockup === "tablet" ? (
          <div className="portfolio-tile__media-shell portfolio-tile__media-shell--tablet">
            <PortfolioTabletMockup
              item={item}
              linkable={false}
              className="portfolio-tablet-mockup--tile"
            />
          </div>
        ) : (
          <div className="portfolio-tile__media-shell portfolio-tile__media-shell--phone">
            <PortfolioPhoneMockup
              item={item}
              showCta={false}
              linkable={false}
              className="portfolio-phone-mockup--tile"
            />
          </div>
        )}
        <PortfolioTileMeta item={item} placement={metaPlacement} />
      </article>
    );
  }

  return (
    <article className={tileClass}>
      <PortfolioMedia item={item} />
      <PortfolioTileMeta item={item} placement={metaPlacement} />
    </article>
  );
}

export default PortfolioTile;
