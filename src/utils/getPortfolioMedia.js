const mediaContext = require.context(
  "../assets/porfolio",
  false,
  /\.(jpg|jpeg|mp4)$/
);

const cache = new Map();

export function getPortfolioMedia(file) {
  if (!file) {
    return "";
  }

  if (cache.has(file)) {
    return cache.get(file);
  }

  const src = mediaContext(`./${file}`);
  cache.set(file, src);
  return src;
}

export default getPortfolioMedia;
