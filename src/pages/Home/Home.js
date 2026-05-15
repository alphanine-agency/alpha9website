import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import portfolioGallery from "../../data/portfolioGallery";
import useInViewVideoPlayback from "../../hooks/useInViewVideoPlayback";
import waqarPortrait from "../../assets/team/Waqar Ahmed Founder and CEO.PNG";
import amirPortrait from "../../assets/team/amir jibran AI Automation & Ads Specialist.PNG";
import abdullahPortrait from "../../assets/team/Abdullah Graphic Designer.png";
import "./Home.css";

const servicesPreview = [
  {
    title: "Ads & AI Automation",
    desc: "Funnels, bidding intelligence, and workflows that compound.",
    tag: "AI Systems",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="home-card__icon-svg">
        <circle cx="12" cy="12" r="6.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2.75v3M12 18.25v3M2.75 12h3M18.25 12h3M18.25 5.75l-2.1 2.1M7.85 16.15l-2.1 2.1" />
      </svg>
    ),
  },
  {
    title: "Graphic Designing",
    desc: "Identity systems and campaign visuals with restraint.",
    tag: "Brand Visuals",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="home-card__icon-svg">
        <circle cx="6" cy="6" r="1.5" />
        <circle cx="18" cy="6" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
        <path d="M7.5 6h9M7 7.3l4 9M17 7.3l-4 9" />
      </svg>
    ),
  },
  {
    title: "Video Editing",
    desc: "Cinematic edits built for retention and clarity.",
    tag: "Post Production",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="home-card__icon-svg">
        <path d="M4 8h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
        <path d="M4 8l3-4h3l-3 4M10 8l3-4h3l-3 4M16 8l2.5-3" />
        <path d="M10 12l4 2-4 2z" />
      </svg>
    ),
  },
  {
    title: "Content & Production",
    desc: "Editorial, social, and studio-grade storytelling.",
    tag: "Studio Content",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="home-card__icon-svg">
        <path d="M4 14v-4a2 2 0 0 1 2-2h2l7-3v14l-7-3H6a2 2 0 0 1-2-2z" />
        <path d="M15 9.5a4 4 0 0 1 0 5" />
        <path d="M17.5 7a7 7 0 0 1 0 10" />
      </svg>
    ),
  },
  {
    title: "Web Design",
    desc: "Fast, accessible interfaces your customers feel instantly.",
    tag: "Performance UX",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="home-card__icon-svg">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 13h4M7 16h3" />
        <path d="M14 12l4 7 1.4-2.6L22 15l-8-3z" />
        <circle cx="6.5" cy="7" r="0.5" fill="currentColor" />
        <circle cx="8.5" cy="7" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

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
  const videoRef = useInViewVideoPlayback({
    enabled: item.type === "video",
    resetOnExit: true,
    threshold: 0.5,
  });

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        className="home-card__visual-media"
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }

  return (
    <img
      className="home-card__visual-media"
      src={item.src}
      alt={item.title}
      loading="lazy"
      decoding="async"
    />
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

      <ScrollSection as="section" className="home-section home-services-preview">
        <div className="home-section__inner">
          <header className="home-section__head">
            <p className="home-section__eyebrow">Capabilities</p>
            <h2 className="home-section__title">Built for velocity and taste.</h2>
            <p className="home-section__sub">
              One studio line for strategy, creative, and execution — tuned for
              performance.
            </p>
          </header>
          <ul className="home-services-preview__grid">
            {servicesPreview.map((s) => (
              <li key={s.title} className="home-card home-card--service">
                <div className="home-card__service-top">
                  <div className="home-card__icon" aria-hidden>
                    {s.icon}
                  </div>
                  <span className="home-card__service-tag">{s.tag}</span>
                </div>
                <div className="home-card__service-copy">
                  <h3 className="home-card__title">{s.title}</h3>
                  <p className="home-card__desc">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="home-section__cta-row">
            <Link to="/services" className="home-text-link">
              View all services →
            </Link>
          </div>
        </div>
      </ScrollSection>

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
          <div className="home-why__panel" aria-hidden>
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
          <ul className="home-portfolio-preview__grid">
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
          </ul>
          <div className="home-section__cta-row">
            <Link to="/portfolio" className="home-text-link">
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
          <ul className="home-team-preview__grid">
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
          </ul>
          <div className="home-section__cta-row">
            <Link to="/about" className="home-text-link">
              Meet the full team →
            </Link>
          </div>
        </div>
      </ScrollSection>

      <section className="home-final-cta" aria-labelledby="final-cta-heading">
        <div className="home-final-cta__inner">
          <h2 id="final-cta-heading" className="home-final-cta__title">
            Let’s Scale Your Brand
          </h2>
          <p className="home-final-cta__sub">
            Tell us where you are today — we’ll map the fastest path to signal.
          </p>
          <Link to="/contact" className="home-final-cta__btn">
            Start the conversation
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
