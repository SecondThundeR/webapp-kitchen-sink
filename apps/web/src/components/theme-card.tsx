import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ThemeCardProps {
  title: string;
  color: string | undefined;
  footerSlot?: ReactNode;
  footerSlotClassName?: string;
}

export const ThemeCard = ({
  title,
  color: backgroundColor,
  footerSlot,
  footerSlotClassName,
}: ThemeCardProps) => {
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
