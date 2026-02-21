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
  }, []);

  return colorScheme;
};

export const useViewport = () => {
  const [isStateStable, setIsStateStable] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(
    () => WebApp.viewportHeight,
  );
  const [viewportStableHeight, setViewportStableHeight] = useState(
    () => WebApp.viewportStableHeight,
  );
  const [isExpanded, setIsExpanded] = useState(() => WebApp.isExpanded);

  const handleViewportChanged: ViewportChangedCallback = useEffectEvent(
    ({ isStateStable }) => {
      setViewportHeight(WebApp.viewportHeight);
      if (isStateStable) {
        setViewportStableHeight(WebApp.viewportHeight);
      }
      setIsStateStable(isStateStable);
      if (isExpanded !== WebApp.isExpanded) {
        setIsExpanded(WebApp.isExpanded);
      }
    },
  );

  useEffect(() => {
    WebApp.onEvent("viewportChanged", handleViewportChanged);

    return () => {
      WebApp.offEvent("viewportChanged", handleViewportChanged);
    };
  }, []);

  return {
    isExpanded,
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
