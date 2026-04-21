import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { savePreparedKeyboardButton } from "@/lib/queries";
import { WebApp } from "@/lib/web-app";

export const RequestChat = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      savePreparedKeyboardButton({
        initData: WebApp.initData,
      }),
  });

  const onExecute = async () => {
    let requestId: string | null = null;

    try {
      const data = await mutateAsync();
      requestId = data.id;
    } catch (e) {
      toast.error(
        `Failed to call savePreparedKeyboardButton: ${JSON.stringify(e)}`,
      );
    }

    if (!requestId) return;
    WebApp.requestChat(requestId, (success) => {
      if (success) {
        toast.success("Message was successfully shared to requested chat");
      } else {
        toast.error(
          "Unable to send message or cancelled message send to requested chat",
        );
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>requestChat</CardTitle>
        <CardDescription>
          Currently backend will call savePreparedKeyboardButton with predefined
          params
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={onExecute} disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          {isPending ? "Executing" : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  );
};
