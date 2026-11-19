import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import useMobileLite from "../../hooks/useMobileLite";
import { padelChaseCaseStudy as cs } from "../../data/caseStudies";
import { getPortfolioMedia } from "../../utils/getPortfolioMedia";
import {
  IconMeta,
  IconSocial,
  IconWhatsApp,
  IconCapture,
  IconSort,
  IconHub,
  IconCourt,
  IconRacket,
  IconBall,
  IconCalendar,
  IconClock,
  IconUser,
  IconTrophy,
  IconSponsor,
  IconReels,
  IconCheck,
  IconSales,
  IconArrow,
  IconArrowDown,
  FlowParticleSvg,
} from "./PadelChaseIcons";
import "./PadelChaseCaseStudy.css";

const lifestyleImg = getPortfolioMedia("padel chase 2.jpeg");

const architectureSteps = [
  { label: "Meta Ads", Icon: IconMeta },
  { label: "IG / FB reach", Icon: IconSocial },
  { label: "WhatsApp / DM", Icon: IconWhatsApp },
  { label: "Lead capture", Icon: IconCapture },
  { label: "Booking hub", Icon: IconHub },
];

const playerPath = [
  { label: "Player inquiry", Icon: IconUser, auto: true },
  { label: "Date select", Icon: IconCalendar, auto: true },
  { label: "Time slot", Icon: IconClock, auto: true },
  { label: "Court match", Icon: IconCourt, auto: true },
  { label: "Confirm booking", Icon: IconCheck, auto: true },
  { label: "On-court session", Icon: IconRacket, auto: false },
];

const eventPath = [
  { label: "Event interest", Icon: IconTrophy, auto: true },
  { label: "Registration", Icon: IconCapture, auto: true },
  { label: "Team allocation", Icon: IconSort, auto: true },
  { label: "Match schedule", Icon: IconCalendar, auto: true },
  { label: "Live scoreboard", Icon: IconSales, auto: false },
  { label: "Awards stage", Icon: IconTrophy, auto: false },
];

const playerSteps = [
  { label: "Social discovery", Icon: IconSocial },
  { label: "DM / WhatsApp intent", Icon: IconWhatsApp },
  { label: "Court booking request", Icon: IconCourt },
  { label: "Session confirmation", Icon: IconCheck },
  { label: "Repeat play habit", Icon: IconBall },
];

const eventSteps = [
  { label: "Tournament promo", Icon: IconTrophy },
  { label: "Sponsor visibility", Icon: IconSponsor },
  { label: "Creator content", Icon: IconReels },
  { label: "Community buzz", Icon: IconSocial },
  { label: "Commercial partners", Icon: IconSales },
];

const playerPipeline = [
  { label: "New Inquiry", Icon: IconCapture, volume: 100 },
  { label: "Slot Intent", Icon: IconClock, volume: 74 },
  { label: "Court Selected", Icon: IconCourt, volume: 58 },
  { label: "Booking Confirmed", Icon: IconCheck, volume: 41 },
  { label: "Session Played", Icon: IconRacket, volume: 28 },
];

const eventPipeline = [
  { label: "Event Interest", Icon: IconTrophy, volume: 100 },
  { label: "Registered", Icon: IconCapture, volume: 68 },
  { label: "Bracket Ready", Icon: IconSort, volume: 52 },
  { label: "Match Day", Icon: IconCalendar, volume: 38 },
  { label: "Champion Stage", Icon: IconCheck, volume: 22 },
];

const serviceIcons = [
  IconSocial,
  IconMeta,
  IconTrophy,
  IconReels,
  IconSponsor,
  IconUser,
  IconCourt,
];

function FadeIn({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const mobileLite = useMobileLite();
  if (reduceMotion || mobileLite) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

function PathRail({ steps, tone = "player" }) {
  return (
    <div className={`pc-rail pc-rail--${tone}`}>
      {steps.map((step, index) => {
        const Icon = step.Icon;
        return (
          <React.Fragment key={step.label}>
            <div className={`pc-rail__node${step.auto === false ? " pc-rail__node--manual" : ""}`}>
              <span className="pc-rail__icon">
                <Icon />
              </span>
              <p>{step.label}</p>
              <span className="pc-rail__tag">
                {step.auto === false ? "Venue team" : "System"}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div className="pc-rail__arrow" aria-hidden>
                <IconArrow className="pc-rail__arrow-svg" />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function HeroBookingArt() {
  return (
    <div className="pc-hero__flow" aria-hidden>
      <svg viewBox="0 0 320 180" className="pc-hero__flow-svg">
        <path className="pc-hero__flow-line" d="M28 90 H120" />
        <path className="pc-hero__flow-line" d="M120 90 C150 90, 150 42, 190 42 H292" />
        <path className="pc-hero__flow-line" d="M120 90 C150 90, 150 138, 190 138 H292" />
        <circle cx="28" cy="90" r="10" className="pc-hero__flow-node" />
        <circle cx="120" cy="90" r="12" className="pc-hero__flow-node pc-hero__flow-node--core" />
        <circle cx="292" cy="42" r="8" className="pc-hero__flow-node" />
        <circle cx="292" cy="138" r="8" className="pc-hero__flow-node pc-hero__flow-node--alt" />
        <circle cx="70" cy="90" r="3" className="pc-hero__flow-particle" />
        <circle cx="210" cy="42" r="3" className="pc-hero__flow-particle" />
        <circle cx="230" cy="138" r="3" className="pc-hero__flow-particle pc-hero__flow-particle--delay" />
      </svg>
      <div className="pc-hero__flow-labels">
        <span>Social</span>
        <span>Hub</span>
        <span>Booking</span>
        <span>Court</span>
      </div>
    </div>
  );
}

function WorkflowDiagram() {
  return (
    <div className="pc-flow" aria-label="Padel Chase Inn growth architecture">
      <div className="pc-flow__canvas" aria-hidden>
        <svg className="pc-flow__bg-lines" viewBox="0 0 1000 220" preserveAspectRatio="none">
          <path className="pc-flow__bg-path" d="M40 110 C180 40, 320 180, 500 110 S820 40, 960 110" />
          <path className="pc-flow__bg-path pc-flow__bg-path--soft" d="M40 140 C220 200, 380 60, 560 140 S820 200, 960 120" />
        </svg>
      </div>

      <div className="pc-flow__spine">
        {architectureSteps.map((step, index) => {
          const Icon = step.Icon;
          return (
            <React.Fragment key={step.label}>
              <div className="pc-flow__node">
                <span className="pc-flow__icon-wrap">
                  <Icon className="pc-flow__icon" />
                  <span className="pc-flow__pulse" />
                </span>
                <p className="pc-flow__node-label">{step.label}</p>
                <span className="pc-flow__badge">Automated</span>
              </div>
              {index < architectureSteps.length - 1 ? (
                <div className="pc-flow__connector" aria-hidden>
                  <FlowParticleSvg className="pc-flow__connector-svg" />
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      <div className="pc-flow__drop" aria-hidden>
        <IconArrowDown className="pc-flow__drop-arrow" />
      </div>

      <div className="pc-flow__engine">
        <div className="pc-flow__engine-ring" aria-hidden />
        <div className="pc-flow__engine-core">
          <IconCourt className="pc-flow__engine-icon" />
          <span>Booking engine</span>
        </div>
        <div className="pc-flow__engine-split" aria-hidden>
          <span className="pc-flow__engine-branch pc-flow__engine-branch--left" />
          <span className="pc-flow__engine-branch pc-flow__engine-branch--right" />
        </div>
      </div>

      <div className="pc-flow__paths">
        <article className="pc-flow__path pc-flow__path--player">
          <div className="pc-flow__path-head">
            <IconUser />
            <div>
              <p className="pc-flow__path-eyebrow">Pathway 01</p>
              <h3>Player bookings</h3>
            </div>
          </div>
          <PathRail steps={playerPath} tone="player" />
        </article>
        <article className="pc-flow__path pc-flow__path--event">
          <div className="pc-flow__path-head">
            <IconTrophy />
            <div>
              <p className="pc-flow__path-eyebrow">Pathway 02</p>
              <h3>Events & community</h3>
            </div>
          </div>
          <PathRail steps={eventPath} tone="event" />
        </article>
      </div>

      <p className="pc-flow__note">
        Animated flow shows how attention becomes court time: capture and routing are system-driven; on-court delivery stays with the venue team.
      </p>
    </div>
  );
}

function InquiryRoutingTree() {
  return (
    <div className="pc-tree" aria-label="Inquiry routing decision tree">
      <svg className="pc-tree__lines" viewBox="0 0 400 120" aria-hidden>
        <path className="pc-tree__line" d="M200 18 V48" />
        <path className="pc-tree__line" d="M200 48 H90" />
        <path className="pc-tree__line" d="M200 48 H310" />
        <path className="pc-tree__line pc-tree__line--dash" d="M90 48 V95" />
        <path className="pc-tree__line pc-tree__line--dash pc-tree__line--amber" d="M310 48 V95" />
        <circle cx="200" cy="18" r="5" className="pc-tree__node-dot" />
        <circle cx="90" cy="95" r="4" className="pc-tree__node-dot" />
        <circle cx="310" cy="95" r="4" className="pc-tree__node-dot pc-tree__node-dot--amber" />
      </svg>

      <div className="pc-tree__root">
        <IconCapture />
        Incoming inquiry
      </div>

      <div className="pc-tree__branches">
        <article className="pc-tree__branch pc-tree__branch--player">
          <div className="pc-tree__branch-head">
            <IconUser />
            <h3>Player</h3>
          </div>
          <ul>
            <li><IconCalendar /> Preferred date</li>
            <li><IconClock /> Time slot</li>
            <li><IconCourt /> Court preference</li>
            <li><IconWhatsApp /> Contact channel</li>
          </ul>
        </article>
        <article className="pc-tree__branch pc-tree__branch--event">
          <div className="pc-tree__branch-head">
            <IconTrophy />
            <h3>Event / Partner</h3>
          </div>
          <ul>
            <li><IconTrophy /> Tournament interest</li>
            <li><IconSponsor /> Sponsorship intent</li>
            <li><IconReels /> Content collab</li>
            <li><IconUser /> Team / brand details</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

function SmartBookingJourney() {
  return (
    <div className="pc-booking" aria-label="Smart booking journey">
      <div className="pc-booking__stage">
        <p className="pc-booking__eyebrow">Courts live · booking-first</p>
        <svg className="pc-booking__court" viewBox="0 0 560 340" role="img">
          <title>Realistic padel court with live booking markers</title>
          <defs>
            <linearGradient id="pcArenaFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2330" />
              <stop offset="100%" stopColor="#0b1018" />
            </linearGradient>
            <linearGradient id="pcTurf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f6b4a" />
              <stop offset="55%" stopColor="#165538" />
              <stop offset="100%" stopColor="#0f3d28" />
            </linearGradient>
            <linearGradient id="pcGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ec9ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#9ec9ff" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="pcNetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5f5f5" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f5f5f5" stopOpacity="0.25" />
            </linearGradient>
            <filter id="pcSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="pcTurfGrain" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 8 L8 0" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Arena base */}
          <rect x="24" y="28" width="512" height="284" rx="22" fill="url(#pcArenaFloor)" />
          <rect x="24" y="28" width="512" height="284" rx="22" fill="none" stroke="rgba(255,107,0,0.18)" />

          {/* Ambient light */}
          <ellipse cx="280" cy="88" rx="170" ry="36" fill="rgba(255,140,0,0.08)" />

          {/* Glass cage back wall */}
          <path d="M96 78 H464 L492 118 V246 L464 278 H96 L68 246 V118 Z" fill="url(#pcGlass)" stroke="rgba(180,210,255,0.28)" strokeWidth="1.2" />

          {/* Turf court (perspective) */}
          <path d="M118 108 H442 L468 252 H92 Z" fill="url(#pcTurf)" />
          <path d="M118 108 H442 L468 252 H92 Z" fill="url(#pcTurfGrain)" />
          <path d="M118 108 H442 L468 252 H92 Z" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" />

          {/* Center line */}
          <path d="M280 108 V252" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
          {/* Service boxes */}
          <path d="M154 140 H406 V210 H154 Z" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1.2" />
          <path d="M280 140 V210" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" />

          {/* Net */}
          <path d="M102 178 H458" stroke="url(#pcNetGrad)" strokeWidth="2.4" />
          <path d="M102 178 H458" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="8" strokeDasharray="2 5" />
          <circle cx="102" cy="178" r="3.5" fill="#c8c8c8" />
          <circle cx="458" cy="178" r="3.5" fill="#c8c8c8" />

          {/* Side glass frames */}
          <path d="M96 78 L68 118 V246 L96 278" fill="none" stroke="rgba(200,220,255,0.35)" strokeWidth="1.4" />
          <path d="M464 78 L492 118 V246 L464 278" fill="none" stroke="rgba(200,220,255,0.35)" strokeWidth="1.4" />
          <path d="M96 118 H464" fill="none" stroke="rgba(200,220,255,0.2)" strokeWidth="1" />
          <path d="M96 210 H464" fill="none" stroke="rgba(200,220,255,0.16)" strokeWidth="1" />

          {/* Live booking markers */}
          <g filter="url(#pcSoftGlow)">
            <circle cx="196" cy="156" r="9" fill="#FF6B00" opacity="0.95">
              <animate attributeName="opacity" values="0.95;0.45;0.95" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="360" cy="200" r="9" fill="#FFB347" opacity="0.85">
              <animate attributeName="opacity" values="0.85;0.35;0.85" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
            </circle>
          </g>
          <text x="196" y="176" className="pc-booking__slot">Slot A · open</text>
          <text x="360" y="220" className="pc-booking__slot">Slot B · hold</text>

          {/* Ball in play */}
          <circle r="5.5" fill="#FF6B00" stroke="#fff" strokeWidth="1.2" filter="url(#pcSoftGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" path="M196 156 Q280 120 360 200 Q280 236 196 156" />
          </circle>

          {/* Status chip */}
          <rect x="198" y="292" width="164" height="22" rx="11" fill="rgba(255,107,0,0.14)" stroke="rgba(255,107,0,0.35)" />
          <circle cx="216" cy="303" r="4" fill="#39FF14" />
          <text x="228" y="307" className="pc-booking__live">4 courts · live availability</text>
        </svg>
      </div>
      <PathRail
        steps={[
          { label: "Guest", Icon: IconUser, auto: true },
          { label: "Date", Icon: IconCalendar, auto: true },
          { label: "Time", Icon: IconClock, auto: true },
          { label: "Court", Icon: IconCourt, auto: true },
          { label: "Booked", Icon: IconCheck, auto: true },
        ]}
        tone="player"
      />
      <p className="pc-note">
        Padel Chase Inn already offers online court availability — Alpha Nine amplifies demand into that booking system.
      </p>
    </div>
  );
}

function VenueCourtMap() {
  const courts = [
    { id: "01", x: 70, y: 70, live: true },
    { id: "02", x: 260, y: 70, live: true },
    { id: "03", x: 70, y: 200, live: false },
    { id: "04", x: 260, y: 200, live: true },
  ];
  return (
    <div className="pc-venue" aria-label="Venue court availability map">
      <svg className="pc-venue__svg" viewBox="0 0 420 340" role="img">
        <title>Four-court venue layout with booking hub</title>
        <rect className="pc-venue__shell" x="20" y="20" width="380" height="300" rx="18" />
        {courts.map((court) => (
          <g key={court.id} className={court.live ? "pc-venue__court pc-venue__court--live" : "pc-venue__court"}>
            <rect x={court.x} y={court.y} width="90" height="60" rx="6" />
            <line x1={court.x + 45} y1={court.y} x2={court.x + 45} y2={court.y + 60} />
            <line x1={court.x} y1={court.y + 30} x2={court.x + 90} y2={court.y + 30} />
            <text x={court.x + 45} y={court.y + 72} className="pc-venue__court-label">
              Court {court.id}
            </text>
            {court.live ? (
              <circle cx={court.x + 78} cy={court.y + 12} r="5" className="pc-venue__live-dot">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
            ) : null}
          </g>
        ))}
        <circle className="pc-venue__hub" cx="210" cy="175" r="28" />
        <text x="210" y="171" className="pc-venue__hub-text">Book</text>
        <text x="210" y="187" className="pc-venue__hub-text">Hub</text>
        {courts.map((court, index) => (
          <g key={`route-${court.id}`}>
            <path
              className="pc-venue__route"
              d={`M210 175 Q ${(210 + court.x + 45) / 2} ${175 + (index % 2 ? 20 : -20)} ${court.x + 45} ${court.y + 30}`}
            />
            <circle r="3.5" className="pc-venue__packet">
              <animateMotion
                dur={`${2.8 + index * 0.3}s`}
                repeatCount="indefinite"
                begin={`${index * 0.4}s`}
                path={`M${court.x + 45} ${court.y + 30} Q ${(210 + court.x + 45) / 2} ${175 + (index % 2 ? 20 : -20)} 210 175`}
              />
            </circle>
          </g>
        ))}
      </svg>
      <div className="pc-venue__legend">
        <span><i className="pc-venue__swatch pc-venue__swatch--live" /> Available / inquiry live</span>
        <span><i className="pc-venue__swatch" /> Quiet slot</span>
      </div>
    </div>
  );
}

function TournamentBracket() {
  const steps = [
    { label: "Registration", Icon: IconCapture },
    { label: "Team allocation", Icon: IconSort },
    { label: "Match scheduling", Icon: IconCalendar },
    { label: "Live scoreboard", Icon: IconSales },
    { label: "Winners & awards", Icon: IconTrophy },
  ];
  return (
    <div className="pc-bracket" aria-label="Tournament automation graphic">
      <div className="pc-bracket__steps">
        {steps.map((step, index) => {
          const Icon = step.Icon;
          return (
            <div key={step.label} className="pc-bracket__step">
              <Icon />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.label}</p>
            </div>
          );
        })}
      </div>
      <div className="pc-bracket__board">
        <div className="pc-bracket__col">
          <p className="pc-bracket__round">Semi-final 1</p>
          <div className="pc-bracket__match">
            <div><strong>Team A</strong><span>Club pair</span></div>
            <em>vs</em>
            <div><strong>Team B</strong><span>Guest pair</span></div>
          </div>
          <p className="pc-bracket__round">Semi-final 2</p>
          <div className="pc-bracket__match">
            <div><strong>Team C</strong><span>Club pair</span></div>
            <em>vs</em>
            <div><strong>Team D</strong><span>Guest pair</span></div>
          </div>
        </div>
        <svg className="pc-bracket__lines" viewBox="0 0 100 240" aria-hidden>
          <path d="M8 58 H48 V120 H92" />
          <path d="M8 182 H48 V120" />
          <circle r="4" className="pc-bracket__particle">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M8 58 H48 V120 H92" />
          </circle>
          <circle r="4" className="pc-bracket__particle">
            <animateMotion dur="3.1s" repeatCount="indefinite" begin="0.6s" path="M8 182 H48 V120 H92" />
          </circle>
        </svg>
        <div className="pc-bracket__col pc-bracket__col--final">
          <p className="pc-bracket__round">Final</p>
          <div className="pc-bracket__match pc-bracket__match--final">
            <div><strong>Winner 1</strong><span>From SF1</span></div>
            <em>vs</em>
            <div><strong>Winner 2</strong><span>From SF2</span></div>
          </div>
          <div className="pc-bracket__trophy">
            <IconTrophy />
            <span>Champion stage</span>
          </div>
        </div>
      </div>
      <p className="pc-note">Event structure inspired by Padel Chase Inn tournament promotions (Americano / Grand Slam formats).</p>
    </div>
  );
}

function PipelineLane({ title, Icon, steps, tone }) {
  return (
    <div className={`pc-dash__lane pc-dash__lane--${tone}`}>
      <div className="pc-dash__lane-head">
        <Icon />
        <h3>{title}</h3>
        <span className="pc-dash__lane-tag">Opportunity flow</span>
      </div>
      <div className="pc-dash__flow" aria-hidden>
        <svg viewBox="0 0 640 56" className="pc-dash__flow-svg" preserveAspectRatio="none">
          <path className="pc-dash__flow-track" d="M24 28 C120 8, 220 48, 320 28 S520 8, 616 28" />
          <path className={`pc-dash__flow-pulse pc-dash__flow-pulse--${tone}`} d="M24 28 C120 8, 220 48, 320 28 S520 8, 616 28" />
          {[0, 1, 2].map((i) => (
            <circle key={i} r="4" className={`pc-dash__flow-dot pc-dash__flow-dot--${tone}`}>
              <animateMotion dur={`${3.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path="M24 28 C120 8, 220 48, 320 28 S520 8, 616 28" />
            </circle>
          ))}
        </svg>
      </div>
      <ol className="pc-dash__stages">
        {steps.map((step, index) => {
          const StepIcon = step.Icon;
          const next = steps[index + 1];
          const drop = next ? Math.max(0, step.volume - next.volume) : 0;
          return (
            <li key={step.label} className="pc-dash__stage">
              <div className="pc-dash__stage-card">
                <div className="pc-dash__stage-top">
                  <span className="pc-dash__stage-index">{String(index + 1).padStart(2, "0")}</span>
                  <StepIcon />
                </div>
                <strong>{step.label}</strong>
                <div className="pc-dash__stage-meter" aria-hidden>
                  <span style={{ width: `${step.volume}%` }} />
                </div>
                <em>{step.volume}% of intake</em>
              </div>
              {index < steps.length - 1 ? (
                <div className="pc-dash__stage-bridge" aria-hidden>
                  <span className="pc-dash__stage-bridge-line" />
                  <span className="pc-dash__stage-bridge-meta">
                    <IconArrow className="pc-dash__step-arrow" />
                    −{drop}%
                  </span>
                  <span className="pc-dash__stage-bridge-line" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PipelineDashboard() {
  return (
    <div className="pc-dash" aria-label="Illustrative booking and event pipeline">
      <div className="pc-dash__bar">
        <span /><span /><span />
        <p>Padel Chase Inn operations · opportunity movement</p>
      </div>
      <div className="pc-dash__overview" aria-hidden>
        <svg viewBox="0 0 720 140" className="pc-dash__funnel-svg">
          <path className="pc-dash__funnel-band pc-dash__funnel-band--player" d="M40 24 H300 L250 60 H90 Z" />
          <path className="pc-dash__funnel-band pc-dash__funnel-band--event" d="M40 80 H300 L250 116 H90 Z" />
          <path className="pc-dash__funnel-merge" d="M300 42 H430 L400 70 H460 L430 98 H300 Z" />
          <path className="pc-dash__funnel-flow pc-dash__funnel-flow--player" d="M55 42 H285" />
          <path className="pc-dash__funnel-flow pc-dash__funnel-flow--event" d="M55 98 H285" />
          <path className="pc-dash__funnel-flow pc-dash__funnel-flow--merge" d="M320 70 H640" />
          <text x="55" y="18" className="pc-dash__funnel-label">Player intake</text>
          <text x="55" y="134" className="pc-dash__funnel-label pc-dash__funnel-label--event">Event intake</text>
          <text x="470" y="66" className="pc-dash__funnel-label">Unified ops</text>
        </svg>
      </div>
      <div className="pc-dash__pipelines">
        <PipelineLane title="Player pipeline" Icon={IconUser} steps={playerPipeline} tone="player" />
        <PipelineLane title="Event pipeline" Icon={IconTrophy} steps={eventPipeline} tone="event" />
      </div>
      <p className="pc-dash__demo">Illustrative sample stages only — not live venue analytics.</p>
    </div>
  );
}

function SponsorshipEcosystem() {
  const nodes = [
    { label: "Tournaments", Icon: IconTrophy },
    { label: "Sponsors", Icon: IconSponsor },
    { label: "Visibility", Icon: IconSales },
    { label: "Social", Icon: IconSocial },
    { label: "Engagement", Icon: IconUser },
    { label: "Partners", Icon: IconHub },
  ];
  return (
    <div className="pc-eco" aria-label="Sponsorship ecosystem">
      <svg className="pc-eco__svg" viewBox="0 0 420 420" role="img">
        <title>Sponsorship ecosystem hub</title>
        <circle className="pc-eco__orbit" cx="210" cy="210" r="150" />
        <circle className="pc-eco__orbit pc-eco__orbit--inner" cx="210" cy="210" r="95" />
        <circle className="pc-eco__core" cx="210" cy="210" r="52" />
        <text x="210" y="204" className="pc-eco__core-text">Padel</text>
        <text x="210" y="224" className="pc-eco__core-text">Chase</text>
        {nodes.map((node, index) => {
          const angle = (Math.PI * 2 * index) / nodes.length - Math.PI / 2;
          const x = 210 + Math.cos(angle) * 150;
          const y = 210 + Math.sin(angle) * 150;
          return (
            <g key={node.label}>
              <line className="pc-eco__spoke" x1="210" y1="210" x2={x} y2={y} />
              <circle className="pc-eco__node" cx={x} cy={y} r="14" />
              <circle className="pc-eco__node-ring" cx={x} cy={y} r="22" style={{ animationDelay: `${index * 0.18}s` }} />
            </g>
          );
        })}
      </svg>
      <ul className="pc-eco__list">
        {nodes.map(({ label, Icon }) => (
          <li key={label}>
            <Icon />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfluencerNetwork() {
  const steps = [
    { label: "Creator", Icon: IconReels },
    { label: "Reels", Icon: IconSocial },
    { label: "Reach", Icon: IconHub },
    { label: "Inquiries", Icon: IconWhatsApp },
    { label: "Bookings", Icon: IconCourt },
  ];
  return (
    <div className="pc-influ" aria-label="Influencer marketing network">
      <div className="pc-influ__rail">
        {steps.map((step, index) => {
          const Icon = step.Icon;
          return (
            <React.Fragment key={step.label}>
              <div className="pc-influ__step">
                <span className="pc-influ__icon">
                  <Icon />
                </span>
                <p>{step.label}</p>
              </div>
              {index < steps.length - 1 ? (
                <div className="pc-influ__arrow" aria-hidden>
                  <IconArrow className="pc-rail__arrow-svg" />
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
      <p className="pc-note">
        Creator content feeds reach and inquiries — then into Padel Chase Inn court bookings.
      </p>
    </div>
  );
}

function CommunityGrowthGraph() {
  return (
    <div className="pc-graph" aria-label="Community growth graph with placeholder metrics">
      <div className="pc-graph__legend">
        <span><i className="pc-graph__swatch pc-graph__swatch--a" /> Players</span>
        <span><i className="pc-graph__swatch pc-graph__swatch--b" /> Repeat bookings</span>
        <span><i className="pc-graph__swatch pc-graph__swatch--c" /> New customers</span>
      </div>
      <svg className="pc-graph__svg" viewBox="0 0 560 240" role="img">
        <title>Illustrative community growth trends</title>
        <defs>
          <linearGradient id="pcAreaA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[50, 90, 130, 170].map((y) => (
          <line key={y} className="pc-graph__grid" x1="40" y1={y} x2="540" y2={y} />
        ))}
        <path className="pc-graph__area" d="M40 170 C120 150, 180 130, 240 110 S360 70, 440 55 520 42, 540 36 V210 H40 Z" fill="url(#pcAreaA)" />
        <path className="pc-graph__line pc-graph__line--a" d="M40 170 C120 150, 180 130, 240 110 S360 70, 440 55 520 42, 540 36" />
        <path className="pc-graph__line pc-graph__line--b" d="M40 180 C130 170, 200 150, 270 130 S390 95, 470 80 520 70, 540 66" />
        <path className="pc-graph__line pc-graph__line--c" d="M40 190 C140 185, 210 170, 280 150 S400 115, 480 100 520 92, 540 88" />
        <circle className="pc-graph__point" cx="540" cy="36" r="5" />
      </svg>
      <p className="pc-graph__badge">Placeholder trends — awaiting verified client metrics</p>
    </div>
  );
}

function PadelChaseCaseStudy() {
  useEffect(() => {
    document.title = "Padel Chase Inn Case Study | AlphaNineMarketing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pc-case">
      <section className="pc-hero">
        <div className="pc-hero__mesh" aria-hidden />
        <div className="pc-hero__inner">
          <FadeIn className="pc-hero__copy">
            <img
              className="pc-hero__logo"
              src={cs.logo}
              alt="Padel Chase Inn logo"
              width="320"
              height="110"
              decoding="async"
            />
            <p className="pc-kicker">Alpha Nine × Padel Chase Inn · Sports Experience</p>
            <h1 className="pc-hero__title">{cs.headline}</h1>
            <p className="pc-hero__lede">{cs.subheadline}</p>
            <HeroBookingArt />
            <div className="pc-hero__links">
              <a href={cs.instagram} target="_blank" rel="noopener noreferrer">
                @padelchase
              </a>
              <Link to="/portfolio">Back to portfolio</Link>
            </div>
          </FadeIn>
          <FadeIn className="pc-hero__visual" delay={0.08}>
            <div className="pc-hero__product">
              <img
                src={cs.poster}
                alt="Padel Chase Inn Winter Grand Slam campaign creative"
                width="720"
                height="900"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="pc-hero__float" aria-hidden>
              <span><IconMeta /> Meta</span>
              <span><IconSocial /> IG</span>
              <span><IconWhatsApp /> WA</span>
            </div>
            <aside className="pc-hero__result">
              <p className="pc-hero__result-value">{cs.result.value}</p>
              <p className="pc-hero__result-label">{cs.result.label}</p>
              <p className="pc-hero__result-note">{cs.result.note}</p>
            </aside>
          </FadeIn>
        </div>
      </section>

      <ScrollSection as="section" className="pc-section">
        <div className="pc-section__inner">
          <p className="pc-kicker">The challenge</p>
          <h2>Two growth engines. One booking-first venue.</h2>
          <div className="pc-challenge">
            <article className="pc-challenge__card pc-challenge__card--player">
              <div className="pc-challenge__icon">
                <IconUser />
              </div>
              <p className="pc-challenge__label">Card A · Court players</p>
              <h3>People discovering padel and booking sessions</h3>
              <ul>
                {playerSteps.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </article>
            <div className="pc-challenge__bridge" aria-hidden>
              <IconArrow className="pc-challenge__bridge-arrow" />
              <div className="pc-challenge__bridge-hub">
                <IconCourt />
              </div>
              <IconArrow className="pc-challenge__bridge-arrow" />
            </div>
            <article className="pc-challenge__card pc-challenge__card--event">
              <div className="pc-challenge__icon pc-challenge__icon--alt">
                <IconTrophy />
              </div>
              <p className="pc-challenge__label">Card B · Events & sponsors</p>
              <h3>Tournaments, creators and commercial partners</h3>
              <ul>
                {eventSteps.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="pc-challenge__converge">
            <span />
            <p>
              <IconHub /> One connected sports experience system
            </p>
            <span />
          </div>
          <div className="pc-scope">
            <article>
              <h3>Services delivered</h3>
              <ul>
                {cs.servicesDelivered.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Proposed automation concepts</h3>
              <ul>
                {cs.proposedConcepts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section pc-section--muted">
        <div className="pc-section__inner">
          <p className="pc-kicker">Growth architecture</p>
          <h2>From social attention to booked court time.</h2>
          <WorkflowDiagram />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section">
        <div className="pc-section__inner">
          <p className="pc-kicker">Smart booking journey</p>
          <h2>A booking-first sports experience.</h2>
          <SmartBookingJourney />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section pc-section--muted">
        <div className="pc-section__inner pc-split">
          <div>
            <p className="pc-kicker">Inquiry routing</p>
            <h2>Every message classified before it moves.</h2>
            <p className="pc-lede">
              Inquiries enter once, then branch into player bookings or event / partnership tracks with the fields the venue team needs.
            </p>
          </div>
          <InquiryRoutingTree />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section">
        <div className="pc-section__inner pc-split">
          <div>
            <p className="pc-kicker">Venue distribution</p>
            <h2>Court-aware demand routing.</h2>
            <p className="pc-lede">
              Illustrative four-court layout showing how inquiries pulse into a central booking hub — conceptual, not live GPS.
            </p>
          </div>
          <VenueCourtMap />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section pc-section--muted">
        <div className="pc-section__inner">
          <p className="pc-kicker">Opportunity movement</p>
          <h2>A clearer view of booking and event flow.</h2>
          <PipelineDashboard />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section">
        <div className="pc-section__inner">
          <p className="pc-kicker">Tournament automation</p>
          <h2>From registration to winners.</h2>
          <TournamentBracket />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section pc-section--muted">
        <div className="pc-section__inner">
          <p className="pc-kicker">Community growth</p>
          <h2>Players, repeats and new demand — visualized carefully.</h2>
          <CommunityGrowthGraph />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section">
        <div className="pc-section__inner pc-split">
          <div>
            <p className="pc-kicker">Sponsorship ecosystem</p>
            <h2>Events, brands and commercial visibility.</h2>
            <p className="pc-lede">
              Tournament moments become sponsor stage time, social proof and partnership value — without inventing revenue numbers.
            </p>
          </div>
          <SponsorshipEcosystem />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section pc-section--muted">
        <div className="pc-section__inner">
          <p className="pc-kicker">Influencer network</p>
          <h2>Creators that pull new players onto court.</h2>
          <InfluencerNetwork />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section">
        <div className="pc-section__inner">
          <p className="pc-kicker">Business impact</p>
          <h2>Verified highlight from the collaboration.</h2>
          <div className="pc-impact">
            <article className="pc-impact__hero">
              <p className="pc-impact__value">{cs.result.value}</p>
              <p className="pc-impact__label">{cs.result.label}</p>
              <p className="pc-impact__note">{cs.result.note}</p>
            </article>
            <div className="pc-impact__grid">
              <article className="pc-impact__card">
                <h3>Player vs event journeys</h3>
                <p>Two acquisition tracks, one shared booking layer.</p>
                <div className="pc-impact__bars" aria-hidden>
                  <span style={{ width: "78%" }} />
                  <span style={{ width: "54%" }} />
                </div>
              </article>
              <article className="pc-impact__card">
                <h3>Demand funnel</h3>
                <p>Ads → DMs → booking intent → court session.</p>
                <div className="pc-impact__funnel" aria-hidden>
                  <span /><span /><span /><span />
                </div>
              </article>
              <article className="pc-impact__card">
                <h3>Additional metrics</h3>
                <p>Player counts, CPL, retention and ROI — pending client confirmation.</p>
                <p className="pc-impact__placeholder">Awaiting verified data</p>
              </article>
            </div>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="pc-section pc-section--muted">
        <div className="pc-section__inner">
          <p className="pc-kicker">What Alpha Nine delivered</p>
          <h2>A full-stack sports growth engagement.</h2>
          <div className="pc-services">
            {cs.servicesDelivered.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <FadeIn key={service} className="pc-services__item" delay={index * 0.04}>
                  <span className="pc-services__icon">
                    <Icon />
                  </span>
                  <div>
                    <span className="pc-services__index">{String(index + 1).padStart(2, "0")}</span>
                    <p>{service}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <div className="pc-gallery">
            <img src={cs.poster} alt="Padel Chase Winter Grand Slam campaign creative" width="800" height="1000" loading="lazy" />
            <img src={lifestyleImg} alt="Padel Chase lifestyle campaign creative" width="800" height="1000" loading="lazy" />
          </div>
        </div>
      </ScrollSection>

      <section className="pc-cta">
        <div className="pc-cta__glow" aria-hidden />
        <div className="pc-cta__inner">
          <h2>We Don&apos;t Just Market Sports. We Build Sports Experiences That Grow.</h2>
          <p>
            Alpha Nine helps sports venues turn attention into bookings, community and commercial partnerships — with clarity on what is delivered versus what is proposed next.
          </p>
          <div className="pc-cta__actions">
            <Link to="/contact" className="pc-cta__btn pc-cta__btn--primary">
              Build your sports system
            </Link>
            <a className="pc-cta__btn pc-cta__btn--ghost" href="mailto:Info.alphanine@gmail.com">
              Talk to Alpha Nine
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PadelChaseCaseStudy;
