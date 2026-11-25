export const roadKingCaseStudy = {
  slug: "roadking",
  client: "Road King EV",
  industry: "Electric mobility · Pakistan",
  facebook: "https://www.facebook.com/RoadKingBikes",
  instagram: "https://www.instagram.com/roadking_evehicle/",
  tagline: "AI Automation",
  headline: "Turning Social Inquiries Into a Connected Sales Engine.",
  subheadline:
    "How Alpha Nine helped Road King connect customer acquisition, dealership lead generation and sales operations through an integrated marketing and lead management system.",
  demoPitch:
    "Chat through a full customer or dealership qualification. Serious leads are scored and forwarded to the city RSM.",
  result: {
    value: "PKR 2 Crore+",
    label: "Reported sales in the first month",
    note: "Publicly reported result from the overall collaboration — not attributed solely to AI automation.",
  },
  logo: `${process.env.PUBLIC_URL || ""}/case-studies/clients/roadking-ev-logo.png`,
  poster: `${process.env.PUBLIC_URL || ""}/case-studies/roadking-poster.jpg`,
  accent: "#39FF14",
  theme: "roadking",
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
  demoSteps: [
    {
      id: "rk-inbox",
      screen: "inbox",
      title: "Lead arrives",
      tip: "A new Meta inquiry lands in the automation inbox — no manual copy-paste.",
      actionLabel: "Open lead",
    },
    {
      id: "rk-qualify",
      screen: "qualify",
      title: "AI qualifies",
      tip: "The system scores intent, city, and product interest in seconds.",
      actionLabel: "See score",
    },
    {
      id: "rk-route",
      screen: "route",
      title: "Smart routing",
      tip: "High-intent leads go to sales; dealer opportunities branch separately.",
      actionLabel: "Route lead",
    },
    {
      id: "rk-followup",
      screen: "followup",
      title: "Auto follow-up",
      tip: "WhatsApp / call tasks fire automatically so the team never drops the thread.",
      actionLabel: "Send follow-up",
    },
    {
      id: "rk-done",
      screen: "done",
      title: "Opportunity tracked",
      tip: "Status updates live in one place — from first click to closed deal.",
      actionLabel: "Restart demo",
    },
  ],
};

export const padelChaseCaseStudy = {
  slug: "padel-chase",
  client: "Padel Chase Inn",
  industry: "Premium sports · Lifestyle · Islamabad",
  instagram: "https://www.instagram.com/padelchase",
  tagline: "AI Automation",
  headline: "From Court Bookings to a Thriving Padel Community.",
  subheadline:
    "How Alpha Nine helped Padel Chase Inn grow through social marketing, Meta advertising, event promotions, influencer collaborations, tournament sponsorships, customer engagement and operational storytelling around their booking-first platform.",
  demoPitch:
    "Chat through a full court booking or sponsorship qualification. Decisions appear on the live ops dashboard.",
  result: {
    value: "Booking-first growth",
    label: "Social → inquiry → court session journey",
    note: "Metrics such as player counts, booking growth and ROI are shown as illustrative placeholders unless client-verified.",
  },
  logo: `${process.env.PUBLIC_URL || ""}/case-studies/clients/padelchase-inn-logo-clear.png`,
  poster: `${process.env.PUBLIC_URL || ""}/case-studies/padelchase-inn-poster.jpg`,
  hero: `${process.env.PUBLIC_URL || ""}/case-studies/padel-court.jpg`,
  accent: "#FF6B00",
  theme: "padel",
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
  demoSteps: [
    {
      id: "pc-inquiry",
      screen: "inbox",
      title: "Inquiry in",
      tip: "A player messages from Instagram or Meta — captured into the booking system instantly.",
      actionLabel: "Open inquiry",
    },
    {
      id: "pc-classify",
      screen: "qualify",
      title: "AI classifies",
      tip: "Automation tags it as a court booking (not an event/sponsor) and pulls the right fields.",
      actionLabel: "Classify",
    },
    {
      id: "pc-slots",
      screen: "slots",
      title: "Live slots",
      tip: "Open courts and times appear so the guest can book without back-and-forth.",
      actionLabel: "Pick slot",
    },
    {
      id: "pc-confirm",
      screen: "confirm",
      title: "Confirm booking",
      tip: "One tap locks Court 02 — the venue board updates in real time.",
      actionLabel: "Confirm",
    },
    {
      id: "pc-done",
      screen: "done",
      title: "Notified",
      tip: "WhatsApp confirmation goes out automatically. Demand is amplified into the booking engine.",
      actionLabel: "Restart demo",
    },
  ],
};

export const automationCaseStudies = [roadKingCaseStudy, padelChaseCaseStudy];

export const portfolioFilters = [
  { id: "all", label: "All work" },
  { id: "ugc", label: "UGC" },
  { id: "ai", label: "AI Content" },
  { id: "ai-automation", label: "AI Automation" },
];
