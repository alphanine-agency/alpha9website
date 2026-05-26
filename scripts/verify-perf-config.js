/**
 * Fails the build if core Lighthouse optimizations were removed.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const checks = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function check(label, ok, file = "") {
  checks.push({ label, ok, file });
}

function requireMatch(rel, pattern, label) {
  check(label, pattern.test(read(rel)), rel);
}

requireMatch("package.json", /inject-asset-preloads\.js/, "build runs inject-asset-preloads");
requireMatch("package.json", /apply-cache-headers\.js/, "build runs apply-cache-headers");
requireMatch(
  "scripts/inject-asset-preloads.js",
  /deferMainStylesheet/,
  "main.css defer helper"
);
requireMatch("public/index.html", /id="lcp-shell"/, "LCP static shell");
requireMatch("public/index.html", /id="hero-heading"/, "LCP hero in shell");
requireMatch(
  "public/index.html",
  /logo-nav\.webp[\s\S]*fetchpriority="high"/,
  "nav logo preload"
);
requireMatch("public/index.html", /requestIdleCallback/, "deferred fonts");

const indexHtml = read("public/index.html");
check(
  "no 220vh on LCP shell",
  !/#lcp-shell[\s\S]{0,800}min-height:\s*220vh/.test(indexHtml),
  "public/index.html"
);

requireMatch("src/App.js", /import Home from/, "Home eager import");
requireMatch("src/App.js", /lazy\(\(\) => import\("\.\/pages\/Portfolio/, "routes code-split");
requireMatch("src/pages/Home/Home.css", /min-height:\s*220vh/, "home CLS min-height in CSS");
requireMatch(
  "src/styles/site-background.css",
  /background-color:\s*var\(--color-matte\)/,
  "site matte base"
);

const buildIndex = path.join(root, "build", "index.html");
if (fs.existsSync(buildIndex)) {
  const built = fs.readFileSync(buildIndex, "utf8");
  check(
    "built index defers main.css",
    /main\.[^"]+\.css"[^>]*media="print"/.test(built),
    "build/index.html"
  );
}

const failed = checks.filter((c) => !c.ok);
if (failed.length) {
  console.error("verify-perf-config: FAILED\n");
  failed.forEach((c) => console.error(`  - ${c.label} (${c.file})`));
  process.exit(1);
}

console.log(`verify-perf-config: OK (${checks.length} checks)`);
