import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../motion/presets";

const motionTags = {
  ul: m.ul,
  ol: m.ol,
  div: m.div,
  section: m.section,
};

function isIntrinsicElement(child) {
  return typeof child.type === "string";
}

function StaggerGroup({
  children,
  className = "",
  as = "ul",
  once = true,
  amount = 0.06,
}) {
  const reduceMotion = useReducedMotion();
  const StaticTag = as;
  const isList = as === "ul" || as === "ol";
  const defaultItem = isList ? m.li : m.div;

  if (reduceMotion) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const Tag = motionTags[as] || m.div;

  return (
    <Tag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (!isIntrinsicElement(child)) {
          return React.cloneElement(child, {
            as: isList ? m.li : defaultItem,
            variants: staggerItem,
          });
        }

        const ItemTag = m[child.type] || defaultItem;

        return (
          <ItemTag
            key={child.key}
            variants={staggerItem}
            className={child.props.className}
          >
            {child.props.children}
          </ItemTag>
        );
      })}
    </Tag>
  );
}

export default StaggerGroup;
