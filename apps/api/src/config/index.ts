import process from "node:process";
import * as v from "valibot";

type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends object
    ? KeysToCamelCase<T[K]>
    : T[K];
};

const configSchema = v.object({
  frontendUrl: v.pipe(v.string(), v.url("Frontend URL is incorrect")),
  paymentProviderToken: v.string(),
  botToken: v.pipe(v.string(), v.regex(/^\d+:[\w-]+$/, "Invalid token")),
  port: v.optional(v.pipe(v.string(), v.transform(Number), v.number()), "3000"),
});

export type Config = v.InferOutput<typeof configSchema>;

export function createConfig(input: v.InferInput<typeof configSchema>) {
  return v.parse(configSchema, input);
}

export const config = createConfigFromEnvironment();

function createConfigFromEnvironment() {
  console.log("Loading config");

  try {
    process.loadEnvFile();
  } catch {
    console.warn("No .env file found");
  }

  try {
    return createConfig(convertKeysToCamelCase(process.env));
  } catch (error) {
    throw new Error("Invalid config", {
      cause: error,
    });
  }
}

function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_([a-z])/g, (_match, p1) => p1.toUpperCase());
}

function convertKeysToCamelCase<T extends Record<string, unknown>>(
  obj: T,
): KeysToCamelCase<T> {
  const result = {} as KeysToCamelCase<T>;

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const camelCaseKey = toCamelCase(key) as keyof KeysToCamelCase<T>;
      const value = obj[key];

      result[camelCaseKey] = (
        typeof value === "object" && value !== null && !Array.isArray(value)
          ? convertKeysToCamelCase(value as Record<string, unknown>)
          : value
      ) as KeysToCamelCase<T>[typeof camelCaseKey];
    }
  }

  return result;
}
