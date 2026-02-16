import { useEffect, useState } from "react";
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

  useEffect(() => {
    WebApp.onEvent("contactRequested", (data) => {
      setLastRequestStatus(data.status);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Contact</CardTitle>
        {lastRequestStatus && (
          <CardDescription>
            Last request status: {lastRequestStatus}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button className="w-full" onClick={() => WebApp.requestContact()}>
          Request contact
        </Button>
      </CardFooter>
    </Card>
  );
};
