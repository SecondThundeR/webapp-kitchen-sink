import { FrownIcon } from "lucide-react";
import type { ComponentType } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { WebApp } from "@/lib/web-app";

interface WithAppVersionOptions {
  version: string;
  enablePlaceholder?: boolean;
}

export function withWebAppVersion<P extends {}>(
  WrappedComponent: ComponentType<P>,
  { version, enablePlaceholder }: WithAppVersionOptions,
) {
  return function WithVersionControlWrapper(props: P) {
    const isSupported = WebApp.isVersionAtLeast(version);

    if (isSupported) {
      return <WrappedComponent {...props} />;
    }

    if (enablePlaceholder) {
      return (
        <Empty className="flex-1">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FrownIcon />
            </EmptyMedia>
            <EmptyTitle>Not supported</EmptyTitle>
            <EmptyDescription>
              It looks like you trying to use something for Bot API v{version}+,
              but you currently support v{WebApp.version}
              <br />
              Try to use other Telegram client that support latest features
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    return null;
  };
}
