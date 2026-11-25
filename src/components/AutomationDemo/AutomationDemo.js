import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  CUSTOMER_STEPS,
  DEALER_STEPS,
  completeCustomer,
  completeDealer,
  detectRoadKingFlow,
  matchChoice,
  startCustomerMessage,
  startDealerMessage,
} from "./roadKingFlows";
import {
  EVENT_STEPS,
  PLAYER_STEPS,
  completeEvent,
  completePlayer,
  detectPadelFlow,
  matchPadelChoice,
  startEventMessage,
  startPlayerMessage,
} from "./padelFlows";
import "./AutomationDemo.css";

const QUICK_PROMPTS = {
  roadking: ["I want a dealership", "I want to buy a scooty", "I want a test ride"],
  padel: ["I want to book a court", "What times are open?", "I want to sponsor an event"],
};

function getSteps(theme, flow) {
  if (theme === "roadking") {
    if (flow === "dealer") return DEALER_STEPS;
    if (flow === "customer") return CUSTOMER_STEPS;
  }
  if (theme === "padel") {
    if (flow === "event") return EVENT_STEPS;
    if (flow === "player") return PLAYER_STEPS;
  }
  return [];
}

function DeskVerdict({ answers, verdict, lead }) {
  const rsm = verdict?.rsm || { name: "Ops desk", region: "—" };
  const score = verdict?.score ?? 0;

  return (
    <div className={`auto-demo__ui auto-demo__ui--verdict${verdict?.serious ? " is-serious" : " is-nurture"}`}>
      <header className="auto-demo__ui-bar">
        <span>AI decision</span>
        <em className="auto-demo__pulse-label">{verdict?.serious ? "FORWARD" : "HOLD"}</em>
      </header>

      <div className="auto-demo__verdict-score" aria-label={`Score ${score}`}>
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
        {verdict?.title || "Decision"}
      </p>
      <h4 className="auto-demo__verdict-name">{answers.name || answers.brand || lead?.name || "Lead"}</h4>
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

  if (screen === "done" && verdict) {
    return <DeskVerdict answers={answers} verdict={verdict} lead={lead} />;
  }

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

function PadelScreen({ screen, lead, answers, verdict }) {
  const isEvent = lead?.type === "event";
  const filled = Object.keys(answers || {}).length;

  if (screen === "inbox") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Ops dashboard</span>
          <em>AI live</em>
        </header>
        <article className={`auto-demo__card${lead?.type === "player" ? " is-selected auto-demo__card--pulse" : ""}`}>
          <p className="auto-demo__badge">Court booking</p>
          <h4>{lead?.type === "player" ? answers.name || "New player" : "Waiting…"}</h4>
          <p>Slots · courts · WhatsApp confirm</p>
        </article>
        <article className={`auto-demo__card${isEvent ? " is-selected auto-demo__card--pulse" : ""}`}>
          <p className="auto-demo__badge">Events / sponsor</p>
          <h4>{isEvent ? answers.brand || answers.name || "New partner" : "Waiting…"}</h4>
          <p>Budget · package · events desk</p>
        </article>
        <p className="auto-demo__hint">Internal desk · chat stays guest-facing</p>
      </div>
    );
  }

  if (screen === "done" && verdict) {
    return <DeskVerdict answers={answers} verdict={verdict} lead={lead} />;
  }

  const rows = isEvent
    ? [
        ["Brand", answers.brand],
        ["Opportunity", answers.event_type?.replace(/_/g, " ")],
        ["Budget", answers.budget?.replace(/_/g, " ")],
        ["Goal", answers.goals?.replace(/_/g, " ")],
        ["Timeline", answers.timeline?.replace(/_/g, " ")],
        ["Role", answers.decision_role?.replace(/_/g, " ")],
      ]
    : [
        ["When", answers.when?.replace(/_/g, " ")],
        ["Time", answers.time?.replace(/_/g, " ")],
        ["Court", answers.court ? `Court ${answers.court}` : null],
        ["Players", answers.players],
        ["Session", answers.session_type?.replace(/_/g, " ")],
        ["Phone", answers.phone],
      ];

  return (
    <div className="auto-demo__ui">
      <header className="auto-demo__ui-bar">
        <span>{isEvent ? "Partner qualify" : "Booking qualify"}</span>
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

function AutomationDemo({ study }) {
  const theme = study.theme || (study.slug === "roadking" ? "roadking" : "padel");
  const chatId = useId();
  const listRef = useRef(null);

  const [screen, setScreen] = useState("inbox");
  const [selection, setSelection] = useState(null);
  const [flow, setFlow] = useState(null);
  const [flowStep, setFlowStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [verdict, setVerdict] = useState(null);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const welcome =
    theme === "roadking"
      ? "Hi — I’m with Road King EV support. I can help with models, pricing, test rides, or dealership partnership. What do you need today?"
      : "Hi — welcome to Padel Chase Inn. I can book a court for you or help with event sponsorships. What do you need?";

  const [messages, setMessages] = useState(() => [{ id: "welcome", role: "bot", text: welcome }]);

  const steps = getSteps(theme, flow);
  const currentStep = steps[flowStep] || null;
  const choiceOptions = currentStep?.type === "choice" ? currentStep.options : null;

  const prompts = useMemo(() => {
    if (flow && choiceOptions?.length) {
      return [...choiceOptions.map((o) => o.label), "Restart"];
    }
    if (flow || verdict) {
      return ["Restart"];
    }
    return QUICK_PROMPTS[theme] || [];
  }, [theme, choiceOptions, flow, verdict]);

  const chatTitle =
    theme === "roadking"
      ? flow === "dealer"
        ? "Dealership qualification"
        : flow === "customer"
          ? "Customer sales support"
          : "Road King EV support"
      : flow === "event"
        ? "Events & sponsorships"
        : flow === "player"
          ? "Court booking support"
          : "Padel Chase Inn support";

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
    setFlow(null);
    setFlowStep(0);
    setAnswers({});
    setVerdict(null);
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

  const beginFlow = (nextFlow) => {
    setFlow(nextFlow);
    setFlowStep(0);
    setAnswers({});
    setVerdict(null);

    if (theme === "roadking") {
      setSelection(
        nextFlow === "dealer"
          ? { id: "dealer", type: "dealer", name: "Dealer lead" }
          : { id: "customer", type: "customer", name: "Customer lead" }
      );
      const intro = nextFlow === "dealer" ? startDealerMessage() : startCustomerMessage();
      const first = getSteps(theme, nextFlow)[0].ask;
      setScreen("qualify");
      pushBot(`${intro}\n\n${first}`);
      return;
    }

    setSelection(
      nextFlow === "event"
        ? { id: "event", type: "event", name: "Partner lead" }
        : { id: "player", type: "player", name: "Player lead" }
    );
    const intro = nextFlow === "event" ? startEventMessage() : startPlayerMessage();
    const first = getSteps(theme, nextFlow)[0].ask;
    setScreen("qualify");
    pushBot(`${intro}\n\n${first}`);
  };

  const finishFlow = (activeFlow, nextAnswers) => {
    let result;
    if (theme === "roadking") {
      result = activeFlow === "dealer" ? completeDealer(nextAnswers) : completeCustomer(nextAnswers);
      setSelection((prev) => ({
        ...prev,
        name: nextAnswers.name || prev?.name,
        type: activeFlow === "dealer" ? "dealer" : "customer",
      }));
    } else {
      result = activeFlow === "event" ? completeEvent(nextAnswers) : completePlayer(nextAnswers);
      setSelection((prev) => ({
        ...prev,
        name: nextAnswers.name || nextAnswers.brand || prev?.name,
        type: activeFlow === "event" ? "event" : "player",
      }));
    }

    setVerdict(result);
    setScreen("done");
    pushBot(result.reply);
    setFlow(null);
    setFlowStep(0);
  };

  const advanceAnswer = (activeFlow, stepIndex, value, priorAnswers) => {
    const list = getSteps(theme, activeFlow);
    const step = list[stepIndex];
    const nextAnswers = { ...priorAnswers, [step.id]: value };
    setAnswers(nextAnswers);
    setSelection((prev) => ({
      ...prev,
      name: nextAnswers.name || nextAnswers.brand || prev?.name,
    }));

    if (stepIndex >= list.length - 1) {
      finishFlow(activeFlow, nextAnswers);
      return;
    }

    const nextIndex = stepIndex + 1;
    setFlowStep(nextIndex);
    setScreen(nextIndex > 3 ? "route" : "qualify");
    pushBot(list[nextIndex].ask);
  };

  const handleMessage = (text) => {
    const q = text.toLowerCase().trim();

    if (flow && currentStep) {
      let value = null;
      if (currentStep.type === "choice") {
        value =
          theme === "padel"
            ? matchPadelChoice(text, currentStep.options)
            : matchChoice(text, currentStep.options);
        if (!value) {
          pushBot(currentStep.invalid || "Please choose one of the options below.");
          return;
        }
        // Soft block full padel slots with a friendly re-ask
        if (theme === "padel" && flow === "player") {
          if (currentStep.id === "time" && value === "9_00_pm") {
            pushBot("9:00 PM is fully booked. Please pick 6:00, 7:00, or 8:00 PM.");
            return;
          }
          if (currentStep.id === "court" && value === "03") {
            pushBot("Court 03 is full at that time. Please pick Court 01, 02, or 04.");
            return;
          }
        }
      } else {
        value = currentStep.parse ? currentStep.parse(text) : text.trim();
        if (!value) {
          pushBot(currentStep.invalid || "Please share a valid answer.");
          return;
        }
      }
      advanceAnswer(flow, flowStep, value, answers);
      return;
    }

    if (theme === "roadking") {
      const detected = detectRoadKingFlow(text);
      if (detected) {
        beginFlow(detected);
        return;
      }
      if (/dealer|dealership|franchise|partner/.test(q)) {
        beginFlow("dealer");
        return;
      }
      if (/scooty|scooter|panther|muso|raptor|ibra|r99|gen beta|test ride|price|buy|ev\b/.test(q)) {
        beginFlow("customer");
        return;
      }
      pushBot(
        "I can help with two things:\n1) Buy a scooty / test ride / pricing\n2) Dealership partnership application\n\nWhich one should we start?"
      );
      return;
    }

    // Padel
    const detected = detectPadelFlow(text);
    if (detected) {
      beginFlow(detected);
      return;
    }
    if (/sponsor|sponsorship|event|collab|brand|tournament|grand slam|americano/.test(q)) {
      beginFlow("event");
      return;
    }
    if (/book|court|play|slot|time|available|tomorrow|evening|padel|game|session|open/.test(q)) {
      beginFlow("player");
      return;
    }
    pushBot(
      "I can help with two things:\n1) Book a court\n2) Sponsor an event / brand collab\n\nWhich one should we start?"
    );
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
          : "No problem — starting fresh. Want to book a court or sponsor an event?"
      );
      return;
    }

    handleMessage(text);
  };

  return (
    <div
      className={`auto-demo auto-demo--${theme} auto-demo--live${verdict ? " auto-demo--decisive" : ""}`}
      style={{ "--auto-accent": study.accent }}
    >
      <div className="auto-demo__stage">
        <div className="auto-demo__phone">
          <span className="auto-demo__island" aria-hidden />
          <div className="auto-demo__screen" aria-live="polite">
            {theme === "roadking" ? (
              <RoadKingScreen screen={screen} lead={selection} answers={answers} verdict={verdict} />
            ) : (
              <PadelScreen screen={screen} lead={selection} answers={answers} verdict={verdict} />
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
              ? "Full qualification for customers and dealership leads. Decisions appear on the ops dashboard."
              : "Full court-booking and sponsorship interviews. Scores and routing appear on the ops dashboard only."}
          </p>
        </section>
      </div>
    </div>
  );
}

export default AutomationDemo;
