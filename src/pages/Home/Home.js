import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import StaggerGroup from "../../components/StaggerGroup/StaggerGroup";
import AnimatedCounter from "../../components/AnimatedCounter/AnimatedCounter";
import portfolioGallery from "../../data/portfolioGallery";
import useInViewVideoPlayback from "../../hooks/useInViewVideoPlayback";
import useLazyMediaSrc from "../../hooks/useLazyMediaSrc";
import waqarPortrait from "../../assets/team/optimized/waqar.jpg";
import amirPortrait from "../../assets/team/optimized/amir.jpg";
import abdullahPortrait from "../../assets/team/optimized/abdullah.jpg";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { homeServicesPreview } from "../../data/services";
import "./Home.css";

const teamPreview = [
  { name: "Waqar Ahmed", role: "Founder & CEO", portrait: waqarPortrait },
  {
    name: "Amir Jibran",
    role: "AI Automation & Ads Specialist",
    portrait: amirPortrait,
  },
  { name: "Abdullah", role: "Creative Head", portrait: abdullahPortrait },
];

const featuredPortfolio = portfolioGallery.slice(0, 3);

function HomePortfolioMedia({ item }) {
  const [mediaRef, mediaSrc] = useLazyMediaSrc(item.file, Boolean(item.file));
  const videoRef = useInViewVideoPlayback({
    enabled: item.type === "video" && Boolean(mediaSrc),
    resetOnExit: true,
    threshold: 0.5,
  });

  if (item.type === "video") {
    return (
      <div ref={mediaRef} className="home-card__visual-shell">
        {mediaSrc ? (
          <video
            ref={videoRef}
            className="home-card__visual-media"
            src={mediaSrc}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        ) : (
          <div className="home-card__visual-media home-card__visual-media--placeholder" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div ref={mediaRef} className="home-card__visual-shell">
      {mediaSrc ? (
        <img
          className="home-card__visual-media"
          src={mediaSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="home-card__visual-media home-card__visual-media--placeholder" aria-hidden />
      )}
    </div>
  );
}

function Home() {
  useEffect(() => {
    document.title =
      "AlphaNineMarketing | AI-Powered Digital Marketing Agency";
  }, []);

  return (
    <div className="home">
      <Hero />

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

      <ScrollSection as="section" className="home-section home-why">
        <div className="home-section__inner home-why__inner">
          <div className="home-why__copy">
            <p className="home-section__eyebrow">Why AlphaNine</p>
            <h2 className="home-section__title">
              Performance culture. Luxury presentation.
            </h2>
            <p className="home-section__sub">
              We obsess over Core Web Vitals for your digital footprint, and over
              narrative craft for your brand — because growth without resonance
              does not last.
            </p>
            <ul className="home-why__list">
              <li>AI automation that removes manual drag from campaigns</li>
              <li>Creative systems that scale without looking templated</li>
              <li>Transparent reporting and decisive iteration cycles</li>
            </ul>
          </div>
          <div className="home-why__panel">
            <ul className="home-why__metrics">
              <li>
                <AnimatedCounter value={5} label="Core capabilities" />
              </li>
              <li>
                <AnimatedCounter value={3} label="Studio disciplines" />
              </li>
              <li>
                <AnimatedCounter value={100} suffix="%" label="Performance mindset" />
              </li>
            </ul>
            <div className="home-why__panel-inner">
              <p className="home-why__stat-label">North star</p>
              <p className="home-why__stat">Fast, measurable, elegant.</p>
            </div>
          </div>
        </div>
      </ScrollSection>

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
            {featuredPortfolio.map((item) => (
              <li key={item.id} className="home-card home-card--portfolio">
                <div className="home-card__visual">
                  <HomePortfolioMedia item={item} />
                  <span className="home-card__visual-pill">{item.tag}</span>
                </div>
                <p className="home-card__meta">{item.campaign}</p>
                <h3 className="home-card__title">{item.title}</h3>
                <p className="home-card__desc">
                  {item.section === "ai"
                    ? "AI-generated motion creative crafted for rapid testing and polished campaign delivery."
                    : "Real campaign content designed to feel native, premium, and ready for social distribution."}
                </p>
                <p className="home-card__result">
                  {item.type === "video" ? "Motion-led showcase" : "Static creative showcase"}
                </p>
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
                <img
                  className="home-card__avatar"
                  src={m.portrait}
                  alt={`Illustrated profile placeholder for ${m.name}`}
                  width="320"
                  height="400"
                  loading="lazy"
                  decoding="async"
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

      <ScrollSection as="section" className="home-final-cta" aria-labelledby="final-cta-heading">
        <div className="home-final-cta__inner">
          <h2 id="final-cta-heading" className="home-final-cta__title">
            Let’s Scale Your Brand
          </h2>
          <p className="home-final-cta__sub">
            Tell us where you are today — we’ll map the fastest path to signal.
          </p>
          <Link to="/contact" className="home-final-cta__btn theme-btn-primary">
            Start the conversation
          </Link>
        </div>
      </ScrollSection>
    </div>
  );
}

export default Home;
