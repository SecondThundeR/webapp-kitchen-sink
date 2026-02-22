import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";
import { useState } from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const OpenTelegramLink = () => {
  const [link, setLink] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>openTelegramLink</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            placeholder="Enter link"
            maxLength={4096}
          />
        </Field>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            WebApp.openTelegramLink(link);
          }}
          disabled={!link}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
