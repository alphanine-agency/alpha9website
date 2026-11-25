export const RK_MODELS = [
  { value: "panther", label: "Panther" },
  { value: "muso", label: "Muso" },
  { value: "raptor", label: "Raptor" },
  { value: "ibra", label: "Ibra" },
  { value: "r99_pro", label: "R99 Pro" },
  { value: "gen_beta", label: "Gen Beta" },
  { value: "not_sure", label: "Not sure yet" },
];

export const DEALER_STEPS = [
  {
    id: "name",
    ask: "Great — I’ll help with the dealership process. What’s your full name?",
    type: "text",
    parse: (t) => t.replace(/[^a-zA-Z\s.'-]/g, "").trim().slice(0, 60) || null,
    invalid: "Please share your full name.",
  },
  {
    id: "phone",
    ask: "Thanks. What’s the best WhatsApp / mobile number to reach you?",
    type: "text",
    parse: (t) => {
      const digits = t.replace(/\D/g, "");
      return digits.length >= 10 ? digits.slice(-11) : null;
    },
    invalid: "Please share a valid mobile number (at least 10 digits).",
  },
  {
    id: "city",
    ask: "Which city are you applying from?",
    type: "text",
    parse: (t) => t.trim().slice(0, 40) || null,
    invalid: "Please share your city.",
  },
  {
    id: "investment_range",
    ask: "What’s your planned investment range for the dealership?",
    type: "choice",
    options: [
      { value: "35_lacs_50_lacs", label: "35 lacs – 50 lacs" },
      { value: "50_lacs_70_lacs", label: "50 lacs – 70 lacs" },
      { value: "70_lacs_1_crore", label: "70 lacs – 1 crore" },
    ],
  },
  {
    id: "funding_source",
    ask: "How do you plan to fund this investment?",
    type: "choice",
    options: [
      { value: "bank_finance", label: "Bank finance" },
      { value: "business_funds", label: "Business funds" },
      { value: "business_partner", label: "Business partner" },
      { value: "personal_funds", label: "Personal funds" },
      { value: "not_decided", label: "Not decided" },
    ],
  },
  {
    id: "dealership_location",
    ask: "Do you already have a dealership location?",
    type: "choice",
    options: [
      { value: "own_property", label: "Own property" },
      { value: "leased_property", label: "Leased property" },
      { value: "location_shortlisted", label: "Location shortlisted" },
      { value: "searching_for_a_location", label: "Searching for a location" },
      { value: "no_location_yet", label: "No location yet" },
    ],
  },
  {
    id: "business_experience",
    ask: "What’s your business background?",
    type: "choice",
    options: [
      { value: "automotive_business", label: "Automotive business" },
      { value: "retail_business", label: "Retail business" },
      { value: "other_business", label: "Other business" },
      { value: "first_business", label: "First business" },
    ],
  },
  {
    id: "when_can_you_start",
    ask: "When can you start if approved?",
    type: "choice",
    options: [
      { value: "immediately", label: "Immediately" },
      { value: "within_1_3_months", label: "Within 1–3 months" },
      { value: "within_3_6_months", label: "Within 3–6 months" },
      { value: "after_6_months", label: "After 6 months" },
    ],
  },
  {
    id: "decision_role",
    ask: "What’s your role in the decision?",
    type: "choice",
    options: [
      { value: "owner", label: "Owner" },
      { value: "final_decision_maker", label: "Final decision-maker" },
      { value: "partner", label: "Partner" },
      { value: "just_exploring", label: "Just exploring" },
    ],
  },
];

export const CUSTOMER_STEPS = [
  {
    id: "name",
    ask: "Happy to help. What’s your name?",
    type: "text",
    parse: (t) => t.replace(/[^a-zA-Z\s.'-]/g, "").trim().slice(0, 60) || null,
    invalid: "Please share your name.",
  },
  {
    id: "phone",
    ask: "What’s your WhatsApp / mobile number?",
    type: "text",
    parse: (t) => {
      const digits = t.replace(/\D/g, "");
      return digits.length >= 10 ? digits.slice(-11) : null;
    },
    invalid: "Please share a valid mobile number (at least 10 digits).",
  },
  {
    id: "city",
    ask: "Which city are you in?",
    type: "text",
    parse: (t) => t.trim().slice(0, 40) || null,
    invalid: "Please share your city.",
  },
  {
    id: "model",
    ask: "Which Road King model are you interested in?",
    type: "choice",
    options: RK_MODELS,
  },
  {
    id: "intent",
    ask: "What would you like to do next?",
    type: "choice",
    options: [
      { value: "test_ride", label: "Book a test ride" },
      { value: "get_price", label: "Get pricing" },
      { value: "buy_soon", label: "Buy soon" },
      { value: "just_exploring", label: "Just exploring" },
    ],
  },
  {
    id: "payment",
    ask: "How are you planning to pay?",
    type: "choice",
    options: [
      { value: "full_payment", label: "Full payment" },
      { value: "bank_finance", label: "Bank finance" },
      { value: "installments", label: "Installments" },
      { value: "not_decided", label: "Not decided" },
    ],
  },
  {
    id: "timeline",
    ask: "When are you looking to purchase / ride?",
    type: "choice",
    options: [
      { value: "this_week", label: "This week" },
      { value: "this_month", label: "This month" },
      { value: "1_3_months", label: "In 1–3 months" },
      { value: "just_checking", label: "Just checking" },
    ],
  },
];

const RSM_BY_CITY = [
  { match: /lahore|kasur|sheikhupura/, name: "RSM Lahore — Bilal Hassan", region: "Central Punjab" },
  { match: /karachi|hyderabad|sukkur/, name: "RSM Karachi — Ayesha Khan", region: "South" },
  { match: /islamabad|rawalpindi|wah|taxila/, name: "RSM Islamabad — Hamza Ali", region: "Capital" },
  { match: /faisalabad|jhang|sargodha/, name: "RSM Faisalabad — Usman Raza", region: "Punjab West" },
  { match: /multan|bahawalpur|rahim/, name: "RSM Multan — Sara Iqbal", region: "South Punjab" },
  { match: /peshawar|mardan|abbottabad/, name: "RSM Peshawar — Omar Shah", region: "KPK" },
  { match: /quetta/, name: "RSM Quetta — Nadia Baloch", region: "Balochistan" },
];

export function resolveRsm(city = "") {
  const c = city.toLowerCase();
  const hit = RSM_BY_CITY.find((r) => r.match.test(c));
  return hit || { name: "RSM Central Desk — Road King EV", region: "Nationwide" };
}

function labelFor(steps, id, value) {
  const step = steps.find((s) => s.id === id);
  const opt = step?.options?.find((o) => o.value === value);
  return opt?.label || value || "—";
}

export function scoreDealer(answers) {
  let score = 40;
  if (answers.investment_range === "70_lacs_1_crore") score += 20;
  else if (answers.investment_range === "50_lacs_70_lacs") score += 14;
  else if (answers.investment_range === "35_lacs_50_lacs") score += 8;

  if (["own_property", "leased_property"].includes(answers.dealership_location)) score += 16;
  else if (answers.dealership_location === "location_shortlisted") score += 10;
  else if (answers.dealership_location === "searching_for_a_location") score += 4;

  if (answers.funding_source && answers.funding_source !== "not_decided") score += 8;
  if (answers.business_experience === "automotive_business") score += 12;
  else if (answers.business_experience === "retail_business") score += 8;
  else if (answers.business_experience === "other_business") score += 4;

  if (answers.when_can_you_start === "immediately") score += 14;
  else if (answers.when_can_you_start === "within_1_3_months") score += 10;
  else if (answers.when_can_you_start === "within_3_6_months") score += 4;

  if (["owner", "final_decision_maker"].includes(answers.decision_role)) score += 12;
  else if (answers.decision_role === "partner") score += 6;
  else if (answers.decision_role === "just_exploring") score -= 18;

  score = Math.max(0, Math.min(99, score));
  const serious = score >= 70 && answers.decision_role !== "just_exploring";
  return { score, serious };
}

export function scoreCustomer(answers) {
  let score = 35;
  if (answers.model && answers.model !== "not_sure") score += 12;
  if (answers.intent === "buy_soon") score += 18;
  else if (answers.intent === "test_ride") score += 14;
  else if (answers.intent === "get_price") score += 10;
  else if (answers.intent === "just_exploring") score -= 12;

  if (answers.payment === "full_payment") score += 10;
  else if (answers.payment === "bank_finance" || answers.payment === "installments") score += 8;

  if (answers.timeline === "this_week") score += 16;
  else if (answers.timeline === "this_month") score += 12;
  else if (answers.timeline === "1_3_months") score += 6;
  else if (answers.timeline === "just_checking") score -= 10;

  if (answers.phone && answers.city && answers.name) score += 10;

  score = Math.max(0, Math.min(99, score));
  const serious =
    score >= 68 &&
    answers.intent !== "just_exploring" &&
    answers.timeline !== "just_checking";
  return { score, serious };
}

export function matchChoice(text, options) {
  const q = text.toLowerCase().trim();
  for (const opt of options) {
    if (q === opt.value || q === opt.label.toLowerCase()) return opt.value;
    const compact = opt.label.toLowerCase().replace(/\s+/g, "");
    if (q.replace(/\s+/g, "") === compact) return opt.value;
    if (q.includes(opt.label.toLowerCase())) return opt.value;
  }
  // fuzzy tokens
  for (const opt of options) {
    const tokens = opt.label.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2);
    if (tokens.length && tokens.every((t) => q.includes(t))) return opt.value;
  }
  // investment shortcuts
  if (/70|1\s*crore|crore/.test(q) && options.some((o) => o.value.includes("1_crore"))) {
    return options.find((o) => o.value.includes("1_crore")).value;
  }
  if (/50|70/.test(q) && options.some((o) => o.value.includes("50_lacs"))) {
    const mid = options.find((o) => o.value.includes("50_lacs_70"));
    if (mid && /50|70/.test(q)) return mid.value;
  }
  if (/35|50/.test(q) && options.some((o) => o.value.includes("35_lacs"))) {
    return options.find((o) => o.value.includes("35_lacs")).value;
  }
  // models
  for (const opt of options) {
    if (new RegExp(opt.label.replace(/\s+/g, "\\s*"), "i").test(q)) return opt.value;
  }
  return null;
}

export function detectRoadKingFlow(text) {
  const q = text.toLowerCase();
  if (/dealer|dealership|franchise|partner|showroom|distributor|invest/.test(q)) return "dealer";
  if (
    /test\s*ride|book\s*a\s*ride|buy|price|scooty|scooter|bike|ev\b|panther|muso|raptor|ibra|r99|gen\s*beta|customer/.test(
      q
    )
  ) {
    return "customer";
  }
  return null;
}

export function startDealerMessage() {
  return "Perfect — I can help with a Road King dealership application. I’ll ask a few short questions, then connect you with the right regional team for your city.";
}

export function startCustomerMessage() {
  return "Absolutely — I can help with Road King EV models, pricing, and test rides. I’ll ask a few quick questions so we can connect you with the right city team.";
}

export function completeDealer(answers) {
  const { score, serious } = scoreDealer(answers);
  const rsm = resolveRsm(answers.city);
  const rows = [
    ["Name", answers.name],
    ["Phone", answers.phone],
    ["City", answers.city],
    ["Investment", labelFor(DEALER_STEPS, "investment_range", answers.investment_range)],
    ["Funding", labelFor(DEALER_STEPS, "funding_source", answers.funding_source)],
    ["Location", labelFor(DEALER_STEPS, "dealership_location", answers.dealership_location)],
    ["Experience", labelFor(DEALER_STEPS, "business_experience", answers.business_experience)],
    ["Start", labelFor(DEALER_STEPS, "when_can_you_start", answers.when_can_you_start)],
    ["Role", labelFor(DEALER_STEPS, "decision_role", answers.decision_role)],
  ];

  return {
    // Customer-facing chat only — no scores / internal routing jargon
    reply: serious
      ? `Thank you, ${answers.name}. Our regional team for ${answers.city} will contact you shortly on ${answers.phone} about the dealership next steps. You’re all set for now — feel free to ask anything else.`
      : `Thank you, ${answers.name}. We’ve saved your dealership interest for ${answers.city}. Our partnerships team will follow up on ${answers.phone} when the timing is right. Anything else I can help with?`,
    score,
    serious,
    rsm,
    kind: "dealer",
    title: serious ? "Serious dealer · forward to RSM" : "Nurture · partnerships desk",
    subtitle: `${answers.city || "—"} · Dealership`,
    rows,
  };
}

export function completeCustomer(answers) {
  const { score, serious } = scoreCustomer(answers);
  const rsm = resolveRsm(answers.city);
  const model = labelFor(CUSTOMER_STEPS, "model", answers.model);
  const rows = [
    ["Name", answers.name],
    ["Phone", answers.phone],
    ["City", answers.city],
    ["Model", model],
    ["Intent", labelFor(CUSTOMER_STEPS, "intent", answers.intent)],
    ["Payment", labelFor(CUSTOMER_STEPS, "payment", answers.payment)],
    ["Timeline", labelFor(CUSTOMER_STEPS, "timeline", answers.timeline)],
  ];

  return {
    reply: serious
      ? `Thanks, ${answers.name}. A Road King specialist will reach you on ${answers.phone} about your ${model} interest in ${answers.city}${
          answers.intent === "test_ride" ? " and help schedule a test ride" : ""
        }. You’re all set — message me if you need anything else.`
      : `Thanks, ${answers.name}. I’ve noted your interest in the ${model}. Our ${answers.city} team will share details on ${answers.phone}. If you’d like, I can also help you book a test ride.`,
    score,
    serious,
    rsm,
    kind: "customer",
    title: serious ? "Serious buyer · forward to RSM" : "Nurture · city sales desk",
    subtitle: `${model} · ${answers.city || "—"}`,
    rows,
  };
}
