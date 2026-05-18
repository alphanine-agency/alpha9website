export const servicesList = [
  {
    id: "ai-automation",
    title: "AI Automation",
    tag: "Intelligence",
    wide: true,
    desc: "Orchestrate lead routing, creative variants, and reporting with models and rules that stay accountable to revenue.",
    highlights: ["Lead routing", "Creative variants", "Revenue reporting"],
  },
  {
    id: "ads-management",
    title: "Ads Management",
    tag: "Performance",
    desc: "Search, social, and programmatic managed with surgical audience design, testing cadence, and clean attribution narratives.",
    highlights: ["Audience design", "Test cadence", "Attribution"],
  },
  {
    id: "graphic-design",
    title: "Graphic Designing",
    tag: "Brand Visuals",
    desc: "Brand systems, campaign kits, and motion-ready layouts — monochrome discipline with moments of contrast.",
    highlights: ["Identity systems", "Campaign kits", "Motion-ready"],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    tag: "Post Production",
    wide: true,
    desc: "Short-form and hero edits with rhythm-first cuts, sound design, and platform-native pacing.",
    highlights: ["Short-form", "Sound design", "Platform pacing"],
  },
  {
    id: "content-production",
    title: "Content Production",
    tag: "Photo & Video",
    wide: true,
    desc: "Studio photography and video for product shoots, campaigns, and brand stories — lit, directed, and delivered ready for every channel.",
    highlights: ["Product shoots", "Photo & video", "Studio lighting"],
  },
  {
    id: "web-design",
    title: "Web Design",
    tag: "Performance UX",
    desc: "Marketing sites and product surfaces with semantic structure, accessible patterns, and performance budgets baked in.",
    highlights: ["Semantic HTML", "Accessibility", "Core Web Vitals"],
  },
];

/** Home capabilities: same services, slightly shorter copy where helpful */
export const homeServicesPreview = servicesList.map((service) => ({
  ...service,
  wide: false,
  desc:
    service.id === "ai-automation"
      ? "Smart workflows that compound."
      : service.id === "ads-management"
        ? "Paid media with clean attribution."
        : service.id === "graphic-design"
          ? "Brand visuals with restraint."
          : service.id === "video-editing"
            ? "Edits built for retention."
            : service.id === "content-production"
              ? "Photo & video for product shoots."
              : service.id === "web-design"
                ? "Fast, accessible interfaces."
                : service.desc,
}));
