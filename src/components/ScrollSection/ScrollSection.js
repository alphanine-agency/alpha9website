import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../../motion/presets";
import "./ScrollSection.css";

const motionTags = {
  section: motion.section,
  div: motion.div,
  article: motion.article,
  header: motion.header,
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

  const MotionTag = motionTags[Tag] || motion.div;

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
