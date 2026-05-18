import React, { useEffect, useState } from "react";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import StaggerGroup from "../../components/StaggerGroup/StaggerGroup";
import TypewriterText from "../../components/TypewriterText/TypewriterText";
import { socialLinks } from "../../data/socialLinks";
import SocialIcon from "../../components/SocialIcon/SocialIcon";
import "../../components/SocialIcon/SocialIcon.css";
import "./Contact.css";

const initialForm = { name: "", email: "", company: "", message: "" };
const quickFacts = [
  { label: "Response time", value: "Within 2 business days" },
  { label: "Best for", value: "Ads, AI, content, web" },
  { label: "Engagement style", value: "Remote-first, high-touch" },
];

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    document.title = "Contact | AlphaNineMarketing";
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    /*
      Performance / UX: avoid real network in this template; replace with API route or form service.
    */
    setStatus("sent");
    setForm(initialForm);
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="contact-page">
      <div className="contact-layout">
        <ScrollSection as="header" className="contact-intro">
          <div className="contact-intro__panel">
            <p className="contact-intro__eyebrow">Contact</p>
            <TypewriterText
              as="h1"
              className="contact-intro__title"
              text={"Let\u2019s build momentum."}
              delay={340}
            />
            <p className="contact-intro__lede">
              Share your goals, timelines, and links. We reply within two
              business days with a focused next-step recommendation.
            </p>

            <StaggerGroup as="ul" className="contact-facts" aria-label="Agency quick facts">
              {quickFacts.map((fact) => (
                <li key={fact.label} className="contact-facts__item">
                  <span className="contact-facts__label">{fact.label}</span>
                  <span className="contact-facts__value">{fact.value}</span>
                </li>
              ))}
            </StaggerGroup>
          </div>

          <div className="contact-details" aria-label="Agency contact details">
            <div className="contact-details__card">
              <p className="contact-details__label">Email</p>
              <a
                className="contact-details__value"
                href="mailto:Info.alphanine@gmail.com"
              >
                Info.alphanine@gmail.com
              </a>
            </div>
            <div className="contact-details__card">
              <p className="contact-details__label">Phone</p>
              <a className="contact-details__value" href="tel:+923365010457">
                +92 336 5010457
              </a>
            </div>
            <div className="contact-details__card">
              <p className="contact-details__label">Studio</p>
              <p className="contact-details__value contact-details__value--static">
                Remote-first · meetings by appointment
              </p>
            </div>
          </div>

          <div className="contact-social" aria-label="Social media">
            <p className="contact-social__label">Social</p>
            <StaggerGroup as="ul" className="contact-social__list">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="contact-social__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <SocialIcon name={link.id} size={22} />
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              ))}
            </StaggerGroup>
          </div>

          <div className="contact-note" aria-label="Project note">
            <p className="contact-note__label">What to share</p>
            <p className="contact-note__copy">
              Include your goals, current channels, timelines, and any relevant
              links so we can respond with sharper direction.
            </p>
          </div>
        </ScrollSection>

        <ScrollSection
          as="section"
          className="contact-form-section"
          aria-labelledby="contact-form-heading"
        >
          <div className="contact-form-section__head">
            <p className="contact-form-section__eyebrow">Start a project</p>
            <h2 id="contact-form-heading" className="contact-form-section__title">
              Tell us what you need.
            </h2>
            <p className="contact-form-section__sub">
              Keep it simple. We’ll turn it into a clear next move.
            </p>
          </div>

          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="contact-form__row">
              <label className="contact-field" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="contact-field__input"
                  placeholder=" "
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <span className="contact-field__label">Name</span>
              </label>
              <label className="contact-field" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="contact-field__input"
                  placeholder=" "
                  value={form.email}
                  onChange={onChange}
                  required
                />
                <span className="contact-field__label">Email</span>
              </label>
            </div>
            <label className="contact-field" htmlFor="company">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="contact-field__input"
                placeholder=" "
                value={form.company}
                onChange={onChange}
              />
              <span className="contact-field__label">Company (optional)</span>
            </label>
            <label className="contact-field" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={6}
                className="contact-field__textarea"
                placeholder=" "
                value={form.message}
                onChange={onChange}
                required
              />
              <span className="contact-field__label">Message</span>
            </label>
            <div className="contact-form__footer">
              <button type="submit" className="contact-form__submit">
                Send message
              </button>
              <p className="contact-form__footnote">
                No pressure, just a focused conversation.
              </p>
            </div>
            {status === "sent" ? (
              <p className="contact-form__status" role="status">
                Thanks - your note is on our desk. We’ll be in touch shortly.
              </p>
            ) : null}
          </form>
        </ScrollSection>
      </div>
    </div>
  );
}

export default Contact;
