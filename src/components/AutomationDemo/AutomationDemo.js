import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  CUSTOMER_STEPS,
  DEALER_STEPS,
  completeCustomer,
  completeDealer,
  detectRoadKingFlow,
  matchChoice,
  resolveRsm,
  startCustomerMessage,
  startDealerMessage,
} from "./roadKingFlows";
import "./AutomationDemo.css";

const QUICK_PROMPTS = {
  roadking: ["I want a dealership", "I want to buy a scooty", "I want a test ride"],
  padel: ["Book a court tomorrow evening", "What times are open?", "We want to sponsor an event"],
};

const FLOW_PROMPTS = {
  roadking: ["Restart"],
  padel: ["Restart"],
};

function detectPadelRole(text, persona) {
  const q = text.toLowerCase();
  if (/sponsor|sponsorship|event|collab|brand|tournament|grand slam/.test(q)) return "event";
  if (/book|court|slot|play|tomorrow|evening|time|available/.test(q)) return "player";
  return persona || "player";
}

function padelReply({ text, persona, slot, court }) {
  const q = text.toLowerCase().trim();
  const role = detectPadelRole(text, persona);

  if (/thank|thanks|shukriya|great|perfect/.test(q)) {
    return {
      reply:
        role === "event"
          ? "Pleasure. Our events team will take it from here and keep you posted."
          : "You’re welcome — see you on court.",
      persona: role,
    };
  }

  if (role === "event") {
    if (/sponsor|sponsorship|event|collab|brand|tournament|grand slam/.test(q)) {
      return {
        reply:
          "Thanks for reaching out about partnering with Padel Chase Inn. Please share your brand name, preferred event (e.g. Americano / Grand Slam), and rough budget — I’ll route this to our events team.",
        persona: "event",
        selectionHint: "event",
        advance: "qualify",
      };
    }
    return {
      reply:
        "I can help with event sponsorships and brand collaborations at Padel Chase Inn. Tell me about your brand and which tournament you’re interested in.",
      persona: "event",
      selectionHint: "event",
    };
  }

  if (/book|court|tomorrow|evening|slot|play|reserve/.test(q)) {
    return {
      reply:
        "I can book that for you. We have openings tomorrow at 6:00 PM, 7:00 PM, and 8:00 PM. Which time works, and do you prefer Court 01, 02, or 04?",
      persona: "player",
      selectionHint: "sara",
      advance: "slots",
    };
  }
  if (/6(:00)?\s*pm|7(:00)?\s*pm|8(:00)?\s*pm|9(:00)?\s*pm/.test(q)) {
    const picked = /9/.test(q) ? null : /8/.test(q) ? "8:00 PM" : /6/.test(q) ? "6:00 PM" : "7:00 PM";
    if (!picked) {
      return {
        reply: "9:00 PM is fully booked tomorrow. I can do 6:00, 7:00, or 8:00 PM — which one should I hold?",
        persona: "player",
        selectionHint: "sara",
        advance: "slots",
      };
    }
    return {
      reply: `Got it — holding ${picked}. Which court would you like: 01, 02, or 04?`,
      persona: "player",
      selectionHint: "sara",
      slot: picked,
      advance: "slots",
    };
  }
  if (/court\s*(0?1|0?2|0?3|0?4)|01|02|03|04/.test(q)) {
    if (/0?3|court\s*3/.test(q)) {
      return {
        reply: "Court 03 is full at that time. Court 02 is open — shall I confirm Court 02 for you?",
        persona: "player",
        selectionHint: "sara",
        advance: "slots",
      };
    }
    const c = /0?1|court\s*1/.test(q) ? "01" : /0?4|court\s*4/.test(q) ? "04" : "02";
    const when = slot || "7:00 PM";
    return {
      reply: `Perfect. I can confirm Court ${c} tomorrow at ${when} (90 min). Reply “confirm” and I’ll lock it and send WhatsApp confirmation.`,
      persona: "player",
      selectionHint: "sara",
      court: c,
      slot: when,
      advance: "confirm",
    };
  }
  if (/confirm|yes|lock|book it|ok|okay|sure/.test(q)) {
    const when = slot || "7:00 PM";
    const c = court || "02";
    return {
      reply: `You’re booked — Court ${c}, tomorrow at ${when}. I’ve sent a WhatsApp confirmation with the venue pin. Need rackets or guest add-ons?`,
      persona: "player",
      selectionHint: "sara",
      slot: when,
      court: c,
      advance: "done",
    };
  }
  if (/time|available|open|when|slot/.test(q)) {
    return {
      reply:
        "Tomorrow evening we still have 6:00 PM, 7:00 PM, and 8:00 PM. 9:00 PM is full. Which time should I reserve?",
      persona: "player",
      selectionHint: "sara",
      advance: "slots",
    };
  }
  return {
    reply:
      "Hi — welcome to Padel Chase Inn. I can help you book a court or connect you for event sponsorships. What would you like to do?",
    persona: role,
  };
}

function RoadKingScreen({ screen, lead, answers, verdict }) {
  const isDealer = lead?.type === "dealer";
  const filled = Object.keys(answers || {}).length;

  if (screen === "inbox") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Ops dashboard</span>
          <em>AI live</em>
        </header>
        <article className={`auto-demo__card${lead?.type === "customer" ? " is-selected auto-demo__card--pulse" : ""}`}>
          <p className="auto-demo__badge">Customer</p>
          <h4>{lead?.type === "customer" ? answers.name || "New customer" : "Waiting…"}</h4>
          <p>Models · test ride · pricing</p>
        </article>
        <article className={`auto-demo__card${isDealer ? " is-selected auto-demo__card--pulse" : ""}`}>
          <p className="auto-demo__badge">Dealership</p>
          <h4>{isDealer ? answers.name || "New dealer lead" : "Waiting…"}</h4>
          <p>Investment · location · RSM route</p>
        </article>
        <p className="auto-demo__hint">Internal desk · chat stays customer-facing</p>
      </div>
    );
  }

  if (screen === "qualify" || screen === "route" || screen === "followup") {
    const rows = isDealer
      ? [
          ["City", answers.city],
          ["Investment", answers.investment_range?.replace(/_/g, " ")],
          ["Funding", answers.funding_source?.replace(/_/g, " ")],
          ["Location", answers.dealership_location?.replace(/_/g, " ")],
          ["Start", answers.when_can_you_start?.replace(/_/g, " ")],
          ["Role", answers.decision_role?.replace(/_/g, " ")],
        ]
      : [
          ["City", answers.city],
          ["Model", answers.model?.replace(/_/g, " ")],
          ["Intent", answers.intent?.replace(/_/g, " ")],
          ["Payment", answers.payment?.replace(/_/g, " ")],
          ["Timeline", answers.timeline?.replace(/_/g, " ")],
          ["Phone", answers.phone],
        ];

    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>{isDealer ? "Dealer qualify" : "Buyer qualify"}</span>
          <em>{filled} fields</em>
        </header>
        <div className="auto-demo__score auto-demo__score--soft">
          <strong>…</strong>
          <span>Scoring in progress</span>
        </div>
        <ul className="auto-demo__list">
          {rows
            .filter(([, v]) => v)
            .slice(0, 5)
            .map(([k, v]) => (
              <li key={k} className="auto-demo__list-item--in">
                <span>{k}</span>
                <b>{v}</b>
              </li>
            ))}
        </ul>
        {!filled ? <p className="auto-demo__hint">Collecting answers in chat…</p> : null}
      </div>
    );
  }

  const rsm = verdict?.rsm || resolveRsm(answers.city);
  const score = verdict?.score ?? 0;

  return (
    <div className={`auto-demo__ui auto-demo__ui--verdict${verdict?.serious ? " is-serious" : " is-nurture"}`}>
      <header className="auto-demo__ui-bar">
        <span>AI decision</span>
        <em className="auto-demo__pulse-label">{verdict?.serious ? "FORWARD" : "NURTURE"}</em>
      </header>

      <div className="auto-demo__verdict-score" aria-label={`Intent score ${score}`}>
        <svg className="auto-demo__ring" viewBox="0 0 72 72" aria-hidden>
          <circle className="auto-demo__ring-track" cx="36" cy="36" r="30" />
          <circle
            className="auto-demo__ring-value"
            cx="36"
            cy="36"
            r="30"
            style={{ strokeDashoffset: 188 - (188 * score) / 100 }}
          />
        </svg>
        <div className="auto-demo__verdict-score-num">
          <strong>{score}</strong>
          <span>/100</span>
        </div>
      </div>

      <p className={`auto-demo__verdict-badge${verdict?.serious ? " is-on" : ""}`}>
        {verdict?.title || (verdict?.serious ? "Serious buyer · forward to RSM" : "Nurture queue")}
      </p>
      <h4 className="auto-demo__verdict-name">{answers.name || lead?.name || "Lead"}</h4>
      <p className="auto-demo__verdict-sub">{verdict?.subtitle || "—"}</p>

      <div className="auto-demo__rsm-card">
        <p className="auto-demo__badge">{verdict?.serious ? "Routed now" : "Hold / nurture"}</p>
        <h4>{rsm.name}</h4>
        <p>{rsm.region}</p>
      </div>

      <ul className="auto-demo__list auto-demo__list--compact">
        {(verdict?.rows || [])
          .filter(([, v]) => v)
          .slice(0, 4)
          .map(([k, v], i) => (
            <li key={k} style={{ animationDelay: `${0.12 + i * 0.06}s` }}>
              <span>{k}</span>
              <b>{v}</b>
            </li>
          ))}
      </ul>
    </div>
  );
}

function PadelScreen({ screen, selection, slot, court, onSelect, onAction, onPickSlot, onPickCourt }) {
  if (screen === "inbox") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Inquiries</span>
          <em>Live</em>
        </header>
        <button
          type="button"
          className={`auto-demo__card auto-demo__tap${
            selection?.id === "sara" ? " is-selected" : " auto-demo__card--pulse"
          }`}
          onClick={() => onSelect({ id: "sara", type: "player", name: "Sara K." })}
        >
          <p className="auto-demo__badge">Instagram · New</p>
          <h4>Sara K.</h4>
          <p>Can I book a court for tomorrow evening?</p>
        </button>
        <button
          type="button"
          className={`auto-demo__card auto-demo__tap${
            selection?.id === "event" ? " is-selected" : ""
          }`}
          onClick={() => onSelect({ id: "event", type: "event", name: "Brand collab" })}
        >
          <p className="auto-demo__badge">Event</p>
          <h4>Brand collab</h4>
          <p>Sponsorship ask for Grand Slam.</p>
        </button>
        {selection ? (
          <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("qualify")}>
            AI Classify
          </button>
        ) : (
          <p className="auto-demo__hint">Tap an inquiry or chat to continue</p>
        )}
      </div>
    );
  }

  if (screen === "qualify") {
    const player = selection?.type === "player";
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>AI Classify</span>
          <em>{player ? "Player" : "Event"}</em>
        </header>
        <div className={`auto-demo__route${player ? " is-active" : ""}`}>
          <p>Court booking</p>
          <span>Player pathway</span>
        </div>
        <div className={`auto-demo__route${!player ? " is-active" : ""}`}>
          <p>Event / partner</p>
          <span>Sponsorship pathway</span>
        </div>
        {player ? (
          <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("slots")}>
            Show live slots
          </button>
        ) : (
          <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("done")}>
            Mark handled
          </button>
        )}
      </div>
    );
  }

  if (screen === "slots") {
    const times = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
    const courts = [
      { id: "01", label: "Court 01", busy: false },
      { id: "02", label: "Court 02", busy: false },
      { id: "03", label: "Court 03", busy: true },
      { id: "04", label: "Court 04", busy: false },
    ];
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Open slots</span>
          <em>Tap to pick</em>
        </header>
        <div className="auto-demo__slots">
          {times.map((t) => (
            <button
              key={t}
              type="button"
              disabled={t === "9:00 PM"}
              className={`auto-demo__tap${t === "9:00 PM" ? " is-busy" : ""}${slot === t ? " is-active" : ""}`}
              onClick={() => onPickSlot(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="auto-demo__courts">
          {courts.map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={c.busy}
              className={`auto-demo__tap${c.busy ? " is-busy" : ""}${court === c.id ? " is-active" : ""}`}
              onClick={() => onPickCourt(c.id)}
            >
              {c.label}
              {c.busy ? " · Full" : court === c.id ? " · Select" : " · Open"}
            </button>
          ))}
        </div>
        {slot && court ? (
          <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("confirm")}>
            Review booking
          </button>
        ) : (
          <p className="auto-demo__hint">Pick a time and court</p>
        )}
      </div>
    );
  }

  if (screen === "confirm") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Confirm</span>
          <em>Ready</em>
        </header>
        <div className="auto-demo__confirm-box">
          <p>Tomorrow · {slot}</p>
          <span>
            Court {court} · 90 min · {selection?.name}
          </span>
        </div>
        <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("done")}>
          Confirm booking
        </button>
      </div>
    );
  }

  return (
    <div className="auto-demo__ui auto-demo__ui--done">
      <header className="auto-demo__ui-bar">
        <span>Booked</span>
        <em>Sent</em>
      </header>
      <div className="auto-demo__done-mark" aria-hidden>
        ✓
      </div>
      <h4>{selection?.type === "event" ? "Event routed" : "Court confirmed"}</h4>
      <p>
        {selection?.name}
        {selection?.type === "player" ? ` · Court ${court} · WhatsApp sent` : " · Venue team notified"}
      </p>
      <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("reset")}>
        Run again
      </button>
    </div>
  );
}

function AutomationDemo({ study }) {
  const theme = study.theme || (study.slug === "roadking" ? "roadking" : "padel");
  const chatId = useId();
  const listRef = useRef(null);

  const [screen, setScreen] = useState("inbox");
  const [selection, setSelection] = useState(null);
  const [slot, setSlot] = useState(null);
  const [court, setCourt] = useState(null);
  const [persona, setPersona] = useState(theme === "roadking" ? "customer" : "player");
  const [rkFlow, setRkFlow] = useState(null);
  const [rkStep, setRkStep] = useState(0);
  const [rkAnswers, setRkAnswers] = useState({});
  const [rkVerdict, setRkVerdict] = useState(null);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const welcome =
    theme === "roadking"
      ? "Hi — I’m with Road King EV support. I can help with models, pricing, test rides, or dealership partnership. What do you need today?"
      : "Hi — welcome to Padel Chase Inn. I can book a court for you or help with event sponsorships. What do you need?";

  const [messages, setMessages] = useState(() => [{ id: "welcome", role: "bot", text: welcome }]);

  const steps = rkFlow === "dealer" ? DEALER_STEPS : rkFlow === "customer" ? CUSTOMER_STEPS : [];
  const currentStep = steps[rkStep] || null;
  const choiceOptions = currentStep?.type === "choice" ? currentStep.options : null;

  const prompts = useMemo(() => {
    if (theme === "roadking" && rkFlow && choiceOptions?.length) {
      return [...choiceOptions.map((o) => o.label), "Restart"];
    }
    if (theme === "roadking" && (rkFlow || rkVerdict)) {
      return FLOW_PROMPTS.roadking;
    }
    if (theme === "padel" && screen !== "inbox" && screen !== "done") {
      return FLOW_PROMPTS.padel;
    }
    if (theme === "padel" && screen === "done") {
      return FLOW_PROMPTS.padel;
    }
    return QUICK_PROMPTS[theme] || [];
  }, [theme, choiceOptions, rkFlow, rkVerdict, screen]);

  const chatTitle =
    theme === "roadking"
      ? rkFlow === "dealer"
        ? "Dealership qualification"
        : rkFlow === "customer"
          ? "Customer sales support"
          : "Road King EV support"
      : "Padel Chase Inn bookings";

  const pushBot = (text) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: "bot", text }]);
      setTyping(false);
    }, 320 + Math.random() * 240);
  };

  const resetAll = () => {
    setScreen("inbox");
    setSelection(null);
    setSlot(null);
    setCourt(null);
    setPersona(theme === "roadking" ? "customer" : "player");
    setRkFlow(null);
    setRkStep(0);
    setRkAnswers({});
    setRkVerdict(null);
  };

  useEffect(() => {
    resetAll();
    setDraft("");
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text:
          theme === "roadking"
            ? "Hi — I’m with Road King EV support. I can help with models, pricing, test rides, or dealership partnership. What do you need today?"
            : "Hi — welcome to Padel Chase Inn. I can book a court for you or help with event sponsorships. What do you need?",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [study.slug, theme]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, prompts]);

  const beginRkFlow = (flow) => {
    setRkFlow(flow);
    setRkStep(0);
    setRkAnswers({});
    setRkVerdict(null);
    setPersona(flow === "dealer" ? "dealer" : "customer");
    setSelection(
      flow === "dealer"
        ? { id: "dealer", type: "dealer", name: "Dealer lead" }
        : { id: "customer", type: "customer", name: "Customer lead" }
    );
    setScreen("qualify");
    const intro = flow === "dealer" ? startDealerMessage() : startCustomerMessage();
    const first = flow === "dealer" ? DEALER_STEPS[0].ask : CUSTOMER_STEPS[0].ask;
    pushBot(`${intro}\n\n${first}`);
  };

  const finishRkFlow = (flow, answers) => {
    const result = flow === "dealer" ? completeDealer(answers) : completeCustomer(answers);
    setRkVerdict(result);
    setSelection((prev) => ({
      ...prev,
      name: answers.name || prev?.name,
      type: flow === "dealer" ? "dealer" : "customer",
    }));
    setScreen("done");
    pushBot(result.reply);
    setRkFlow(null);
    setRkStep(0);
  };

  const advanceRkAnswer = (flow, stepIndex, value, priorAnswers) => {
    const list = flow === "dealer" ? DEALER_STEPS : CUSTOMER_STEPS;
    const step = list[stepIndex];
    const nextAnswers = { ...priorAnswers, [step.id]: value };
    setRkAnswers(nextAnswers);
    setSelection((prev) => ({
      ...prev,
      name: nextAnswers.name || prev?.name,
      type: flow === "dealer" ? "dealer" : "customer",
    }));

    if (stepIndex >= list.length - 1) {
      finishRkFlow(flow, nextAnswers);
      return;
    }

    const nextIndex = stepIndex + 1;
    setRkStep(nextIndex);
    setScreen(nextIndex > 3 ? "route" : "qualify");
    pushBot(list[nextIndex].ask);
  };

  const handleRkMessage = (text) => {
    const q = text.toLowerCase().trim();

    // Already in a qualification interview
    if (rkFlow && currentStep) {
      let value = null;
      if (currentStep.type === "choice") {
        value = matchChoice(text, currentStep.options);
        if (!value) {
          pushBot(
            `${currentStep.invalid || "Please choose one of the options below."}`
          );
          return;
        }
      } else {
        value = currentStep.parse ? currentStep.parse(text) : text.trim();
        if (!value) {
          pushBot(currentStep.invalid || "Please share a valid answer.");
          return;
        }
      }
      advanceRkAnswer(rkFlow, rkStep, value, rkAnswers);
      return;
    }

    // Start a flow
    const detected = detectRoadKingFlow(text);
    if (detected) {
      beginRkFlow(detected);
      return;
    }

    if (/dealer|dealership|franchise|partner/.test(q)) {
      beginRkFlow("dealer");
      return;
    }
    if (/scooty|scooter|panther|muso|raptor|ibra|r99|gen beta|test ride|price|buy|ev\b/.test(q)) {
      beginRkFlow("customer");
      return;
    }

    pushBot(
      "I can help with two things:\n1) Buy a scooty / test ride / pricing\n2) Dealership partnership application\n\nWhich one should we start?"
    );
  };

  const onSelect = (item) => {
    setSelection(item);
    setScreen("inbox");
    if (theme === "padel") {
      setPersona(item.type === "event" ? "event" : "player");
    }
  };

  const onAction = (action) => {
    if (action === "reset") {
      resetAll();
      return;
    }
    if (action === "qualify") setScreen("qualify");
    else if (action === "route") setScreen("route");
    else if (action === "followup") setScreen("followup");
    else if (action === "slots") setScreen("slots");
    else if (action === "confirm") setScreen("confirm");
    else if (action === "done") {
      setScreen("done");
      if (theme === "padel") {
        if (selection?.type === "event") {
          pushBot("Thanks — our events team has your sponsorship request and will follow up soon.");
        } else if (slot && court) {
          pushBot(
            `You’re all set — Court ${court}, tomorrow at ${slot}. WhatsApp confirmation is on the way. See you at Padel Chase Inn.`
          );
        }
      }
    }
  };

  const sendChat = (raw) => {
    const text = (raw || draft).trim();
    if (!text || typing) return;
    setDraft("");
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text }]);

    if (/^(restart|reset|start over)$/i.test(text.trim())) {
      resetAll();
      pushBot(
        theme === "roadking"
          ? "No problem — starting fresh. Want to buy a scooty / book a test ride, or apply for a dealership?"
          : "No problem — starting fresh. Want to book a court or ask about sponsorships?"
      );
      return;
    }

    if (theme === "roadking") {
      handleRkMessage(text);
      return;
    }

    const result = padelReply({ text, persona, slot, court });
    if (result.persona) setPersona(result.persona);
    if (result.selectionHint === "sara") {
      setSelection({ id: "sara", type: "player", name: "Sara K." });
    } else if (result.selectionHint === "event") {
      setSelection({ id: "event", type: "event", name: "Brand collab" });
    }
    if (result.slot) setSlot(result.slot);
    if (result.court) setCourt(result.court);
    if (result.advance) setScreen(result.advance);
    pushBot(result.reply);
  };

  return (
    <div
      className={`auto-demo auto-demo--${theme} auto-demo--live${
        theme === "roadking" && rkVerdict ? " auto-demo--decisive" : ""
      }`}
      style={{ "--auto-accent": study.accent }}
    >
      <div className="auto-demo__stage">
        <div className="auto-demo__phone">
          <span className="auto-demo__island" aria-hidden />
          <div className="auto-demo__screen" aria-live="polite">
            {theme === "roadking" ? (
              <RoadKingScreen
                screen={screen}
                lead={selection}
                answers={rkAnswers}
                verdict={rkVerdict}
              />
            ) : (
              <PadelScreen
                screen={screen}
                selection={selection}
                slot={slot}
                court={court}
                onSelect={onSelect}
                onAction={onAction}
                onPickSlot={setSlot}
                onPickCourt={setCourt}
              />
            )}
          </div>
          <span className="auto-demo__home" aria-hidden />
        </div>

        <section className="auto-demo__chat" aria-labelledby={chatId}>
          <header className="auto-demo__chat-head">
            <div>
              <p className="auto-demo__coach-kicker">Live support</p>
              <h3 id={chatId}>{chatTitle}</h3>
            </div>
            <span className="auto-demo__live-dot">Online</span>
          </header>

          <div className="auto-demo__chat-log" ref={listRef} role="log" aria-relevant="additions">
            {messages.map((m) => (
              <div key={m.id} className={`auto-demo__bubble auto-demo__bubble--${m.role}`}>
                {m.text.split("\n").map((line, i) => (
                  <span key={`${m.id}-${i}`}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </div>
            ))}
            {typing ? (
              <div className="auto-demo__bubble auto-demo__bubble--bot auto-demo__bubble--typing">
                <i />
                <i />
                <i />
              </div>
            ) : null}
          </div>

          <div className="auto-demo__prompts">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                className={p === "Restart" ? "auto-demo__prompt--restart" : undefined}
                onClick={() => sendChat(p)}
                disabled={typing}
              >
                {p}
              </button>
            ))}
          </div>

          <form
            className="auto-demo__composer"
            onSubmit={(e) => {
              e.preventDefault();
              sendChat();
            }}
          >
            <label className="sr-only" htmlFor={`${chatId}-input`}>
              Message support
            </label>
            <input
              id={`${chatId}-input`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={
                currentStep?.type === "choice"
                  ? "Type or tap an option…"
                  : currentStep
                    ? "Type your answer…"
                    : "Type a message…"
              }
              autoComplete="off"
            />
            <button type="submit" className="auto-demo__btn" disabled={!draft.trim() || typing}>
              Send
            </button>
          </form>
          <p className="auto-demo__chat-note">
            {theme === "roadking"
              ? "Full qualification interview for customers and dealership leads. Serious profiles are forwarded to the city RSM."
              : "Chat as a guest or sponsor. The phone desk updates as you go."}
          </p>
        </section>
      </div>
    </div>
  );
}

export default AutomationDemo;
