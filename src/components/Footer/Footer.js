import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import BrandMark from "../BrandMark/BrandMark";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            className="footer__icon"
            src={logo}
            alt=""
            width="52"
            height="52"
            loading="lazy"
            decoding="async"
          />
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
