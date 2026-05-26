import { useEffect } from "react";
import { isMobileLiteMode } from "../../hooks/useMobileLite";

function MobileLiteRoot({ children }) {
  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      root.classList.toggle("mobile-lite", isMobileLiteMode());
    };

    sync();

    const queries = [
      window.matchMedia("(max-width: 820px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(hover: none)"),
    ];

    queries.forEach((mq) => mq.addEventListener("change", sync));
    return () => queries.forEach((mq) => mq.removeEventListener("change", sync));
  }, []);

  return children;
}

export default MobileLiteRoot;
