import { TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ErrorScreenProps {
  title?: string;
  message?: string;
}

export const ErrorScreen = ({
  title = "Something went wrong",
  message,
}: ErrorScreenProps) => {
  return (
    <Empty className="flex-1">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlertIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {message && <EmptyDescription>{message}</EmptyDescription>}
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      </EmptyContent>
    </Empty>
  );
};
