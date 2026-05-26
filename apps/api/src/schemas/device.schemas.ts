import * as v from "valibot";

export const performanceClassSchema = v.picklist(["LOW", "AVERAGE", "HIGH"]);

export const telegramDeviceInfoSchema = v.union([
  v.object({ isTelegram: v.literal(false) }),
  v.object({
    isTelegram: v.literal(true),
    appVersion: v.optional(v.string()),
    deviceModel: v.optional(v.string()),
    androidVersion: v.optional(v.string()),
    sdkVersion: v.optional(v.pipe(v.number(), v.integer())),
    performanceClass: v.optional(performanceClassSchema),
  }),
]);

export type TelegramDeviceInfo = v.InferOutput<typeof telegramDeviceInfoSchema>;
export type PerformanceClass = v.InferOutput<typeof performanceClassSchema>;
