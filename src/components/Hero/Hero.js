import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__glow hero__glow--one" aria-hidden />
      <div className="hero__glow hero__glow--two" aria-hidden />
      <div className="hero__inner">
        <div className="hero__layout">
          <div className="hero__content">
            <p className="hero__eyebrow">Premium digital marketing · AI-first</p>
            <h1 id="hero-heading" className="hero__title">
              Scale smarter with{" "}
              <span className="hero__title-accent">AI-powered</span> growth.
            </h1>
            <p className="hero__lede">
              Alpha Nine Marketing pairs precision media, automation, and craft
              creative so your brand moves faster - without the noise.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="hero__btn hero__btn--primary">
                Book a strategy call
              </Link>
              <Link to="/services" className="hero__btn hero__btn--ghost">
                Explore services
              </Link>
            </div>
            <dl className="hero__stats">
              <div className="hero__stat">
                <dt className="hero__stat-label">Core focus</dt>
                <dd className="hero__stat-value">Ads + automation</dd>
              </div>
              <div className="hero__stat">
                <dt className="hero__stat-label">Studio output</dt>
                <dd className="hero__stat-value">Content to code</dd>
              </div>
              <div className="hero__stat">
                <dt className="hero__stat-label">Experience</dt>
                <dd className="hero__stat-value">Performance-led</dd>
              </div>
            </dl>
          </div>

          <div className="hero__visual">
            <div className="hero__image-shell">
              <img
                className="hero__image"
                src={bannerImage}
                alt="AlphaNineMarketing digital campaign showcase"
                width="1240"
                height="1718"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
