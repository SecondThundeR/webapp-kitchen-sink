import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

export const InitDataViewer = () => {
  const [currentView, setCurrentView] = useState<"regular" | "unsafe">(
    "regular",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>initData{currentView === "unsafe" && "Unsafe"}</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentView((prev) =>
                prev === "unsafe" ? "regular" : "unsafe",
              )
            }
          >
            Show initData{currentView === "regular" && "Unsafe"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="wrap-anywhere whitespace-pre-wrap font-mono">
          {currentView === "regular"
            ? decodeURIComponent(WebApp.initData)
            : JSON.stringify(WebApp.initDataUnsafe, null, 4)}
        </div>
      </CardContent>
    </Card>
  );
};
