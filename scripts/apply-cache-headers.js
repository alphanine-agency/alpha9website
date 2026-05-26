/**
 * Ensures cache-control config files exist in build/ after every production build.
 * Fixes Lighthouse "Use efficient cache lifetimes" when the host reads these files.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");
const deployDir = path.join(root, "deploy");

const ROOT_FILES = [
  ".htaccess",
  "_headers",
  "web.config",
  "staticwebapp.config.json",
];

const STATIC_HTACCESS = `<IfModule mod_headers.c>
  Header set Cache-Control "public, max-age=31536000, immutable"
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 year"
</IfModule>
`;

function copyFile(name) {
  const source = path.join(deployDir, name);
  const target = path.join(buildDir, name);
  fs.copyFileSync(source, target);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeStaticHtaccess(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.writeFileSync(path.join(dir, ".htaccess"), STATIC_HTACCESS, "utf8");
}

if (!fs.existsSync(buildDir)) {
  console.error("apply-cache-headers: build/ not found. Run npm run build first.");
  process.exit(1);
}

ROOT_FILES.forEach(copyFile);

const staticRoot = path.join(buildDir, "static");
writeStaticHtaccess(staticRoot);
["js", "css", "media"].forEach((sub) => {
  writeStaticHtaccess(path.join(staticRoot, sub));
});

console.log("apply-cache-headers: cache config written to build/");
