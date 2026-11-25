import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "./AutomationDemo.css";

const QUICK_PROMPTS = {
  roadking: ["I want a test ride", "Price in Lahore?", "How does routing work?"],
  padel: ["Book a court tomorrow", "What times are open?", "How does AI classify?"],
};

function botReply({ theme, text, screen, selection }) {
  const q = text.toLowerCase().trim();

  if (theme === "roadking") {
    if (/price|cost|pkr|how much/.test(q)) {
      return {
        reply:
          "Pricing depends on the EV model and city. In the live system, AI pulls product interest from the lead and routes high-intent buyers to Sales with a quote task.",
        suggestScreen: screen === "inbox" ? "qualify" : null,
      };
    }
    if (/test ride|demo|ride|buy|interested|scooter|lahore/.test(q)) {
      return {
        reply:
          "Got it — treating this as a high-intent customer lead. Tap the new Meta lead on the phone, then run AI Qualify to score and route it.",
        suggestScreen: "inbox",
        selectionHint: "ahmed",
      };
    }
    if (/dealer|partner|franchise|dealership/.test(q)) {
      return {
        reply:
          "Dealer inquiries take a separate path. On the phone, open the dealer card — AI keeps partner acquisition off the customer sales queue.",
        suggestScreen: "inbox",
        selectionHint: "dealer",
      };
    }
    if (/route|routing|sales|follow|whatsapp|how/.test(q)) {
      return {
        reply:
          "Flow: Lead in → AI score → Sales or Dealer route → auto WhatsApp / call task → opportunity tracked. Click through each screen on the phone to run it yourself.",
        suggestScreen: screen,
      };
    }
    if (screen === "done" || /done|complete|thanks/.test(q)) {
      return {
        reply:
          "Loop complete. In production this stays synced for the sales team — no spreadsheets, no missed follow-ups.",
      };
    }
    return {
      reply:
        selection?.id === "ahmed"
          ? "Ahmed is selected. Tap “Run AI Qualify” on the phone to score intent, city, and product interest."
          : "Chat with me like a lead, or tap the phone screens. Start by opening a new Meta lead.",
      suggestScreen: "inbox",
    };
  }

  // Padel
  if (/book|court|tomorrow|slot|time|evening|7\s*pm|available/.test(q)) {
    return {
      reply:
        "Booking request noted. Open Sara’s inquiry on the phone, let AI classify it as a player booking, then pick a live slot and confirm.",
      suggestScreen: "inbox",
      selectionHint: "sara",
    };
  }
  if (/event|sponsor|collab|grand slam|partner/.test(q)) {
    return {
      reply:
        "That’s an event/partner track. AI separates it from court bookings so the venue team gets the right fields — not a player slot.",
      suggestScreen: "inbox",
      selectionHint: "event",
    };
  }
  if (/classif|ai|automat|how|whatsapp|confirm/.test(q)) {
    return {
      reply:
        "Flow: Inquiry → AI classify (player vs event) → live court slots → confirm → WhatsApp sent. Tap each step on the phone to drive it.",
      suggestScreen: screen,
    };
  }
  if (screen === "done" || /done|complete|thanks/.test(q)) {
    return {
      reply:
        "Court locked and guest notified. That’s the booking-first automation loop Alpha Nine amplifies demand into.",
    };
  }
  return {
    reply:
      selection?.id === "sara"
        ? "Sara is open. Tap “AI Classify” to tag this as a court booking, then choose time and court."
        : "Ask me to book a court, or tap the phone and run the booking flow yourself.",
    suggestScreen: "inbox",
  };
}

function RoadKingScreen({ screen, selection, onSelect, onAction }) {
  if (screen === "inbox") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Lead Inbox</span>
          <em>AI live</em>
        </header>
        <button
          type="button"
          className={`auto-demo__card auto-demo__tap${
            selection?.id === "ahmed" ? " is-selected" : " auto-demo__card--pulse"
          }`}
          onClick={() => onSelect({ id: "ahmed", type: "customer", name: "Ahmed R." })}
        >
          <p className="auto-demo__badge">Meta · New</p>
          <h4>Ahmed R. · Lahore</h4>
          <p>Interested in Road King EV scooter pricing & test ride.</p>
        </button>
        <button
          type="button"
          className={`auto-demo__card auto-demo__tap${
            selection?.id === "dealer" ? " is-selected" : ""
          }`}
          onClick={() => onSelect({ id: "dealer", type: "dealer", name: "City Motors" })}
        >
          <p className="auto-demo__badge">Dealer</p>
          <h4>City Motors</h4>
          <p>Partnership inquiry — Karachi.</p>
        </button>
        {selection ? (
          <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("qualify")}>
            Run AI Qualify
          </button>
        ) : (
          <p className="auto-demo__hint">Tap a lead to continue</p>
        )}
      </div>
    );
  }

  if (screen === "qualify") {
    const score = selection?.type === "dealer" ? 78 : 92;
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>AI Qualify</span>
          <em>{score}%</em>
        </header>
        <div className="auto-demo__score">
          <strong>{score}</strong>
          <span>Intent score</span>
        </div>
        <ul className="auto-demo__list">
          <li>
            <span>Lead</span>
            <b>{selection?.name || "—"}</b>
          </li>
          <li>
            <span>Type</span>
            <b>{selection?.type === "dealer" ? "Dealer" : "Customer"}</b>
          </li>
          <li>
            <span>Signal</span>
            <b>{selection?.type === "dealer" ? "Partner" : "High buy intent"}</b>
          </li>
        </ul>
        <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("route")}>
          Route lead
        </button>
      </div>
    );
  }

  if (screen === "route") {
    const sales = selection?.type !== "dealer";
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Route</span>
          <em>Choose</em>
        </header>
        <button
          type="button"
          className={`auto-demo__route auto-demo__tap${sales ? " is-active" : ""}`}
          onClick={() => onAction("followup", { path: "sales" })}
          disabled={!sales}
        >
          <p>Sales team</p>
          <span>Customer purchase path</span>
        </button>
        <button
          type="button"
          className={`auto-demo__route auto-demo__tap${!sales ? " is-active" : ""}`}
          onClick={() => onAction("followup", { path: "dealer" })}
          disabled={sales}
        >
          <p>Dealership desk</p>
          <span>Partner acquisition path</span>
        </button>
        <p className="auto-demo__hint">Tap the highlighted path</p>
      </div>
    );
  }

  if (screen === "followup") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Follow-up</span>
          <em>Ready</em>
        </header>
        <div className="auto-demo__msg">
          <p>Hi {selection?.name?.split(" ")[0] || "there"} — thanks for reaching Road King EV.</p>
          <p>A specialist will follow up with next steps shortly.</p>
        </div>
        <div className="auto-demo__actions">
          <button type="button" className="auto-demo__tap" onClick={() => onAction("done", { channel: "whatsapp" })}>
            WhatsApp
          </button>
          <button type="button" className="auto-demo__tap" onClick={() => onAction("done", { channel: "call" })}>
            Call task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auto-demo__ui auto-demo__ui--done">
      <header className="auto-demo__ui-bar">
        <span>Pipeline</span>
        <em>Synced</em>
      </header>
      <div className="auto-demo__done-mark" aria-hidden>
        ✓
      </div>
      <h4>Opportunity tracked</h4>
      <p>
        {selection?.name || "Lead"} · {selection?.type === "dealer" ? "Dealer desk" : "Sales"} · Follow-up sent
      </p>
      <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("reset")}>
        Run again
      </button>
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
          <p className="auto-demo__hint">Tap an inquiry to continue</p>
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
          <>
            <p className="auto-demo__hint">Event path handed to venue team</p>
            <button type="button" className="auto-demo__cta-fake auto-demo__tap" onClick={() => onAction("done")}>
              Mark handled
            </button>
          </>
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
              className={`auto-demo__tap${t === "9:00 PM" ? " is-busy" : ""}${
                slot === t ? " is-active" : ""
              }`}
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
              className={`auto-demo__tap${c.busy ? " is-busy" : ""}${
                court === c.id ? " is-active" : ""
              }`}
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
          <span>Court {court} · 90 min · {selection?.name}</span>
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
  const inputRef = useRef(null);

  const [screen, setScreen] = useState("inbox");
  const [selection, setSelection] = useState(null);
  const [slot, setSlot] = useState(null);
  const [court, setCourt] = useState(null);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: "welcome",
      role: "bot",
      text:
        theme === "roadking"
          ? `Hi — I’m the ${study.client} automation guide. Chat like a lead, or tap the phone screens to run the AI flow yourself.`
          : `Hi — I’m the ${study.client} booking AI. Ask to book a court, or tap the phone and drive the automation yourself.`,
    },
  ]);

  const prompts = useMemo(() => QUICK_PROMPTS[theme] || [], [theme]);

  const pushBot = (text) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: "bot", text }]);
      setTyping(false);
    }, 420 + Math.random() * 280);
  };

  const resetFlow = () => {
    setScreen("inbox");
    setSelection(null);
    setSlot(null);
    setCourt(null);
  };

  useEffect(() => {
    resetFlow();
    setDraft("");
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text:
          theme === "roadking"
            ? `Hi — I’m the ${study.client} automation guide. Chat like a lead, or tap the phone screens to run the AI flow yourself.`
            : `Hi — I’m the ${study.client} booking AI. Ask to book a court, or tap the phone and drive the automation yourself.`,
      },
    ]);
  }, [study.slug, theme, study.client]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const narrateScreen = (next, sel = selection) => {
    if (theme === "roadking") {
      if (next === "qualify") {
        pushBot(`Running AI Qualify on ${sel?.name || "the lead"}… Intent, city, and product signals scored.`);
      } else if (next === "route") {
        pushBot(
          sel?.type === "dealer"
            ? "AI recommends Dealership desk. Tap that path on the phone."
            : "High buy intent — AI recommends Sales. Tap Sales team on the phone."
        );
      } else if (next === "followup") {
        pushBot("Path locked. Choose WhatsApp or Call task to fire the automated follow-up.");
      } else if (next === "done") {
        pushBot("Done — opportunity is tracked in the pipeline. Ask me anything, or tap Run again.");
      }
      return;
    }
    if (next === "qualify") {
      pushBot(
        sel?.type === "player"
          ? "Classified as a player booking. Tap Show live slots when you’re ready."
          : "Classified as event/partner — kept off the court booking queue."
      );
    } else if (next === "slots") {
      pushBot("Live availability loaded. Tap a time and an open court.");
    } else if (next === "confirm") {
      pushBot("Review the booking on the phone, then tap Confirm booking.");
    } else if (next === "done") {
      pushBot(
        sel?.type === "event"
          ? "Event inquiry handed to the venue team."
          : "Court confirmed and WhatsApp confirmation queued. Nice work."
      );
    }
  };

  const onSelect = (item) => {
    setSelection(item);
    setScreen("inbox");
    pushBot(
      theme === "roadking"
        ? `Selected ${item.name}. Tap “Run AI Qualify” on the phone.`
        : `Selected ${item.name}. Tap “AI Classify” on the phone.`
    );
  };

  const onAction = (action) => {
    if (action === "reset") {
      resetFlow();
      pushBot("Demo reset. Tap a new inquiry on the phone, or chat with me to start again.");
      return;
    }
    if (action === "qualify") {
      setScreen("qualify");
      narrateScreen("qualify");
      return;
    }
    if (action === "route") {
      setScreen("route");
      narrateScreen("route");
      return;
    }
    if (action === "followup") {
      setScreen("followup");
      narrateScreen("followup");
      return;
    }
    if (action === "slots") {
      setScreen("slots");
      narrateScreen("slots");
      return;
    }
    if (action === "confirm") {
      setScreen("confirm");
      narrateScreen("confirm");
      return;
    }
    if (action === "done") {
      setScreen("done");
      narrateScreen("done");
    }
  };

  const sendChat = (raw) => {
    const text = (raw || draft).trim();
    if (!text || typing) return;
    setDraft("");
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text }]);

    const { reply, suggestScreen, selectionHint } = botReply({
      theme,
      text,
      screen,
      selection,
    });

    if (selectionHint === "ahmed") {
      setSelection({ id: "ahmed", type: "customer", name: "Ahmed R." });
      setScreen("inbox");
    } else if (selectionHint === "dealer") {
      setSelection({ id: "dealer", type: "dealer", name: "City Motors" });
      setScreen("inbox");
    } else if (selectionHint === "sara") {
      setSelection({ id: "sara", type: "player", name: "Sara K." });
      setScreen("inbox");
    } else if (selectionHint === "event") {
      setSelection({ id: "event", type: "event", name: "Brand collab" });
      setScreen("inbox");
    } else if (suggestScreen && suggestScreen !== screen && ["inbox"].includes(suggestScreen)) {
      setScreen(suggestScreen);
    }

    pushBot(reply);
  };

  return (
    <div
      className={`auto-demo auto-demo--${theme} auto-demo--live`}
      style={{ "--auto-accent": study.accent }}
    >
      <div className="auto-demo__stage">
        <div className="auto-demo__phone">
          <span className="auto-demo__island" aria-hidden />
          <div className="auto-demo__screen" aria-live="polite">
            {theme === "roadking" ? (
              <RoadKingScreen
                screen={screen}
                selection={selection}
                onSelect={onSelect}
                onAction={onAction}
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
              <p className="auto-demo__coach-kicker">Live AI demo</p>
              <h3 id={chatId}>Chat with the automation bot</h3>
            </div>
            <span className="auto-demo__live-dot">Live</span>
          </header>

          <div className="auto-demo__chat-log" ref={listRef} role="log" aria-relevant="additions">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`auto-demo__bubble auto-demo__bubble--${m.role}`}
              >
                {m.text}
              </div>
            ))}
            {typing ? (
              <div className="auto-demo__bubble auto-demo__bubble--bot auto-demo__bubble--typing">
                <i /><i /><i />
              </div>
            ) : null}
          </div>

          <div className="auto-demo__prompts">
            {prompts.map((p) => (
              <button key={p} type="button" onClick={() => sendChat(p)}>
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
              Message the AI bot
            </label>
            <input
              id={`${chatId}-input`}
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              autoComplete="off"
            />
            <button type="submit" className="auto-demo__btn" disabled={!draft.trim() || typing}>
              Send
            </button>
          </form>
          <p className="auto-demo__chat-note">
            Tap the phone UI yourself — chat is optional guidance for the same AI automation flow.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AutomationDemo;
