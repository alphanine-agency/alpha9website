import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import TypewriterText from "../TypewriterText/TypewriterText";
import HeroScene from "./HeroScene";
import { heroItem, heroStagger } from "../../motion/presets";
import "./Hero.css";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 11) % 94}%`,
  top: `${(i * 23 + 7) % 88}%`,
  delay: `${(i % 6) * 0.7}s`,
  size: `${4 + (i % 3) * 2}px`,
}));

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <motion.div
        className="hero__mesh"
        aria-hidden
        animate={reduceMotion ? false : { opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero__mesh hero__mesh--secondary"
        aria-hidden
        animate={reduceMotion ? false : { x: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
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
          <motion.div
            className="hero__content"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="hero__eyebrow" variants={heroItem}>
              Premium digital marketing · AI-first
            </motion.p>
            <TypewriterText
              as="h1"
              id="hero-heading"
              className="hero__title"
              delay={480}
              segments={[
                { text: "Scale smarter with " },
                { text: "AI-powered", className: "hero__title-accent" },
                { text: " growth." },
              ]}
            />
            <motion.p className="hero__lede" variants={heroItem}>
              Alpha Nine Marketing pairs precision media, automation, and craft
              creative so your brand moves faster - without the noise.
            </motion.p>
            <motion.div className="hero__actions" variants={heroItem}>
              <Link to="/contact" className="hero__btn hero__btn--primary">
                Book a strategy call
              </Link>
              <Link to="/services" className="hero__btn hero__btn--ghost">
                Explore services
              </Link>
            </motion.div>
            <motion.dl className="hero__stats" variants={heroItem}>
              <motion.div
                className="hero__stat"
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <dt className="hero__stat-label">Core focus</dt>
                <dd className="hero__stat-value">Ads + automation</dd>
              </motion.div>
              <motion.div
                className="hero__stat"
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <dt className="hero__stat-label">Studio output</dt>
                <dd className="hero__stat-value">Content to code</dd>
              </motion.div>
              <motion.div
                className="hero__stat"
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <dt className="hero__stat-label">Experience</dt>
                <dd className="hero__stat-value">Performance-led</dd>
              </motion.div>
            </motion.dl>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__scene-shell">
              <div className="hero__scene-glow" aria-hidden />
              <HeroScene />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
