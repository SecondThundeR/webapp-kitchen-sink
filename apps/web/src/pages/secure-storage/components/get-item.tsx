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
import { useSecureStorage } from "../hooks";

export const GetItem = () => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string | null>(null);
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleGetItem } = useSecureStorage();
  const [isPending, setIsPending] = useState(false);

  const onGetItem = async () => {
    setIsPending(true);

    try {
      const value = await handleGetItem(key);
      setValue(value);
      setLastInvokeAt(new Date());
      setKey("");
    } catch (e) {
      toast.error(`[getItem]: ${e}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>getItem</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {value && <p>Value: {value}</p>}
        <Input
          id="key"
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Enter key"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onGetItem}
          disabled={!key || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
