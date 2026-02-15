import { useRef, useState } from "react";
import { WebApp } from "@/lib/web-app";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CustomizableColorCardProps {
  title: string;
  itemColor: string;
  onChange: (color: `#${string}`) => void;
  onReset: () => `#${string}`;
}

export const CustomizableColorCard = ({
  title,
  itemColor,
  onChange,
  onReset,
}: CustomizableColorCardProps) => {
  const [color, setColor] = useState("");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    if (colorInputRef.current?.showPicker) {
      try {
        console.log("Calling showPicker");
        colorInputRef.current.showPicker();
      } catch (error) {
        console.error(error);
        colorInputRef.current.click();
      }
    }
    colorInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="w-full h-16 rounded-md border border-black dark:border-white"
          style={{
            backgroundColor: itemColor,
          }}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
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
        <Button
          className="flex-1"
          onClick={() => {
            const newColor = onReset();
            setColor(newColor);
          }}
        >
          Reset custom color
        </Button>
      </CardFooter>
    </Card>
  );
};
