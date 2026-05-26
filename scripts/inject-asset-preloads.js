/**
 * Post-build HTML tweaks:
 * - Preload main JS (deduped paths)
 * - Defer main.css so it does not block first paint (media=print onload)
 */
const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const manifestPath = path.join(buildDir, "asset-manifest.json");
const indexPath = path.join(buildDir, "index.html");

if (!fs.existsSync(manifestPath) || !fs.existsSync(indexPath)) {
  console.warn("inject-asset-preloads: skipped (build or manifest missing)");
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const files = manifest.files || {};
const entrypoints = manifest.entrypoints || [];

function normalizeHref(href) {
  if (!href || href.startsWith("http")) return href;
  return href.startsWith("/") ? href : `/${href}`;
}

function deferMainStylesheet(html) {
  const patterns = [
    /<link\s+href="([^"]*\/static\/css\/main\.[^"]+\.css)"\s+rel="stylesheet"\s*\/?>/i,
    /<link\s+rel="stylesheet"\s+href="([^"]*\/static\/css\/main\.[^"]+\.css)"\s*\/?>/i,
  ];

  for (const re of patterns) {
    const match = html.match(re);
    if (!match) continue;

    const href = normalizeHref(match[1]);
    const asyncTag = `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all';this.onload=null;">`;
    const noscript = `<noscript><link rel="stylesheet" href="${href}"></noscript>`;
    return html.replace(match[0], `${asyncTag}${noscript}`);
  }

  return html;
}

const jsPreloads = new Set();

if (files["main.js"]) {
  jsPreloads.add(normalizeHref(files["main.js"]));
}

entrypoints.forEach((href) => {
  if (/\.js$/.test(href)) {
    jsPreloads.add(normalizeHref(href));
  }
});

const preloadTags = [...jsPreloads]
  .map(
    (href) =>
      `    <link rel="preload" href="${href}" as="script" crossorigin />`
  )
  .join("\n");

let html = fs.readFileSync(indexPath, "utf8");
html = deferMainStylesheet(html);

const marker = "<!-- asset-preloads -->";

if (html.includes(marker)) {
  html = html.replace(
    new RegExp(`${marker}[\\s\\S]*?<!-- /asset-preloads -->`),
    `${marker}\n${preloadTags}\n    <!-- /asset-preloads -->`
  );
} else {
  html = html.replace(
    "</title>",
    `</title>\n    ${marker}\n${preloadTags}\n    <!-- /asset-preloads -->`
  );
}

fs.writeFileSync(indexPath, html, "utf8");
console.log(
  `inject-asset-preloads: deferred main.css, ${jsPreloads.size} JS preload(s)`
);
