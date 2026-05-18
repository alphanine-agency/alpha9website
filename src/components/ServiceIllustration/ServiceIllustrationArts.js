import React from "react";

function createDefs(uid) {
  return (
    <defs>
      <linearGradient id={`${uid}-grad-a`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4DEBFF" />
        <stop offset="55%" stopColor="#00C2FF" />
        <stop offset="100%" stopColor="#0099cc" />
      </linearGradient>
      <linearGradient id={`${uid}-grad-b`} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#4DEBFF" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient id={`${uid}-screen`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#141c26" />
        <stop offset="100%" stopColor="#06080c" />
      </linearGradient>
      <radialGradient id={`${uid}-glow`} cx="50%" cy="42%" r="58%">
        <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.45" />
        <stop offset="70%" stopColor="#00C2FF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
      </radialGradient>
      <pattern
        id={`${uid}-grid`}
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M20 0H0V20"
          fill="none"
          stroke="rgba(0,194,255,0.07)"
          strokeWidth="0.6"
        />
      </pattern>
      <filter id={`${uid}-shadow`} x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="12"
          floodColor="#00C2FF"
          floodOpacity="0.22"
        />
      </filter>
      <filter id={`${uid}-glow-soft`}>
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function ArtBackdrop({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <>
      <rect width="400" height="220" fill={g("grid")} />
      <ellipse cx="200" cy="108" rx="165" ry="95" fill={g("glow")} />
    </>
  );
}

export function AiAutomationArt({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <svg viewBox="0 0 400 220" className="svc-art" aria-hidden>
      {createDefs(uid)}
      <ArtBackdrop uid={uid} />
      <g filter={`url(#${uid}-shadow)`}>
        <rect
          x="108"
          y="48"
          width="184"
          height="118"
          rx="14"
          fill="#080c12"
          stroke={g("grad-a")}
          strokeWidth="1.5"
        />
        <rect x="120" y="60" width="160" height="88" rx="8" fill={g("screen")} />
        <circle cx="200" cy="104" r="28" fill="none" stroke={g("grad-a")} strokeWidth="1.2" opacity="0.5" />
        <circle cx="200" cy="104" r="14" fill={g("grad-b")} stroke="#4DEBFF" strokeWidth="1" />
        <path
          d="M200 90v28M186 104h28"
          stroke="#4DEBFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <rect x="132" y="72" width="36" height="22" rx="4" fill="rgba(0,194,255,0.12)" stroke="rgba(77,235,255,0.4)" />
        <path d="M142 83h16M142 88h10" stroke="#4DEBFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <rect x="232" y="72" width="36" height="22" rx="4" fill="rgba(0,194,255,0.12)" stroke="rgba(77,235,255,0.4)" />
        <path d="M242 83h16M242 88h10" stroke="#4DEBFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <rect x="148" y="128" width="104" height="12" rx="3" fill="rgba(0,194,255,0.18)" />
        <rect className="svc-art__pulse" x="148" y="128" width="58" height="12" rx="3" fill={g("grad-a")} opacity="0.55" />
      </g>
      <circle cx="62" cy="88" r="20" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.5" />
      <circle cx="62" cy="88" r="8" fill="#4DEBFF" filter={`url(#${uid}-glow-soft)`} />
      <circle cx="338" cy="88" r="20" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.5" />
      <path d="M330 88h16M338 80v16" stroke="#4DEBFF" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M82 88h18M300 88h18M128 48l-22-28M272 48l22-28M62 108v32M338 108v32"
        stroke={g("grad-a")}
        strokeWidth="1.4"
        strokeDasharray="6 5"
        opacity="0.55"
        fill="none"
      />
      <rect x="44" y="36" width="52" height="34" rx="8" fill="#060a10" stroke="rgba(0,194,255,0.35)" />
      <path d="M54 48h32M54 56h20" stroke="#4DEBFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <rect x="304" y="148" width="72" height="38" rx="8" fill="#0a1018" stroke="rgba(0,194,255,0.35)" />
      <text x="316" y="168" fill="#4DEBFF" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
        ML ROUTE
      </text>
      <text x="316" y="178" fill="#6b8a9a" fontSize="6" fontFamily="system-ui,sans-serif">
        Live automation
      </text>
    </svg>
  );
}

export function AdsManagementArt({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <svg viewBox="0 0 400 220" className="svc-art" aria-hidden>
      {createDefs(uid)}
      <ArtBackdrop uid={uid} />
      <g filter={`url(#${uid}-shadow)`}>
        <rect
          x="72"
          y="44"
          width="256"
          height="132"
          rx="16"
          fill="#070b10"
          stroke={g("grad-a")}
          strokeWidth="1.5"
        />
        <path d="M72 72h256" stroke="rgba(0,194,255,0.18)" />
        <circle cx="92" cy="58" r="3" fill="#4DEBFF" opacity="0.8" />
        <text x="104" y="62" fill="#7a8f9f" fontSize="7" fontFamily="system-ui,sans-serif">
          Performance hub
        </text>
        <rect x="92" y="86" width="32" height="76" rx="6" fill={g("grad-b")} stroke="#00C2FF" strokeWidth="1" />
        <rect x="132" y="102" width="32" height="60" rx="6" fill={g("grad-b")} stroke="#00C2FF" strokeWidth="1" />
        <rect x="172" y="78" width="32" height="84" rx="6" fill={g("grad-a")} opacity="0.5" stroke="#4DEBFF" strokeWidth="1.2" />
        <rect x="212" y="94" width="32" height="68" rx="6" fill={g("grad-b")} stroke="#00C2FF" strokeWidth="1" />
        <rect x="252" y="108" width="32" height="54" rx="6" fill={g("grad-b")} stroke="#00C2FF" strokeWidth="1" />
        <rect x="292" y="98" width="24" height="64" rx="6" fill="rgba(0,194,255,0.08)" stroke="rgba(77,235,255,0.35)" />
        <path
          d="M92 86 L128 62 168 78 208 58 248 72 288 64"
          stroke="#4DEBFF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="288" cy="64" r="5" fill="#4DEBFF" filter={`url(#${uid}-glow-soft)`} />
      </g>
      <g transform="translate(302 38)">
        <circle r="32" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.5" />
        <circle r="18" fill="none" stroke="#00C2FF" strokeWidth="1.5" opacity="0.7" />
        <circle r="6" fill="#4DEBFF" />
        <path d="M-22 0h44M0-22v44" stroke="#00C2FF" strokeWidth="1" opacity="0.3" />
      </g>
      <rect x="48" y="142" width="80" height="42" rx="10" fill="#0a1018" stroke="rgba(0,194,255,0.4)" />
      <text x="60" y="162" fill="#4DEBFF" fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
        4.8×
      </text>
      <text x="60" y="174" fill="#6b8a9a" fontSize="6" fontFamily="system-ui,sans-serif">
        ROAS · Attribution
      </text>
      <path d="M48 128l24-14 24 8 20-12" stroke="#4DEBFF" strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  );
}

export function GraphicDesignArt({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <svg viewBox="0 0 400 220" className="svc-art" aria-hidden>
      {createDefs(uid)}
      <ArtBackdrop uid={uid} />
      <g filter={`url(#${uid}-shadow)`}>
        <rect
          x="108"
          y="42"
          width="108"
          height="108"
          rx="12"
          fill="#121820"
          stroke="rgba(77,235,255,0.35)"
          strokeWidth="1.2"
          transform="rotate(-10 162 96)"
        />
        <rect
          x="132"
          y="36"
          width="116"
          height="116"
          rx="12"
          fill="#060a10"
          stroke={g("grad-a")}
          strokeWidth="1.5"
          transform="rotate(6 190 94)"
        />
        <circle cx="168" cy="72" r="22" fill={g("grad-a")} opacity="0.35" />
        <path
          d="M198 88 L238 48 L254 64 L214 104 Z"
          fill="#101820"
          stroke="#00C2FF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M248 52l14 14M238 62l24 24"
          stroke="#4DEBFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M148 118 Q200 96 252 122"
          stroke="#4DEBFF"
          strokeWidth="2.2"
          fill="none"
          opacity="0.75"
        />
        <circle cx="148" cy="118" r="5" fill="#4DEBFF" />
        <circle cx="252" cy="122" r="5" fill="#00C2FF" />
        <rect x="156" y="108" width="88" height="6" rx="2" fill="rgba(77,235,255,0.25)" />
      </g>
      <rect x="52" y="124" width="72" height="48" rx="10" fill="#0a1018" stroke="rgba(0,194,255,0.35)" />
      <text x="62" y="140" fill="#6b8a9a" fontSize="6" fontFamily="system-ui,sans-serif">
        Palette
      </text>
      <circle cx="72" cy="156" r="10" fill="#00C2FF" />
      <circle cx="96" cy="156" r="10" fill="#4DEBFF" />
      <circle cx="120" cy="156" r="10" fill="#f5f5f5" opacity="0.5" />
      <rect x="262" y="112" width="96" height="64" rx="10" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1" opacity="0.9" />
      <path d="M278 132h64M278 148h48M278 162h56" stroke="#4DEBFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M278 118h20l8-12 8 12h20" stroke="#4DEBFF" strokeWidth="1.2" fill="none" opacity="0.5" />
    </svg>
  );
}

export function VideoEditingArt({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <svg viewBox="0 0 400 220" className="svc-art" aria-hidden>
      {createDefs(uid)}
      <ArtBackdrop uid={uid} />
      <g filter={`url(#${uid}-shadow)`}>
        <rect
          x="64"
          y="40"
          width="272"
          height="128"
          rx="14"
          fill="#05080c"
          stroke={g("grad-a")}
          strokeWidth="1.5"
        />
        <rect x="78" y="54" width="244" height="96" rx="6" fill={g("screen")} />
        <path d="M168 78l56 34-56 34z" fill={g("grad-a")} opacity="0.95" />
        <path d="M168 78v68" stroke="#4DEBFF" strokeWidth="1.2" opacity="0.35" />
        <rect x="28" y="62" width="32" height="84" rx="5" fill="#0a1018" stroke="#00C2FF" strokeWidth="1.2" />
        <rect x="340" y="62" width="32" height="84" rx="5" fill="#0a1018" stroke="#00C2FF" strokeWidth="1.2" />
        <path d="M36 72v12M36 92v12M36 112v12" stroke="#4DEBFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <path d="M348 72v12M348 92v12M348 112v12" stroke="#4DEBFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <text x="38" y="108" fill="#4DEBFF" fontSize="6" fontFamily="monospace" opacity="0.55" transform="rotate(-90 42 108)">
          TIMELINE
        </text>
      </g>
      <rect x="78" y="178" width="244" height="16" rx="8" fill="#101820" stroke="rgba(0,194,255,0.3)" />
      <rect className="svc-art__pulse" x="78" y="178" width="108" height="16" rx="8" fill={g("grad-a")} opacity="0.6" />
      <circle cx="94" cy="186" r="7" fill="#4DEBFF" stroke="#0a0a0a" strokeWidth="2" />
      <path
        d="M108 182v8M118 179v14M128 183v6M138 180v12M148 184v5M158 181v10"
        stroke="#4DEBFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="328" cy="44" r="22" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.3" />
      <path d="M318 44a10 10 0 0 1 20 0" stroke="#4DEBFF" strokeWidth="2" fill="none" />
      <rect x="48" y="148" width="56" height="32" rx="8" fill="#0a1018" stroke="rgba(0,194,255,0.35)" />
      <text x="58" y="168" fill="#4DEBFF" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
        4K · HDR
      </text>
    </svg>
  );
}

export function ContentProductionArt({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <svg viewBox="0 0 400 220" className="svc-art" aria-hidden>
      {createDefs(uid)}
      <ArtBackdrop uid={uid} />
      {/* Studio floor */}
      <ellipse cx="200" cy="178" rx="120" ry="14" fill="rgba(0,194,255,0.08)" />
      {/* Left softbox */}
      <g transform="translate(48 52)">
        <path d="M0 88 L28 0 L56 88 Z" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.2" opacity="0.9" />
        <path d="M8 72 L28 18 L48 72 Z" fill={g("grad-b")} opacity="0.45" />
        <rect x="22" y="88" width="12" height="36" rx="2" fill="#141c22" stroke="rgba(0,194,255,0.35)" />
        <path d="M28 124v18" stroke="#4DEBFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="28" cy="18" rx="14" ry="6" fill="rgba(77,235,255,0.35)" />
      </g>
      {/* Right softbox */}
      <g transform="translate(296 52)">
        <path d="M0 88 L28 0 L56 88 Z" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.2" opacity="0.9" />
        <path d="M8 72 L28 18 L48 72 Z" fill={g("grad-b")} opacity="0.45" />
        <rect x="22" y="88" width="12" height="36" rx="2" fill="#141c22" stroke="rgba(0,194,255,0.35)" />
        <path d="M28 124v18" stroke="#4DEBFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="28" cy="18" rx="14" ry="6" fill="rgba(77,235,255,0.35)" />
      </g>
      <g filter={`url(#${uid}-shadow)`}>
        {/* Product pedestal + hero product */}
        <rect x="168" y="148" width="64" height="10" rx="3" fill="#141c22" stroke="rgba(0,194,255,0.3)" />
        <rect x="176" y="138" width="48" height="10" rx="2" fill="#1a2430" stroke="rgba(77,235,255,0.25)" />
        <rect x="184" y="108" width="32" height="30" rx="6" fill={g("grad-b")} stroke={g("grad-a")} strokeWidth="1.5" />
        <path d="M192 108 L200 96 L208 108" fill="rgba(77,235,255,0.25)" stroke="#4DEBFF" strokeWidth="1" />
        <rect x="190" y="118" width="20" height="4" rx="1" fill="rgba(0,194,255,0.35)" />
        {/* Photo camera on tripod (left) */}
        <path d="M108 168 L108 128 L112 124" stroke="#4DEBFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <circle cx="108" cy="172" r="6" fill="#101820" stroke="#00C2FF" strokeWidth="1.2" />
        <rect x="88" y="108" width="40" height="28" rx="6" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.5" />
        <rect x="96" y="100" width="24" height="12" rx="4" fill="#141c26" stroke="rgba(0,194,255,0.4)" />
        <circle cx="108" cy="122" r="10" fill="#060a10" stroke="#4DEBFF" strokeWidth="1.5" />
        <circle cx="108" cy="122" r="5" fill={g("grad-a")} opacity="0.5" />
        <rect x="118" y="114" width="6" height="4" rx="1" fill="#4DEBFF" opacity="0.7" />
        {/* Video camera on tripod (right) */}
        <path d="M292 168 L292 126 L288 122" stroke="#4DEBFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <circle cx="292" cy="172" r="6" fill="#101820" stroke="#00C2FF" strokeWidth="1.2" />
        <rect x="268" y="106" width="48" height="32" rx="6" fill="#0a1018" stroke={g("grad-a")} strokeWidth="1.5" />
        <rect x="304" y="114" width="18" height="16" rx="3" fill="#141c26" stroke="rgba(0,194,255,0.45)" />
        <circle cx="284" cy="122" r="9" fill="#060a10" stroke="#4DEBFF" strokeWidth="1.5" />
        <circle cx="284" cy="122" r="4" fill="#4DEBFF" opacity="0.6" />
        <rect className="svc-art__pulse" x="274" y="98" width="22" height="8" rx="3" fill="#ff3b30" opacity="0.85" />
        <text x="278" y="105" fill="#fff" fontSize="5" fontWeight="700" fontFamily="system-ui,sans-serif">
          REC
        </text>
        {/* Viewfinder / monitor */}
        <rect x="148" y="56" width="104" height="44" rx="8" fill="#060a10" stroke={g("grad-a")} strokeWidth="1.3" />
        <rect x="156" y="64" width="88" height="28" rx="4" fill={g("screen")} />
        <rect x="164" y="70" width="28" height="16" rx="3" fill={g("grad-b")} opacity="0.5" stroke="rgba(77,235,255,0.4)" />
        <circle cx="218" cy="78" r="8" fill="none" stroke="#4DEBFF" strokeWidth="1.2" opacity="0.6" />
        <path d="M214 78h8M218 74v8" stroke="#4DEBFF" strokeWidth="1" opacity="0.5" />
      </g>
      <rect x="52" y="152" width="72" height="38" rx="10" fill="#0a1018" stroke="rgba(0,194,255,0.38)" />
      <text x="62" y="170" fill="#4DEBFF" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
        Photo · Video
      </text>
      <text x="62" y="182" fill="#6b8a9a" fontSize="6" fontFamily="system-ui,sans-serif">
        Product shoots
      </text>
      <rect x="276" y="152" width="88" height="38" rx="10" fill="#0a1018" stroke="rgba(0,194,255,0.38)" />
      <text x="286" y="170" fill="#4DEBFF" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
        Studio grade
      </text>
      <text x="286" y="182" fill="#6b8a9a" fontSize="6" fontFamily="system-ui,sans-serif">
        Lighting & sets
      </text>
    </svg>
  );
}

export function WebDesignArt({ uid }) {
  const g = (n) => `url(#${uid}-${n})`;
  return (
    <svg viewBox="0 0 400 220" className="svc-art" aria-hidden>
      {createDefs(uid)}
      <ArtBackdrop uid={uid} />
      <g filter={`url(#${uid}-shadow)`}>
        <rect
          x="80"
          y="32"
          width="240"
          height="140"
          rx="16"
          fill="#05080c"
          stroke={g("grad-a")}
          strokeWidth="1.5"
        />
        <path d="M80 60h240" stroke="rgba(0,194,255,0.2)" />
        <circle cx="100" cy="46" r="4.5" fill="#ff5f57" />
        <circle cx="116" cy="46" r="4.5" fill="#febc2e" />
        <circle cx="132" cy="46" r="4.5" fill="#28c840" />
        <rect x="96" y="72" width="80" height="12" rx="4" fill={g("grad-b")} />
        <rect x="96" y="92" width="200" height="7" rx="2" fill="#1a2430" />
        <rect x="96" y="106" width="148" height="7" rx="2" fill="#1a2430" />
        <rect
          x="96"
          y="122"
          width="200"
          height="38"
          rx="8"
          fill={g("grad-b")}
          stroke="rgba(0,194,255,0.4)"
          opacity="0.55"
        />
        <rect x="108" y="132" width="56" height="18" rx="4" fill="rgba(0,194,255,0.25)" />
        <rect x="172" y="132" width="108" height="6" rx="2" fill="rgba(77,235,255,0.2)" />
        <rect x="172" y="144" width="72" height="6" rx="2" fill="rgba(77,235,255,0.15)" />
      </g>
      <rect x="296" y="118" width="56" height="96" rx="12" fill="#0a1018" stroke="#4DEBFF" strokeWidth="1.3" />
      <rect x="308" y="132" width="32" height="6" rx="2" fill="#4DEBFF" opacity="0.45" />
      <rect x="308" y="144" width="32" height="54" rx="6" fill={g("grad-b")} opacity="0.55" />
      <circle cx="324" cy="156" r="8" fill="none" stroke="#4DEBFF" strokeWidth="1.2" />
      <rect x="44" y="118" width="58" height="44" rx="10" fill="#0a1018" stroke="rgba(0,194,255,0.4)" />
      <text x="54" y="140" fill="#4DEBFF" fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        98
      </text>
      <text x="54" y="152" fill="#6b8a9a" fontSize="6" fontFamily="system-ui,sans-serif">
        Lighthouse CWV
      </text>
      <path d="M60 100l20-14 20 14" stroke="#00C2FF" strokeWidth="1.6" fill="none" opacity="0.5" />
      <rect
        className="svc-art__pulse"
        x="96"
        y="72"
        width="48"
        height="12"
        rx="4"
        fill={g("grad-a")}
        opacity="0.35"
      />
    </svg>
  );
}
