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
import { useSecureStorage } from "../hooks";

export const Clear = () => {
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const { handleClear } = useSecureStorage();

  const onClear = async () => {
    try {
      await handleClear();
      setLastInvokeAt(new Date());
    } catch (e) {
      toast.error(`Failed to clear items: ${e}`);
    }
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
        <Button className="w-full" onClick={onClear}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
