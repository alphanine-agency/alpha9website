import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import PageHero from "../../components/PageHero/PageHero";
import PortfolioPhoneMockup from "../../components/PortfolioPhoneMockup/PortfolioPhoneMockup";
import portfolioGallery from "../../data/portfolioGallery";
import useInViewVideoPlayback from "../../hooks/useInViewVideoPlayback";
import useLazyMediaSrc from "../../hooks/useLazyMediaSrc";
import "./Portfolio.css";

const PADEL_ROW_IDS = new Set([
  "padel-chase-hero",
  "padel-chase-gs",
  "padel-chase-insta",
]);

const GELATO_BRAND_IDS = new Set([
  "gelato-brand-product",
  "gelato-brand-logo",
  "gelato-brand-system",
  "gelato-brand-interior",
]);

function buildMosaicEntries(items) {
  const entries = [];

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const next = items[i + 1];

    if (item.id === "gelato-video") {
      const brandImages = [];
      let j = i + 1;
      while (j < items.length && GELATO_BRAND_IDS.has(items[j].id)) {
        brandImages.push(items[j]);
        j += 1;
      }

      if (brandImages.length >= 4) {
        entries.push({
          type: "gelato-row",
          video: item,
          images: brandImages.slice(0, 4),
        });
        i += brandImages.length;
        continue;
      }
    }

    if (GELATO_BRAND_IDS.has(item.id)) {
      continue;
    }

    if (item.id === "vibe-grid" && next?.id === "vibe-post") {
      entries.push({ type: "fashion-row", grid: item, post: next });
      i += 1;
      continue;
    }

    entries.push({ type: "tile", item });
  }

  return entries;
}

function PortfolioMedia({ item }) {
  const hoverVideoRef = useRef(null);
  const [mediaRef, mediaSrc] = useLazyMediaSrc(item.file, Boolean(item.file));
  const viewportVideoRef = useInViewVideoPlayback({
    enabled: item.type === "video" && Boolean(mediaSrc),
    mobileOnly: true,
    resetOnExit: true,
    threshold: 0.5,
  });
  const [hasVideoError, setHasVideoError] = useState(false);

  const playVideo = () => {
    if (item.type !== "video" || !hoverVideoRef.current) {
      return;
    }

    const video = hoverVideoRef.current;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  };

  const stopVideo = () => {
    if (item.type !== "video" || !hoverVideoRef.current) {
      return;
    }

    const video = hoverVideoRef.current;
    video.pause();
    video.currentTime = 0;
  };

  if (item.type === "video") {
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
        {mediaSrc ? (
          <video
            ref={(node) => {
              hoverVideoRef.current = node;
              viewportVideoRef.current = node;
            }}
            className="portfolio-tile__media"
            src={mediaSrc}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setHasVideoError(true)}
          />
        ) : (
          <div
            className="portfolio-tile__media portfolio-tile__media--placeholder"
            aria-hidden
          />
        )}
        <span className="portfolio-tile__play-hint">Hover to play</span>
        {hasVideoError ? (
          <span className="portfolio-tile__video-fallback">
            Video preview unavailable
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={mediaRef} className="portfolio-tile__media-shell">
      {mediaSrc ? (
        <img
          className="portfolio-tile__media"
          src={mediaSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="portfolio-tile__media portfolio-tile__media--placeholder" aria-hidden />
      )}
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

function PortfolioTile({ item, metaPlacement = "overlay" }) {
  const stacked = metaPlacement === "foot";
  const tileClass = [
    "portfolio-tile",
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
        <div className="portfolio-tile__media-shell portfolio-tile__media-shell--phone">
          <PortfolioPhoneMockup
            item={item}
            showCta={false}
            linkable={false}
            className="portfolio-phone-mockup--tile"
          />
        </div>
        <PortfolioTileMeta item={item} placement="foot" />
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

function PortfolioGelatoRow({ videoItem, imageItems }) {
  return (
    <ScrollSection
      as="li"
      className="portfolio-mosaic__item portfolio-mosaic__item--gelato-row"
    >
      <div className="portfolio-gelato-row">
        <div className="portfolio-gelato-row__video">
          <PortfolioTile item={videoItem} metaPlacement="foot" />
        </div>
        <div className="portfolio-gelato-row__grid" aria-label="Gelato Bar brand guidelines">
          {imageItems.map((item) => (
            <div key={item.id} className="portfolio-gelato-row__cell">
              <article className="portfolio-tile portfolio-tile--gelato-cell">
                <PortfolioMedia item={item} />
              </article>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function PortfolioFashionRow({ gridItem, postItem }) {
  return (
    <ScrollSection
      as="li"
      className="portfolio-mosaic__item portfolio-mosaic__item--fashion-row"
    >
      <div className="portfolio-fashion-row">
        <div className="portfolio-fashion-row__grid">
          <PortfolioTile item={gridItem} />
        </div>
        <div className="portfolio-fashion-row__post">
          <PortfolioTile item={postItem} />
        </div>
      </div>
    </ScrollSection>
  );
}

function Portfolio() {
  useEffect(() => {
    document.title = "Portfolio | AlphaNineMarketing";
  }, []);

  const aiContent = ["reel-five", "reel-one", "reel-three", "reel-four"]
    .map((id) => portfolioGallery.find((item) => item.id === id))
    .filter(Boolean);

  const ugcContent = [
    "padel-chase-hero",
    "padel-chase-gs",
    "padel-chase-insta",
    "gelato-video",
    "gelato-brand-product",
    "gelato-brand-logo",
    "gelato-brand-system",
    "gelato-brand-interior",
    "vibe-grid",
    "vibe-post",
    "eco-board",
    "food-board",
    "kart-hero",
  ]
    .map((id) => portfolioGallery.find((item) => item.id === id))
    .filter(Boolean);

  const sections = [
    {
      id: "ugc",
      eyebrow: "UGC",
      title: "User-generated and campaign-led visual work.",
      description:
        "Real social posts, creative grids, moodboards, and branded content arranged as a premium showcase.",
      items: ugcContent,
    },
    {
      id: "ai",
      eyebrow: "AI Generated Content",
      title: "AI-crafted motion and ad creatives.",
      description:
        "AI-assisted motion ads and promo cuts for Roadking and campaign testing.",
      items: aiContent,
    },
  ];

  return (
    <div className="portfolio-page">
      <PageHero
        baseClass="portfolio-hero"
        eyebrow="Portfolio"
        title="Creative assets arranged like a real showcase."
        lede="Editorial grids, social posts, brand boards, and motion cuts from real campaign work - arranged in a mixed-size gallery for a more premium presentation."
        typeDelay={420}
      />

      <section className="portfolio-grid-section" aria-label="Portfolio gallery">
        <div className="portfolio-grid-section__inner">
          {sections.map((section) => (
            <div key={section.id} className="portfolio-section">
              <ScrollSection as="header" className="portfolio-section__head">
                <p className="portfolio-section__eyebrow">{section.eyebrow}</p>
                <h2 className="portfolio-section__title">{section.title}</h2>
                <p className="portfolio-section__desc">{section.description}</p>
              </ScrollSection>

              <ul className="portfolio-mosaic">
                {buildMosaicEntries(section.items).map((entry) => {
                  if (entry.type === "gelato-row") {
                    return (
                      <PortfolioGelatoRow
                        key="gelato-row"
                        videoItem={entry.video}
                        imageItems={entry.images}
                      />
                    );
                  }

                  if (entry.type === "fashion-row") {
                    return (
                      <PortfolioFashionRow
                        key="fashion-row"
                        gridItem={entry.grid}
                        postItem={entry.post}
                      />
                    );
                  }

                  const { item } = entry;
                  const inEqualRow =
                    section.id === "ugc" && PADEL_ROW_IDS.has(item.id);
                  const metaPlacement = inEqualRow ? "foot" : "overlay";

                  return (
                    <ScrollSection
                      as="li"
                      key={item.id}
                      className={[
                        "portfolio-mosaic__item",
                        `portfolio-mosaic__item--${item.variant}`,
                        inEqualRow ? "portfolio-mosaic__item--equal" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <PortfolioTile item={item} metaPlacement={metaPlacement} />
                    </ScrollSection>
                  );
                })}
              </ul>
            </div>
          ))}

          <ScrollSection className="portfolio-cta theme-cta-panel">
            <p className="portfolio-cta__copy">
              Want your brand shown with the same premium content system?
            </p>
            <Link to="/contact" className="portfolio-cta__link theme-btn-primary">
              Start a project
            </Link>
          </ScrollSection>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
