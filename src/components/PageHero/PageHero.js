import React from "react";
import { m, useReducedMotion } from "framer-motion";
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
      <m.div
        className={innerClass}
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        {eyebrow ? (
          <m.p className={`${baseClass}__eyebrow`} variants={heroItem}>
            {eyebrow}
          </m.p>
        ) : null}
        <TypewriterText
          as="h1"
          className={`${baseClass}__title`}
          text={title}
          delay={typeDelay}
        />
        {lede ? (
          <m.p
            className={`${baseClass}__lede`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: ledeDelay / 1000,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {lede}
          </m.p>
        ) : null}
        {children ? <m.div variants={heroItem}>{children}</m.div> : null}
      </m.div>
    </header>
  );
}

export default PageHero;
