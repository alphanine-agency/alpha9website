export const roadKingCaseStudy = {
  slug: "roadking",
  client: "Road King EV",
  industry: "Electric mobility · Pakistan",
  facebook: "https://www.facebook.com/RoadKingBikes",
  instagram: "https://www.instagram.com/roadking_evehicle/",
  tagline: "AI Automation Case Study",
  headline: "Turning Social Inquiries Into a Connected Sales Engine.",
  subheadline:
    "How Alpha Nine helped Road King connect customer acquisition, dealership lead generation and sales operations through an integrated marketing and lead management system.",
  result: {
    value: "PKR 2 Crore+",
    label: "Reported sales in the first month",
    note: "Publicly reported result from the overall collaboration — not attributed solely to AI automation.",
  },
  logo: `${process.env.PUBLIC_URL || ""}/case-studies/clients/roadking-ev-logo.png`,
  poster: `${process.env.PUBLIC_URL || ""}/case-studies/roadking-poster.jpg`,
  accent: "#39FF14",
  services: [
    "Meta Advertising & Lead Generation",
    "Customer Lead Management",
    "Dealership Acquisition Campaigns",
    "Product Photography",
    "Video Production",
    "Influencer Marketing",
    "Sales Team Coordination",
    "Website Management",
  ],
};

export const padelChaseCaseStudy = {
  slug: "padel-chase",
  client: "Padel Chase Inn",
  industry: "Premium sports · Lifestyle · Islamabad",
  instagram: "https://www.instagram.com/padelchase",
  tagline: "Sports Experience Automation",
  headline: "From Court Bookings to a Thriving Padel Community.",
  subheadline:
    "How Alpha Nine helped Padel Chase Inn grow through social marketing, Meta advertising, event promotions, influencer collaborations, tournament sponsorships, customer engagement and operational storytelling around their booking-first platform.",
  result: {
    value: "Booking-first growth",
    label: "Social → inquiry → court session journey",
    note: "Metrics such as player counts, booking growth and ROI are shown as illustrative placeholders unless client-verified.",
  },
  logo: `${process.env.PUBLIC_URL || ""}/case-studies/clients/padelchase-inn-logo-clear.png`,
  poster: `${process.env.PUBLIC_URL || ""}/case-studies/padelchase-inn-poster.jpg`,
  hero: `${process.env.PUBLIC_URL || ""}/case-studies/padel-court.jpg`,
  accent: "#FF6B00",
  servicesDelivered: [
    "Social media marketing",
    "Meta advertising",
    "Event & tournament promotions",
    "Influencer collaborations",
    "Sponsorship visibility campaigns",
    "Customer engagement content",
    "Professional photography & reels",
  ],
  proposedConcepts: [
    "Deeper booking-automation orchestration",
    "Live scoreboard integrations",
    "Advanced sponsorship analytics dashboards",
  ],
};

export const automationCaseStudies = [roadKingCaseStudy, padelChaseCaseStudy];

export const portfolioFilters = [
  { id: "all", label: "All work" },
  { id: "ugc", label: "UGC" },
  { id: "ai", label: "AI Content" },
  { id: "ai-automation", label: "AI Automation" },
];
