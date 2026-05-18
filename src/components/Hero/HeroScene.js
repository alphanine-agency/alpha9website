import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./HeroScene.css";

function HeroScene() {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const g = (n) => `url(#${uid}-${n})`;

  const floatProps = reduceMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
      };

  const pulseProps = reduceMotion
    ? {}
    : {
        animate: { opacity: [0.45, 0.95, 0.45] },
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div className="hero-scene" aria-hidden>
      <svg
        className="hero-scene__svg"
        viewBox="0 0 520 520"
        role="presentation"
      >
        <defs>
          <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DEBFF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <linearGradient id={`${uid}-panel`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#161d26" />
            <stop offset="100%" stopColor="#06080c" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="42%" r="50%">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`${uid}-grid`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0V24"
              fill="none"
              stroke="rgba(0,194,255,0.08)"
              strokeWidth="0.6"
            />
          </pattern>
          <filter id={`${uid}-blur`}>
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="520" height="520" fill={g("grid")} />
        <ellipse cx="260" cy="250" rx="210" ry="190" fill={g("glow")} />

        <g opacity="0.55">
          <ellipse
            cx="260"
            cy="430"
            rx="200"
            ry="28"
            fill="rgba(0,194,255,0.12)"
            filter={`url(#${uid}-blur)`}
          />
        </g>

        <motion.g {...floatProps}>
          <rect
            x="108"
            y="88"
            width="304"
            height="200"
            rx="20"
            fill="#070a0f"
            stroke={g("grad")}
            strokeWidth="1.5"
          />
          <rect x="122" y="102" width="276" height="148" rx="12" fill={g("panel")} />
          <path d="M122 128h276" stroke="rgba(0,194,255,0.15)" />
          <circle cx="140" cy="115" r="4" fill="#ff5f57" />
          <circle cx="154" cy="115" r="4" fill="#febc2e" />
          <circle cx="168" cy="115" r="4" fill="#28c840" />

          <rect x="138" y="142" width="36" height="88" rx="6" fill="rgba(0,194,255,0.12)" stroke="rgba(77,235,255,0.35)" />
          <rect x="182" y="158" width="36" height="72" rx="6" fill="rgba(0,194,255,0.18)" stroke="rgba(77,235,255,0.45)" />
          <rect x="226" y="134" width="36" height="96" rx="6" fill={g("grad")} opacity="0.35" stroke="#4DEBFF" strokeWidth="1" />
          <rect x="270" y="150" width="36" height="80" rx="6" fill="rgba(0,194,255,0.14)" stroke="rgba(77,235,255,0.35)" />
          <rect x="314" y="162" width="36" height="68" rx="6" fill="rgba(0,194,255,0.1)" stroke="rgba(77,235,255,0.3)" />

          <path
            d="M138 142 L170 118 210 132 250 108 290 124 332 100"
            stroke="#4DEBFF"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <motion.circle
            cx="332"
            cy="100"
            r="6"
            fill="#4DEBFF"
            {...pulseProps}
          />

          <rect x="138" y="248" width="120" height="10" rx="3" fill="rgba(77,235,255,0.2)" />
          <motion.rect
            x="138"
            y="248"
            width="72"
            height="10"
            rx="3"
            fill={g("grad")}
            opacity="0.65"
            {...pulseProps}
          />
        </motion.g>

        <motion.g
          {...(reduceMotion
            ? {}
            : {
                animate: { y: [0, 8, 0], x: [0, -6, 0] },
                transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              })}
        >
          <rect
            x="48"
            y="148"
            width="88"
            height="56"
            rx="12"
            fill="#0a1018"
            stroke="rgba(0,194,255,0.35)"
          />
          <text
            x="62"
            y="172"
            fill="#4DEBFF"
            fontSize="9"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            ROAS 4.8×
          </text>
          <text x="62" y="186" fill="#6b8a9a" fontSize="7" fontFamily="system-ui,sans-serif">
            Live attribution
          </text>
        </motion.g>

        <motion.g
          {...(reduceMotion
            ? {}
            : {
                animate: { y: [0, -8, 0], x: [0, 6, 0] },
                transition: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
              })}
        >
          <rect
            x="384"
            y="132"
            width="88"
            height="56"
            rx="12"
            fill="#0a1018"
            stroke="rgba(0,194,255,0.35)"
          />
          <circle cx="428" cy="158" r="16" fill="none" stroke={g("grad")} strokeWidth="1.5" />
          <circle cx="428" cy="158" r="6" fill="#4DEBFF" />
          <text x="396" y="178" fill="#6b8a9a" fontSize="7" fontFamily="system-ui,sans-serif">
            AI routing
          </text>
        </motion.g>

        <motion.g
          {...(reduceMotion
            ? {}
            : {
                animate: { y: [0, 6, 0] },
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              })}
        >
          <rect
            x="372"
            y="300"
            width="104"
            height="72"
            rx="14"
            fill="#0a1018"
            stroke={g("grad")}
            strokeWidth="1.2"
          />
          <rect x="386" y="316" width="32" height="32" rx="6" fill="rgba(0,194,255,0.15)" />
          <rect x="426" y="316" width="32" height="32" rx="6" fill="rgba(0,194,255,0.08)" />
          <rect x="386" y="354" width="72" height="8" rx="2" fill="rgba(77,235,255,0.25)" />
        </motion.g>

        <motion.g
          {...(reduceMotion
            ? {}
            : {
                animate: { y: [0, -6, 0] },
                transition: { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
              })}
        >
          <rect
            x="44"
            y="292"
            width="104"
            height="72"
            rx="14"
            fill="#0a1018"
            stroke="rgba(0,194,255,0.35)"
          />
          <path d="M68 318h56M68 334h40M68 348h48" stroke="#4DEBFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <text x="58" y="308" fill="#4DEBFF" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
            Content
          </text>
        </motion.g>

        <path
          d="M136 196h-28M384 160h28M428 300v-24M92 328h24"
          stroke={g("grad")}
          strokeWidth="1.2"
          strokeDasharray="5 4"
          opacity="0.45"
        />
        <circle cx="108" cy="196" r="5" fill="#00C2FF" opacity="0.7" />
        <circle cx="412" cy="160" r="5" fill="#4DEBFF" opacity="0.7" />
        <circle cx="428" cy="276" r="5" fill="#00C2FF" opacity="0.7" />
        <circle cx="116" cy="328" r="5" fill="#4DEBFF" opacity="0.7" />

        <motion.circle
          cx="260"
          cy="72"
          r="34"
          fill="#0a1018"
          stroke={g("grad")}
          strokeWidth="1.5"
          {...floatProps}
        />
        <text
          x="260"
          y="78"
          textAnchor="middle"
          fill="#4DEBFF"
          fontSize="11"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
          letterSpacing="0.12em"
        >
          α9
        </text>
      </svg>
      <motion.div
        className="hero-scene__ring"
        aria-hidden
        animate={reduceMotion ? false : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default HeroScene;
