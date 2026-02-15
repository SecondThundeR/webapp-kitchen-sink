import { Outlet, ScrollRestoration } from "react-router";
import { useTelegramBackButton } from "@/hooks/use-telegram-back-button";

export const RootLayout = () => {
  useTelegramBackButton();

  return (
    <>
      <ScrollRestoration />
      <div className="h-full p-4">
        <Outlet />
      </div>
    </>
  );
};
