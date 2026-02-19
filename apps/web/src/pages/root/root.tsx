import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";
import { booleanToYesNoString } from "@/utils/format";
import { InitDataViewer } from "./components/init-data-viewer";
import { SafeAreaViewer } from "./components/safe-area-viewer";
import { ROUTES_MAPPING } from "./constants";
import { useColorScheme, useViewportHeight } from "./hooks";

export const RootPage = () => {
  const colorScheme = useColorScheme();
  const { isStateStable, viewportHeight, viewportStableHeight } =
    useViewportHeight();

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
      <Card>
        <CardHeader>
          <CardTitle className="wrap-anywhere">Viewport</CardTitle>
        </CardHeader>
        <CardContent>
          <p>isStateStable: {booleanToYesNoString(isStateStable)}</p>
          <p>height: {viewportHeight}</p>
          <p>stableHeight: {viewportStableHeight}</p>
        </CardContent>
      </Card>
      <SafeAreaViewer />
      <h2 className="text-xl">Playgrounds</h2>
      <div className="grid grid-cols-2 gap-2">
        {ROUTES_MAPPING.map(({ link, title }) => (
          <Link key={link} to={link}>
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
