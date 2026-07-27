import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { LoadingScreen } from "@/components/loading-screen";
import { useTelegramBackButton } from "@/hooks/use-telegram-back-button";

export const RootLayout = () => {
  useTelegramBackButton();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading ? <LoadingScreen /> : <Outlet />}
      <ScrollRestoration />
    </>
  );
};
