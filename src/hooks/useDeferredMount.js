import { useEffect, useState } from "react";

function useDeferredMount({ timeout = 1800, enabled = true } = {}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setMounted(false);
      return undefined;
    }

    const mount = () => setMounted(true);

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(mount, { timeout });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(mount, 120);
    return () => window.clearTimeout(timerId);
  }, [enabled, timeout]);

  return mounted;
}

export default useDeferredMount;
