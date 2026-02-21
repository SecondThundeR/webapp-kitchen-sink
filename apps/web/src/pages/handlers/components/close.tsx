import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

export const Close = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>close</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button
          className="w-full"
          onClick={() => {
            WebApp.close();
          }}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
