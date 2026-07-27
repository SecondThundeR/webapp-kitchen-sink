import { useSelector } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { withForm } from "@/lib/form";
import { BUTTON_TYPES, TEXT_REQUIRED_TYPES } from "../constants";
import { showPopupFormOptions } from "../form-options";

const BUTTON_TYPE_OPTIONS = BUTTON_TYPES.map((type) => ({
  value: type,
  label: type,
}));

export const ButtonItem = withForm({
  ...showPopupFormOptions,
  props: {
    index: 0,
    onRemove: (_index: number) => {},
  },
  render: function Render({ form, index, onRemove }) {
    const currentType = useSelector(
      form.store,
      (state) => state.values.buttons?.[index]?.type,
    );
    const showTextField = TEXT_REQUIRED_TYPES.includes(currentType ?? "");

    return (
      <Card>
        <CardHeader>
          <CardTitle>Button {index + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-4">
            <form.AppField name={`buttons[${index}].id`}>
              {(field) => (
                <field.TextField
                  orientation="horizontal"
                  placeholder="Enter ID"
                />
              )}
            </form.AppField>
            <form.AppField
              name={`buttons[${index}].type`}
              listeners={{
                // Types that cannot carry a label drop whatever was typed
                onChange: ({ value }) => {
                  if (!TEXT_REQUIRED_TYPES.includes(value ?? "")) {
                    form.setFieldValue(`buttons[${index}].text`, "");
                  }
                },
              }}
            >
              {(field) => <field.SelectField options={BUTTON_TYPE_OPTIONS} />}
            </form.AppField>
            {showTextField && (
              <form.AppField
                name={`buttons[${index}].text`}
                validators={{
                  // Re-runs when the type changes, so switching to a type that
                  // needs a label flags the empty field right away
                  onChangeListenTo: [`buttons[${index}].type`],
                  onChange: ({ value, fieldApi }) => {
                    const type = fieldApi.form.getFieldValue(
                      `buttons[${index}].type`,
                    );

                    return TEXT_REQUIRED_TYPES.includes(type ?? "") && !value
                      ? { message: "Text is required for selected button type" }
                      : undefined;
                  },
                }}
              >
                {(field) => (
                  <field.TextField
                    orientation="horizontal"
                    placeholder="Enter text"
                  />
                )}
              </form.AppField>
            )}
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            onClick={() => onRemove(index)}
          >
            Remove button
          </Button>
        </CardFooter>
      </Card>
    );
  },
});
