import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebApp } from "@/lib/web-app";
import { DynamicThemeCard } from "@/pages/theme-params/components/dynamic-theme-card";
import { useSecondaryButton } from "../hooks";

const POSITIONS = ["top", "right", "bottom", "left"] as const;

export const SecondaryButton = () => {
  const {
    data: {
      text,
      isVisible,
      isActive,
      hasShineEffect,
      isProgressVisible,
      color,
      textColor,
      position,
    },
    handlers: {
      handleSetText,
      handleShow,
      handleHide,
      handleEnable,
      handleDisable,
      handleHasShineEffect,
      handleIsProgressVisible,
      handleSetColor,
      handleSetTextColor,
      handleSetPosition,
    },
  } = useSecondaryButton();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>isVisible</CardTitle>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <Checkbox
              id="secondary-is-visible"
              name="secondary-is-visible"
              checked={isVisible}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") return;
                if (checked) {
                  handleShow();
                  return;
                }

                handleHide();
              }}
            />
            <Label htmlFor="secondary-is-visible">
              {isVisible ? "Hide" : "Show"}
            </Label>
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>isActive</CardTitle>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <Checkbox
              id="secondary-is-active"
              name="secondary-is-active"
              checked={isActive}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") return;
                if (checked) {
                  handleEnable();
                  return;
                }

                handleDisable();
              }}
            />
            <Label htmlFor="secondary-is-active">
              {isActive ? "Disable" : "Enable"}
            </Label>
          </Field>
        </CardContent>
      </Card>
      {WebApp.isVersionAtLeast("7.10") && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>hasShineEffect</CardTitle>
            </CardHeader>
            <CardContent>
              <Field orientation="horizontal">
                <Checkbox
                  id="secondary-has-shine-effect"
                  name="secondary-has-shine-effect"
                  checked={hasShineEffect}
                  onCheckedChange={(checked) => {
                    if (checked === "indeterminate") return;
                    handleHasShineEffect(checked);
                  }}
                />
                <Label htmlFor="secondary-has-shine-effect">
                  {hasShineEffect ? "Disable" : "Enable"}
                </Label>
              </Field>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>position</CardTitle>
            </CardHeader>
            {position && <CardContent>{position}</CardContent>}
            <CardFooter className="grid grid-cols-2 gap-2">
              {POSITIONS.map((position) => (
                <Button
                  key={position}
                  onClick={() => handleSetPosition(position)}
                >
                  {position}
                </Button>
              ))}
            </CardFooter>
          </Card>
        </>
      )}
      <Card>
        <CardHeader>
          <CardTitle>isProgressVisible</CardTitle>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <Checkbox
              id="secondary-is-progress-visible"
              name="secondary-is-progress-visible"
              checked={isProgressVisible}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") return;
                handleIsProgressVisible(checked);
              }}
            />
            <Label htmlFor="secondary-is-progress-visible">
              {isProgressVisible ? "Disable" : "Enable"}
            </Label>
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>text</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            id="secondary-text"
            value={text}
            onChange={(e) => handleSetText(e.currentTarget.value)}
            placeholder="Enter text"
          />
        </CardContent>
      </Card>
      <DynamicThemeCard
        title="color"
        color={color}
        onChange={(color) => handleSetColor(color)}
        onReset={() => handleSetColor(false)}
      />
      <DynamicThemeCard
        title="textColor"
        color={textColor}
        onChange={(color) => handleSetTextColor(color)}
        onReset={() => handleSetTextColor(false)}
      />
    </div>
  );
};
