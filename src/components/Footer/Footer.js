import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/logo2.png";
import BrandMark from "../BrandMark/BrandMark";
import { servicesList } from "../../data/services";
import { socialLinks } from "../../data/socialLinks";
import SocialIcon from "../SocialIcon/SocialIcon";
import "../SocialIcon/SocialIcon.css";
import "./Footer.css";

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__glow" aria-hidden />
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <img
                className="footer__icon"
                src={footerLogo}
                alt="Alpha Nine Marketing"
                width="56"
                height="72"
                decoding="async"
              />
              <div>
                <BrandMark />
                <p className="footer__tagline">
                  AI-powered growth for ambitious brands — strategy, creative,
                  and execution in one studio.
                </p>
              </div>
            </div>
            <Link to="/contact" className="footer__cta theme-btn-primary">
              Start a project
            </Link>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <p className="footer__col-title">Explore</p>
            <ul className="footer__link-list">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <p className="footer__col-title">Services</p>
            <ul className="footer__link-list">
              {servicesList.map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="footer__link">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--contact">
            <p className="footer__col-title">Contact</p>
            <ul className="footer__contact-list">
              <li>
                <a
                  className="footer__contact-link"
                  href="mailto:Info.alphanine@gmail.com"
                >
                  Info.alphanine@gmail.com
                </a>
              </li>
              <li>
                <a className="footer__contact-link" href="tel:+923365010457">
                  +92 336 5010457
                </a>
              </li>
              <li>
                <span className="footer__contact-note">
                  Remote-first · meetings by appointment
                </span>
              </li>
            </ul>
            <div className="footer__social">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  <SocialIcon name={link.id} size={20} />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">
            © {year} AlphaNineMarketing. All rights reserved.
          </p>
          <p className="footer__credit">
            Developed by{" "}
            <a
              href="https://profitsols.com"
              className="footer__credit-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              profitsols.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
