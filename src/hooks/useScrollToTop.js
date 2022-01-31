import { useEffect } from "react";

export default function useScrollToTop(deps) {
  useEffect(() => {
    setTimeout(
      () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }),
      300
    );
  }, [deps]);
}
