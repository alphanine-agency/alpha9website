import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../motion/presets";
import "./Timeline.css";

function Timeline({ items, className = "" }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <ol className={`timeline ${className}`.trim()}>
        {items.map((item) => (
          <li key={item.id} className="timeline__step">
            <div className="timeline__marker" aria-hidden>
              <span className="timeline__dot" />
            </div>
            <div className="timeline__content">
              {item.label ? (
                <p className="timeline__label">{item.label}</p>
              ) : null}
              <p className="timeline__body">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <motion.ol
      className={`timeline ${className}`.trim()}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          className="timeline__step"
          variants={staggerItem}
        >
          <div className="timeline__marker" aria-hidden>
            <span className="timeline__dot" />
            {index < items.length - 1 ? (
              <span className="timeline__line" />
            ) : null}
          </div>
          <div className="timeline__content">
            {item.label ? (
              <p className="timeline__label">{item.label}</p>
            ) : null}
            <p className="timeline__body">{item.body}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}

export default Timeline;
