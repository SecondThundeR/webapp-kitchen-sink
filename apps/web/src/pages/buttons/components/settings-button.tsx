import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { useSettingsButton } from "../hooks";

const SettingsButtonComponent = () => {
  const { isVisible, handleIsVisible } = useSettingsButton();

  return (
    <Card>
      <CardHeader>
        <CardTitle>isVisible</CardTitle>
      </CardHeader>
      <CardContent>
        <Field orientation="horizontal">
          <Checkbox
            id="settings-is-visible"
            name="settings-is-visible"
            checked={isVisible}
            onCheckedChange={(checked) => {
              if (checked === "indeterminate") return;
              handleIsVisible(checked);
            }}
          />
          <Label htmlFor="settings-is-visible">
            {isVisible ? "Hide" : "Show"}
          </Label>
        </Field>
      </CardContent>
    </Card>
  );
};

export const SettingsButton = withWebAppVersion(SettingsButtonComponent, {
  version: "7.0",
});
