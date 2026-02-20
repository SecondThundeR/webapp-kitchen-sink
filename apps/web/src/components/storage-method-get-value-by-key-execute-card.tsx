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

interface StorageMethodGetValueByKeyExecuteCardProps {
  methodName: string;
  methodHandler: (key: string) => Promise<string | null>;
}

export const StorageMethodGetValueByKeyExecuteCard = ({
  methodName,
  methodHandler,
}: StorageMethodGetValueByKeyExecuteCardProps) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState<string | null>("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    try {
      const value = await methodHandler(key);
      setValue(value);
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
      <CardContent className="flex flex-col gap-2">
        {value && <p>Value: {value}</p>}
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
          disabled={!key || !value || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
