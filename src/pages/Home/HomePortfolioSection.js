import React from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import StaggerGroup from "../../components/StaggerGroup/StaggerGroup";
import PortfolioTile from "../../components/PortfolioTile/PortfolioTile";
import portfolioGallery from "../../data/portfolioGallery";

const PADEL_PREVIEW_IDS = [
  "padel-chase-hero",
  "padel-chase-gs",
  "padel-chase-insta",
];

const padelPreviewItems = PADEL_PREVIEW_IDS.map((id) =>
  portfolioGallery.find((item) => item.id === id)
).filter(Boolean);

function HomePortfolioSection() {
  return (
    <ScrollSection as="section" className="home-section home-portfolio-preview">
      <div className="home-section__inner">
        <header className="home-section__head">
          <p className="home-section__eyebrow">Portfolio</p>
          <h2 className="home-section__title">Work that turns attention into action.</h2>
          <p className="home-section__sub">
            Selected campaign systems, creative launches, and web builds across
            performance-focused brands.
          </p>
        </header>
        <StaggerGroup as="ul" className="home-portfolio-preview__grid">
          {padelPreviewItems.map((item) => (
            <li key={item.id} className="home-portfolio-preview__item">
              <PortfolioTile item={item} metaPlacement="overlay" />
            </li>
          ))}
        </StaggerGroup>
        <div className="home-section__cta-row">
          <Link to="/portfolio" className="home-text-link theme-text-link">
            Explore the portfolio →
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
}

export default HomePortfolioSection;
