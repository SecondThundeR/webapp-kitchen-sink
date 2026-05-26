import { pino } from "pino";
import { config } from "#root/config/index.js";
import { UPSTREAM_LOG_TRUNCATE_LEN } from "#root/constants.js";

export const logger = pino({
  level: config.logLevel,
  transport: {
    targets: [
      ...(config.isDebug
        ? [
            {
              target: "pino-pretty",
              level: config.logLevel,
              options: {
                ignore: "pid,hostname",
                colorize: true,
                translateTime: true,
              },
            },
          ]
        : [
            {
              target: "pino/file",
              level: config.logLevel,
              options: {},
            },
          ]),
    ],
  },
});

export type Logger = typeof logger;

export function truncate(value: string, max = UPSTREAM_LOG_TRUNCATE_LEN) {
  return value.length > max
    ? `${value.slice(0, max)}…(${value.length - max} more)`
    : value;
}

export function serializeCauseChain(err: unknown, depth = 5): unknown {
  if (depth === 0 || err === undefined || err === null) return undefined;
  if (err instanceof Error) {
    return {
      message: err.message,
      name: err.name,
      stack: err.stack,
      cause: serializeCauseChain((err as { cause?: unknown }).cause, depth - 1),
    };
  }
  return { value: String(err) };
}
