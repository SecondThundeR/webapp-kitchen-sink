import { Outlet, ScrollRestoration } from "react-router";
import { useTelegramBackButton } from "@/hooks/use-telegram-back-button";

export const RootLayout = () => {
  useTelegramBackButton();

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
