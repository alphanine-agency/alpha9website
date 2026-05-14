import React, { useEffect } from "react";
import "./Services.css";

const services = [
  {
    title: "AI Automation",
    desc: "Orchestrate lead routing, creative variants, and reporting with models and rules that stay accountable to revenue.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="svc-icon">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    title: "Ads Management",
    desc: "Search, social, and programmatic managed with surgical audience design, testing cadence, and clean attribution narratives.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="svc-icon">
        <path d="M4 18V6l8-3 8 3v12" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    title: "Graphic Designing",
    desc: "Brand systems, campaign kits, and motion-ready layouts — monochrome discipline with moments of contrast.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="svc-icon">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    title: "Video Editing",
    desc: "Short-form and hero edits with rhythm-first cuts, sound design, and platform-native pacing.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="svc-icon">
        <rect x="2" y="6" width="15" height="12" rx="2" />
        <path d="M17 10l5-3v10l-5-3z" />
      </svg>
    ),
  },
  {
    title: "Content Production",
    desc: "Editorial calendars, shoots, and copy engineered for clarity — from launch narratives to always-on social.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="svc-icon">
        <path d="M6 4h12v16H6z" />
        <path d="M8 8h8M8 12h8M8 16h6" />
      </svg>
    ),
  },
  {
    title: "Web Design",
    desc: "Marketing sites and product surfaces with semantic structure, accessible patterns, and performance budgets baked in.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="svc-icon">
        <path d="M3 5h18v14H3z" />
        <path d="M3 8h18" />
        <circle cx="5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

function Services() {
  useEffect(() => {
    document.title =
      "Services | Ads, AI, Content & Web | AlphaNineMarketing";
  }, []);

  return (
    <div className="services-page">
      <header className="services-hero">
        <div className="services-hero__inner">
          <p className="services-hero__eyebrow">Services</p>
          <h1 className="services-hero__title">Precision across the stack.</h1>
          <p className="services-hero__lede">
            Modular teams, one accountable partner — from AI workflows to the
            pixels customers tap.
          </p>
        </div>
      </header>

      <section className="services-grid-section" aria-label="Service offerings">
        <div className="services-grid-section__inner">
          <ul className="services-grid">
            {services.map((s) => (
              <li key={s.title} className="services-card">
                <div className="services-card__icon" aria-hidden>
                  {s.icon}
                </div>
                <h2 className="services-card__title">{s.title}</h2>
                <p className="services-card__desc">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Services;
