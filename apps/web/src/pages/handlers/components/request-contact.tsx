import { useEffect, useEffectEvent, useState } from "react";
import type { ContactRequestedCallback } from "telegram-web-app";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

export const RequestContact = () => {
  const [lastRequestStatus, setLastRequestStatus] = useState("");

  const handleContactRequested: ContactRequestedCallback = useEffectEvent(
    (data) => {
      setLastRequestStatus(data.status);
    },
  );

  useEffect(() => {
    WebApp.onEvent("contactRequested", handleContactRequested);

    return () => {
      WebApp.offEvent("contactRequested", handleContactRequested);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>requestContact</CardTitle>
        {lastRequestStatus && (
          <CardDescription>
            Last request status: {lastRequestStatus}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button className="w-full" onClick={() => WebApp.requestContact()}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
