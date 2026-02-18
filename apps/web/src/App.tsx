import { useQuery } from "@tanstack/react-query";
import { BanIcon, BugIcon } from "lucide-react";
import { RouterProvider } from "react-router";
import { WebApp } from "@/lib/web-app";
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

function App() {
  const { isPending, error: validationError } = useQuery({
    queryKey: ["init"],
    queryFn: () => initSession({ initData: WebApp.initData }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useThemeSync();

  if (!WebApp.initData) {
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
