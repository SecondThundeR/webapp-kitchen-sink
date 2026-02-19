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
import { useDeviceStorage } from "../hooks";

export const RemoveItem = () => {
  const [key, setKey] = useState("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleRemoveItem } = useDeviceStorage();
  const [isPending, setIsPending] = useState(false);

  const onRemoveItem = async () => {
    setIsPending(true);

    try {
      await handleRemoveItem(key);
      setLastInvokeAt(new Date());
      setKey("");
    } catch (e) {
      toast.error(`[removeItem]: ${e}`);
    }

    setIsPending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>removeItem</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
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
          onClick={onRemoveItem}
          disabled={!key || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
