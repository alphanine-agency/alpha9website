import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import homeLogo from "../../assets/logo2.png";
import pageLogo from "../../assets/logo.png";
import BrandMark from "../BrandMark/BrandMark";
import "./Navbar.css";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomeNav =
    location.pathname === "/" || location.pathname === "/about";
  const brandLogo = isHomeNav ? homeLogo : pageLogo;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${
        isHomeNav ? "navbar--home" : ""
      } ${open ? "navbar--menu-open" : ""}`}
      role="banner"
    >
      <div className="navbar__inner">
        <div className="navbar__shell">
          <NavLink
            to="/"
            className="navbar__brand"
            onClick={closeMenu}
            aria-label="AlphaNineMarketing home"
          >
            <img
              className="navbar__brand-icon"
              src={brandLogo}
              alt=""
              width="40"
              height="40"
              decoding="async"
            />
            <BrandMark compact />
          </NavLink>

          <nav
            id="primary-navigation"
            className={`navbar__nav ${open ? "navbar__nav--open" : ""}`}
            aria-label="Primary"
          >
            <div className="navbar__mobile-head">
              <p className="navbar__mobile-label">Menu</p>
              <button
                type="button"
                className="navbar__mobile-close"
                onClick={closeMenu}
              >
                Close
              </button>
            </div>
            <ul className="navbar__list">
              {navItems.map(({ to, label, end }, index) => (
                <li key={to} className="navbar__item">
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `navbar__link${isActive ? " navbar__link--active" : ""}`
                    }
                    onClick={closeMenu}
                  >
                    <span className="navbar__link-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="navbar__link-text">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink
              to="/contact"
              className="navbar__cta navbar__cta--mobile"
              onClick={closeMenu}
            >
              Start a project
            </NavLink>
          </nav>

          <NavLink
            to="/contact"
            className="navbar__cta navbar__cta--desktop"
            onClick={closeMenu}
          >
            Start a project
          </NavLink>

          <button
            type="button"
            className={`navbar__toggle${open ? " navbar__toggle--open" : ""}`}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar__toggle-bar" aria-hidden />
            <span className="navbar__toggle-bar" aria-hidden />
            <span className="navbar__toggle-bar" aria-hidden />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        className="navbar__backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  );
}

export default Navbar;
