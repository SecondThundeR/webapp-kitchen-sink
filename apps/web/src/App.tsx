import { useQuery } from "@tanstack/react-query";
import { BanIcon, BugIcon, CircleAlertIcon } from "lucide-react";
import { RouterProvider } from "react-router";
import { WebApp } from "@/lib/web-app";
import { SendData } from "./components/send-data";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./components/ui/empty";
import { Spinner } from "./components/ui/spinner";
import { router } from "./constants/router";
import { useThemeSync } from "./hooks/use-theme-sync";
import { initSession } from "./lib/queries";

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");

function App() {
  const { isPending, error: validationError } = useQuery({
    queryKey: ["init"],
    queryFn: () => initSession({ initData: WebApp.initData }),
    enabled: !!WebApp.initData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useThemeSync();

  if (!WebApp.initData) {
    if (mode === "keyboard") {
      return (
        <div className="flex flex-col gap-2">
          <Empty className="flex-1">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CircleAlertIcon />
              </EmptyMedia>
              <EmptyTitle>Limited mode</EmptyTitle>
              <EmptyDescription>
                You launched this application via KeyboardButton
                <br />
                <br />
                In this mode, app doesn't recieve initData and backend can't
                validate who accessed this app
                <br />
                <br />
                However, in this mode you can use sendData API to communicate
                with the bot. Be aware that after you execute sendData,
                application will close
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <SendData />
        </div>
      );
    }

    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BanIcon />
          </EmptyMedia>
          <EmptyTitle>Access Denied</EmptyTitle>
          <EmptyDescription>
            This application can only be accessed through Telegram. Please open
            this app via Telegram bot
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (isPending) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Spinner className="size-8" />
        <p className="leading-7 mt-3">Loading...</p>
      </div>
    );
  }

  if (validationError) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BugIcon />
          </EmptyMedia>
          <EmptyTitle>Invalid session</EmptyTitle>
          <EmptyDescription>{validationError.message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
