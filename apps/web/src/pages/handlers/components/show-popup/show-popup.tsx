import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { handleFormSubmit, useAppForm } from "@/lib/form";
import { WebApp } from "@/lib/web-app";
import { ButtonItem } from "./components/button-item";
import { showPopupFormOptions } from "./form-options";
import { showPopupSchema } from "./schema";

const MAX_BUTTONS = 3;
const MAX_MESSAGE_LENGTH = 256;

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
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>showPopup</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="show-popup-form" onSubmit={handleFormSubmit(form)}>
          <FieldGroup className="gap-3">
            <form.AppField name="title">
              {(field) => (
                <field.TextField label="Title" placeholder="Enter title" />
              )}
            </form.AppField>
            <form.AppField name="message">
              {(field) => (
                <field.TextareaField
                  label="Message"
                  placeholder="Enter message"
                  maxLength={MAX_MESSAGE_LENGTH}
                />
              )}
            </form.AppField>
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
