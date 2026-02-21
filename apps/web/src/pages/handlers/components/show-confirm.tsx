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

export const ShowConfirm = () => {
  const [message, setMessage] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>showConfirm</CardTitle>
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
            WebApp.showConfirm(message, (success) => {
              if (success) {
                toast.success('Confirm modal was clicked "OK"');
              } else {
                toast.error('Confirm modal was clicked "Cancel"');
              }
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
