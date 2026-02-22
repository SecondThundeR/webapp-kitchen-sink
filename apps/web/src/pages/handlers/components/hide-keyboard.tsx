import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { WebApp } from "@/lib/web-app";

export const HideKeyboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>hideKeyboard</CardTitle>
        <CardDescription>
          Use input to trigger on-screen keyboard or button to trigger focus on
          input
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <Input ref={inputRef} placeholder="I'm just a dummy input" />
        </Field>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => {
            WebApp.hideKeyboard();
          }}
        >
          Execute
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          Trigger input focus
        </Button>
      </CardFooter>
    </Card>
  );
};
