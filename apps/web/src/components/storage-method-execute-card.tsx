import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

interface StorageMethodExecuteCardProps {
  methodName: string;
  methodHandler: () => Promise<unknown>;
}

export const StorageMethodExecuteCard = ({
  methodName,
  methodHandler,
}: StorageMethodExecuteCardProps) => {
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    try {
      await methodHandler();
      setLastInvokeAt(new Date());
    } catch (e) {
      toast.error(`[${methodName}]: ${e}`);
    }

    setIsPending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{methodName}</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={onClick} disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
