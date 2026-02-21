import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WebApp } from "@/lib/web-app";

export const ShowAlert = () => {
  const [message, setMessage] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>showAlert</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter message"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            WebApp.showAlert(message, () => {
              toast.info("Alert modal was closed");
            })
          }
          disabled={!message}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
