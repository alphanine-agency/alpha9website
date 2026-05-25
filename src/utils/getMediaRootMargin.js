const IMAGE_MARGIN_DESKTOP = "280px 0px";
const IMAGE_MARGIN_MOBILE = "160px 0px";
const VIDEO_MARGIN_DESKTOP = "160px 0px";
const VIDEO_MARGIN_MOBILE = "100px 0px";

function getMediaRootMargin(isVideo = false) {
  if (typeof window === "undefined") {
    return isVideo ? VIDEO_MARGIN_DESKTOP : IMAGE_MARGIN_DESKTOP;
  }

  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  if (isVideo) {
    return isMobile ? VIDEO_MARGIN_MOBILE : VIDEO_MARGIN_DESKTOP;
  }

  return isMobile ? IMAGE_MARGIN_MOBILE : IMAGE_MARGIN_DESKTOP;
}

export default getMediaRootMargin;
