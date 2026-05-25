import React from "react";
import "./PageLoader.css";

function PageLoader({ label = "Loading" }) {
  return (
    <div
      className="page-loader"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <div className="page-loader__spinner" aria-hidden>
        <span className="page-loader__ring page-loader__ring--outer" />
        <span className="page-loader__ring page-loader__ring--inner" />
        <span className="page-loader__core" />
      </div>
      <p className="page-loader__label">{label}</p>
    </div>
  );
}

export default PageLoader;
