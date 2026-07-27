import { Link } from "react-router";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { cn } from "@/lib/utils";
import { WebApp } from "@/lib/web-app";
import { PLAYGROUND_ROUTES } from "@/routes";
import { InitDataViewer } from "./components/init-data-viewer";
import { IsActiveViewer } from "./components/is-active-viewer";
import { SafeAreaViewer } from "./components/safe-area-viewer";
import { ViewportViewer } from "./components/viewport-viewer";

export const RootPage = () => {
  const colorScheme = useColorScheme();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 mb-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Telegram Mini Apps Kitchen Sink
        </h1>
        <p className="text-sm text-muted-foreground">
          Bot API: {WebApp.version} · Platform: {WebApp.platform} · Color
          scheme: {colorScheme}
        </p>
      </div>
      <h2 className="text-xl">Quick Info</h2>
      <InitDataViewer />
      <ViewportViewer />
      <SafeAreaViewer />
      <IsActiveViewer />
      <h2 className="text-xl">Playgrounds</h2>
      <div className="grid grid-cols-2 gap-2">
        {PLAYGROUND_ROUTES.map(({ path, title }, index) => (
          <Link
            key={path}
            to={path}
            className={cn({
              "col-span-2":
                // Is last element and amount of elements is not even
                index === PLAYGROUND_ROUTES.length - 1 &&
                PLAYGROUND_ROUTES.length % 2 !== 0,
            })}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
