import { useEffect, useState } from "react";

export function isMobileLiteMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const narrow = window.matchMedia("(max-width: 820px)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;

  return narrow || coarsePointer || noHover;
}

function useMobileLite() {
  const [lite, setLite] = useState(() => isMobileLiteMode());

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 820px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(hover: none)"),
    ];

    const sync = () => setLite(isMobileLiteMode());

    sync();
    queries.forEach((mq) => mq.addEventListener("change", sync));
    return () => queries.forEach((mq) => mq.removeEventListener("change", sync));
  }, []);

  return lite;
}

export default useMobileLite;
