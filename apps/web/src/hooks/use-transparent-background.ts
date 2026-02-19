import { useEffect } from "react";

export const useTransparentBackground = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("bg-transparent");
    document.body.classList.add("bg-transparent");

    return () => {
      document.documentElement.classList.remove("bg-transparent");
      document.body.classList.remove("bg-transparent");
    };
  }, [enabled]);
};
