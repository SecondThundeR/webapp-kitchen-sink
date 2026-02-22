import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { useTelegramBackButton } from "@/hooks/use-telegram-back-button";
import { Spinner } from "@/components/ui/spinner";

export const RootLayout = () => {
  useTelegramBackButton();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Spinner className="size-8" />
          <p className="leading-7 mt-3">Loading...</p>
        </div>
      ) : (
        <Outlet />
      )}
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
