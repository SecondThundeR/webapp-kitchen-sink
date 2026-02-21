import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";
import { booleanToYesNoString } from "@/utils/format";
import { useViewport } from "../hooks";

export const ViewportViewer = () => {
  const { isExpanded, isStateStable, viewportHeight, viewportStableHeight } =
    useViewport();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="wrap-anywhere">Viewport</CardTitle>
      </CardHeader>
      <CardContent>
        <p>isExpanded: {booleanToYesNoString(isExpanded)}</p>
        <p>isStateStable: {booleanToYesNoString(isStateStable)}</p>
        <p>height: {viewportHeight}</p>
        <p>stableHeight: {viewportStableHeight}</p>
      </CardContent>
      {!isExpanded && (
        <CardFooter>
          <Button className="w-full" onClick={() => WebApp.expand()}>
            Expand application
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
