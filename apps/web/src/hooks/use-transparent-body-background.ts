import { useEffect } from "react";

export const useTransparentBodyBackground = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("bg-transparent");

    return () => {
      document.body.classList.remove("bg-transparent");
    };
  }, [enabled]);
};
