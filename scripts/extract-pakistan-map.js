const fs = require("fs");
const path = require("path");

const srcPath =
  process.argv[2] ||
  "C:/Users/Zafran/.cursor/projects/e-amir-jibran-Monitoring-tasks-PER-alpha9/agent-tools/40f33cb1-6f55-4ea6-aae3-6dbd3c28a611.txt";
const outPath =
  process.argv[3] ||
  path.join(__dirname, "../src/pages/CaseStudies/pakistanMapPaths.js");

const src = fs.readFileSync(srcPath, "utf8");
const statesStart = src.indexOf("states:");
if (statesStart < 0) {
  console.error("states array not found");
  process.exit(1);
}

const statesBlock = src.slice(statesStart);
const states = [];
const objectRe = /\{\s*name:\s*"([^"]+)"\s*,\s*code:\s*"([^"]+)"\s*,\s*(?:path:\s*"([^"]+)"|paths:\s*\[([\s\S]*?)\])\s*,?\s*\}/g;

let match;
while ((match = objectRe.exec(statesBlock))) {
  const paths = [];
  if (match[3]) {
    paths.push(match[3]);
  } else {
    const dRe = /d:\s*"([^"]+)"/g;
    let dMatch;
    while ((dMatch = dRe.exec(match[4] || ""))) {
      paths.push(dMatch[1]);
    }
  }
  // Skip the country wrapper if it somehow matches
  if (match[2] === "PK" && match[1] === "Pakistan") continue;
  states.push({ name: match[1], code: match[2], paths });
}

if (!states.length) {
  console.error("No provinces parsed");
  process.exit(1);
}

const file = `/* Auto-extracted Pakistan province outlines (viewBox 0 0 1000 959). */
export const PAKISTAN_VIEWBOX = "0 0 1000 959";

export const PAKISTAN_PROVINCES = ${JSON.stringify(states, null, 2)};
`;

fs.writeFileSync(outPath, file);
console.log(`Wrote ${states.length} provinces to ${outPath}`);
states.forEach((s) =>
  console.log(`${s.code} ${s.name} paths=${s.paths.length} chars=${s.paths[0].length}`)
);
