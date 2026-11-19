const fs = require("fs");
const path = require("path");

const rkPath = path.join(__dirname, "../src/pages/CaseStudies/RoadKingCaseStudy.css");
const outPath = path.join(__dirname, "../src/pages/CaseStudies/PadelChaseCaseStudy.css");
const rk = fs.readFileSync(rkPath, "utf8");

let pc = rk
  .replace(/\.rk-/g, ".pc-")
  .replace(/rk-/g, "pc-")
  .replace(/#39FF14/gi, "#FF6B00")
  .replace(/#B8FF6A/gi, "#FFB347")
  .replace(/#7CFF3A/gi, "#FF8C00")
  .replace(/#C8CDD2/gi, "#FFD4A3")
  .replace(/rgba\(57,\s*255,\s*20/g, "rgba(255, 107, 0")
  .replace(/rgba\(184,\s*255,\s*106/g, "rgba(255, 179, 71")
  .replace(/rgba\(52,\s*211,\s*153/g, "rgba(255, 140, 0")
  .replace(/--rk-/g, "--pc-")
  .replace(/--pc-blue/g, "--pc")
  .replace(/--pc-neon/g, "--pc-hot")
  .replace(/--pc-green/g, "--pc-amber")
  .replace(/customer/g, "player")
  .replace(/dealer/g, "event")
  .replace(/#0b1220/g, "#1a1008")
  .replace(/#031208/g, "#1a0a00")
  .replace(/#0a1a10/g, "#1a1008")
  .replace(/#062018/g, "#2a1408");

pc = pc.replace(/^\.pc-case\s*\{[\s\S]*?\n\}/, "");

const head = `.pc-case {
  --pc: #ff6b00;
  --pc-hot: #ff8c00;
  --pc-amber: #ffb347;
  --pc-soft: rgba(255, 107, 0, 0.16);
  --pc-line: rgba(255, 107, 0, 0.3);
  --pc-bg: #050505;
  --pc-surface: #0d0d0d;
  --pc-elevated: #141414;
  --pc-text: #f5f5f5;
  --pc-muted: #9a9a9a;
  --pc-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
  background: var(--pc-bg);
  color: var(--pc-text);
  font-family: var(--font-sans, system-ui, sans-serif);
}

`;

const extras = `
/* Hero court photo layout */
.pc-hero {
  position: relative;
  min-height: min(92vh, 900px);
  display: grid;
  align-items: end;
  overflow: hidden;
}
.pc-hero__media,
.pc-hero__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pc-hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(5, 5, 5, 0.28) 0%, rgba(5, 5, 5, 0.72) 48%, #050505 100%),
    radial-gradient(ellipse 50% 40% at 70% 30%, rgba(255, 107, 0, 0.28), transparent 60%);
}
.pc-hero__grid {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  padding: clamp(6rem, 12vw, 8rem) 1.5rem 3.2rem;
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 980px) {
  .pc-hero__grid {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: end;
  }
}
.pc-hero__logo-plate {
  display: inline-flex;
  padding: 0.85rem 1.1rem;
  margin-bottom: 1.1rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid rgba(255, 107, 0, 0.35);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}
.pc-hero__logo {
  width: min(100%, 280px);
  height: auto;
  display: block;
}
.pc-hero h1 {
  margin: 0 0 1rem;
  font-size: clamp(2.2rem, 5.2vw, 3.6rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
  max-width: 13ch;
}
.pc-hero__lede {
  margin: 0 0 1.1rem;
  max-width: 40rem;
  color: rgba(245, 245, 245, 0.82);
  line-height: 1.7;
  font-size: 1.05rem;
}
.pc-hero__flow {
  margin: 0 0 1.1rem;
}
.pc-hero__flow-svg {
  width: min(100%, 28rem);
  height: auto;
  display: block;
}
.pc-hero__flow-line {
  fill: none;
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 2;
  stroke-dasharray: 4 8;
}
.pc-hero__flow-glow {
  fill: none;
  stroke: url(#pcHeroFlow);
  stroke-width: 2.4;
  stroke-dasharray: 8 12;
  animation: pc-dash 4s linear infinite;
}
.pc-hero__flow-particle {
  fill: #ffb347;
}
.pc-hero__flow-ball {
  fill: #ff6b00;
  filter: drop-shadow(0 0 10px rgba(255, 107, 0, 0.8));
}
.pc-hero__flow-seam {
  fill: none;
  stroke: #fff;
  stroke-width: 1.4;
}
.pc-hero__flow-labels {
  display: flex;
  justify-content: space-between;
  max-width: 28rem;
  margin-top: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pc-muted);
}
.pc-hero__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.pc-hero__links a {
  color: var(--pc);
  font-weight: 700;
  text-decoration: none;
}
.pc-hero__aside {
  display: grid;
  gap: 0.9rem;
  justify-items: end;
}
.pc-hero__float {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  justify-content: flex-end;
}
.pc-hero__float span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 107, 0, 0.3);
  background: rgba(0, 0, 0, 0.55);
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
}
.pc-hero__float svg {
  width: 0.95rem;
  height: 0.95rem;
  color: var(--pc);
}
.pc-hero__result {
  width: min(100%, 22rem);
  padding: 1.25rem 1.35rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 107, 0, 0.35);
  background: linear-gradient(160deg, rgba(255, 107, 0, 0.18), rgba(10, 10, 10, 0.9));
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4);
}
.pc-hero__result-value {
  margin: 0;
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--pc-hot);
  letter-spacing: -0.03em;
}
.pc-hero__result-label {
  margin: 0.35rem 0;
  font-weight: 700;
}
.pc-hero__result-note {
  margin: 0;
  color: var(--pc-muted);
  font-size: 0.78rem;
  line-height: 1.5;
}

.pc-venue {
  padding: 1rem;
  border-radius: 1.3rem;
  border: 1px solid var(--pc-line);
  background: #0a0806;
}
.pc-venue__svg {
  width: 100%;
  height: auto;
  display: block;
}
.pc-venue__shell {
  fill: rgba(255, 107, 0, 0.04);
  stroke: rgba(255, 107, 0, 0.35);
}
.pc-venue__court rect {
  fill: rgba(255, 107, 0, 0.06);
  stroke: rgba(255, 255, 255, 0.35);
  stroke-width: 1.4;
}
.pc-venue__court line {
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 1.2;
}
.pc-venue__court--live rect {
  stroke: rgba(255, 140, 0, 0.7);
  fill: rgba(255, 107, 0, 0.1);
}
.pc-venue__court-label {
  fill: rgba(245, 245, 245, 0.75);
  font-size: 11px;
  font-weight: 600;
  text-anchor: middle;
}
.pc-venue__live-dot {
  fill: #ff6b00;
}
.pc-venue__hub {
  fill: #1a1008;
  stroke: #ff6b00;
  stroke-width: 2;
  filter: drop-shadow(0 0 14px rgba(255, 107, 0, 0.5));
}
.pc-venue__hub-text {
  fill: #fff;
  font-size: 12px;
  font-weight: 800;
  text-anchor: middle;
}
.pc-venue__route {
  fill: none;
  stroke: rgba(255, 107, 0, 0.35);
  stroke-width: 1.4;
  stroke-dasharray: 4 6;
  animation: pc-dash 7s linear infinite;
}
.pc-venue__packet {
  fill: #ffb347;
}
.pc-venue__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.7rem;
  font-size: 0.75rem;
  color: var(--pc-muted);
}
.pc-venue__legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.pc-venue__swatch {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #64748b;
  display: inline-block;
}
.pc-venue__swatch--live {
  background: #ff6b00;
  box-shadow: 0 0 8px rgba(255, 107, 0, 0.7);
}

.pc-bracket__particle {
  fill: #ffb347;
  filter: drop-shadow(0 0 5px rgba(255, 179, 71, 0.9));
}
.pc-bracket__step svg {
  width: 1.05rem;
  height: 1.05rem;
  color: var(--pc);
  margin-bottom: 0.25rem;
}
.pc-influ__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.9rem;
}
.pc-influ__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 107, 0, 0.25);
  background: rgba(255, 107, 0, 0.06);
  font-size: 0.72rem;
  font-weight: 600;
}
.pc-influ__chip svg {
  width: 0.9rem;
  height: 0.9rem;
  color: var(--pc);
}
.pc-eco__list li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.pc-eco__list svg {
  width: 1rem;
  height: 1rem;
  color: var(--pc);
  flex-shrink: 0;
}
.pc-booking__wall {
  stroke: rgba(255, 107, 0, 0.35);
}
.pc-booking__floor {
  stroke: rgba(255, 255, 255, 0.25);
}
.pc-booking__line,
.pc-booking__net,
.pc-booking__service {
  fill: none;
  stroke: rgba(255, 255, 255, 0.7);
  stroke-width: 1.5;
}
.pc-booking__pulse {
  fill: #ff6b00;
  animation: pc-pulse 2.2s ease-out infinite;
}
.pc-booking__pulse--delay {
  animation-delay: 0.7s;
}
.pc-booking__ball {
  fill: #fff;
  stroke: #ff6b00;
  stroke-width: 1.5;
}
.pc-booking__ball-ghost {
  fill: rgba(255, 179, 71, 0.55);
}
.pc-booking__label {
  fill: rgba(255, 180, 100, 0.9);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-anchor: middle;
}
.pc-booking__court-wrap {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1.3rem;
  border: 1px solid var(--pc-line);
  background:
    radial-gradient(ellipse 50% 40% at 50% 30%, rgba(255, 107, 0, 0.12), transparent 60%),
    #0a0806;
  transform: perspective(900px) rotateX(8deg);
  transform-origin: center top;
}
.pc-booking__court {
  width: 100%;
  height: auto;
  display: block;
}
.pc-cta {
  position: relative;
}
.pc-cta__glow {
  position: absolute;
  inset: -20% 10% auto;
  height: 60%;
  background: radial-gradient(ellipse at center, rgba(255, 107, 0, 0.2), transparent 65%);
  pointer-events: none;
}

.pc-scope {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}
@media (min-width: 800px) {
  .pc-scope {
    grid-template-columns: 1fr 1fr;
  }
}
.pc-scope article {
  padding: 1.3rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(160deg, rgba(255, 107, 0, 0.08), transparent 55%),
    var(--pc-elevated);
}
.pc-scope h3 {
  margin: 0 0 0.85rem;
  color: var(--pc);
  font-size: 0.95rem;
}
.pc-scope ul {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;
  color: var(--pc-muted);
}

.pc-graph {
  padding: 1.2rem;
  border-radius: 1.3rem;
  border: 1px solid var(--pc-line);
  background: var(--pc-elevated);
}
.pc-graph__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.1rem;
  margin-bottom: 0.7rem;
  color: var(--pc-muted);
  font-size: 0.78rem;
}
.pc-graph__legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.pc-graph__swatch {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  display: inline-block;
}
.pc-graph__swatch--a { background: var(--pc); }
.pc-graph__swatch--b { background: #ffb347; }
.pc-graph__swatch--c { background: #ffe0b2; }
.pc-graph__svg { width: 100%; height: auto; display: block; }
.pc-graph__grid { stroke: rgba(255, 255, 255, 0.06); }
.pc-graph__line {
  fill: none;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: pc-draw 2.4s ease forwards;
}
.pc-graph__line--a { stroke: var(--pc); }
.pc-graph__line--b { stroke: #ffb347; animation-delay: 0.2s; }
.pc-graph__line--c { stroke: #ffe0b2; animation-delay: 0.35s; }
.pc-graph__point {
  fill: var(--pc-hot);
  filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.9));
}
.pc-graph__badge {
  margin: 0.8rem 0 0;
  display: inline-block;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 107, 0, 0.14);
  color: #ffb347;
  font-size: 0.75rem;
  font-weight: 700;
}
@keyframes pc-draw {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .pc-booking__court-wrap {
    transform: none;
  }
}

html.mobile-lite .pc-booking__court-wrap {
  transform: none;
}
`;

fs.writeFileSync(outPath, head + pc + extras);
console.log("Wrote", outPath, fs.statSync(outPath).size, "bytes");
