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

export const RemoveItems = () => {
  const [rawKeys, setRawKeys] = useState<string>("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleRemoveItems } = useCloudStorage();
  const [isPending, setIsPending] = useState(false);

  const onRemoveItems = async () => {
    setIsPending(true);

    try {
      const keys = rawKeys.split(",");
      if (keys.length === 0) return;

      await handleRemoveItems(keys);
      setLastInvokeAt(new Date());
      setRawKeys("");
    } catch (e) {
      toast.error(`[removeItems]: ${e}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>removeItems</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
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
          onClick={onRemoveItems}
          disabled={!rawKeys || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
