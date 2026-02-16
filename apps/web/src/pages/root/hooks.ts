import { useEffect, useEffectEvent, useState } from "react";
import type { ViewportChangedCallback } from "telegram-web-app";
import { WebApp } from "@/lib/web-app";

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState(() => WebApp.colorScheme);

  const syncColorScheme = useEffectEvent(() => {
    setColorScheme(WebApp.colorScheme);
  });

  useEffect(() => {
    syncColorScheme();

    WebApp.onEvent("themeChanged", syncColorScheme);

    return () => {
      WebApp.offEvent("themeChanged", syncColorScheme);
    };
  });

  return colorScheme;
};

export const useViewportHeight = () => {
  const [isStateStable, setIsStateStable] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(
    () => WebApp.viewportHeight,
  );
  const [viewportStableHeight, setViewportStableHeight] = useState(
    () => WebApp.viewportStableHeight,
  );

  const handleViewportChanged: ViewportChangedCallback = useEffectEvent(
    ({ isStateStable }) => {
      setViewportHeight(WebApp.viewportHeight);
      if (isStateStable) {
        setViewportStableHeight(WebApp.viewportHeight);
      }
      setIsStateStable(isStateStable);
    },
  );

  useEffect(() => {
    WebApp.onEvent("viewportChanged", handleViewportChanged);

    return () => {
      WebApp.offEvent("viewportChanged", handleViewportChanged);
    };
  }, []);

  return {
    isStateStable,
    viewportHeight,
    viewportStableHeight,
  };
};

export const useSafeAreaInset = () => {
  const [safeAreaInset, setSafeAreaInset] = useState(
    () => WebApp.safeAreaInset,
  );
  const [contentSafeAreaInset, setContentSafeAreaInset] = useState(
    () => WebApp.contentSafeAreaInset,
  );

  const handleSafeAreaChanged = useEffectEvent(() => {
    setSafeAreaInset(WebApp.safeAreaInset);
  });

  const handleContentSafeAreaChanged = useEffectEvent(() => {
    setContentSafeAreaInset(WebApp.contentSafeAreaInset);
  });

  useEffect(() => {
    handleSafeAreaChanged();
    handleContentSafeAreaChanged();

    WebApp.onEvent("safeAreaChanged", handleSafeAreaChanged);
    WebApp.onEvent("contentSafeAreaChanged", handleContentSafeAreaChanged);

    return () => {
      WebApp.offEvent("safeAreaChanged", handleSafeAreaChanged);
      WebApp.offEvent("contentSafeAreaChanged", handleContentSafeAreaChanged);
    };
  }, []);

  return {
    safeAreaInset,
    contentSafeAreaInset,
  };
};
