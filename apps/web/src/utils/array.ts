import { WebApp } from "@/lib/web-app";

export const isVersionAtLeastFilter = <T extends { version?: string }>({
  version,
}: T) => (version ? WebApp.isVersionAtLeast(version) : true);
