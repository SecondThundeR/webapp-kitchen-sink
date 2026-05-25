import { lazy, Suspense, useEffect, useState } from "react";
import { API_BASE_URL, authedFetch } from "@/lib/api";
import { Button } from "./ui/button";

type Emoji = {
  id: string;
  is_video: boolean;
  is_animated: boolean;
  file_path: string;
};

interface CustomEmojiGridProps {
  emojis: Emoji[];
  currentEmojiId?: string;
  onClick: (id: string) => void;
}

const Player = lazy(() =>
  import("@lottiefiles/react-lottie-player").then(({ Player }) => ({
    default: Player,
  })),
);

function useEmojiObjectUrl(filePath: string) {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    let createdUrl: string | undefined;

    authedFetch(
      `${API_BASE_URL}/api/emojis/file?path=${encodeURIComponent(filePath)}`,
    )
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => {
        if (cancelled || !blob) return;
        createdUrl = URL.createObjectURL(blob);
        setUrl(createdUrl);
      })
      .catch(() => {
        // swallow — caller renders a fallback when url is undefined
      });

    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [filePath]);

  return url;
}

interface EmojiButtonProps {
  emoji: Emoji;
  isActive: boolean;
  onClick: () => void;
}

const EmojiButton = ({ emoji, isActive, onClick }: EmojiButtonProps) => {
  const emojiUrl = useEmojiObjectUrl(emoji.file_path);

  return (
    <Button onClick={onClick} variant={isActive ? "default" : "ghost"}>
      {emojiUrl ? (
        emoji.is_video ? (
          <video
            src={emojiUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: 24, height: 24 }}
          />
        ) : emoji.is_animated ? (
          <Suspense fallback="⌛">
            <Player
              src={emojiUrl}
              autoplay
              loop
              style={{ height: 24, width: 24 }}
            />
          </Suspense>
        ) : (
          <img src={emojiUrl} alt="emoji" style={{ width: 24, height: 24 }} />
        )
      ) : (
        <span style={{ width: 24, height: 24, display: "inline-block" }} />
      )}
    </Button>
  );
};

export const CustomEmojiGrid = ({
  emojis,
  currentEmojiId,
  onClick,
}: CustomEmojiGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <EmojiButton
          key={emoji.id}
          emoji={emoji}
          isActive={emoji.id === currentEmojiId}
          onClick={() => onClick(emoji.id)}
        />
      ))}
    </div>
  );
};
