import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import StaggerGroup from "../../components/StaggerGroup/StaggerGroup";
import PageHero from "../../components/PageHero/PageHero";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { servicesList } from "../../data/services";
import "./Services.css";

function Services() {
  useEffect(() => {
    document.title =
      "Services | Ads, AI, Content & Web | AlphaNineMarketing";
  }, []);

  return (
    <div className="services-page">
      <PageHero
        baseClass="services-hero"
        eyebrow="Services"
        title="Precision across the stack."
        lede="Modular teams, one accountable partner — from AI workflows to the pixels customers tap."
      />

      <section
        className="services-grid-section"
        aria-label="Service offerings"
      >
        <div className="services-grid-section__inner">
          <ScrollSection as="div" className="services-grid-section__head-wrap">
            <header className="services-grid-section__head theme-section-head">
              <p className="services-grid-section__eyebrow theme-eyebrow">
                Capabilities
              </p>
              <h2 className="services-grid-section__title theme-title">
                End-to-end systems, built to scale.
              </h2>
              <p className="services-grid-section__sub theme-sub">
                Six specialist lanes — one studio accountable for strategy,
                creative, and execution.
              </p>
            </header>
          </ScrollSection>

          <StaggerGroup as="ul" className="service-card-grid">
            {servicesList.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </StaggerGroup>

          <div className="services-cta theme-cta-panel">
            <p>Not sure where to start? We’ll map the fastest path.</p>
            <Link to="/contact" className="services-cta__btn theme-btn-primary">
              Book a strategy call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
