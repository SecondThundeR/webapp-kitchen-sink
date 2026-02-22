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

export const SendData = () => {
  const [data, setData] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>sendData</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <Field>
            <Input
              id="data"
              value={data}
              onChange={(e) => setData(e.currentTarget.value)}
              placeholder="Enter data"
              maxLength={4096}
            />
          </Field>
        </Field>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            WebApp.sendData(data);
          }}
          disabled={!data}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
