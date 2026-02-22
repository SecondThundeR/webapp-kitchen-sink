import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebApp } from "@/lib/web-app";

const canSupportTryInstantView = WebApp.isVersionAtLeast("6.4");

export const OpenLink = () => {
  const [link, setLink] = useState("");
  const [tryInstantView, setTryInstantView] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>openLink</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            placeholder="Enter link"
            maxLength={4096}
          />
        </Field>
        {canSupportTryInstantView && (
          <Field orientation="horizontal">
            <Checkbox
              id="try-instant-view"
              name="try-instant-view"
              checked={tryInstantView}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") return;
                setTryInstantView(checked);
              }}
            />
            <Label htmlFor="try-instant-view">Try instant view</Label>
          </Field>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            WebApp.openLink(
              link,
              canSupportTryInstantView
                ? { try_instant_view: tryInstantView }
                : undefined,
            );
          }}
          disabled={!link}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
