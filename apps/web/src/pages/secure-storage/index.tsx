import { FrownIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { WebApp } from "@/lib/web-app";
import { Clear } from "./components/clear";
import { GetItem } from "./components/get-item";
import { RemoveItem } from "./components/remove-item";
import { RestoreItem } from "./components/restore-item";
import { SetItem } from "./components/set-item";
import { UNSUPPORTED_PLATFORMS } from "./constants";

const SecureStorageComponent = () => {
  if (UNSUPPORTED_PLATFORMS.includes(WebApp.platform)) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FrownIcon />
          </EmptyMedia>
          <EmptyTitle>Not supported</EmptyTitle>
          <EmptyDescription>
            This client doesn't support SecureStorage
            <br />
            Try to use other Telegram client that supports it
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Secure Storage Playground
      </h1>
      <div className="flex flex-col gap-4">
        <SetItem />
        <GetItem />
        <RestoreItem />
        <RemoveItem />
        <Clear />
      </div>
    </div>
  );
};

export const SecureStorage = withWebAppVersion(SecureStorageComponent, {
  version: "9.0",
  enablePlaceholder: true,
});
