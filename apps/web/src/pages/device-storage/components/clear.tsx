import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDeviceStorage } from "../hooks";

export const Clear = () => {
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleClear } = useDeviceStorage();
  const [isPending, setIsPending] = useState(false);

  const onClear = async () => {
    setIsPending(true);

    try {
      await handleClear();
      setLastInvokeAt(new Date());
    } catch (e) {
      toast.error(`[clear]: ${e}`);
    }

    setIsPending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>clear</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={onClear} disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
