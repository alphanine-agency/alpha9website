export const PLAYER_STEPS = [
  {
    id: "name",
    ask: "Happy to help you book. What’s your name?",
    type: "text",
    parse: (t) => t.replace(/[^a-zA-Z\s.'-]/g, "").trim().slice(0, 60) || null,
    invalid: "Please share your name.",
  },
  {
    id: "phone",
    ask: "What’s your WhatsApp / mobile number for the booking confirmation?",
    type: "text",
    parse: (t) => {
      const digits = t.replace(/\D/g, "");
      return digits.length >= 10 ? digits.slice(-11) : null;
    },
    invalid: "Please share a valid mobile number (at least 10 digits).",
  },
  {
    id: "when",
    ask: "When would you like to play?",
    type: "choice",
    options: [
      { value: "today", label: "Today" },
      { value: "tomorrow", label: "Tomorrow" },
      { value: "this_weekend", label: "This weekend" },
      { value: "next_week", label: "Next week" },
    ],
  },
  {
    id: "time",
    ask: "Which time slot works best?",
    type: "choice",
    options: [
      { value: "6_00_pm", label: "6:00 PM" },
      { value: "7_00_pm", label: "7:00 PM" },
      { value: "8_00_pm", label: "8:00 PM" },
      { value: "9_00_pm", label: "9:00 PM" },
    ],
  },
  {
    id: "court",
    ask: "Which court do you prefer?",
    type: "choice",
    options: [
      { value: "01", label: "Court 01" },
      { value: "02", label: "Court 02" },
      { value: "03", label: "Court 03" },
      { value: "04", label: "Court 04" },
    ],
  },
  {
    id: "players",
    ask: "How many players will join?",
    type: "choice",
    options: [
      { value: "1", label: "1 player" },
      { value: "2", label: "2 players" },
      { value: "3", label: "3 players" },
      { value: "4", label: "4 players" },
    ],
  },
  {
    id: "session_type",
    ask: "What kind of session is this?",
    type: "choice",
    options: [
      { value: "casual", label: "Casual play" },
      { value: "match", label: "Friendly match" },
      { value: "lesson", label: "Lesson" },
      { value: "coaching", label: "Coaching" },
    ],
  },
];

export const EVENT_STEPS = [
  {
    id: "name",
    ask: "Great — I can help with partnerships. What’s your name?",
    type: "text",
    parse: (t) => t.replace(/[^a-zA-Z\s.'-]/g, "").trim().slice(0, 60) || null,
    invalid: "Please share your name.",
  },
  {
    id: "brand",
    ask: "What’s the brand / company name?",
    type: "text",
    parse: (t) => t.trim().slice(0, 80) || null,
    invalid: "Please share the brand or company name.",
  },
  {
    id: "phone",
    ask: "Best WhatsApp / mobile number for our events team?",
    type: "text",
    parse: (t) => {
      const digits = t.replace(/\D/g, "");
      return digits.length >= 10 ? digits.slice(-11) : null;
    },
    invalid: "Please share a valid mobile number (at least 10 digits).",
  },
  {
    id: "event_type",
    ask: "Which opportunity are you interested in?",
    type: "choice",
    options: [
      { value: "americano", label: "Americano" },
      { value: "grand_slam", label: "Winter Grand Slam" },
      { value: "private_event", label: "Private event" },
      { value: "content_collab", label: "Content collab" },
    ],
  },
  {
    id: "budget",
    ask: "What’s your rough sponsorship budget?",
    type: "choice",
    options: [
      { value: "under_100k", label: "Under 100k" },
      { value: "100k_300k", label: "100k – 300k" },
      { value: "300k_500k", label: "300k – 500k" },
      { value: "500k_plus", label: "500k+" },
    ],
  },
  {
    id: "goals",
    ask: "What matters most for your brand?",
    type: "choice",
    options: [
      { value: "court_branding", label: "Court branding" },
      { value: "social_coverage", label: "Social coverage" },
      { value: "title_sponsor", label: "Title sponsor" },
      { value: "hospitality", label: "Hospitality / guests" },
    ],
  },
  {
    id: "timeline",
    ask: "When do you want to activate?",
    type: "choice",
    options: [
      { value: "this_month", label: "This month" },
      { value: "1_3_months", label: "In 1–3 months" },
      { value: "3_6_months", label: "In 3–6 months" },
      { value: "just_exploring", label: "Just exploring" },
    ],
  },
  {
    id: "decision_role",
    ask: "What’s your role in the decision?",
    type: "choice",
    options: [
      { value: "owner", label: "Owner" },
      { value: "marketing_lead", label: "Marketing lead" },
      { value: "agency", label: "Agency" },
      { value: "just_exploring", label: "Just exploring" },
    ],
  },
];

function labelFor(steps, id, value) {
  const step = steps.find((s) => s.id === id);
  const opt = step?.options?.find((o) => o.value === value);
  return opt?.label || value || "—";
}

export function matchPadelChoice(text, options) {
  const q = text.toLowerCase().trim();
  for (const opt of options) {
    if (q === opt.value || q === opt.label.toLowerCase()) return opt.value;
    if (q.replace(/\s+/g, "") === opt.label.toLowerCase().replace(/\s+/g, "")) return opt.value;
    if (q.includes(opt.label.toLowerCase())) return opt.value;
  }
  // court shortcuts
  if (options.some((o) => o.value === "01") && /court\s*1\b|0?1\b/.test(q)) return "01";
  if (options.some((o) => o.value === "02") && /court\s*2\b|0?2\b/.test(q)) return "02";
  if (options.some((o) => o.value === "03") && /court\s*3\b|0?3\b/.test(q)) return "03";
  if (options.some((o) => o.value === "04") && /court\s*4\b|0?4\b/.test(q)) return "04";
  // time shortcuts
  if (options.some((o) => o.value.includes("6_00")) && /6(:00)?\s*pm/.test(q)) return "6_00_pm";
  if (options.some((o) => o.value.includes("7_00")) && /7(:00)?\s*pm/.test(q)) return "7_00_pm";
  if (options.some((o) => o.value.includes("8_00")) && /8(:00)?\s*pm/.test(q)) return "8_00_pm";
  if (options.some((o) => o.value.includes("9_00")) && /9(:00)?\s*pm/.test(q)) return "9_00_pm";
  for (const opt of options) {
    const tokens = opt.label.toLowerCase().split(/[^a-z0-9+]+/).filter((t) => t.length > 2);
    if (tokens.length && tokens.every((t) => q.includes(t))) return opt.value;
  }
  return null;
}

export function detectPadelFlow(text) {
  const q = text.toLowerCase();
  if (/sponsor|sponsorship|event|collab|brand|tournament|grand slam|americano|partner/.test(q)) {
    return "event";
  }
  if (/book|court|play|slot|time|available|tomorrow|evening|padel|game|session/.test(q)) {
    return "player";
  }
  return null;
}

export function startPlayerMessage() {
  return "Perfect — I can book a court at Padel Chase Inn. I’ll ask a few quick details, then confirm your session.";
}

export function startEventMessage() {
  return "Great — I can help with sponsorships and brand collaborations. I’ll ask a few short questions, then connect you with our events team.";
}

export function scorePlayer(answers) {
  let score = 45;
  if (answers.phone && answers.name) score += 10;
  if (answers.when === "today" || answers.when === "tomorrow") score += 14;
  else if (answers.when === "this_weekend") score += 10;
  else score += 4;

  if (answers.time === "9_00_pm") score -= 25; // typically full
  else if (answers.time) score += 8;

  if (answers.court === "03") score -= 20; // typically full
  else if (answers.court) score += 8;

  if (answers.players === "4" || answers.players === "2") score += 8;
  else if (answers.players) score += 4;

  if (["match", "lesson", "coaching"].includes(answers.session_type)) score += 8;
  else if (answers.session_type === "casual") score += 5;

  score = Math.max(0, Math.min(99, score));
  const bookable = answers.time !== "9_00_pm" && answers.court !== "03" && score >= 60;
  return { score, serious: bookable };
}

export function scoreEvent(answers) {
  let score = 40;
  if (answers.budget === "500k_plus") score += 22;
  else if (answers.budget === "300k_500k") score += 16;
  else if (answers.budget === "100k_300k") score += 10;
  else if (answers.budget === "under_100k") score += 4;

  if (answers.goals === "title_sponsor") score += 14;
  else if (answers.goals === "court_branding") score += 10;
  else if (answers.goals) score += 6;

  if (answers.event_type === "grand_slam") score += 10;
  else if (answers.event_type === "americano") score += 8;
  else if (answers.event_type) score += 5;

  if (answers.timeline === "this_month") score += 12;
  else if (answers.timeline === "1_3_months") score += 8;
  else if (answers.timeline === "just_exploring") score -= 16;

  if (["owner", "marketing_lead"].includes(answers.decision_role)) score += 12;
  else if (answers.decision_role === "agency") score += 6;
  else if (answers.decision_role === "just_exploring") score -= 14;

  score = Math.max(0, Math.min(99, score));
  const serious =
    score >= 70 &&
    answers.timeline !== "just_exploring" &&
    answers.decision_role !== "just_exploring";
  return { score, serious };
}

const EVENTS_DESK = {
  name: "Events Lead — Hira Malik",
  region: "Padel Chase Inn · Partnerships",
};

const BOOKING_DESK = {
  name: "Booking Desk — Court Ops",
  region: "Padel Chase Inn · Islamabad",
};

export function completePlayer(answers) {
  const { score, serious } = scorePlayer(answers);
  const when = labelFor(PLAYER_STEPS, "when", answers.when);
  const time = labelFor(PLAYER_STEPS, "time", answers.time);
  const court = labelFor(PLAYER_STEPS, "court", answers.court);
  const rows = [
    ["Name", answers.name],
    ["Phone", answers.phone],
    ["When", when],
    ["Time", time],
    ["Court", court],
    ["Players", labelFor(PLAYER_STEPS, "players", answers.players)],
    ["Session", labelFor(PLAYER_STEPS, "session_type", answers.session_type)],
  ];

  if (answers.time === "9_00_pm" || answers.court === "03") {
    return {
      reply: `Thanks, ${answers.name}. That slot isn’t available right now — 9:00 PM and Court 03 are full. I can move you to 7:00 or 8:00 PM on Court 01, 02, or 04. Want me to restart the booking with an open slot?`,
      score,
      serious: false,
      rsm: BOOKING_DESK,
      kind: "player",
      title: "Slot unavailable · offer alternatives",
      subtitle: `${when} · ${time} · ${court}`,
      rows,
    };
  }

  return {
    reply: serious
      ? `You’re booked, ${answers.name}. ${court} on ${when} at ${time} is confirmed. I’ve sent WhatsApp confirmation to ${answers.phone} with the venue pin. See you at Padel Chase Inn — need rackets or guest add-ons?`
      : `Thanks, ${answers.name}. I’ve saved your preferred ${when} / ${time} request. Our booking desk will confirm on ${answers.phone} shortly.`,
    score,
    serious,
    rsm: BOOKING_DESK,
    kind: "player",
    title: serious ? "Booking confirmed · WhatsApp sent" : "Hold request · booking desk",
    subtitle: `${court} · ${when} · ${time}`,
    rows,
  };
}

export function completeEvent(answers) {
  const { score, serious } = scoreEvent(answers);
  const rows = [
    ["Contact", answers.name],
    ["Brand", answers.brand],
    ["Phone", answers.phone],
    ["Opportunity", labelFor(EVENT_STEPS, "event_type", answers.event_type)],
    ["Budget", labelFor(EVENT_STEPS, "budget", answers.budget)],
    ["Goal", labelFor(EVENT_STEPS, "goals", answers.goals)],
    ["Timeline", labelFor(EVENT_STEPS, "timeline", answers.timeline)],
    ["Role", labelFor(EVENT_STEPS, "decision_role", answers.decision_role)],
  ];

  return {
    reply: serious
      ? `Thank you, ${answers.name}. Our events team will contact you on ${answers.phone} about ${answers.brand} and the ${labelFor(
          EVENT_STEPS,
          "event_type",
          answers.event_type
        )} opportunity. You’re all set for now.`
      : `Thank you, ${answers.name}. We’ve logged ${answers.brand}’s interest. Our partnerships desk will follow up on ${answers.phone} when a strong fit opens.`,
    score,
    serious,
    rsm: EVENTS_DESK,
    kind: "event",
    title: serious ? "Serious partner · forward to events" : "Nurture · partnerships desk",
    subtitle: `${answers.brand || "Brand"} · ${labelFor(EVENT_STEPS, "event_type", answers.event_type)}`,
    rows,
  };
}
