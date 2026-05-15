import React from "react";
import { Link } from "react-router-dom";
import logoWebp from "../../assets/optimized/logo-footer.webp";
import logo from "../../assets/optimized/logo-footer.jpg";
import BrandMark from "../BrandMark/BrandMark";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <picture className="footer__icon-wrap">
            <source srcSet={logoWebp} type="image/webp" />
            <img
              className="footer__icon"
              src={logo}
              alt=""
              width="52"
              height="52"
              decoding="async"
            />
          </picture>
          <div>
            <BrandMark />
            <p className="footer__tagline">
              AI-powered growth for ambitious brands.
            </p>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <Link to="/portfolio" className="footer__link">
            Portfolio
          </Link>
          <Link to="/services" className="footer__link">
            Services
          </Link>
          <Link to="/about" className="footer__link">
            About
          </Link>
          <Link to="/contact" className="footer__link">
            Contact
          </Link>
        </nav>

        <p className="footer__legal">
          © {year} AlphaNineMarketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
