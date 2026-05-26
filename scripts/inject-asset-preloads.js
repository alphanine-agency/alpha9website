/**
 * Injects preload links for main CSS/JS from CRA asset manifest (faster LCP, shorter critical chain).
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

const preloadHrefs = new Set();

if (files["main.css"]) {
  preloadHrefs.add(files["main.css"]);
}
if (files["main.js"]) {
  preloadHrefs.add(files["main.js"]);
}

entrypoints.forEach((href) => {
  if (/\.(css|js)$/.test(href)) {
    preloadHrefs.add(href);
  }
});

const preloadTags = [...preloadHrefs]
  .map((href) => {
    const as = href.endsWith(".css") ? "style" : "script";
    const cross = href.endsWith(".js") ? ' crossorigin' : "";
    return `    <link rel="preload" href="${href}" as="${as}"${cross} />`;
  })
  .join("\n");

let html = fs.readFileSync(indexPath, "utf8");
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
console.log(`inject-asset-preloads: added ${preloadHrefs.size} preload(s)`);
