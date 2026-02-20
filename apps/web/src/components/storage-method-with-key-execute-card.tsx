import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

interface StorageMethodWithKeyExecuteCardProps {
  methodName: string;
  methodHandler: (key: string) => Promise<unknown>;
}

export const StorageMethodWithKeyExecuteCard = ({
  methodName,
  methodHandler,
}: StorageMethodWithKeyExecuteCardProps) => {
  const [key, setKey] = useState("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    try {
      await methodHandler(key);
      setLastInvokeAt(new Date());
      setKey("");
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
      <CardContent>
        <Input
          id={`${methodName}-key`}
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Enter key"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onClick}
          disabled={!key || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
