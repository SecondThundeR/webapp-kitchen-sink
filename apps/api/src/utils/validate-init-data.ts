export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
}

// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
export function validateInitData(initData: string, botToken: string) {
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

    const encoder = new TextEncoder();
    const keyData = encoder.encode("WebAppData");

    const secretKey = new Bun.CryptoHasher("sha256", keyData)
      .update(botToken)
      .digest();

    const calculatedHash = new Bun.CryptoHasher("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    if (calculatedHash !== hash) {
      return { valid: false, error: "Invalid hash" };
    }

    const authDate = urlParams.get("auth_date");
    if (authDate) {
      const authTimestamp = parseInt(authDate, 10);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const maxAge = 24 * 60 * 60;

      if (currentTimestamp - authTimestamp > maxAge) {
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
        user = JSON.parse(data.user);
      } catch {
        // User data parsing failed, but validation still passed
      }
    }

    return { valid: true, data, user };
  } catch (error) {
    console.error("Validation error:", error);
    return { valid: false, error: "Validation failed" };
  }
}
