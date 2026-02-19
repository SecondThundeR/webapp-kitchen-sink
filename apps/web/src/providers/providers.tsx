import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

import { client } from "@/lib/react-query";

import { SonnerProvider } from "./sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <SonnerProvider />
    </QueryClientProvider>
  );
};
