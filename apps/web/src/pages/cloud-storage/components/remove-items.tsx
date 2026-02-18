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

export const RemoveItems = () => {
  const [rawKeys, setRawKeys] = useState<string>("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleRemoveItems } = useCloudStorage();

  const onRemoveItems = async () => {
    if (!rawKeys) return;

    const keys = rawKeys.split(",");
    if (keys.length === 0) return;

    try {
      await handleRemoveItems(keys);
      setLastInvokeAt(new Date());
      setRawKeys("");
    } catch (e) {
      toast.error(`Failed to remove items "${keys.join('", "')}": ${e}`);
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
        <Button className="w-full" onClick={onRemoveItems} disabled={!rawKeys}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
