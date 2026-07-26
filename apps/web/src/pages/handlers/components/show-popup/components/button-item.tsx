import { useSelector } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withForm } from "@/lib/form";
import { BUTTON_TYPES, TEXT_REQUIRED_TYPES } from "../constants";
import { showPopupFormOptions } from "../form-options";

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
            <form.Field name={`buttons[${index}].id`}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter ID"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field
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
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select<string>
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => {
                        if (value === null) return;
                        field.handleChange(
                          value as (typeof BUTTON_TYPES)[number],
                        );
                      }}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUTTON_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            </form.Field>
            {showTextField && (
              <form.Field
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
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter text"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
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
