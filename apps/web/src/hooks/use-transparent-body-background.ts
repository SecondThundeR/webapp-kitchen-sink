import { useEffect } from "react";

export const useTransparentBodyBackground = () => {
  useEffect(() => {
    document.body.classList.add("bg-transparent");

    return () => {
      document.body.classList.remove("bg-transparent");
    };
  });
};
