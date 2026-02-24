import { lazy, Suspense } from "react";
import { Button } from "./ui/button";

interface CustomEmojiGridProps {
  emojis: {
    id: string;
    is_video: boolean;
    is_animated: boolean;
    file_path: string;
  }[];
  currentEmojiId?: string;
  onClick: (id: string) => void;
}

const Player = lazy(() =>
  import("@lottiefiles/react-lottie-player").then(({ Player }) => ({
    default: Player,
  })),
);

export const CustomEmojiGrid = ({
  emojis,
  currentEmojiId,
  onClick,
}: CustomEmojiGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {emojis.map((emoji) => {
        const emojiUrl = `${import.meta.env.VITE_API_URL}/api/emojis/file?path=${emoji.file_path}`;
        return (
          <Button
            key={emoji.id}
            onClick={() => onClick(emoji.id)}
            variant={emoji.id === currentEmojiId ? "default" : "ghost"}
          >
            {emoji.is_video ? (
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
              <img
                src={emojiUrl}
                alt="emoji"
                style={{ width: 24, height: 24 }}
              />
            )}
          </Button>
        );
      })}
    </div>
  );
};
