import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCloudStorage } from "../hooks";

export const GetItems = () => {
  const [rawKeys, setRawKeys] = useState<string>("");
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleGetItems } = useCloudStorage();
  const [isPending, setIsPending] = useState(false);

  const onGetItems = async () => {
    setIsPending(true);

    try {
      const keys = rawKeys.split(",");
      if (keys.length === 0) return;

      const values = await handleGetItems(keys);
      setValues(values);
      setLastInvokeAt(new Date());
      setRawKeys("");
    } catch (e) {
      toast.error(`[getItems]: ${e}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>getItems</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {values && (
          <p>
            Keys/Values:{" "}
            {Object.entries(values)
              .map(([key, value]) => `${key}/${value}`)
              .join(", ")}
          </p>
        )}
        <Input
          id="keys"
          value={rawKeys}
          onChange={(e) => setRawKeys(e.currentTarget.value)}
          placeholder="Enter keys separated by comma"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onGetItems}
          disabled={!rawKeys || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
