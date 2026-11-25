import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "./AutomationDemo.css";

const QUICK_PROMPTS = {
  roadking: ["I want a test ride in Lahore", "What is the price?", "We want a dealership"],
  padel: ["Book a court tomorrow evening", "What times are open?", "We want to sponsor an event"],
};

function detectRoadKingRole(text, persona) {
  const q = text.toLowerCase();
  if (/dealer|dealership|franchise|partner|showroom|distributor/.test(q)) return "dealer";
  if (/test ride|buy|price|scooter|bike|customer|lahore|karachi|islamabad/.test(q)) return "customer";
  return persona || "customer";
}

function detectPadelRole(text, persona) {
  const q = text.toLowerCase();
  if (/sponsor|sponsorship|event|collab|brand|tournament|grand slam/.test(q)) return "event";
  if (/book|court|slot|play|tomorrow|evening|time|available/.test(q)) return "player";
  return persona || "player";
}

function botReply({ theme, text, persona, slot, court }) {
  const q = text.toLowerCase().trim();

  if (theme === "roadking") {
    const role = detectRoadKingRole(text, persona);

    if (/thank|thanks|shukriya|great|perfect/.test(q)) {
      return {
        reply:
          role === "dealer"
            ? "You’re welcome. Our partnerships team will keep you updated on next steps."
            : "You’re welcome. Looking forward to getting you on a Road King EV soon.",
        persona: role,
      };
    }

    if (role === "dealer") {
      if (/dealer|dealership|franchise|partner|showroom|distributor|invest|apply/.test(q)) {
        return {
          reply:
            "Thanks for your interest in a Road King dealership. Please share your city, showroom status (ready / planning), and investment range — I’ll connect you with our partnerships team.",
          persona: "dealer",
          selectionHint: "dealer",
          advance: "qualify",
        };
      }
      if (/karachi|lahore|islamabad|city|rawalpindi|multan|faisalabad/.test(q)) {
        return {
          reply:
            "Noted. We review dealer applications by city coverage and readiness. A partnerships specialist will call you within 1 business day with territory details and requirements.",
          persona: "dealer",
          selectionHint: "dealer",
          advance: "followup",
        };
      }
      if (/invest|budget|capital|requirement|margin|stock/.test(q)) {
        return {
          reply:
            "Dealer requirements cover showroom standards, initial stock, and service setup. I’ll have partnerships send the official checklist and commercial sheet on WhatsApp.",
          persona: "dealer",
          selectionHint: "dealer",
          advance: "done",
        };
      }
      return {
        reply:
          "I can help with dealership partnership queries. Share your city and whether you already have a showroom, and I’ll take it from there.",
        persona: "dealer",
        selectionHint: "dealer",
      };
    }

    // Customer support / sales agent
    if (/price|cost|pkr|how much|kitna|rate/.test(q)) {
      return {
        reply:
          "Happy to help with pricing. Road King EV scooter packages vary by model and city. Which city are you in, and do you prefer a scooter or bike? I’ll share the latest offer.",
        persona: "customer",
        selectionHint: "ahmed",
        advance: "qualify",
      };
    }
    if (/test ride|demo|ride|try|book.*ride/.test(q)) {
      return {
        reply:
          "Absolutely — we can arrange a test ride. Please share your preferred city and a day that works (e.g. tomorrow evening). A sales specialist will confirm the slot with you.",
        persona: "customer",
        selectionHint: "ahmed",
        advance: "qualify",
      };
    }
    if (/lahore|karachi|islamabad|rawalpindi|multan|faisalabad/.test(q)) {
      return {
        reply:
          "Perfect, I’ve noted your city. A Road King sales agent will follow up shortly with model options, pricing, and test-ride availability near you.",
        persona: "customer",
        selectionHint: "ahmed",
        advance: "followup",
      };
    }
    if (/buy|purchase|order|interested|scooter|bike|ev/.test(q)) {
      return {
        reply:
          "Great to hear you’re interested in Road King EV. Are you looking for personal use pricing, or should I connect you for a dealership partnership instead?",
        persona: "customer",
        selectionHint: "ahmed",
        advance: "qualify",
      };
    }
    if (/whatsapp|call|contact|number|follow/.test(q)) {
      return {
        reply:
          "Done — I’ve logged a follow-up. You’ll get a WhatsApp message from our sales team with pricing and next steps. Anything else I can help with meanwhile?",
        persona: "customer",
        selectionHint: "ahmed",
        advance: "done",
      };
    }
    return {
      reply:
        "Hi — I’m with Road King EV support. I can help with models, pricing, test rides, or dealership partnership. What do you need today?",
      persona: role,
    };
  }

  // Padel Chase Inn — booking / events support
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
    if (/budget|brand|americano|grand slam|date|package/.test(q)) {
      return {
        reply:
          "Noted. Our sponsorship packages include court branding, social coverage, and on-site visibility. An events coordinator will WhatsApp you the options within a day.",
        persona: "event",
        selectionHint: "event",
        advance: "done",
      };
    }
    return {
      reply:
        "I can help with event sponsorships and brand collaborations at Padel Chase Inn. Tell me a bit about your brand and which tournament you’re interested in.",
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
  if (/location|where|address|islamabad/.test(q)) {
    return {
      reply:
        "We’re at Padel Chase Inn in Islamabad. Once your booking is confirmed, I’ll share the exact pin on WhatsApp with your slot details.",
      persona: "player",
    };
  }
  return {
    reply:
      "Hi — welcome to Padel Chase Inn. I can help you book a court or connect you for event sponsorships. What would you like to do?",
    persona: role,
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
  const [persona, setPersona] = useState(theme === "roadking" ? "customer" : "player");
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const welcome =
    theme === "roadking"
      ? "Hi — Road King EV support here. I can help with pricing, test rides, or dealership partnership. How can I help you today?"
      : "Hi — welcome to Padel Chase Inn. I can book a court for you or help with event sponsorships. What do you need?";
  const [messages, setMessages] = useState(() => [
    { id: "welcome", role: "bot", text: welcome },
  ]);

  const prompts = useMemo(() => QUICK_PROMPTS[theme] || [], [theme]);
  const chatTitle =
    theme === "roadking" ? "Road King EV support" : "Padel Chase Inn bookings";

  const pushBot = (text) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: "bot", text }]);
      setTyping(false);
    }, 380 + Math.random() * 260);
  };

  const resetFlow = () => {
    setScreen("inbox");
    setSelection(null);
    setSlot(null);
    setCourt(null);
    setPersona(theme === "roadking" ? "customer" : "player");
  };

  useEffect(() => {
    resetFlow();
    setDraft("");
    const text =
      theme === "roadking"
        ? "Hi — Road King EV support here. I can help with pricing, test rides, or dealership partnership. How can I help you today?"
        : "Hi — welcome to Padel Chase Inn. I can book a court for you or help with event sponsorships. What do you need?";
    setMessages([{ id: "welcome", role: "bot", text }]);
  }, [study.slug, theme]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const applySelectionHint = (hint) => {
    if (hint === "ahmed") {
      setSelection({ id: "ahmed", type: "customer", name: "Ahmed R." });
      setPersona("customer");
    } else if (hint === "dealer") {
      setSelection({ id: "dealer", type: "dealer", name: "City Motors" });
      setPersona("dealer");
    } else if (hint === "sara") {
      setSelection({ id: "sara", type: "player", name: "Sara K." });
      setPersona("player");
    } else if (hint === "event") {
      setSelection({ id: "event", type: "event", name: "Brand collab" });
      setPersona("event");
    }
  };

  const syncPhoneFromChat = ({ advance, selectionHint, slot: nextSlot, court: nextCourt, persona: nextPersona }) => {
    if (nextPersona) setPersona(nextPersona);
    if (selectionHint) applySelectionHint(selectionHint);
    if (nextSlot) setSlot(nextSlot);
    if (nextCourt) setCourt(nextCourt);

    if (!advance) return;
    if (advance === "qualify") setScreen("qualify");
    else if (advance === "route") setScreen("route");
    else if (advance === "followup") setScreen("followup");
    else if (advance === "slots") setScreen("slots");
    else if (advance === "confirm") setScreen("confirm");
    else if (advance === "done") setScreen("done");
    else if (advance === "inbox") setScreen("inbox");
  };

  const onSelect = (item) => {
    setSelection(item);
    setScreen("inbox");
    if (theme === "roadking") {
      setPersona(item.type === "dealer" ? "dealer" : "customer");
    } else {
      setPersona(item.type === "event" ? "event" : "player");
    }
  };

  const onAction = (action) => {
    if (action === "reset") {
      resetFlow();
      return;
    }
    if (action === "qualify") {
      setScreen("qualify");
      return;
    }
    if (action === "route") {
      setScreen("route");
      return;
    }
    if (action === "followup") {
      setScreen("followup");
      return;
    }
    if (action === "slots") {
      setScreen("slots");
      return;
    }
    if (action === "confirm") {
      setScreen("confirm");
      return;
    }
    if (action === "done") {
      setScreen("done");
      if (theme === "roadking") {
        pushBot(
          selection?.type === "dealer"
            ? "Thanks — your dealership inquiry is with our partnerships team. They’ll contact you shortly with next steps."
            : "Thanks — your request is with our sales team. You’ll hear from us on WhatsApp with pricing and test-ride options."
        );
      } else if (selection?.type === "event") {
        pushBot("Thanks — our events team has your sponsorship request and will follow up soon.");
      } else if (slot && court) {
        pushBot(
          `You’re all set — Court ${court}, tomorrow at ${slot}. WhatsApp confirmation is on the way. See you at Padel Chase Inn.`
        );
      }
    }
  };

  const sendChat = (raw) => {
    const text = (raw || draft).trim();
    if (!text || typing) return;
    setDraft("");
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text }]);

    const result = botReply({
      theme,
      text,
      persona,
      slot,
      court,
    });

    syncPhoneFromChat(result);
    pushBot(result.reply);
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
              <p className="auto-demo__coach-kicker">Live support</p>
              <h3 id={chatId}>{chatTitle}</h3>
            </div>
            <span className="auto-demo__live-dot">Online</span>
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
            Chat as a customer or partner. The phone shows the live automation desk updating as you go — you can also tap it directly.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AutomationDemo;
