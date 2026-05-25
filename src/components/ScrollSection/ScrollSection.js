import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { fadeUp } from "../../motion/presets";
import "./ScrollSection.css";

const motionTags = {
  section: m.section,
  div: m.div,
  article: m.article,
  header: m.header,
  li: m.li,
};

function ScrollSection({ children, className = "", as: Tag = "motion.div", ...rest }) {
  const reduceMotion = useReducedMotion();
  const StaticTag = Tag;

  if (reduceMotion) {
    return (
      <StaticTag
        className={`scroll-section scroll-section--visible ${className}`.trim()}
        {...rest}
      >
        {children}
      </StaticTag>
    );
  }

  const MotionTag = motionTags[Tag] || m.div;

  return (
    <MotionTag
      className={`scroll-section ${className}`.trim()}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default ScrollSection;
