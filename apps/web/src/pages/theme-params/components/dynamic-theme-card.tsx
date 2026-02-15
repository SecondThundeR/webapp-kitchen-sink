import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { WebApp } from "@/lib/web-app";
import { ThemeCard, type ThemeCardProps } from "./theme-card";

interface DynamicThemeCardProps
  extends Pick<ThemeCardProps, "title" | "color"> {
  onChange: (color: `#${string}`) => void;
  onReset: () => void;
}

export const DynamicThemeCard = ({
  title,
  color: itemColor,
  onChange,
  onReset,
}: DynamicThemeCardProps) => {
  const [color, setColor] = useState("");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    if (colorInputRef.current?.showPicker) {
      try {
        colorInputRef.current.showPicker();
      } catch (error) {
        console.error(error);
        colorInputRef.current.click();
      }
    } else {
      colorInputRef.current?.click();
    }
  };

  return (
    <ThemeCard
      title={title}
      color={itemColor}
      footerSlot={
        <>
          {/* God, I fucking love Apple */}
          {["ios", "macos"].includes(WebApp.platform) ? (
            <input
              type="color"
              ref={colorInputRef}
              value={color}
              className="flex-1"
              onChange={(e) => {
                setColor(e.target.value);
                onChange(e.target.value as `#${string}`);
              }}
            />
          ) : (
            <Button className="flex-1" onClick={openPicker}>
              <input
                type="color"
                ref={colorInputRef}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  onChange(e.target.value as `#${string}`);
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
              Set custom color
            </Button>
          )}
          <Button className="flex-1" onClick={onReset}>
            Reset custom color
          </Button>
        </>
      }
      footerSlotClassName="flex gap-2"
    />
  );
};
