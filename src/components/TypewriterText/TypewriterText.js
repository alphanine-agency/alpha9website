import React, { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./TypewriterText.css";

function buildFullText(text, segments) {
  if (text) return text;
  return segments.map((s) => s.text).join("");
}

function renderTyped(segments, text, charCount) {
  if (text) {
    return text.slice(0, charCount);
  }

  let consumed = 0;
  const nodes = [];

  segments.forEach((segment, i) => {
    if (consumed >= charCount) return;

    const take = Math.min(segment.text.length, charCount - consumed);
    if (take <= 0) return;

    const slice = segment.text.slice(0, take);
    consumed += take;

    if (segment.className) {
      nodes.push(
        <span key={`${i}-${segment.className}`} className={segment.className}>
          {slice}
        </span>
      );
    } else {
      nodes.push(<React.Fragment key={i}>{slice}</React.Fragment>);
    }
  });

  return nodes;
}

function TypewriterText({
  text,
  segments,
  as: Tag = "span",
  className = "",
  speed = 38,
  delay = 320,
  showCursor = true,
  startOnMount = true,
  id,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const fullText = useMemo(
    () => buildFullText(text, segments),
    [text, segments]
  );
  const [charCount, setCharCount] = useState(() =>
    reduceMotion ? fullText.length : 0
  );
  const [done, setDone] = useState(reduceMotion);

  useEffect(() => {
    if (!startOnMount || reduceMotion) {
      setCharCount(fullText.length);
      setDone(true);
      return undefined;
    }

    setCharCount(0);
    setDone(false);

    let intervalId;
    const delayId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCharCount((prev) => {
          if (prev >= fullText.length) {
            window.clearInterval(intervalId);
            setDone(true);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(delayId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [fullText, reduceMotion, speed, delay, startOnMount]);

  const isTyping = !done && charCount < fullText.length;

  return (
    <Tag
      id={id}
      className={[
        "typewriter-text",
        isTyping && "typewriter-text--typing",
        done && "typewriter-text--done",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={fullText}
      {...rest}
    >
      {renderTyped(segments, text, charCount)}
      {showCursor && !reduceMotion ? (
        <span
          className={`typewriter-cursor${isTyping ? "" : " typewriter-cursor--idle"}`}
          aria-hidden
        />
      ) : null}
    </Tag>
  );
}

export default TypewriterText;
