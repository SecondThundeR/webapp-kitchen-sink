import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "./ui/button";

interface EmojiGridProps {
  emojis: {
    id: string;
    is_video: boolean;
    is_animated: boolean;
    file_path: string;
  }[];
  currentEmojiId?: string;
  onClick: (id: string) => void;
}

export const EmojiGrid = ({
  emojis,
  currentEmojiId,
  onClick,
}: EmojiGridProps) => {
  return (
    <div className="grid grid-cols-7 gap-4">
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
                style={{ width: 40, height: 40 }}
              />
            ) : emoji.is_animated ? (
              <Player
                src={emojiUrl}
                autoplay
                loop
                style={{ height: 24, width: 24 }}
              />
            ) : (
              <img
                src={emojiUrl}
                alt="emoji"
                style={{ width: 40, height: 40 }}
              />
            )}
          </Button>
        );
      })}
    </div>
  );
};
