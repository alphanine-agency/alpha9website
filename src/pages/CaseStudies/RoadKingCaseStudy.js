import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import ScrollSection from "../../components/ScrollSection/ScrollSection";
import useMobileLite from "../../hooks/useMobileLite";
import { roadKingCaseStudy as cs } from "../../data/caseStudies";
import { getPortfolioMedia } from "../../utils/getPortfolioMedia";
import {
  IconMeta,
  IconSocial,
  IconCapture,
  IconSort,
  IconHub,
  IconUser,
  IconDealer,
  IconBike,
  IconCity,
  IconPhone,
  IconMoney,
  IconSales,
  IconCheck,
  IconArrow,
  IconArrowDown,
  FlowParticleSvg,
} from "./RoadKingIcons";
import { PAKISTAN_PROVINCES, PAKISTAN_VIEWBOX } from "./pakistanMapPaths";
import "./RoadKingCaseStudy.css";

const heroImg = getPortfolioMedia("RK3.jpeg");
const productImg = getPortfolioMedia("RK1.jpeg");
const lifestyleImg = getPortfolioMedia("RK2.jpeg");

const architectureSteps = [
  { label: "Meta Ads", Icon: IconMeta, kind: "auto" },
  { label: "FB / IG inquiries", Icon: IconSocial, kind: "auto" },
  { label: "Lead capture", Icon: IconCapture, kind: "auto" },
  { label: "Categorization", Icon: IconSort, kind: "auto" },
  { label: "Central hub", Icon: IconHub, kind: "auto" },
];

const customerPath = [
  { label: "Customer inquiry", Icon: IconUser, auto: true },
  { label: "Product interest", Icon: IconBike, auto: true },
  { label: "Customer details", Icon: IconPhone, auto: true },
  { label: "City ID", Icon: IconCity, auto: true },
  { label: "Dealership match", Icon: IconDealer, auto: true },
  { label: "Sales follow-up", Icon: IconSales, auto: false },
  { label: "Purchase", Icon: IconCheck, auto: false },
];

const dealerPath = [
  { label: "Dealer inquiry", Icon: IconDealer, auto: true },
  { label: "Contact collect", Icon: IconPhone, auto: true },
  { label: "City ID", Icon: IconCity, auto: true },
  { label: "Investment capacity", Icon: IconMoney, auto: true },
  { label: "Sales qualification", Icon: IconSales, auto: false },
  { label: "RSM / sales team", Icon: IconHub, auto: false },
  { label: "Opportunity", Icon: IconCheck, auto: false },
];

const customerSteps = [
  { label: "Product inquiries", Icon: IconBike },
  { label: "Model selection", Icon: IconSort },
  { label: "Contact details", Icon: IconPhone },
  { label: "City & dealership ID", Icon: IconCity },
  { label: "Sales channel delivery", Icon: IconSales },
];

const dealerSteps = [
  { label: "Investor interest", Icon: IconDealer },
  { label: "Contact information", Icon: IconPhone },
  { label: "Business location", Icon: IconCity },
  { label: "Investment capacity", Icon: IconMoney },
  { label: "Sales follow-up", Icon: IconSales },
];

const serviceIcons = [
  IconMeta,
  IconUser,
  IconDealer,
  IconCapture,
  IconSocial,
  IconHub,
  IconSales,
  IconCheck,
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
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

function PathRail({ steps, tone }) {
  return (
    <div className={`rk-rail rk-rail--${tone}`}>
      {steps.map((step, index) => {
        const Icon = step.Icon;
        return (
          <React.Fragment key={step.label}>
            <div
              className={`rk-rail__node${step.auto === false ? " rk-rail__node--manual" : ""}`}
            >
              <span className="rk-rail__icon">
                <Icon />
              </span>
              <p>{step.label}</p>
              <span className="rk-rail__tag">
                {step.auto === false ? "Sales team" : "System"}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div className="rk-rail__arrow" aria-hidden>
                <IconArrow className="rk-rail__arrow-svg" />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function WorkflowDiagram() {
  return (
    <div className="rk-flow" aria-label="Lead automation architecture">
      <div className="rk-flow__canvas" aria-hidden>
        <svg className="rk-flow__bg-lines" viewBox="0 0 1000 220" preserveAspectRatio="none">
          <path className="rk-flow__bg-path" d="M40 110 C180 40, 320 180, 500 110 S820 40, 960 110" />
          <path className="rk-flow__bg-path rk-flow__bg-path--soft" d="M40 140 C220 200, 380 60, 560 140 S820 200, 960 120" />
        </svg>
      </div>

      <div className="rk-flow__spine">
        {architectureSteps.map((step, index) => {
          const Icon = step.Icon;
          return (
            <React.Fragment key={step.label}>
              <div className="rk-flow__node">
                <span className="rk-flow__icon-wrap">
                  <Icon className="rk-flow__icon" />
                  <span className="rk-flow__pulse" />
                </span>
                <p className="rk-flow__node-label">{step.label}</p>
                <span className="rk-flow__badge">Automated</span>
              </div>
              {index < architectureSteps.length - 1 ? (
                <div className="rk-flow__connector" aria-hidden>
                  <FlowParticleSvg className="rk-flow__connector-svg" />
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      <div className="rk-flow__drop" aria-hidden>
        <IconArrowDown className="rk-flow__drop-arrow" />
      </div>

      <div className="rk-flow__engine">
        <div className="rk-flow__engine-ring" aria-hidden />
        <div className="rk-flow__engine-core">
          <IconHub className="rk-flow__engine-icon" />
          <span>Lead engine</span>
        </div>
        <div className="rk-flow__engine-split" aria-hidden>
          <span className="rk-flow__engine-branch rk-flow__engine-branch--left" />
          <span className="rk-flow__engine-branch rk-flow__engine-branch--right" />
        </div>
      </div>

      <div className="rk-flow__paths">
        <article className="rk-flow__path rk-flow__path--customer">
          <div className="rk-flow__path-head">
            <IconUser />
            <div>
              <p className="rk-flow__path-eyebrow">Pathway 01</p>
              <h3>Customer leads</h3>
            </div>
          </div>
          <PathRail steps={customerPath} tone="customer" />
        </article>
        <article className="rk-flow__path rk-flow__path--dealer">
          <div className="rk-flow__path-head">
            <IconDealer />
            <div>
              <p className="rk-flow__path-eyebrow">Pathway 02</p>
              <h3>Dealership leads</h3>
            </div>
          </div>
          <PathRail steps={dealerPath} tone="dealer" />
        </article>
      </div>

      <p className="rk-flow__note">
        Animated flow shows the implemented pipeline: capture and routing are
        system-driven; sales follow-up steps remain with Road King&apos;s team.
      </p>
    </div>
  );
}

function QualificationTree() {
  return (
    <div className="rk-tree" aria-label="Lead qualification decision tree">
      <svg className="rk-tree__lines" viewBox="0 0 400 120" aria-hidden>
        <path className="rk-tree__line" d="M200 18 V48" />
        <path className="rk-tree__line" d="M200 48 H90" />
        <path className="rk-tree__line" d="M200 48 H310" />
        <path className="rk-tree__line rk-tree__line--dash" d="M90 48 V95" />
        <path className="rk-tree__line rk-tree__line--dash rk-tree__line--green" d="M310 48 V95" />
        <circle cx="200" cy="18" r="5" className="rk-tree__node-dot" />
        <circle cx="90" cy="95" r="4" className="rk-tree__node-dot" />
        <circle cx="310" cy="95" r="4" className="rk-tree__node-dot rk-tree__node-dot--green" />
      </svg>

      <div className="rk-tree__root">
        <IconCapture />
        Incoming lead
      </div>

      <div className="rk-tree__branches">
        <article className="rk-tree__branch rk-tree__branch--customer">
          <div className="rk-tree__branch-head">
            <IconUser />
            <h3>Customer</h3>
          </div>
          <ul>
            <li><IconBike /> Interested model</li>
            <li><IconCity /> City</li>
            <li><IconPhone /> Contact details</li>
            <li><IconCapture /> Product inquiry</li>
          </ul>
        </article>
        <article className="rk-tree__branch rk-tree__branch--dealer">
          <div className="rk-tree__branch-head">
            <IconDealer />
            <h3>Dealer</h3>
          </div>
          <ul>
            <li><IconCity /> City</li>
            <li><IconPhone /> Contact details</li>
            <li><IconMoney /> Investment capacity</li>
            <li><IconDealer /> Dealership interest</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

/* City pins placed on real Pakistan SVG (viewBox 0 0 1000 959). */
const PAKISTAN_CITIES = [
  { id: "isl", name: "Islamabad", x: 735, y: 282, type: "both", hub: true },
  { id: "peh", name: "Peshawar", x: 638, y: 255, type: "customer" },
  { id: "lhr", name: "Lahore", x: 818, y: 405, type: "both", hub: true },
  { id: "fsd", name: "Faisalabad", x: 758, y: 435, type: "customer" },
  { id: "mul", name: "Multan", x: 698, y: 535, type: "dealer" },
  { id: "qta", name: "Quetta", x: 418, y: 515, type: "dealer" },
  { id: "skt", name: "Sialkot", x: 838, y: 355, type: "customer" },
  { id: "hyd", name: "Hyderabad", x: 558, y: 805, type: "customer" },
  { id: "khi", name: "Karachi", x: 498, y: 885, type: "both", hub: true },
  { id: "suk", name: "Sukkur", x: 618, y: 685, type: "dealer" },
];

const PAKISTAN_MESH = [
  ["isl", "peh"],
  ["isl", "lhr"],
  ["isl", "fsd"],
  ["peh", "qta"],
  ["lhr", "fsd"],
  ["lhr", "skt"],
  ["fsd", "mul"],
  ["mul", "suk"],
  ["mul", "qta"],
  ["suk", "hyd"],
  ["hyd", "khi"],
  ["qta", "suk"],
  ["fsd", "suk"],
  ["lhr", "mul"],
];

const SYSTEM_HUB = { x: 680, y: 520 };

const customerPipelineFlow = [
  { label: "New Inquiry", Icon: IconCapture, volume: 100 },
  { label: "Product Selected", Icon: IconBike, volume: 72 },
  { label: "Contact Collected", Icon: IconPhone, volume: 58 },
  { label: "Sent to CSR", Icon: IconSales, volume: 41 },
  { label: "Closed", Icon: IconCheck, volume: 24 },
];

const dealerPipelineFlow = [
  { label: "New Dealer Inquiry", Icon: IconDealer, volume: 100 },
  { label: "City Collected", Icon: IconCity, volume: 78 },
  { label: "Investment Collected", Icon: IconMoney, volume: 52 },
  { label: "Sent to CSR", Icon: IconSales, volume: 36 },
  { label: "Closed", Icon: IconCheck, volume: 18 },
];

function PakistanMap() {
  const cityMap = Object.fromEntries(PAKISTAN_CITIES.map((city) => [city.id, city]));

  return (
    <div className="rk-map" aria-label="Pakistan inquiry routing map">
      <div className="rk-map__legend">
        <span className="rk-map__legend-item rk-map__legend-item--customer">
          <i /> Customer inquiries
        </span>
        <span className="rk-map__legend-item rk-map__legend-item--dealer">
          <i /> Dealership inquiries
        </span>
        <span className="rk-map__legend-item rk-map__legend-item--hub">
          <i /> System hub
        </span>
      </div>

      <svg viewBox={PAKISTAN_VIEWBOX} className="rk-map__svg" role="img">
        <title>
          Pakistan map showing customer and dealership inquiries routed through
          the Alpha Nine lead system
        </title>
        <defs>
          <radialGradient id="rkMapGlow" cx="62%" cy="48%" r="48%">
            <stop offset="0%" stopColor="rgba(57,255,20,0.22)" />
            <stop offset="55%" stopColor="rgba(57,255,20,0.06)" />
            <stop offset="100%" stopColor="rgba(57,255,20,0)" />
          </radialGradient>
          <linearGradient id="rkLandFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(57,255,20,0.09)" />
            <stop offset="100%" stopColor="rgba(0,80,120,0.14)" />
          </linearGradient>
          <linearGradient id="rkRoute" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#39FF14" />
            <stop offset="100%" stopColor="#B8FF6A" />
          </linearGradient>
          <linearGradient id="rkDealerRoute" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7CFF3A" />
            <stop offset="100%" stopColor="#C8FF90" />
          </linearGradient>
          <filter id="rkSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="959" fill="transparent" />
        <ellipse cx="640" cy="480" rx="340" ry="380" fill="url(#rkMapGlow)" />

        <g className="rk-map__provinces" aria-hidden>
          {PAKISTAN_PROVINCES.map((province) =>
            province.paths.map((d, pathIndex) => (
              <path
                key={`${province.code}-${pathIndex}`}
                className={`rk-map__land rk-map__land--${province.code.toLowerCase()}`}
                d={d}
              />
            ))
          )}
        </g>

        <g className="rk-map__mesh" aria-hidden>
          {PAKISTAN_MESH.map(([fromId, toId]) => {
            const from = cityMap[fromId];
            const to = cityMap[toId];
            if (!from || !to) return null;
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="rk-map__mesh-line"
              />
            );
          })}
        </g>

        <g className="rk-map__routes" aria-hidden>
          {PAKISTAN_CITIES.map((city, index) => {
            const isDealer = city.type === "dealer" || city.type === "both";
            const isCustomer = city.type === "customer" || city.type === "both";
            const midX = (city.x + SYSTEM_HUB.x) / 2;
            const midY = (city.y + SYSTEM_HUB.y) / 2;
            return (
              <g key={`route-${city.id}`}>
                {isCustomer ? (
                  <path
                    className="rk-map__route rk-map__route--customer"
                    d={`M${city.x} ${city.y} Q ${midX} ${midY - 36} ${SYSTEM_HUB.x} ${SYSTEM_HUB.y}`}
                    style={{ animationDelay: `${index * 0.18}s` }}
                  />
                ) : null}
                {isDealer ? (
                  <path
                    className="rk-map__route rk-map__route--dealer"
                    d={`M${city.x} ${city.y} Q ${midX + 28} ${midY + 28} ${SYSTEM_HUB.x} ${SYSTEM_HUB.y}`}
                    style={{ animationDelay: `${index * 0.22 + 0.4}s` }}
                  />
                ) : null}
              </g>
            );
          })}
        </g>

        <g className="rk-map__particles" aria-hidden>
          {PAKISTAN_CITIES.filter((c) => c.type !== "dealer")
            .slice(0, 6)
            .map((city, index) => {
              const midX = (city.x + SYSTEM_HUB.x) / 2;
              const midY = (city.y + SYSTEM_HUB.y) / 2;
              return (
                <circle
                  key={`pc-${city.id}`}
                  r="5"
                  className="rk-map__particle rk-map__particle--customer"
                >
                  <animateMotion
                    dur={`${3.2 + (index % 3) * 0.5}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.4}s`}
                    path={`M${city.x} ${city.y} Q ${midX} ${midY - 36} ${SYSTEM_HUB.x} ${SYSTEM_HUB.y}`}
                  />
                </circle>
              );
            })}
          {PAKISTAN_CITIES.filter((c) => c.type !== "customer").map((city, index) => {
            const midX = (city.x + SYSTEM_HUB.x) / 2;
            const midY = (city.y + SYSTEM_HUB.y) / 2;
            return (
              <circle
                key={`pd-${city.id}`}
                r="4.5"
                className="rk-map__particle rk-map__particle--dealer"
              >
                <animateMotion
                  dur={`${3.6 + (index % 3) * 0.55}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.45 + 0.7}s`}
                  path={`M${city.x} ${city.y} Q ${midX + 28} ${midY + 28} ${SYSTEM_HUB.x} ${SYSTEM_HUB.y}`}
                />
              </circle>
            );
          })}
        </g>

        <g className="rk-map__hub" filter="url(#rkSoftGlow)">
          <circle cx={SYSTEM_HUB.x} cy={SYSTEM_HUB.y} r="34" className="rk-map__hub-ring" />
          <circle cx={SYSTEM_HUB.x} cy={SYSTEM_HUB.y} r="16" className="rk-map__hub-core" />
          <text x={SYSTEM_HUB.x} y={SYSTEM_HUB.y + 52} className="rk-map__hub-label">
            Lead system
          </text>
        </g>

        {PAKISTAN_CITIES.map((city, index) => {
          const labelRight = city.x < 720;
          return (
            <g key={city.id} className={`rk-map__city rk-map__city--${city.type}`}>
              <circle
                cx={city.x}
                cy={city.y}
                r={city.hub ? 22 : 16}
                className="rk-map__pin-ring"
                style={{ animationDelay: `${index * 0.28}s` }}
              />
              <circle
                cx={city.x}
                cy={city.y}
                r={city.hub ? 9 : 6.5}
                className="rk-map__pin-core"
              />
              <text
                x={city.x + (labelRight ? 14 : -14)}
                y={city.y - 14}
                className="rk-map__city-label"
                textAnchor={labelRight ? "start" : "end"}
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="rk-map__cards">
        {[
          { label: "Inquiries from cities", Icon: IconCity },
          { label: "Customer vs dealer split", Icon: IconSort },
          { label: "Dealership matching", Icon: IconDealer },
          { label: "Sales team follow-up", Icon: IconSales },
        ].map(({ label, Icon }) => (
          <div key={label} className="rk-map__card">
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="rk-map__disclaimer">
        Real Pakistan outline with illustrative city routing — not live GPS or exact
        dealership coordinates.
      </p>
    </div>
  );
}

function PipelineLane({ title, Icon, steps, tone }) {
  return (
    <div className={`rk-dash__lane rk-dash__lane--${tone}`}>
      <div className="rk-dash__lane-head">
        <Icon />
        <h3>{title}</h3>
        <span className="rk-dash__lane-tag">Opportunity flow</span>
      </div>

      <div className="rk-dash__flow" aria-hidden>
        <svg viewBox="0 0 640 72" className="rk-dash__flow-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`rkLaneGrad-${tone}`} x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor={tone === "customer" ? "#39FF14" : "#7CFF3A"}
                stopOpacity="0.15"
              />
              <stop
                offset="100%"
                stopColor={tone === "customer" ? "#B8FF6A" : "#C8FF90"}
                stopOpacity="0.55"
              />
            </linearGradient>
          </defs>
          <path
            className="rk-dash__flow-track"
            d="M24 36 C120 12, 220 60, 320 36 S520 12, 616 36"
            fill="none"
          />
          <path
            className={`rk-dash__flow-pulse rk-dash__flow-pulse--${tone}`}
            d="M24 36 C120 12, 220 60, 320 36 S520 12, 616 36"
            fill="none"
          />
          {[0, 1, 2].map((i) => (
            <circle key={i} r="4.5" className={`rk-dash__flow-dot rk-dash__flow-dot--${tone}`}>
              <animateMotion
                dur={`${3.4 + i * 0.35}s`}
                repeatCount="indefinite"
                begin={`${i * 0.9}s`}
                path="M24 36 C120 12, 220 60, 320 36 S520 12, 616 36"
              />
            </circle>
          ))}
        </svg>
      </div>

      <ol className="rk-dash__stages">
        {steps.map((step, index) => {
          const StepIcon = step.Icon;
          const next = steps[index + 1];
          const drop = next ? Math.max(0, step.volume - next.volume) : 0;
          return (
            <li key={step.label} className="rk-dash__stage">
              <div className="rk-dash__stage-card">
                <div className="rk-dash__stage-top">
                  <span className="rk-dash__stage-index">{String(index + 1).padStart(2, "0")}</span>
                  <StepIcon />
                </div>
                <strong>{step.label}</strong>
                <div className="rk-dash__stage-meter" aria-hidden>
                  <span style={{ width: `${step.volume}%` }} />
                </div>
                <em>{step.volume}% of intake</em>
              </div>
              {index < steps.length - 1 ? (
                <div className="rk-dash__stage-bridge" aria-hidden>
                  <span className="rk-dash__stage-bridge-line" />
                  <span className="rk-dash__stage-bridge-meta">
                    <IconArrow className="rk-dash__step-arrow" />
                    −{drop}%
                  </span>
                  <span className="rk-dash__stage-bridge-line" />
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
    <div className="rk-dash" aria-label="Illustrative CRM pipeline dashboard">
      <div className="rk-dash__bar">
        <span className="rk-dash__dot" />
        <span className="rk-dash__dot" />
        <span className="rk-dash__dot" />
        <p>Lead operations · opportunity movement</p>
      </div>

      <div className="rk-dash__overview" aria-hidden>
        <svg viewBox="0 0 720 150" className="rk-dash__funnel-svg">
          <defs>
            <linearGradient id="rkFunnelCustomer" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#39FF14" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#B8FF6A" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="rkFunnelDealer" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7CFF3A" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C8FF90" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path
            className="rk-dash__funnel-band rk-dash__funnel-band--customer"
            d="M40 28 H300 L250 68 H90 Z"
            fill="url(#rkFunnelCustomer)"
          />
          <path
            className="rk-dash__funnel-band rk-dash__funnel-band--dealer"
            d="M40 82 H300 L250 122 H90 Z"
            fill="url(#rkFunnelDealer)"
          />
          <path className="rk-dash__funnel-merge" d="M300 48 H430 L400 75 H460 L430 102 H300 Z" />
          <path
            className="rk-dash__funnel-flow rk-dash__funnel-flow--customer"
            d="M55 48 H285"
          />
          <path
            className="rk-dash__funnel-flow rk-dash__funnel-flow--dealer"
            d="M55 102 H285"
          />
          <path className="rk-dash__funnel-flow rk-dash__funnel-flow--merge" d="M320 75 H640" />
          <text x="55" y="22" className="rk-dash__funnel-label">
            Customer intake
          </text>
          <text x="55" y="140" className="rk-dash__funnel-label rk-dash__funnel-label--dealer">
            Dealer intake
          </text>
          <text x="470" y="70" className="rk-dash__funnel-label">
            Unified follow-up
          </text>
          {[0, 1, 2].map((i) => (
            <circle key={`fc-${i}`} r="3.5" className="rk-dash__flow-dot rk-dash__flow-dot--customer">
              <animateMotion
                dur={`${2.8 + i * 0.25}s`}
                repeatCount="indefinite"
                begin={`${i * 0.7}s`}
                path="M55 48 H285 L360 75 H640"
              />
            </circle>
          ))}
          {[0, 1].map((i) => (
            <circle key={`fd-${i}`} r="3.5" className="rk-dash__flow-dot rk-dash__flow-dot--dealer">
              <animateMotion
                dur={`${3.1 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.85 + 0.4}s`}
                path="M55 102 H285 L360 75 H640"
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="rk-dash__pipelines">
        <PipelineLane
          title="Customer pipeline"
          Icon={IconUser}
          steps={customerPipelineFlow}
          tone="customer"
        />
        <PipelineLane
          title="Dealership pipeline"
          Icon={IconDealer}
          steps={dealerPipelineFlow}
          tone="dealer"
        />
      </div>
      <p className="rk-dash__demo">
        Illustrative sample stages only — not live client performance data.
      </p>
    </div>
  );
}

function HeroFlowArt() {
  return (
    <div className="rk-hero__flow" aria-hidden>
      <svg viewBox="0 0 320 180" className="rk-hero__flow-svg">
        <path className="rk-hero__flow-line" d="M28 90 H120" />
        <path className="rk-hero__flow-line" d="M120 90 C150 90, 150 42, 190 42 H292" />
        <path className="rk-hero__flow-line" d="M120 90 C150 90, 150 138, 190 138 H292" />
        <circle cx="28" cy="90" r="10" className="rk-hero__flow-node" />
        <circle cx="120" cy="90" r="12" className="rk-hero__flow-node rk-hero__flow-node--core" />
        <circle cx="292" cy="42" r="8" className="rk-hero__flow-node" />
        <circle cx="292" cy="138" r="8" className="rk-hero__flow-node rk-hero__flow-node--alt" />
        <circle cx="70" cy="90" r="3" className="rk-hero__flow-particle" />
        <circle cx="210" cy="42" r="3" className="rk-hero__flow-particle" />
        <circle cx="230" cy="138" r="3" className="rk-hero__flow-particle rk-hero__flow-particle--delay" />
      </svg>
      <div className="rk-hero__flow-labels">
        <span>Social</span>
        <span>Engine</span>
        <span>Customer</span>
        <span>Dealer</span>
      </div>
    </div>
  );
}

function RoadKingCaseStudy() {
  useEffect(() => {
    document.title = "Road King Case Study | AlphaNineMarketing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rk-case">
      <section className="rk-hero">
        <div className="rk-hero__mesh" aria-hidden />
        <div className="rk-hero__inner">
          <FadeIn className="rk-hero__copy">
            <img
              className="rk-hero__logo"
              src={cs.logo}
              alt="Road King EV logo"
              width="120"
              height="120"
              decoding="async"
            />
            <p className="rk-kicker">Alpha Nine × Road King EV · AI Automation</p>
            <h1 className="rk-hero__title">{cs.headline}</h1>
            <p className="rk-hero__lede">{cs.subheadline}</p>
            <HeroFlowArt />
            <div className="rk-hero__links">
              <a href={cs.facebook} target="_blank" rel="noopener noreferrer">
                Road King on Facebook
              </a>
              <Link to="/portfolio">Back to portfolio</Link>
            </div>
          </FadeIn>

          <FadeIn className="rk-hero__visual" delay={0.08}>
            <div className="rk-hero__product">
              <img
                src={heroImg}
                alt="Road King electric vehicle campaign creative"
                width="720"
                height="900"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="rk-hero__float" aria-hidden>
              <span><IconMeta /> Meta</span>
              <span><IconSocial /> IG</span>
              <span><IconSocial /> FB</span>
            </div>
            <aside className="rk-hero__result">
              <p className="rk-hero__result-value">{cs.result.value}</p>
              <p className="rk-hero__result-label">{cs.result.label}</p>
              <p className="rk-hero__result-note">{cs.result.note}</p>
            </aside>
          </FadeIn>
        </div>
      </section>

      <ScrollSection as="section" className="rk-section">
        <div className="rk-section__inner">
          <p className="rk-kicker">The challenge</p>
          <h2 className="rk-section__title">Two different audiences. One connected system.</h2>
          <div className="rk-challenge">
            <article className="rk-challenge__card rk-challenge__card--customer">
              <div className="rk-challenge__icon">
                <IconUser />
              </div>
              <p className="rk-challenge__label">Card A · Customer acquisition</p>
              <h3>People interested in electric scooters and motorcycles</h3>
              <ul>
                {customerSteps.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="rk-challenge__bridge" aria-hidden>
              <IconArrow className="rk-challenge__bridge-arrow" />
              <div className="rk-challenge__bridge-hub">
                <IconHub />
              </div>
              <IconArrow className="rk-challenge__bridge-arrow" />
            </div>

            <article className="rk-challenge__card rk-challenge__card--dealer">
              <div className="rk-challenge__icon rk-challenge__icon--alt">
                <IconDealer />
              </div>
              <p className="rk-challenge__label">Card B · Dealership acquisition</p>
              <h3>Potential dealership investors</h3>
              <ul>
                {dealerSteps.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="rk-challenge__converge" aria-hidden>
            <span />
            <p>
              <IconHub /> Central lead management
            </p>
            <span />
          </div>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="rk-section rk-section--muted">
        <div className="rk-section__inner">
          <p className="rk-kicker">Automation architecture</p>
          <h2 className="rk-section__title">From social inquiry to the right sales path.</h2>
          <p className="rk-section__lede">
            We don&apos;t just generate leads. We build intelligent systems that turn attention into business opportunities.
          </p>
          <WorkflowDiagram />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="rk-section">
        <div className="rk-section__inner rk-split">
          <div>
            <p className="rk-kicker">Lead qualification</p>
            <h2 className="rk-section__title">Every inquiry classified before it moves.</h2>
            <p className="rk-section__lede">
              Leads enter once, then branch into customer or dealer tracks with the fields sales teams need.
            </p>
          </div>
          <QualificationTree />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="rk-section rk-section--muted">
        <div className="rk-section__inner rk-split">
          <div>
            <p className="rk-kicker">Dealership distribution</p>
            <h2 className="rk-section__title">City-aware routing for follow-up.</h2>
            <p className="rk-section__lede">
              Customer inquiry → city identification → dealership matching → sales team — illustrated as a conceptual journey across Pakistan.
            </p>
          </div>
          <PakistanMap />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="rk-section">
        <div className="rk-section__inner">
          <p className="rk-kicker">Sales pipeline</p>
          <h2 className="rk-section__title">A clearer view of opportunity movement.</h2>
          <PipelineDashboard />
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="rk-section rk-section--muted">
        <div className="rk-section__inner">
          <p className="rk-kicker">Business impact</p>
          <h2 className="rk-section__title">Verified highlight from the collaboration.</h2>
          <div className="rk-impact">
            <article className="rk-impact__hero">
              <p className="rk-impact__value">{cs.result.value}</p>
              <p className="rk-impact__label">{cs.result.label}</p>
              <p className="rk-impact__note">{cs.result.note}</p>
            </article>
            <div className="rk-impact__grid">
              <article className="rk-impact__card">
                <h3>Customer vs dealership journeys</h3>
                <p>Two acquisition tracks, one shared operating layer.</p>
                <div className="rk-impact__bars" aria-hidden>
                  <span style={{ width: "78%" }} />
                  <span style={{ width: "54%" }} />
                </div>
              </article>
              <article className="rk-impact__card">
                <h3>Lead funnel</h3>
                <p>Capture → categorize → route → sales follow-up.</p>
                <div className="rk-impact__funnel" aria-hidden>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </article>
              <article className="rk-impact__card">
                <h3>Additional metrics</h3>
                <p>Impressions, CPL, conversion rate, and ROI — pending client confirmation.</p>
                <p className="rk-impact__placeholder">Awaiting verified data</p>
              </article>
            </div>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection as="section" className="rk-section">
        <div className="rk-section__inner">
          <p className="rk-kicker">What Alpha Nine delivered</p>
          <h2 className="rk-section__title">A full-stack growth engagement.</h2>
          <div className="rk-services">
            {cs.services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <FadeIn key={service} className="rk-services__item" delay={index * 0.04}>
                  <span className="rk-services__icon">
                    <Icon />
                  </span>
                  <div>
                    <span className="rk-services__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{service}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <div className="rk-gallery">
            <img
              src={productImg}
              alt="Road King IBRA launch creative"
              width="640"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <img
              src={lifestyleImg}
              alt="Road King Raptor lifestyle creative"
              width="640"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </ScrollSection>

      <section className="rk-cta">
        <div className="rk-cta__glow" aria-hidden />
        <div className="rk-cta__inner">
          <h2>Your business needs more than leads. It needs a system.</h2>
          <p>
            Alpha Nine builds intelligent marketing and automation systems that help businesses capture opportunities, streamline operations and scale sales.
          </p>
          <div className="rk-cta__actions">
            <Link to="/contact" className="rk-cta__btn rk-cta__btn--primary">
              Build your AI system
            </Link>
            <a className="rk-cta__btn rk-cta__btn--ghost" href="mailto:Info.alphanine@gmail.com">
              Talk to Alpha Nine
            </a>
          </div>
          <div className="rk-cta__contact">
            <a href="https://alphaninemarketing.com/">alphaninemarketing.com</a>
            <a href="mailto:Info.alphanine@gmail.com">Info.alphanine@gmail.com</a>
            <a href="tel:+923365010457">+92 336 5010457</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoadKingCaseStudy;
