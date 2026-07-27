import { useQuery } from "@tanstack/react-query";
import { BanIcon, CircleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { toast } from "sonner";
import { launchMode } from "@/lib/launch-params";
import { WebApp } from "@/lib/web-app";
import { SendData } from "./components/send-data";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./components/ui/empty";
import { useThemeSync } from "./hooks/use-theme-sync";
import { validateSession } from "./lib/queries";
import { router } from "./routes";

function App() {
  const { error: validationError } = useQuery({
    queryKey: ["validate"],
    queryFn: validateSession,
    enabled: !!WebApp.initData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useThemeSync();

  useEffect(() => {
    if (validationError) {
      toast.error(`Invalid session: ${validationError.message}`);
    }
  }, [validationError]);

  if (!WebApp.initData) {
    if (launchMode === "keyboard") {
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

  return <RouterProvider router={router} />;
}

export default App;
