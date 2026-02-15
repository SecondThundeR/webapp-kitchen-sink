import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { WebApp } from "@/lib/web-app";

export function useTelegramBackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackBtn = () => {
      navigate(-1);
    };

    if (location.pathname === "/") {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBackBtn);
    }

    return () => {
      WebApp.BackButton.offClick(handleBackBtn);
    };
  }, [location, navigate]);
}
