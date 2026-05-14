import React from "react";
import "./BrandMark.css";

function BrandMark({ compact = false }) {
  return (
    <div className={`brand-mark${compact ? " brand-mark--compact" : ""}`}>
      <span className="brand-mark__top">Alpha Nine</span>
      <span className="brand-mark__bottom">
        <span className="brand-mark__line" aria-hidden="true" />
        <span className="brand-mark__sub">Marketing</span>
        <span className="brand-mark__line" aria-hidden="true" />
      </span>
    </div>
  );
}

export default BrandMark;
