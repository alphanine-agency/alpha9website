/**
 * Production static server for Railway (and other Node hosts).
 * Sets long-lived Cache-Control on hashed assets so Lighthouse passes cache audit.
 */
const express = require("express");
const path = require("path");

const app = express();
const buildDir = path.join(__dirname, "build");
const port = Number(process.env.PORT) || 3000;

const CACHE_IMMUTABLE = "public, max-age=31536000, immutable";
const CACHE_HTML = "public, max-age=0, must-revalidate";

const IMMUTABLE_EXT =
  /\.(js|css|webp|png|jpe?g|gif|svg|ico|woff2|woff|ttf|eot|map)$/i;

function setImmutableHeaders(res) {
  res.setHeader("Cache-Control", CACHE_IMMUTABLE);
}

app.use(
  "/static",
  express.static(path.join(buildDir, "static"), {
    immutable: true,
    maxAge: "1y",
    etag: true,
    setHeaders: setImmutableHeaders,
  })
);

app.use(
  express.static(buildDir, {
    etag: true,
    setHeaders: (res, filePath) => {
      if (IMMUTABLE_EXT.test(filePath)) {
        setImmutableHeaders(res);
      } else if (filePath.endsWith(`${path.sep}index.html`)) {
        res.setHeader("Cache-Control", CACHE_HTML);
      }
    },
  })
);

app.get("*", (req, res) => {
  res.setHeader("Cache-Control", CACHE_HTML);
  res.sendFile(path.join(buildDir, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Alpha Nine site listening on port ${port}`);
});
