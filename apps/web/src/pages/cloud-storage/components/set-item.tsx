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

export const SetItem = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleSetItem } = useCloudStorage();
  const [isPending, setIsPending] = useState(false);

  const onSetItem = async () => {
    setIsPending(true);

    try {
      await handleSetItem(key, value);
      setLastInvokeAt(new Date());
      setKey("");
      setValue("");
    } catch (e) {
      toast.error(`[setItem]: ${e}`);
    }

    setIsPending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>setItem</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Input
          id="key"
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Enter key"
        />
        <Input
          id="value"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Enter value"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onSetItem}
          disabled={!key || !value || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
