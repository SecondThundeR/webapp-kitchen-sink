import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
