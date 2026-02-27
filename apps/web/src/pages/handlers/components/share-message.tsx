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
import { savePreparedInlineMessage } from "@/lib/queries";
import { WebApp } from "@/lib/web-app";

export const ShareMessage = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      savePreparedInlineMessage({
        initData: WebApp.initData,
      }),
  });

  const onExecute = async () => {
    let messageId: string | null = null;

    try {
      const data = await mutateAsync();
      messageId = data.id;
    } catch (e) {
      toast.error(
        `Failed to call savePreparedInlineMessage: ${JSON.stringify(e)}`,
      );
    }

    if (!messageId) return;
    WebApp.shareMessage(messageId, (success) => {
      if (success) {
        toast.success("Message was successfully shared");
      } else {
        toast.error("Unable to send message or cancelled message send");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>shareMessage</CardTitle>
        <CardDescription>
          Currently backend will call savePreparedInlineMessage with article
          message parameters
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
