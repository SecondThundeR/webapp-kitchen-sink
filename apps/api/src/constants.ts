export const MAX_BODY_BYTES = 100 * 1024;

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_GLOBAL_MAX = 120;
export const RATE_LIMIT_FILES_MAX = 600;

export const TELEGRAM_TIMEOUT_MS = 5_000;
export const TELEGRAM_FILE_TIMEOUT_MS = 15_000;

export const INIT_DATA_MAX_AGE_SECONDS = 24 * 60 * 60;

export const EMOJI_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
export const EMOJI_CLIENT_CACHE_SECONDS = 3600;
export const FILE_CACHE_CONTROL = "public, max-age=86400, immutable";

export const UPSTREAM_LOG_TRUNCATE_LEN = 500;
