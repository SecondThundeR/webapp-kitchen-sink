import { WebApp } from "./web-app";

export const requiresVersion = (version: string, callback: () => void) => {
  if (WebApp.isVersionAtLeast(version)) return callback();
};

export const isVersionAtLeastFilter = <T extends { version?: string }>({
  version,
}: T) => (version ? WebApp.isVersionAtLeast(version) : true);
