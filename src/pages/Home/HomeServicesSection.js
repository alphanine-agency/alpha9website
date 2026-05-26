import React from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import StaggerGroup from "../../components/StaggerGroup/StaggerGroup";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { homeServicesPreview } from "../../data/services";

function HomeServicesSection() {
  return (
    <section className="home-section home-services-preview">
      <div className="home-section__inner">
        <ScrollSection as="div" className="home-services-preview__head-wrap">
          <header className="home-section__head">
            <p className="home-section__eyebrow">Capabilities</p>
            <h2 className="home-section__title">Built for velocity and taste.</h2>
            <p className="home-section__sub">
              One studio line for strategy, creative, and execution — tuned for
              performance.
            </p>
          </header>
        </ScrollSection>
        <StaggerGroup as="ul" className="service-card-grid home-services-preview__grid">
          {homeServicesPreview.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              size="compact"
            />
          ))}
        </StaggerGroup>
        <div className="home-section__cta-row">
          <Link to="/services" className="home-text-link theme-text-link">
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeServicesSection;
