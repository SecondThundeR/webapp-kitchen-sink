import type { Logger } from "#root/logger.ts";

export interface Env {
  Variables: {
    requestId: string;
    logger: Logger;
  };
}
