import { toast } from "sonner";
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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useAppForm } from "@/lib/form";
import { WebApp } from "@/lib/web-app";
import { ButtonItem } from "./components/button-item";
import { showPopupFormOptions } from "./form-options";
import { showPopupSchema } from "./schema";

const MAX_BUTTONS = 3;

export const ShowPopup = () => {
  const form = useAppForm({
    ...showPopupFormOptions,
    onSubmit: ({ value }) => {
      const data = showPopupSchema.parse(value);

      WebApp.showPopup(
        {
          ...data,
          buttons: data.buttons?.length === 0 ? undefined : data.buttons,
        },
        (button_id) => {
          toast.info(
            `Popup button ${button_id ? ` (${button_id})` : ""} was clicked`,
          );
        },
      );
    },
    onSubmitInvalid: ({ formApi }) => console.error(formApi.state.errorMap),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>showPopup</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="show-popup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-3">
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter title"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="message">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter message"
                        rows={6}
                        className="min-h-24 resize-none"
                        maxLength={256}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/256 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <FieldSet className="gap-4">
              <FieldLegend variant="label">Buttons</FieldLegend>
              <form.Field name="buttons" mode="array">
                {(buttonsField) => (
                  <>
                    {(buttonsField.state.value ?? []).map((_, index) => (
                      <ButtonItem
                        // biome-ignore lint/suspicious/noArrayIndexKey: buttons are identified by their position in the array
                        key={index}
                        form={form}
                        index={index}
                        onRemove={(index) => buttonsField.removeValue(index)}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        buttonsField.pushValue({
                          id: "",
                          type: "default",
                          text: "",
                        })
                      }
                      disabled={
                        (buttonsField.state.value ?? []).length === MAX_BUTTONS
                      }
                    >
                      Add button
                    </Button>
                  </>
                )}
              </form.Field>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button type="submit" form="show-popup-form" className="w-full">
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
