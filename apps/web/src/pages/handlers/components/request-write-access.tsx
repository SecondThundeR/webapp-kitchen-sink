import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

export const RequestWriteAccess = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>requestWriteAccess</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            WebApp.requestWriteAccess((success) => {
              if (success) {
                toast.success("Write access was granted");
              } else {
                toast.error("Failed to grant write access");
              }
            });
          }}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
