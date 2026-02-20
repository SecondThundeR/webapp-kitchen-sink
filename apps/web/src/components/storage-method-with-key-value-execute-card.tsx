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

interface StorageMethodWithKeyValueExecuteCardProps {
  methodName: string;
  methodHandler: (key: string, value: string) => Promise<unknown>;
}

export const StorageMethodWithKeyValueExecuteCard = ({
  methodName,
  methodHandler,
}: StorageMethodWithKeyValueExecuteCardProps) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    try {
      await methodHandler(key, value);
      setLastInvokeAt(new Date());
      setKey("");
      setValue("");
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
      <CardContent className="flex flex-col gap-2">
        <Input
          id={`${methodName}-key`}
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Enter key"
        />
        <Input
          id={`${methodName}-value`}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Enter value"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onClick}
          disabled={!key || !value || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
