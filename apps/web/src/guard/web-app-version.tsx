import type { PropsWithChildren } from "react";
import { WebApp } from "@/lib/web-app";

interface WebAppVersionGuardProps extends PropsWithChildren {
  version: string;
}

export const WebAppVersionGuard = ({
  version,
  children,
}: WebAppVersionGuardProps) => {
  if (!WebApp.isVersionAtLeast(version)) return null;

  return children;
};
