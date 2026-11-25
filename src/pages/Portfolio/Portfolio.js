import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import PageHero from "../../components/PageHero/PageHero";
import PortfolioTile, { PortfolioMedia } from "../../components/PortfolioTile/PortfolioTile";
import portfolioGallery from "../../data/portfolioGallery";
import {
  portfolioFilters,
  automationCaseStudies,
} from "../../data/caseStudies";
import AutomationDemo from "../../components/AutomationDemo/AutomationDemo";
import "./Portfolio.css";

const PADEL_ROW_IDS = new Set([
  "padel-chase-hero",
  "padel-chase-gs",
  "padel-chase-insta",
]);

const GELATO_BRAND_IDS = new Set([
  "gelato-brand-product",
  "gelato-brand-logo",
  "gelato-brand-interior",
]);

const ROADKING_IMAGE_IDS = new Set([
  "roadking-rk1",
  "roadking-rk2",
  "roadking-rk3",
]);

const ROADKING_ROW_IDS = new Set([
  "roadking-rk1",
  "roadking-rk2",
  "roadking-rk3",
  "roadking-insta",
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

      if (brandImages.length >= 3) {
        entries.push({
          type: "gelato-row",
          video: item,
          images: brandImages.slice(0, 3),
        });
        i += brandImages.length;
        continue;
      }
    }

    if (GELATO_BRAND_IDS.has(item.id)) {
      continue;
    }

    if (item.id === "roadking-rk1") {
      const posters = [];
      let j = i;
      while (j < items.length && ROADKING_IMAGE_IDS.has(items[j].id)) {
        posters.push(items[j]);
        j += 1;
      }

      const instaItem = items[j]?.id === "roadking-insta" ? items[j] : null;

      if (posters.length === 3 && instaItem) {
        const hero = posters.find((poster) => poster.id === "roadking-rk3");
        const stack = posters.filter(
          (poster) => poster.id === "roadking-rk1" || poster.id === "roadking-rk2"
        );

        if (hero && stack.length === 2) {
          entries.push({
            type: "roadking-row",
            hero,
            stack,
            insta: instaItem,
          });
          i = j;
          continue;
        }
      }
    }

    if (ROADKING_ROW_IDS.has(item.id)) {
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

function PortfolioGelatoRow({ videoItem, imageItems }) {
  return (
    <ScrollSection
      as="li"
      className="portfolio-mosaic__item portfolio-mosaic__item--gelato-row"
    >
      <div className="portfolio-gelato-row">
        <div className="portfolio-gelato-row__video">
          <PortfolioTile
            item={videoItem}
            metaPlacement="overlay"
            className="portfolio-tile--gelato-video"
          />
        </div>
        <div className="portfolio-gelato-row__grid" aria-label="Gelato Bar brand guidelines">
          {imageItems.map((item) => (
            <div
              key={item.id}
              className={[
                "portfolio-gelato-row__cell",
                item.id === "gelato-brand-interior"
                  ? "portfolio-gelato-row__cell--wide"
                  : "",
                item.id === "gelato-brand-logo"
                  ? "portfolio-gelato-row__cell--logo"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
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

function PortfolioRoadkingRow({ hero, stack, insta }) {
  const heroRef = useRef(null);
  const [instaHeight, setInstaHeight] = useState(null);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) {
      return undefined;
    }

    let frameId;

    const syncInstaHeight = () => {
      const stackedLayout =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 720px)").matches;

      if (stackedLayout) {
        setInstaHeight(null);
        return;
      }

      setInstaHeight(Math.round(node.getBoundingClientRect().height));
    };

    const scheduleSync = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(syncInstaHeight);
    };

    scheduleSync();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", scheduleSync);
      return () => {
        window.removeEventListener("resize", scheduleSync);
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    }

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(node);
    window.addEventListener("resize", scheduleSync);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleSync);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [hero.id]);

  return (
    <ScrollSection
      as="li"
      className="portfolio-mosaic__item portfolio-mosaic__item--roadking-row"
    >
      <div className="portfolio-roadking-row" aria-label="Roadking campaign showcase">
        <div ref={heroRef} className="portfolio-roadking-row__hero">
          <PortfolioTile item={hero} metaPlacement="overlay" />
        </div>
        <div className="portfolio-roadking-row__stack" aria-label="Roadking launch and lifestyle posters">
          {stack.map((item) => (
            <div key={item.id} className="portfolio-roadking-row__stack-cell">
              <PortfolioTile item={item} metaPlacement="overlay" />
            </div>
          ))}
        </div>
        <div
          className="portfolio-roadking-row__insta"
          style={instaHeight ? { height: `${instaHeight}px` } : undefined}
        >
          <PortfolioTile item={insta} metaPlacement="overlay" />
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

function PortfolioAiAutomationCard({ study }) {
  const isPadel = study.slug === "padel-chase";
  const isRoadKing = study.slug === "roadking";
  return (
    <ScrollSection
      as="article"
      className={`portfolio-case-card portfolio-case-card--demo${
        isPadel ? " portfolio-case-card--padel" : ""
      }${isRoadKing ? " portfolio-case-card--roadking" : ""}`}
    >
      <div className="portfolio-case-card__body">
        <div className="portfolio-case-card__brand">
          <img
            className={`portfolio-case-card__logo${
              isPadel ? " portfolio-case-card__logo--padel" : ""
            }${isRoadKing ? " portfolio-case-card__logo--roadking" : ""}`}
            src={study.logo}
            alt=""
            width={isRoadKing ? 56 : 140}
            height={isRoadKing ? 56 : 48}
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="portfolio-case-card__eyebrow">{study.tagline}</p>
            <h3 className="portfolio-case-card__title">{study.client}</h3>
          </div>
        </div>
        <p className="portfolio-case-card__copy">
          {study.demoPitch || study.subheadline}
        </p>
        <div className="portfolio-case-card__meta">
          <span>{study.industry}</span>
          <span>{study.result.label}</span>
        </div>
      </div>
      <div className="portfolio-case-card__demo">
        <AutomationDemo study={study} />
      </div>
      <div className="portfolio-case-card__footer">
        <Link
          to={`/portfolio/${study.slug}`}
          className="portfolio-case-card__cta theme-btn-primary"
        >
          Full case study
        </Link>
      </div>
    </ScrollSection>
  );
}

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    document.title = "Portfolio | AlphaNineMarketing";
  }, []);

  const aiContent = useMemo(
    () =>
      ["reel-five", "reel-one", "reel-three", "reel-four"]
        .map((id) => portfolioGallery.find((item) => item.id === id))
        .filter(Boolean),
    []
  );

  const ugcContent = useMemo(
    () =>
      [
        "padel-chase-hero",
        "padel-chase-gs",
        "padel-chase-insta",
        "gelato-video",
        "gelato-brand-product",
        "gelato-brand-logo",
        "gelato-brand-interior",
        "roadking-rk1",
        "roadking-rk2",
        "roadking-rk3",
        "roadking-insta",
        "vibe-grid",
        "vibe-post",
        "eco-board",
        "food-board",
        "kart-hero",
      ]
        .map((id) => portfolioGallery.find((item) => item.id === id))
        .filter(Boolean),
    []
  );

  const sections = useMemo(
    () => [
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
      {
        id: "ai-automation",
        eyebrow: "AI Automation",
        title: "Try the systems — not just read about them.",
        description:
          "Live support demos — chat as a real customer or partner while the phone shows the automation desk. You can tap the screens too.",
        items: [],
        caseStudy: true,
      },
    ],
    [aiContent, ugcContent]
  );

  const visibleSections = useMemo(() => {
    if (activeFilter === "all") {
      return sections;
    }
    return sections.filter((section) => section.id === activeFilter);
  }, [activeFilter, sections]);

  return (
    <div className="portfolio-page">
      <PageHero
        baseClass="portfolio-hero"
        eyebrow="Portfolio"
        title="Creative assets arranged like a real showcase."
        lede="Editorial grids, social posts, brand boards, motion cuts, and AI automation systems from real campaign work."
        typeDelay={420}
      />

      <section className="portfolio-grid-section" aria-label="Portfolio gallery">
        <div className="portfolio-grid-section__inner">
          <div
            className="portfolio-filters"
            role="tablist"
            aria-label="Filter portfolio work"
          >
            {portfolioFilters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`portfolio-filters__btn${
                    isActive ? " portfolio-filters__btn--active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {visibleSections.map((section) => (
            <div key={section.id} className="portfolio-section">
              <ScrollSection as="header" className="portfolio-section__head">
                <p className="portfolio-section__eyebrow">{section.eyebrow}</p>
                <h2 className="portfolio-section__title">{section.title}</h2>
                <p className="portfolio-section__desc">{section.description}</p>
              </ScrollSection>

              {section.caseStudy ? (
                <div className="portfolio-case-grid">
                  {automationCaseStudies.map((study) => (
                    <PortfolioAiAutomationCard key={study.slug} study={study} />
                  ))}
                </div>
              ) : (
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

                    if (entry.type === "roadking-row") {
                      return (
                        <PortfolioRoadkingRow
                          key="roadking-row"
                          hero={entry.hero}
                          stack={entry.stack}
                          insta={entry.insta}
                        />
                      );
                    }

                    const { item } = entry;
                    const inEqualRow =
                      section.id === "ugc" && PADEL_ROW_IDS.has(item.id);

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
                        <PortfolioTile item={item} metaPlacement="overlay" />
                      </ScrollSection>
                    );
                  })}
                </ul>
              )}
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
