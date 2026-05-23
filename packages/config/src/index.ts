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

export function loadConfigFromEnv<TSchema extends v.GenericSchema>(
  schema: TSchema,
): v.InferOutput<TSchema> {
  try {
    process.loadEnvFile();
  } catch {
    // No .env file found
  }

  try {
    return v.parse(schema, convertKeysToCamelCase(process.env));
  } catch (error) {
    throw new Error("Invalid config", { cause: error });
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
