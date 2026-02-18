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
import { useCloudStorage } from "../hooks";

export const SetItem = () => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleSetItem } = useCloudStorage();

  const onSetItem = async () => {
    if (!key || !value) return;

    try {
      await handleSetItem(key, value);
      setLastInvokeAt(new Date());
      setKey("");
      setValue("");
    } catch (e) {
      toast.error(`Failed to set "${value}" to "${key}": ${e}`);
    }
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
          disabled={!key || !value}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
