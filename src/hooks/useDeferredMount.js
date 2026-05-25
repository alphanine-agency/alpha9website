import { useEffect, useState } from "react";

function getDeferredTimeout(fallback = 1800) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const isDesktop = window.matchMedia("(min-width: 981px)").matches;
  return isDesktop ? 4200 : 2200;
}

function useDeferredMount({ timeout, enabled = true } = {}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setMounted(false);
      return undefined;
    }

    const resolvedTimeout = timeout ?? getDeferredTimeout();
    const mount = () => setMounted(true);

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(mount, { timeout: resolvedTimeout });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(mount, 120);
    return () => window.clearTimeout(timerId);
  }, [enabled, timeout]);

  return mounted;
}

export default useDeferredMount;
