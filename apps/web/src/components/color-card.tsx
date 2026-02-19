import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ColorCardProps {
  title: string;
  color: string | undefined;
  footerSlot?: ReactNode;
  footerSlotClassName?: string;
}

export const ColorCard = ({
  title,
  color: backgroundColor,
  footerSlot,
  footerSlotClassName,
}: ColorCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="w-full h-16 rounded-md border border-black dark:border-white"
          style={{ backgroundColor }}
        />
      </CardContent>
      {footerSlot && (
        <CardFooter className={footerSlotClassName}>{footerSlot}</CardFooter>
      )}
    </Card>
  );
};
