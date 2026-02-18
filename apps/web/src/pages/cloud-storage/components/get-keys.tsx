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
import { useCloudStorage } from "../hooks";

export const GetKeys = () => {
  const [keys, setKeys] = useState<string[] | null>(null);
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleGetKeys } = useCloudStorage();

  const onGetKeys = async () => {
    try {
      const keys = await handleGetKeys();
      setLastInvokeAt(new Date());
      setKeys(keys);
    } catch (e) {
      toast.error(`Failed to get keys: ${e}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>getKeys</CardTitle>
        {lastInvokeAt && (
          <CardDescription>
            Last invoked at: {lastInvokeAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      {keys && (
        <CardContent>
          Keys: {keys.length === 0 ? "No keys" : keys.join(", ")}
        </CardContent>
      )}
      <CardFooter>
        <Button className="w-full" onClick={onGetKeys}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
