import { createHmac, timingSafeEqual } from "node:crypto";
import * as v from "valibot";
import { INIT_DATA_MAX_AGE_SECONDS } from "#root/constants.js";
import type { User } from "#root/schemas/user.schemas.js";
import { userSchema } from "#root/schemas/user.schemas.js";
import { logger } from "./log.ts";

export type ValidateInitDataResult =
  | { valid: true; data: Record<string, string>; user?: User }
  | { valid: false; error: string };

// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
export function validateInitData(
  initData: string,
  botToken: string,
): ValidateInitDataResult {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get("hash");
    if (!hash) {
      return { valid: false, error: "Missing hash" };
    }

    urlParams.delete("hash");

    const params: string[] = [];
    urlParams.forEach((value, key) => {
      params.push(`${key}=${value}`);
    });
    params.sort();
    const dataCheckString = params.join("\n");

    const secretKey = createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();
    const calculatedHash = createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    const a = Buffer.from(calculatedHash, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length === 0 || a.length !== b.length || !timingSafeEqual(a, b)) {
      return { valid: false, error: "Invalid hash" };
    }

    const authDate = urlParams.get("auth_date");
    if (authDate) {
      const authTimestamp = parseInt(authDate, 10);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp - authTimestamp > INIT_DATA_MAX_AGE_SECONDS) {
        return { valid: false, error: "Data is too old" };
      }
    }

    const data: Record<string, string> = {};
    urlParams.forEach((value, key) => {
      data[key] = value;
    });

    let user: User | undefined;
    if (data.user) {
      try {
        const parsed = v.safeParse(userSchema, JSON.parse(data.user));
        if (parsed.success) {
          user = parsed.output;
        }
      } catch {
        // Malformed user JSON: hash already verified, so we proceed without it.
      }
    }

    return { valid: true, data, user };
  } catch (error) {
    logger.error(
      { reason: error instanceof Error ? error.message : String(error) },
      "Validation error",
    );
    return { valid: false, error: "Validation failed" };
  }
}
