import React from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import StaggerGroup from "../../components/StaggerGroup/StaggerGroup";
import LazyImage from "../../components/LazyImage/LazyImage";
import waqarPortrait from "../../assets/team/optimized/waqar.jpg";
import amirPortrait from "../../assets/team/optimized/amir.jpg";
import abdullahPortrait from "../../assets/team/optimized/abdullah.jpg";

const teamPreview = [
  { name: "Waqar Ahmed", role: "Founder & CEO", portrait: waqarPortrait },
  {
    name: "Amir Jibran",
    role: "AI Automation & Ads Specialist",
    portrait: amirPortrait,
  },
  { name: "Abdullah", role: "Creative Head", portrait: abdullahPortrait },
];

function HomeTeamSection() {
  return (
    <ScrollSection as="section" className="home-section home-team-preview">
      <div className="home-section__inner">
        <header className="home-section__head">
          <p className="home-section__eyebrow">Team</p>
          <h2 className="home-section__title">Specialists in one room.</h2>
          <p className="home-section__sub">
            Senior operators across media, creative, and production.
          </p>
        </header>
        <StaggerGroup as="ul" className="home-team-preview__grid">
          {teamPreview.map((m) => (
            <li key={m.name} className="home-card home-card--team">
              <LazyImage
                className="home-card__avatar"
                src={m.portrait}
                alt={`Illustrated profile placeholder for ${m.name}`}
                width="320"
                height="400"
              />
              <p className="home-card__name">{m.name}</p>
              <p className="home-card__role">{m.role}</p>
            </li>
          ))}
        </StaggerGroup>
        <div className="home-section__cta-row">
          <Link to="/about" className="home-text-link theme-text-link">
            Meet the full team →
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
}

export default HomeTeamSection;
