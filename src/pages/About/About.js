import React, { useEffect } from "react";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import "./About.css";

function About() {
  useEffect(() => {
    document.title = "About Us | Mission & Vision | AlphaNineMarketing";
  }, []);

  return (
    <article className="about-page">
      <header className="about-hero">
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">About</p>
          <h1 className="about-hero__title">A studio built for signal.</h1>
          <p className="about-hero__lede">
            AlphaNineMarketing exists for brands that want the rigor of a
            performance team and the taste of a boutique creative house.
          </p>
        </div>
      </header>

      <ScrollSection as="section" className="about-block about-block--mission">
        <div className="about-block__inner">
          <h2 className="about-block__title">Mission</h2>
          <p className="about-block__body">
            Accelerate growth with intelligent automation and creative that earns
            attention — without sacrificing brand equity or customer trust.
          </p>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="about-block about-block--vision">
        <div className="about-block__inner about-block__inner--split">
          <div>
            <h2 className="about-block__title">Vision</h2>
            <p className="about-block__body">
              A future where marketing infrastructure feels invisible: campaigns
              self-tune, creative refreshes on cadence, and leadership sees the
              story behind every number.
            </p>
          </div>
          <aside className="about-aside" aria-label="Philosophy highlights">
            <p className="about-aside__label">Philosophy</p>
            <ul className="about-aside__list">
              <li>Clarity over volume</li>
              <li>Systems over one-offs</li>
              <li>Speed with craft</li>
            </ul>
          </aside>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="about-block about-block--dark">
        <div className="about-block__inner">
          <h2 className="about-block__title about-block__title--on-dark">
            Brand philosophy
          </h2>
          <p className="about-block__body about-block__body--on-dark">
            We believe premium is quiet confidence: generous whitespace, honest
            copy, and interfaces that load fast enough to respect the click. Our
            monochrome palette keeps the work timeless; contrast is reserved for
            meaning — a CTA, a proof point, a human moment.
          </p>
        </div>
      </ScrollSection>
    </article>
  );
}

export default About;
