import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const ScrollToTop = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, [pathname]);

  return null;
};

export default ScrollToTop;
