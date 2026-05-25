import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import TypewriterText from "../TypewriterText/TypewriterText";
import useDeferredMount from "../../hooks/useDeferredMount";
import { heroItem, heroStagger } from "../../motion/presets";
import "./Hero.css";

const HeroScene = lazy(() => import("./HeroScene"));

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 11) % 94}%`,
  top: `${(i * 23 + 7) % 88}%`,
  delay: `${(i % 6) * 0.7}s`,
  size: `${4 + (i % 3) * 2}px`,
}));

function HeroScenePlaceholder() {
  return (
    <div className="hero__scene-placeholder" aria-hidden>
      <div className="hero__scene-placeholder-grid" />
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const showScene = useDeferredMount({ enabled: !reduceMotion });

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__mesh hero__mesh--animated" aria-hidden />
      <div className="hero__mesh hero__mesh--secondary hero__mesh--animated-slow" aria-hidden />
      <div className="hero__particles" aria-hidden>
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__layout">
          <m.div
            className="hero__content"
            variants={heroStagger}
            initial={false}
            animate="visible"
          >
            <m.p className="hero__eyebrow" variants={heroItem}>
              Premium digital marketing · AI-first
            </m.p>
            <TypewriterText
              as="h1"
              id="hero-heading"
              className="hero__title"
              priority
              delay={120}
              segments={[
                { text: "Scale smarter with " },
                { text: "AI-powered", className: "hero__title-accent" },
                { text: " growth." },
              ]}
            />
            <m.p className="hero__lede" variants={heroItem}>
              Alpha Nine Marketing pairs precision media, automation, and craft
              creative so your brand moves faster - without the noise.
            </m.p>
            <m.div className="hero__actions" variants={heroItem}>
              <Link to="/contact" className="hero__btn hero__btn--primary">
                Book a strategy call
              </Link>
              <Link to="/services" className="hero__btn hero__btn--ghost">
                Explore services
              </Link>
            </m.div>
            <m.dl className="hero__stats" variants={heroItem}>
              <m.div
                className="hero__stat"
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <dt className="hero__stat-label">Core focus</dt>
                <dd className="hero__stat-value">Ads + automation</dd>
              </m.div>
              <m.div
                className="hero__stat"
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <dt className="hero__stat-label">Studio output</dt>
                <dd className="hero__stat-value">Content to code</dd>
              </m.div>
              <m.div
                className="hero__stat"
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <dt className="hero__stat-label">Experience</dt>
                <dd className="hero__stat-value">Performance-led</dd>
              </m.div>
            </m.dl>
          </m.div>

          <m.div
            className="hero__visual"
            initial={false}
            animate={{ opacity: 1 }}
          >
            <div className="hero__scene-shell">
              <div className="hero__scene-glow" aria-hidden />
              {showScene ? (
                <Suspense fallback={<HeroScenePlaceholder />}>
                  <HeroScene />
                </Suspense>
              ) : (
                <HeroScenePlaceholder />
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
