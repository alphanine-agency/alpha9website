import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./PageLoader.css";

function PageLoader({ label = "Loading" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="page-loader"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="page-loader__spinner" aria-hidden>
        <span className="page-loader__ring page-loader__ring--outer" />
        <span className="page-loader__ring page-loader__ring--inner" />
        <span className="page-loader__core" />
      </div>
      <p className="page-loader__label">{label}</p>
    </motion.div>
  );
}

export default PageLoader;
