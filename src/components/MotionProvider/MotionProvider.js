import React from "react";
import { LazyMotion, domAnimation } from "framer-motion";

function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

export default MotionProvider;
