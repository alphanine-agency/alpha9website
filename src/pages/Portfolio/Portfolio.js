import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import portfolioGallery from "../../data/portfolioGallery";
import "./Portfolio.css";

function PortfolioMedia({ item }) {
  const videoRef = useRef(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  const playVideo = () => {
    if (item.type !== "video" || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  };

  const stopVideo = () => {
    if (item.type !== "video" || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    video.pause();
    video.currentTime = 0;
  };

  if (item.type === "video") {
    return (
      <div
        className="portfolio-tile__media-shell portfolio-tile__media-shell--video"
        tabIndex={0}
        aria-label={`${item.title} video preview`}
        onMouseEnter={playVideo}
        onMouseLeave={stopVideo}
        onFocus={playVideo}
        onBlur={stopVideo}
        onTouchStart={playVideo}
        onTouchEnd={stopVideo}
      >
        <video
          ref={videoRef}
          className="portfolio-tile__media"
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setHasVideoError(true)}
        />
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
    <div className="portfolio-tile__media-shell">
      <img
        className="portfolio-tile__media"
        src={item.src}
        alt={item.title}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function Portfolio() {
  useEffect(() => {
    document.title = "Portfolio | AlphaNineMarketing";
  }, []);

  const imageCount = portfolioGallery.filter((item) => item.type === "image").length;
  const videoCount = portfolioGallery.filter((item) => item.type === "video").length;
  const aiContent = portfolioGallery.filter((item) => item.section === "ai");
  const ugcContent = portfolioGallery.filter((item) => item.section === "ugc");

  const sections = [
    {
      id: "ai",
      eyebrow: "AI Generated Content",
      title: "AI-crafted motion and ad creatives.",
      description:
        "Roadking video assets produced for faster concept generation, campaign testing, and polished promo outputs.",
      items: aiContent,
    },
    {
      id: "ugc",
      eyebrow: "UGC",
      title: "User-generated and campaign-led visual work.",
      description:
        "Real social posts, creative grids, moodboards, and branded content arranged as a premium showcase.",
      items: ugcContent,
    },
  ];

  return (
    <div className="portfolio-page">
      <header className="portfolio-hero">
        <div className="portfolio-hero__inner">
          <p className="portfolio-hero__eyebrow">Portfolio</p>
          <h1 className="portfolio-hero__title">Creative assets arranged like a real showcase.</h1>
          <p className="portfolio-hero__lede">
            Editorial grids, social posts, brand boards, and motion cuts from
            real campaign work - arranged in a mixed-size gallery for a more
            premium presentation.
          </p>
          <ul className="portfolio-hero__stats" aria-label="Portfolio summary">
            <li className="portfolio-hero__stat">
              <span className="portfolio-hero__stat-value">{imageCount}</span>
              <span className="portfolio-hero__stat-label">Image assets</span>
            </li>
            <li className="portfolio-hero__stat">
              <span className="portfolio-hero__stat-value">{videoCount}</span>
              <span className="portfolio-hero__stat-label">Video edits</span>
            </li>
            <li className="portfolio-hero__stat">
              <span className="portfolio-hero__stat-value">4</span>
              <span className="portfolio-hero__stat-label">Content styles</span>
            </li>
          </ul>
        </div>
      </header>

      <section className="portfolio-grid-section" aria-label="Portfolio gallery">
        <div className="portfolio-grid-section__inner">
          {sections.map((section) => (
            <div key={section.id} className="portfolio-section">
              <header className="portfolio-section__head">
                <p className="portfolio-section__eyebrow">{section.eyebrow}</p>
                <h2 className="portfolio-section__title">{section.title}</h2>
                <p className="portfolio-section__desc">{section.description}</p>
              </header>

              <ul className="portfolio-mosaic">
                {section.items.map((item) => (
                  <ScrollSection
                    as="li"
                    key={item.id}
                    className={`portfolio-mosaic__item portfolio-mosaic__item--${item.variant}`}
                  >
                    <article className="portfolio-tile">
                      <PortfolioMedia item={item} />

                      <div className="portfolio-tile__overlay">
                        <div className="portfolio-tile__chips">
                          <span className="portfolio-tile__chip">{item.tag}</span>
                          <span className="portfolio-tile__chip portfolio-tile__chip--ghost">
                            {item.campaign}
                          </span>
                        </div>
                        <h3 className="portfolio-tile__title">{item.title}</h3>
                      </div>
                    </article>
                  </ScrollSection>
                ))}
              </ul>
            </div>
          ))}

          <div className="portfolio-cta">
            <p className="portfolio-cta__copy">
              Want your brand shown with the same premium content system?
            </p>
            <Link to="/contact" className="portfolio-cta__link">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
