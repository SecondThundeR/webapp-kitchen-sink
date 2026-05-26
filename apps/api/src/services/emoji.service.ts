import { EMOJI_CACHE_TTL_MS } from "#root/constants.js";
import type { FormattedSticker } from "#root/schemas/emojis.schemas.js";
import {
  callTelegramMethod,
  getTelegramFile,
} from "#root/utils/telegram-api.js";

type CacheEntry = {
  data: FormattedSticker[];
  expiresAt: number;
};

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<FormattedSticker[]>>();

async function load(name: string): Promise<FormattedSticker[]> {
  const data = await callTelegramMethod<{
    stickers: {
      file_id: string;
      custom_emoji_id: string;
      is_animated: boolean;
      is_video: boolean;
    }[];
  }>("getStickerSet", { name });

  const formatted = await Promise.all(
    data.stickers.map(async (sticker) => {
      const file = await getTelegramFile(sticker.file_id);
      if (!file) return null;
      return {
        id: sticker.custom_emoji_id,
        file_path: file.file_path,
        is_animated: sticker.is_animated,
        is_video: sticker.is_video,
      };
    }),
  );

  return formatted.filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );
}

export async function getEmojiPack(name: string): Promise<FormattedSticker[]> {
  const cached = cache.get(name);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const existing = inflight.get(name);
  if (existing) return existing;

  const pending = load(name)
    .then((data) => {
      cache.set(name, { data, expiresAt: Date.now() + EMOJI_CACHE_TTL_MS });
      return data;
    })
    .finally(() => {
      inflight.delete(name);
    });

  inflight.set(name, pending);
  return pending;
}
