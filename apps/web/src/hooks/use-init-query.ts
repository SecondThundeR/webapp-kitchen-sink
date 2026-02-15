import { useQuery } from "@tanstack/react-query";
import { initSession } from "@/lib/queries";
import { WebApp } from "@/lib/web-app";

export const useInitQuery = () =>
  useQuery({
    queryKey: ["init"],
    queryFn: () => initSession({ initData: WebApp.initData }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
