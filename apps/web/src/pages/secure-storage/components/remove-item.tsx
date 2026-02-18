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
import { useSecureStorage } from "../hooks";

export const RemoveItem = () => {
  const [key, setKey] = useState<string>("");
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleRemoveItem } = useSecureStorage();

  const onRemoveItem = async () => {
    if (!key) return;

    try {
      await handleRemoveItem(key);
      setLastInvokeAt(new Date());
      setKey("");
    } catch (e) {
      toast.error(`Failed to remove item "${key}": ${e}`);
    }
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
        <Button className="w-full" onClick={onRemoveItem} disabled={!key}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
