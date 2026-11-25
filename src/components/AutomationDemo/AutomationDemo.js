import React, { useCallback, useEffect, useId, useState } from "react";
import "./AutomationDemo.css";

function DemoScreen({ theme, screen, client }) {
  if (theme === "roadking") {
    if (screen === "inbox") {
      return (
        <div className="auto-demo__ui">
          <header className="auto-demo__ui-bar">
            <span>Lead Inbox</span>
            <em>AI live</em>
          </header>
          <article className="auto-demo__card auto-demo__card--pulse">
            <p className="auto-demo__badge">Meta · New</p>
            <h4>Ahmed R. · Lahore</h4>
            <p>Interested in Road King EV scooter pricing & test ride.</p>
          </article>
          <article className="auto-demo__card auto-demo__card--muted">
            <p className="auto-demo__badge">Dealer</p>
            <h4>City Motors</h4>
            <p>Partnership inquiry — Karachi.</p>
          </article>
        </div>
      );
    }
    if (screen === "qualify") {
      return (
        <div className="auto-demo__ui">
          <header className="auto-demo__ui-bar">
            <span>AI Qualify</span>
            <em>92%</em>
          </header>
          <div className="auto-demo__score">
            <strong>92</strong>
            <span>Intent score</span>
          </div>
          <ul className="auto-demo__list">
            <li>
              <span>City</span>
              <b>Lahore</b>
            </li>
            <li>
              <span>Product</span>
              <b>EV Scooter</b>
            </li>
            <li>
              <span>Budget signal</span>
              <b>High</b>
            </li>
            <li>
              <span>Channel</span>
              <b>Meta Lead Form</b>
            </li>
          </ul>
        </div>
      );
    }
    if (screen === "route") {
      return (
        <div className="auto-demo__ui">
          <header className="auto-demo__ui-bar">
            <span>Route</span>
            <em>Auto</em>
          </header>
          <div className="auto-demo__route is-active">
            <p>Sales team</p>
            <span>Customer purchase path</span>
          </div>
          <div className="auto-demo__route">
            <p>Dealership desk</p>
            <span>Partner acquisition path</span>
          </div>
          <p className="auto-demo__hint">Routed to Sales · Lahore pod</p>
        </div>
      );
    }
    if (screen === "followup") {
      return (
        <div className="auto-demo__ui">
          <header className="auto-demo__ui-bar">
            <span>Follow-up</span>
            <em>Queued</em>
          </header>
          <div className="auto-demo__msg">
            <p>Hi Ahmed — thanks for your interest in Road King EV.</p>
            <p>A specialist will share pricing & book your test ride.</p>
          </div>
          <div className="auto-demo__actions">
            <span>WhatsApp</span>
            <span>Call task</span>
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
        <p>Ahmed R. · Sales · Follow-up sent</p>
        <p className="auto-demo__hint">{client} AI automation loop complete</p>
      </div>
    );
  }

  // Padel Chase screens
  if (screen === "inbox") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Inquiries</span>
          <em>Live</em>
        </header>
        <article className="auto-demo__card auto-demo__card--pulse">
          <p className="auto-demo__badge">Instagram · New</p>
          <h4>Sara K.</h4>
          <p>Can I book a court for tomorrow evening?</p>
        </article>
        <article className="auto-demo__card auto-demo__card--muted">
          <p className="auto-demo__badge">Event</p>
          <h4>Brand collab</h4>
          <p>Sponsorship ask for Grand Slam.</p>
        </article>
      </div>
    );
  }
  if (screen === "qualify") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>AI Classify</span>
          <em>Player</em>
        </header>
        <div className="auto-demo__route is-active">
          <p>Court booking</p>
          <span>Player pathway</span>
        </div>
        <div className="auto-demo__route">
          <p>Event / partner</p>
          <span>Sponsorship pathway</span>
        </div>
        <ul className="auto-demo__list">
          <li>
            <span>Type</span>
            <b>Player</b>
          </li>
          <li>
            <span>When</span>
            <b>Tomorrow PM</b>
          </li>
          <li>
            <span>Channel</span>
            <b>Instagram</b>
          </li>
        </ul>
      </div>
    );
  }
  if (screen === "slots") {
    return (
      <div className="auto-demo__ui">
        <header className="auto-demo__ui-bar">
          <span>Open slots</span>
          <em>4 courts</em>
        </header>
        <div className="auto-demo__slots">
          <span>6:00 PM</span>
          <span className="is-active">7:00 PM</span>
          <span>8:00 PM</span>
          <span className="is-busy">9:00 PM</span>
        </div>
        <div className="auto-demo__courts">
          <span>Court 01 · Open</span>
          <span className="is-active">Court 02 · Select</span>
          <span className="is-busy">Court 03 · Full</span>
          <span>Court 04 · Open</span>
        </div>
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
          <p>Tomorrow · 7:00 PM</p>
          <span>Court 02 · 90 min</span>
        </div>
        <div className="auto-demo__cta-fake">Confirm booking</div>
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
      <h4>Court confirmed</h4>
      <p>Sara K. · Court 02 · WhatsApp sent</p>
      <p className="auto-demo__hint">{client} booking loop complete</p>
    </div>
  );
}

function AutomationDemo({ study }) {
  const steps = study.demoSteps || [];
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const tipId = useId();
  const theme = study.theme || (study.slug === "roadking" ? "roadking" : "padel");
  const step = steps[index] || null;
  const total = steps.length;
  const isLast = index >= total - 1;

  const goNext = useCallback(() => {
    if (!started) {
      setStarted(true);
      setIndex(0);
      return;
    }
    if (isLast) {
      setIndex(0);
      setStarted(false);
      return;
    }
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [started, isLast, total]);

  const goBack = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    setIndex(0);
    setStarted(false);
  }, [study.slug]);

  if (!step) return null;

  return (
    <div
      className={`auto-demo auto-demo--${theme}${started ? " auto-demo--live" : ""}`}
      style={{ "--auto-accent": study.accent }}
    >
      <div className="auto-demo__stage">
        <div className="auto-demo__phone" aria-hidden={!started}>
          <span className="auto-demo__island" />
          <div className="auto-demo__screen" aria-live="polite">
            <DemoScreen theme={theme} screen={step.screen} client={study.client} />
          </div>
          <span className="auto-demo__home" />
        </div>

        <aside className="auto-demo__coach" aria-labelledby={tipId}>
          {!started ? (
            <>
              <p className="auto-demo__coach-kicker">Interactive demo</p>
              <h3 id={tipId}>Try the AI automation flow</h3>
              <p className="auto-demo__coach-copy">{study.demoPitch}</p>
              <ol className="auto-demo__coach-list">
                <li>Tap Next to advance each screen</li>
                <li>Watch how AI moves the lead</li>
                <li>See the system close the loop</li>
              </ol>
              <button type="button" className="auto-demo__btn" onClick={goNext}>
                Start demo
              </button>
            </>
          ) : (
            <>
              <p className="auto-demo__coach-kicker">
                Step {index + 1} / {total}
              </p>
              <h3 id={tipId}>{step.title}</h3>
              <p className="auto-demo__coach-copy">{step.tip}</p>
              <div className="auto-demo__progress" aria-hidden>
                {steps.map((s, i) => (
                  <i
                    key={s.id}
                    className={i <= index ? "is-on" : undefined}
                  />
                ))}
              </div>
              <div className="auto-demo__nav">
                <button
                  type="button"
                  className="auto-demo__btn auto-demo__btn--ghost"
                  onClick={goBack}
                  disabled={index === 0}
                >
                  Back
                </button>
                <button type="button" className="auto-demo__btn" onClick={goNext}>
                  {isLast ? "Restart" : step.actionLabel || "Next"}
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default AutomationDemo;
