import React, { Suspense, lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import AnimatedCounter from "../../components/AnimatedCounter/AnimatedCounter";
import DeferredSection from "../../components/DeferredSection/DeferredSection";
import "./Home.css";

const HomeServicesSection = lazy(() => import("./HomeServicesSection"));
const HomePortfolioSection = lazy(() => import("./HomePortfolioSection"));
const HomeTeamSection = lazy(() => import("./HomeTeamSection"));

function Home() {
  useEffect(() => {
    document.title =
      "AlphaNineMarketing | AI-Powered Digital Marketing Agency";
  }, []);

  return (
    <div className="home">
      <Hero />

      <DeferredSection minHeight="28rem" className="home-deferred home-deferred--services">
        <Suspense fallback={null}>
          <HomeServicesSection />
        </Suspense>
      </DeferredSection>

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

      <DeferredSection minHeight="22rem" className="home-deferred home-deferred--portfolio">
        <Suspense fallback={null}>
          <HomePortfolioSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="20rem" className="home-deferred home-deferred--team">
        <Suspense fallback={null}>
          <HomeTeamSection />
        </Suspense>
      </DeferredSection>

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
