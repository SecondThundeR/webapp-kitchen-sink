import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebApp } from "@/lib/web-app";
import { DynamicColorCard } from "@/components/dynamic-color-card";
import { useMainButton } from "../hooks";

export const MainButton = () => {
  const {
    data: {
      text,
      isVisible,
      isActive,
      hasShineEffect,
      isProgressVisible,
      color,
      textColor,
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
    },
  } = useMainButton();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>isVisible</CardTitle>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <Checkbox
              id="main-is-visible"
              name="main-is-visible"
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
            <Label htmlFor="main-is-visible">
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
              id="main-is-active"
              name="main-is-active"
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
            <Label htmlFor="main-is-active">
              {isActive ? "Disable" : "Enable"}
            </Label>
          </Field>
        </CardContent>
      </Card>
      {WebApp.isVersionAtLeast("7.10") && (
        <Card>
          <CardHeader>
            <CardTitle>hasShineEffect</CardTitle>
          </CardHeader>
          <CardContent>
            <Field orientation="horizontal">
              <Checkbox
                id="main-has-shine-effect"
                name="main-has-shine-effect"
                checked={hasShineEffect}
                onCheckedChange={(checked) => {
                  if (checked === "indeterminate") return;
                  handleHasShineEffect(checked);
                }}
              />
              <Label htmlFor="main-has-shine-effect">
                {hasShineEffect ? "Disable" : "Enable"}
              </Label>
            </Field>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>isProgressVisible</CardTitle>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <Checkbox
              id="main-is-progress-visible"
              name="main-is-progress-visible"
              checked={isProgressVisible}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") return;
                handleIsProgressVisible(checked);
              }}
            />
            <Label htmlFor="main-is-progress-visible">
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
            id="main-text"
            value={text}
            onChange={(e) => handleSetText(e.currentTarget.value)}
            placeholder="Enter text"
          />
        </CardContent>
      </Card>
      <DynamicColorCard
        title="color"
        color={color}
        onChange={(color) => handleSetColor(color)}
        onReset={() => handleSetColor(false)}
      />
      <DynamicColorCard
        title="textColor"
        color={textColor}
        onChange={(color) => handleSetTextColor(color)}
        onReset={() => handleSetTextColor(false)}
      />
    </div>
  );
};
