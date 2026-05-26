import React, { useCallback, useId, useRef, useState } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import "./HeroScene.css";

const PANELS = {
  meta: { hub: [260, 248], node: [108, 118] },
  ai: { hub: [260, 248], node: [412, 118] },
  web: { hub: [260, 248], node: [430, 268] },
  content: { hub: [260, 248], node: [392, 398] },
  creative: { hub: [260, 248], node: [128, 398] },
  leads: { hub: [260, 248], node: [88, 268] },
};

function float(reduceMotion, delay = 0, y = 8) {
  if (reduceMotion) return {};
  return {
    animate: { y: [0, -y, 0] },
    transition: {
      duration: 5 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  };
}

function ScenePanel({
  id,
  label,
  active,
  onActivate,
  reduceMotion,
  floatDelay,
  hit,
  children,
}) {
  const isActive = active === id;
  const dimmed = active && !isActive;

  return (
    <m.g
      className={`hero-scene__panel${isActive ? " is-active" : ""}${dimmed ? " is-dimmed" : ""}`}
      {...float(reduceMotion, floatDelay, 7)}
      style={{
        cursor: reduceMotion ? "default" : "pointer",
        transformOrigin: `${hit.cx}px ${hit.cy}px`,
      }}
      onHoverStart={() => !reduceMotion && onActivate(id)}
      onFocus={() => !reduceMotion && onActivate(id)}
      onClick={() => onActivate(id)}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      tabIndex={reduceMotion ? -1 : 0}
      role="button"
      aria-label={label}
      aria-pressed={isActive}
    >
      <rect
        x={hit.x}
        y={hit.y}
        width={hit.w}
        height={hit.h}
        rx={hit.r || 14}
        fill="transparent"
        className="hero-scene__hit"
      />
      {isActive && !reduceMotion ? (
        <rect
          x={hit.x - 4}
          y={hit.y - 4}
          width={hit.w + 8}
          height={hit.h + 8}
          rx={(hit.r || 14) + 4}
          fill="none"
          stroke="url(#panel-glow-stroke)"
          strokeWidth="2"
          className="hero-scene__panel-glow"
        />
      ) : null}
      {children}
    </m.g>
  );
}

function HeroScene() {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(null);
  const [spot, setSpot] = useState({ x: 50, y: 48 });

  const g = (n) => `url(#${uid}-${n})`;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 140, damping: 22 });
  const parallaxY = useSpring(pointerY, { stiffness: 140, damping: 22 });

  const activate = useCallback((id) => setActive(id), []);
  const sceneRef = useRef(null);
  const pointerFrameRef = useRef(null);
  const pointerCoordsRef = useRef(null);

  const onPointerMove = useCallback(
    (event) => {
      pointerCoordsRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
      };

      if (pointerFrameRef.current !== null) {
        return;
      }

      pointerFrameRef.current = window.requestAnimationFrame(() => {
        pointerFrameRef.current = null;
        const node = sceneRef.current;
        const coords = pointerCoordsRef.current;
        if (!node || !coords) {
          return;
        }

        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return;
        }

        const px = (coords.clientX - rect.left) / rect.width - 0.5;
        const py = (coords.clientY - rect.top) / rect.height - 0.5;

        if (!reduceMotion) {
          pointerX.set(px * 22);
          pointerY.set(py * 18);
        }

        setSpot({
          x: ((coords.clientX - rect.left) / rect.width) * 100,
          y: ((coords.clientY - rect.top) / rect.height) * 100,
        });
      });
    },
    [pointerX, pointerY, reduceMotion]
  );

  const onPointerLeave = useCallback(() => {
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }
    pointerCoordsRef.current = null;
    setActive(null);
    pointerX.set(0);
    pointerY.set(0);
    setSpot({ x: 50, y: 48 });
  }, [pointerX, pointerY]);

  const pulse = reduceMotion
    ? {}
    : {
        animate: { opacity: [0.4, 1, 0.4] },
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
      };

  const connectorPath = (panelId) => {
    const { hub, node } = PANELS[panelId];
    return `M${hub[0]} ${hub[1]} L${node[0]} ${node[1]}`;
  };

  return (
    <m.div
      ref={sceneRef}
      className={`hero-scene${active ? " hero-scene--has-active" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      role="group"
      aria-label="Interactive view of Alpha Nine marketing capabilities"
    >
      <m.div
        className="hero-scene__spotlight"
        aria-hidden
        animate={
          reduceMotion
            ? false
            : {
                opacity: active ? 0.85 : 0.55,
                scale: active ? 1.08 : 1,
              }
        }
        style={{
          left: `${spot.x}%`,
          top: `${spot.y}%`,
        }}
      />

      <svg className="hero-scene__svg" viewBox="0 0 520 520" role="presentation">
        <defs>
          <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DEBFF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <linearGradient id={`${uid}-panel`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#161d26" />
            <stop offset="100%" stopColor="#06080c" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="panel-glow-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DEBFF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <pattern
            id={`${uid}-grid`}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M22 0H0V22"
              fill="none"
              stroke="rgba(0,194,255,0.09)"
              strokeWidth="0.55"
            />
          </pattern>
          <filter id={`${uid}-blur`}>
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        <rect width="520" height="520" fill={g("grid")} />
        <ellipse cx="260" cy="255" rx="215" ry="200" fill={g("glow")} />
        <ellipse
          cx="260"
          cy="438"
          rx="185"
          ry="22"
          fill="rgba(0,194,255,0.1)"
          filter={`url(#${uid}-blur)`}
        />

        <m.g style={{ x: parallaxX, y: parallaxY }}>
          {/* Connectors */}
          {Object.keys(PANELS).map((panelId) => {
            const lit = !active || active === panelId;
            return (
              <m.path
                key={panelId}
                d={connectorPath(panelId)}
                stroke={g("grad")}
                strokeWidth={lit && active === panelId ? 2.2 : 1.1}
                strokeDasharray={lit && active === panelId ? "none" : "6 5"}
                fill="none"
                animate={{ opacity: lit ? (active === panelId ? 0.95 : 0.45) : 0.12 }}
                transition={{ duration: 0.25 }}
              />
            );
          })}

          {Object.entries(PANELS).map(([panelId, { node }], i) => (
            <m.circle
              key={panelId}
              cx={node[0]}
              cy={node[1]}
              r={active === panelId ? 6 : 4}
              fill="#4DEBFF"
              animate={
                reduceMotion
                  ? false
                  : {
                      opacity:
                        !active || active === panelId ? [0.5, 1, 0.5] : 0.2,
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }
              }
            />
          ))}

          {/* Central hub */}
          <m.g
            className={`hero-scene__panel hero-scene__panel--hub${active === "hub" ? " is-active" : ""}${active && active !== "hub" ? " is-dimmed" : ""}`}
            {...float(reduceMotion, 0, 6)}
            style={{ cursor: reduceMotion ? "default" : "pointer", transformOrigin: "260px 252px" }}
            onHoverStart={() => !reduceMotion && setActive("hub")}
            onClick={() => setActive((v) => (v === "hub" ? null : "hub"))}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            tabIndex={reduceMotion ? -1 : 0}
            role="button"
            aria-label="Growth stack hub"
            aria-pressed={active === "hub"}
          >
            <rect x="154" y="164" width="212" height="176" rx="22" fill="transparent" />
            <rect
              x="158"
              y="168"
              width="204"
              height="168"
              rx="18"
              fill="#06090e"
              stroke={g("grad")}
              strokeWidth={active === "hub" ? 2 : 1.5}
            />
            <rect x="172" y="182" width="176" height="128" rx="10" fill={g("panel")} />
            <text
              x="184"
              y="198"
              fill="#6b8a9a"
              fontSize="7"
              fontFamily="system-ui,sans-serif"
              letterSpacing="0.14em"
            >
              GROWTH STACK
            </text>
            <rect x="184" y="208" width="44" height="52" rx="6" fill="rgba(0,194,255,0.1)" stroke="rgba(77,235,255,0.35)" />
            <rect x="236" y="220" width="44" height="40" rx="6" fill="rgba(0,194,255,0.16)" stroke="rgba(77,235,255,0.4)" />
            <rect x="288" y="212" width="44" height="48" rx="6" fill={g("grad")} opacity="0.35" stroke="#4DEBFF" strokeWidth="1" />
            <path
              d="M184 208 L204 196 224 204 244 192 264 200 284 188 304 196"
              stroke="#4DEBFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <m.circle cx="304" cy="196" r="5" fill="#4DEBFF" {...pulse} />
            <rect x="184" y="272" width="148" height="8" rx="2" fill="rgba(77,235,255,0.18)" />
            <m.rect
              x="184"
              y="272"
              width={active === "hub" ? 148 : 92}
              height="8"
              rx="2"
              fill={g("grad")}
              opacity="0.6"
              animate={reduceMotion ? false : undefined}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              {...(active === "hub" ? pulse : {})}
            />
            <circle cx="338" cy="188" r="14" fill="#0a1018" stroke={g("grad")} strokeWidth="1.2" />
            <text
              x="338"
              y="192"
              textAnchor="middle"
              fill="#4DEBFF"
              fontSize="8"
              fontWeight="700"
              fontFamily="system-ui,sans-serif"
            >
              9
            </text>
          </m.g>

          <ScenePanel
            id="meta"
            label="Meta Ads — social, reels, and stories"
            active={active}
            onActivate={activate}
            reduceMotion={reduceMotion}
            floatDelay={0.3}
            hit={{ x: 36, y: 52, w: 118, h: 108, cx: 95, cy: 106 }}
          >
            <rect x="36" y="52" width="118" height="108" rx="14" fill="#0a1018" stroke="rgba(0,194,255,0.4)" strokeWidth="1.2" />
            <rect x="48" y="64" width="94" height="58" rx="8" fill={g("panel")} stroke="rgba(77,235,255,0.25)" />
            <rect x="56" y="72" width="78" height="36" rx="4" fill="rgba(0,194,255,0.12)" />
            <circle cx="68" cy="84" r="6" fill={g("grad")} opacity="0.5" />
            <rect x="80" y="80" width="44" height="4" rx="1" fill="#4DEBFF" opacity="0.5" />
            <rect x="80" y="88" width="32" height="3" rx="1" fill="rgba(77,235,255,0.3)" />
            <rect x="56" y="114" width="24" height="4" rx="1" fill="#4DEBFF" opacity="0.45" />
            <path d="M118 68c8-6 16-6 22 0s14 6 22 0" stroke="#4DEBFF" strokeWidth="1.4" fill="none" opacity="0.65" />
            <text x="48" y="138" fill="#4DEBFF" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
              Meta Ads
            </text>
            <text x="48" y="150" fill="#6b8a9a" fontSize="6.5" fontFamily="system-ui,sans-serif">
              Social · Reels · Stories
            </text>
          </ScenePanel>

          <ScenePanel
            id="ai"
            label="AI Automation — routing and workflows"
            active={active}
            onActivate={activate}
            reduceMotion={reduceMotion}
            floatDelay={0.5}
            hit={{ x: 366, y: 52, w: 118, h: 108, cx: 425, cy: 106 }}
          >
            <rect x="366" y="52" width="118" height="108" rx="14" fill="#0a1018" stroke="rgba(0,194,255,0.4)" strokeWidth="1.2" />
            <circle cx="425" cy="98" r="26" fill="none" stroke={g("grad")} strokeWidth="1.3" opacity="0.55" />
            <circle cx="425" cy="98" r="14" fill="#060a10" stroke="#4DEBFF" strokeWidth="1.2" />
            <path d="M425 84v28M411 98h28" stroke="#4DEBFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <circle cx="398" cy="82" r="8" fill="#101820" stroke="rgba(0,194,255,0.4)" />
            <circle cx="452" cy="82" r="8" fill="#101820" stroke="rgba(0,194,255,0.4)" />
            <circle cx="398" cy="114" r="8" fill="#101820" stroke="rgba(0,194,255,0.4)" />
            <circle cx="452" cy="114" r="8" fill="#101820" stroke="rgba(0,194,255,0.4)" />
            <path d="M406 82 L418 98 M434 98 L446 82 M406 114 L418 98 M434 98 L446 114" stroke="#4DEBFF" strokeWidth="1" opacity="0.45" />
            <text x="378" y="138" fill="#4DEBFF" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
              AI Automation
            </text>
            <text x="378" y="150" fill="#6b8a9a" fontSize="6.5" fontFamily="system-ui,sans-serif">
              Routing · workflows
            </text>
          </ScenePanel>

          <ScenePanel
            id="leads"
            label="Lead generation — funnels and CRM sync"
            active={active}
            onActivate={activate}
            reduceMotion={reduceMotion}
            floatDelay={0.7}
            hit={{ x: 28, y: 228, w: 108, h: 112, cx: 82, cy: 284 }}
          >
            <rect x="28" y="228" width="108" height="112" rx="14" fill="#0a1018" stroke="rgba(0,194,255,0.4)" strokeWidth="1.2" />
            <path d="M82 248 L108 268 L108 308 L56 308 L56 268 Z" fill="rgba(0,194,255,0.08)" stroke={g("grad")} strokeWidth="1.2" />
            <path d="M68 268 L96 284 L96 316 L52 316 L52 284 Z" fill="rgba(0,194,255,0.12)" stroke="rgba(77,235,255,0.35)" />
            <path d="M74 292 L90 302 L90 324 L66 324 L66 302 Z" fill={g("grad")} opacity="0.35" stroke="#4DEBFF" strokeWidth="1" />
            <circle cx="78" cy="258" r="4" fill="#4DEBFF" />
            <circle cx="82" cy="278" r="4" fill="#4DEBFF" opacity="0.75" />
            <circle cx="78" cy="308" r="4" fill="#00C2FF" />
            <path d="M78 252v8M78 272v8M78 302v8" stroke="#4DEBFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <text x="40" y="338" fill="#4DEBFF" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
              Lead Gen
            </text>
            <text x="40" y="350" fill="#6b8a9a" fontSize="6.5" fontFamily="system-ui,sans-serif">
              Funnels · CRM sync
            </text>
          </ScenePanel>

          <ScenePanel
            id="web"
            label="Web design — performance and UX"
            active={active}
            onActivate={activate}
            reduceMotion={reduceMotion}
            floatDelay={0.4}
            hit={{ x: 384, y: 228, w: 108, h: 112, cx: 438, cy: 284 }}
          >
            <rect x="384" y="228" width="108" height="112" rx="14" fill="#0a1018" stroke="rgba(0,194,255,0.4)" strokeWidth="1.2" />
            <rect x="396" y="240" width="84" height="62" rx="8" fill="#06090e" stroke={g("grad")} strokeWidth="1.2" />
            <circle cx="408" cy="252" r="3" fill="#ff5f57" />
            <circle cx="418" cy="252" r="3" fill="#febc2e" />
            <circle cx="428" cy="252" r="3" fill="#28c840" />
            <path d="M396 260h84" stroke="rgba(0,194,255,0.15)" />
            <rect x="404" y="268" width="36" height="5" rx="1" fill="rgba(77,235,255,0.35)" />
            <rect x="404" y="278" width="68" height="4" rx="1" fill="#1a2430" />
            <rect x="404" y="286" width="52" height="4" rx="1" fill="#1a2430" />
            <rect x="404" y="294" width="28" height="4" rx="1" fill={g("grad")} opacity="0.5" />
            <rect x="448" y="308" width="28" height="22" rx="6" fill="#0a1018" stroke="rgba(0,194,255,0.35)" />
            <text x="454" y="322" fill="#4DEBFF" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">
              98
            </text>
            <text x="396" y="338" fill="#4DEBFF" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
              Web Design
            </text>
            <text x="396" y="350" fill="#6b8a9a" fontSize="6.5" fontFamily="system-ui,sans-serif">
              CWV · UX · landing
            </text>
          </ScenePanel>

          <ScenePanel
            id="content"
            label="Content and product photo and video shoots"
            active={active}
            onActivate={activate}
            reduceMotion={reduceMotion}
            floatDelay={0.9}
            hit={{ x: 328, y: 358, w: 128, h: 118, cx: 392, cy: 417 }}
          >
            <rect x="328" y="358" width="128" height="118" rx="14" fill="#0a1018" stroke="rgba(0,194,255,0.4)" strokeWidth="1.2" />
            <rect x="368" y="388" width="28" height="8" rx="2" fill="#141c22" stroke="rgba(0,194,255,0.3)" />
            <rect x="376" y="378" width="20" height="10" rx="2" fill="#1a2430" />
            <rect x="384" y="362" width="24" height="22" rx="5" fill={g("grad")} opacity="0.4" stroke="#4DEBFF" strokeWidth="1" />
            <rect x="348" y="392" width="22" height="16" rx="4" fill="#101820" stroke="rgba(0,194,255,0.4)" />
            <circle cx="359" cy="400" r="5" fill="#060a10" stroke="#4DEBFF" strokeWidth="1" />
            <rect x="418" y="390" width="26" height="18" rx="4" fill="#101820" stroke="rgba(0,194,255,0.4)" />
            <circle cx="431" cy="399" r="5" fill="#4DEBFF" opacity="0.6" />
            <rect x="404" y="368" width="18" height="10" rx="2" fill="#ff3b30" opacity="0.85" />
            <text x="406" y="376" fill="#fff" fontSize="4.5" fontWeight="700" fontFamily="system-ui,sans-serif">
              REC
            </text>
            <text x="340" y="448" fill="#4DEBFF" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
              Content & Product
            </text>
            <text x="340" y="460" fill="#6b8a9a" fontSize="6.5" fontFamily="system-ui,sans-serif">
              Photo · video shoots
            </text>
          </ScenePanel>

          <ScenePanel
            id="creative"
            label="Creative and video — reels and brand edits"
            active={active}
            onActivate={activate}
            reduceMotion={reduceMotion}
            floatDelay={1.1}
            hit={{ x: 64, y: 358, w: 128, h: 118, cx: 128, cy: 417 }}
          >
            <rect x="64" y="358" width="128" height="118" rx="14" fill="#0a1018" stroke="rgba(0,194,255,0.4)" strokeWidth="1.2" />
            <rect x="76" y="372" width="72" height="44" rx="6" fill={g("panel")} stroke="rgba(77,235,255,0.3)" />
            <path d="M98 384l22 14-22 14z" fill={g("grad")} opacity="0.85" />
            <rect x="154" y="378" width="10" height="32" rx="2" fill="#101820" stroke="#00C2FF" strokeWidth="1" />
            <rect x="76" y="422" width="72" height="6" rx="3" fill="#141c22" />
            <m.rect
              x="76"
              y="422"
              width={active === "creative" ? 72 : 34}
              height="6"
              rx="3"
              fill={g("grad")}
              opacity="0.55"
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            />
            <rect x="154" y="372" width="28" height="20" rx="4" fill="#101820" stroke="rgba(0,194,255,0.35)" />
            <path d="M162 378l10 8-10 8z" fill="#4DEBFF" opacity="0.5" />
            <text x="76" y="448" fill="#4DEBFF" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
              Creative & Video
            </text>
            <text x="76" y="460" fill="#6b8a9a" fontSize="6.5" fontFamily="system-ui,sans-serif">
              Reels · brand edits
            </text>
          </ScenePanel>

          {!reduceMotion &&
            (active === "leads" || active === "hub") &&
            [0, 1, 2].map((i) => (
              <m.circle
                key={`flow-${i}`}
                r="3"
                fill="#4DEBFF"
                animate={{
                  cx: [82, 160, 220],
                  cy: [300, 280, 250],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.65,
                }}
              />
            ))}
        </m.g>
      </svg>

      <m.div
        className="hero-scene__ring"
        aria-hidden
        animate={reduceMotion ? false : { rotate: 360 }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
      />
    </m.div>
  );
}

export default HeroScene;
