import { useEffect, useEffectEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { WebApp } from "@/lib/web-app";

export function useTelegramBackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackButton = useEffectEvent(() => {
    navigate(-1);
  });

  useEffect(() => {
    if (location.pathname === "/") {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBackButton);
    }

    return () => {
      WebApp.BackButton.offClick(handleBackButton);
    };
  }, [location]);
}
