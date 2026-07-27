import { FrownIcon } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { WebApp } from "@/lib/web-app";

interface WebAppVersionProps extends PropsWithChildren {
  version: string;
  fallback?: ReactNode;
}

export const WebAppVersion = ({
  version,
  fallback = null,
  children,
}: WebAppVersionProps) => {
  if (!WebApp.isVersionAtLeast(version)) return fallback;

  return children;
};

interface UnsupportedVersionProps {
  version: string;
}

export const UnsupportedVersion = ({ version }: UnsupportedVersionProps) => {
  return (
    <Empty className="flex-1">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FrownIcon />
        </EmptyMedia>
        <EmptyTitle>Not supported</EmptyTitle>
        <EmptyDescription>
          It looks like you trying to use something for Bot API v{version}+, but
          you currently support v{WebApp.version}
          <br />
          Try to use other Telegram client that support latest features
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
