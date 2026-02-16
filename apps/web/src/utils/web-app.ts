import { WebApp } from "@/lib/web-app";

export const requiresVersion = (version: string, callback: () => void) => {
  if (WebApp.isVersionAtLeast(version)) return callback();
};
