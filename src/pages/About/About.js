import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import LazyImage from "../../components/LazyImage/LazyImage";
import teamBanner from "../../assets/team/optimized/team-banner.jpg";
import waqarPortrait from "../../assets/team/optimized/waqar.jpg";
import amirPortrait from "../../assets/team/optimized/amir.jpg";
import abdullahPortrait from "../../assets/team/optimized/abdullah.jpg";
import amnaPortrait from "../../assets/team/optimized/amna.jpg";
import arslanPortrait from "../../assets/team/optimized/arslan.jpg";
import fahadPortrait from "../../assets/team/optimized/fahad.jpg";
import "./About.css";

const stats = [
  { value: "AI + media", label: "Core growth system" },
  { value: "Creative-led", label: "Brand execution" },
  { value: "Lean team", label: "Fast decision cycles" },
];

const capabilities = [
  "Ads systems tailored to your funnel",
  "Creative production with platform-native thinking",
  "Web experiences built for speed and conversion",
];

const principles = [
  {
    title: "Clarity first",
    body: "Every campaign, asset, and landing page should make the next customer decision easier.",
  },
  {
    title: "Systems over chaos",
    body: "We build repeatable marketing infrastructure so growth is not dependent on guesswork.",
  },
  {
    title: "Premium by restraint",
    body: "Strong typography, disciplined visuals, and performance-minded execution keep the brand elevated.",
  },
];

const members = [
  { name: "Waqar Ahmed", role: "Founder & CEO", portrait: waqarPortrait },
  { name: "Amir Jibran", role: "AI Automation & Ads Specialist", portrait: amirPortrait },
  { name: "Abdullah", role: "Creative Head", portrait: abdullahPortrait },
  { name: "Amna Jabeen", role: "PR Manager", portrait: amnaPortrait },
  { name: "Arslan Khalid", role: "Creative Photographer", portrait: arslanPortrait },
  { name: "Fahad Ali", role: "Videographer", portrait: fahadPortrait },
];

function About({ focusSection = "about" }) {
  const location = useLocation();
  const teamSectionRef = useRef(null);
  const shouldFocusTeam = focusSection === "team" || location.hash === "#team";

  useEffect(() => {
    document.title = shouldFocusTeam
      ? "About & Team | AlphaNineMarketing"
      : "About Us | AlphaNineMarketing";
  }, [shouldFocusTeam]);

  useEffect(() => {
    if (!shouldFocusTeam || !teamSectionRef.current) {
      return;
    }

    const scrollToTeam = () => {
      const navOffset = 118;
      const targetTop =
        teamSectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        navOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    };

    window.requestAnimationFrame(scrollToTeam);
  }, [shouldFocusTeam]);

  return (
    <article className="about-page">
      <header className="about-hero-banner" aria-label="AlphaNine team">
        <div className="about-intro">
          <div className="about-intro__inner">
            <h1 className="about-intro__title">
              The people behind{" "}
              <span className="about-intro__accent">Alpha Nine</span>.
            </h1>
          </div>
        </div>
        <div className="about-banner__frame">
          <LazyImage
            className="about-banner__image"
            src={teamBanner}
            alt="AlphaNineMarketing team — six specialists in formal attire"
            width={1920}
            height={1080}
            sizes="100vw"
            fetchPriority="high"
          />
        </div>
      </header>

      <section className="about-section about-team" id="team" ref={teamSectionRef}>
        <ScrollSection className="about-section__inner">
          <header className="about-team__head">
            <p className="about-section__eyebrow">Meet our team</p>
            <h2 className="about-section__title about-team__title">
              A focused team of specialists behind every campaign.
            </h2>
            <p className="about-section__body about-team__sub">
              Strategy, media, design, PR, photography, and video work together
              here so the brand never feels fragmented.
            </p>
          </header>

          <ul className="about-team__grid">
            {members.map((member) => (
              <li key={member.role} className="about-team__item">
                <article className="about-team-card">
                  <LazyImage
                    className="about-team-card__photo"
                    src={member.portrait}
                    alt={`${member.name}, ${member.role}`}
                    width={720}
                    height={960}
                  />
                  <div className="about-team-card__body">
                    <p className="about-team-card__role">{member.role}</p>
                    <h3 className="about-team-card__name">{member.name}</h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </ScrollSection>
      </section>

      <header className="about-hero about-page__defer">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="about-hero__eyebrow">About us</p>
            <h2 className="about-hero__title">
              Where strategy, automation, and creative move as one.
            </h2>
            <p className="about-hero__lede">
              AlphaNineMarketing is a modern growth studio for brands that want
              sharper systems, stronger presentation, and execution that feels
              premium from first click to final conversion.
            </p>
          </div>
          <div className="about-hero__stats" aria-label="Agency highlights">
            {stats.map((item) => (
              <div key={item.label} className="about-hero__stat">
                <p className="about-hero__stat-value">{item.value}</p>
                <p className="about-hero__stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <ScrollSection as="section" className="about-section about-story about-page__defer">
        <div className="about-section__inner about-story__inner">
          <div className="about-story__content">
            <p className="about-section__eyebrow">Where strategy meets creativity</p>
            <h2 className="about-section__title">
              Bespoke marketing systems built around your business.
            </h2>
            <p className="about-section__body">
              We combine performance marketing, AI-driven automation, design,
              and content production into one operating model so your brand can
              grow with less friction and more consistency.
            </p>
          </div>
          <aside className="about-story__panel" aria-label="Studio capabilities">
            <p className="about-story__panel-label">What we bring</p>
            <ul className="about-story__list">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="about-section about-history about-page__defer">
        <div className="about-section__inner about-history__inner">
          <div className="about-history__lead">
            <p className="about-section__eyebrow about-section__eyebrow--dark">
              Our history
            </p>
            <h2 className="about-section__title about-section__title--dark">
              A growth studio built for modern brands.
            </h2>
          </div>
          <div className="about-history__copy">
            <p className="about-section__body about-section__body--dark">
              We built AlphaNineMarketing around a simple belief: businesses do
              not need disconnected vendors for ads, content, design, and web.
              They need one aligned team that understands how strategy and
              execution reinforce each other.
            </p>
            <p className="about-section__body about-section__body--dark">
              Our work sits at the point where automation makes marketing more
              efficient, while strong creative keeps brands memorable and human.
              That mix lets us move fast without making the brand feel generic.
            </p>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="about-section about-principles about-page__defer">
        <div className="about-section__inner">
          <header className="about-principles__head">
            <p className="about-section__eyebrow">Brand philosophy</p>
            <h2 className="about-section__title">
              Quiet confidence, measured outcomes.
            </h2>
          </header>
          <div className="about-principles__grid">
            {principles.map((item) => (
              <article key={item.title} className="about-principle-card">
                <h3 className="about-principle-card__title">{item.title}</h3>
                <p className="about-principle-card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="about-section about-cta about-page__defer">
        <div className="about-section__inner about-cta__inner">
          <p className="about-section__eyebrow about-section__eyebrow--dark">
            Let’s get creative
          </p>
          <h2 className="about-section__title about-section__title--dark">
            Bring the vision. We’ll build the system behind it.
          </h2>
          <p className="about-section__body about-section__body--dark about-cta__body">
            If you need a team that can think strategically and execute with
            polish, AlphaNineMarketing is built for that overlap.
          </p>
          <Link to="/contact" className="about-cta__button">
            Start a project
          </Link>
        </div>
      </ScrollSection>
    </article>
  );
}

export default About;
