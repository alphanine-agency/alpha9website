import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import portfolioGallery from "../../data/portfolioGallery";
import useInViewVideoPlayback from "../../hooks/useInViewVideoPlayback";
import "./Portfolio.css";

function PortfolioMedia({ item }) {
  const hoverVideoRef = useRef(null);
  const viewportVideoRef = useInViewVideoPlayback({
    enabled: item.type === "video",
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
        className="portfolio-tile__media-shell portfolio-tile__media-shell--video"
        tabIndex={0}
        aria-label={`${item.title} video preview`}
        onMouseEnter={playVideo}
        onMouseLeave={stopVideo}
        onFocus={playVideo}
        onBlur={stopVideo}
      >
        <video
          ref={(node) => {
            hoverVideoRef.current = node;
            viewportVideoRef.current = node;
          }}
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

  const aiContent = portfolioGallery.filter((item) => item.section === "ai");
  const ugcContent = [
    "vibe-post",
    "kart-hero",
    "vibe-grid",
    "eco-board",
    "food-board",
    "gelato-video",
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
        "Roadking video assets produced for faster concept generation, campaign testing, and polished promo outputs.",
      items: aiContent,
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
