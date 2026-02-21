import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top before the new page is painted, so the user never sees
 * the wrong scroll position.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
