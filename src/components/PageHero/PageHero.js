import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import TypewriterText from "../TypewriterText/TypewriterText";
import { heroItem, heroStagger } from "../../motion/presets";

function PageHero({ baseClass, eyebrow, title, lede, children, typeDelay = 380 }) {
  const reduceMotion = useReducedMotion();
  const innerClass = `${baseClass}__inner`;

  if (reduceMotion) {
    return (
      <header className={baseClass}>
        <div className={innerClass}>
          {eyebrow ? <p className={`${baseClass}__eyebrow`}>{eyebrow}</p> : null}
          <TypewriterText
            as="h1"
            className={`${baseClass}__title`}
            text={title}
          />
          {lede ? <p className={`${baseClass}__lede`}>{lede}</p> : null}
          {children}
        </div>
      </header>
    );
  }

  const ledeDelay =
    typeDelay + (typeof title === "string" ? title.length : 0) * 38 + 180;

  return (
    <header className={baseClass}>
      <motion.div
        className={innerClass}
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        {eyebrow ? (
          <motion.p className={`${baseClass}__eyebrow`} variants={heroItem}>
            {eyebrow}
          </motion.p>
        ) : null}
        <TypewriterText
          as="h1"
          className={`${baseClass}__title`}
          text={title}
          delay={typeDelay}
        />
        {lede ? (
          <motion.p
            className={`${baseClass}__lede`}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: ledeDelay / 1000,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {lede}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div variants={heroItem}>{children}</motion.div>
        ) : null}
      </motion.div>
    </header>
  );
}

export default PageHero;
