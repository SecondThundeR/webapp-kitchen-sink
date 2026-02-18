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
import { useDeviceStorage } from "../hooks";

export const GetItem = () => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string | null>(null);
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleGetItem } = useDeviceStorage();

  const onGetItem = async () => {
    if (!key) return;

    try {
      const value = await handleGetItem(key);
      setValue(value);
      setLastInvokeAt(new Date());
      setKey("");
    } catch (e) {
      toast.error(`Failed to get item "${key}": ${e}`);
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
        <Button className="w-full" onClick={onGetItem} disabled={!key}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
