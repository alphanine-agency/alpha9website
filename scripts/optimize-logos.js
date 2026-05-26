/**
 * Rebuild nav/footer WebP logos with transparency (removes visible black box).
 * Run: node scripts/optimize-logos.js
 */
const fs = require("fs");
const path = require("path");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("Run: npm install --save-dev sharp");
    process.exit(1);
  }

  const root = path.join(__dirname, "..");
  const publicDir = path.join(root, "public");
  const optimizedDir = path.join(root, "src", "assets", "optimized");

  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(optimizedDir, { recursive: true });

  const jobs = [
    {
      input: path.join(root, "src", "assets", "logo.png"),
      width: 80,
      height: 80,
      name: "logo-nav",
    },
    {
      input: path.join(root, "src", "assets", "logo2.png"),
      width: 112,
      height: 144,
      name: "logo-footer",
    },
  ];

  for (const job of jobs) {
    if (!fs.existsSync(job.input)) {
      console.warn(`skip ${job.name}: missing ${job.input}`);
      continue;
    }

    const pipeline = sharp(job.input)
      .rotate()
      .trim({ threshold: 12 })
      .resize(job.width, job.height, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 88, alphaQuality: 100, effort: 4 });

    const publicOut = path.join(publicDir, `${job.name}.webp`);
    const assetOut = path.join(optimizedDir, `${job.name}.webp`);

    await pipeline.toFile(publicOut);
    await fs.promises.copyFile(publicOut, assetOut);
    console.log(`wrote ${job.name}.webp (${job.width}x${job.height})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
