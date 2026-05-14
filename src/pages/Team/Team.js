import React, { useEffect } from "react";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import ceoPortrait from "../../assets/profiles/ceo.svg";
import automationPortrait from "../../assets/profiles/automation.svg";
import contentPortrait from "../../assets/profiles/content.svg";
import designerPortrait from "../../assets/profiles/designer.svg";
import prPortrait from "../../assets/profiles/pr.svg";
import photographerPortrait from "../../assets/profiles/photographer.svg";
import videographerPortrait from "../../assets/profiles/videographer.svg";
import "./Team.css";

const members = [
  { name: "Jordan Lee", role: "CEO", portrait: ceoPortrait },
  {
    name: "Sam Rivera",
    role: "AI Automation & Ads Specialist",
    portrait: automationPortrait,
  },
  { name: "Alex Kim", role: "Content Creator", portrait: contentPortrait },
  {
    name: "Taylor Brooks",
    role: "Graphic Designer",
    portrait: designerPortrait,
  },
  { name: "Riley Chen", role: "PR Manager", portrait: prPortrait },
  {
    name: "Casey Morgan",
    role: "Photographer",
    portrait: photographerPortrait,
  },
  {
    name: "Jamie Ortiz",
    role: "Videographer",
    portrait: videographerPortrait,
  },
];

function Team() {
  useEffect(() => {
    document.title = "Team | AlphaNineMarketing";
  }, []);

  return (
    <div className="team-page">
      <header className="team-hero">
        <div className="team-hero__inner">
          <p className="team-hero__eyebrow">Team</p>
          <h1 className="team-hero__title">People behind the outcomes.</h1>
          <p className="team-hero__lede">
            Placeholder names for layout — swap with your roster and photography
            when ready.
          </p>
        </div>
      </header>

      <section className="team-grid-section" aria-label="Team members">
        <div className="team-grid-section__inner">
          <ul className="team-grid">
            {members.map((m) => (
              <ScrollSection as="li" key={m.role} className="team-card-wrap">
                <article className="team-card">
                  <img
                    className="team-card__photo"
                    src={m.portrait}
                    alt={`Illustrated profile placeholder for ${m.name}`}
                    width="360"
                    height="480"
                    loading="lazy"
                    decoding="async"
                  />
                  <h2 className="team-card__name">{m.name}</h2>
                  <p className="team-card__role">{m.role}</p>
                </article>
              </ScrollSection>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Team;
