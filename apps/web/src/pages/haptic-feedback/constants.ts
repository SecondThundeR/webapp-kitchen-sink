import type { WebApp } from "@/lib/web-app";

export const HAPTIC_FEEDBACK_IMPACT_OCCURED_VALUES: Parameters<
  (typeof WebApp)["HapticFeedback"]["impactOccurred"]
>[0][] = ["light", "medium", "heavy", "rigid", "soft"];

export const HAPTIC_FEEDBACK_NOTIFICATION_OCCURED_VALUES: Parameters<
  (typeof WebApp)["HapticFeedback"]["notificationOccurred"]
>[0][] = ["error", "success", "warning"];
