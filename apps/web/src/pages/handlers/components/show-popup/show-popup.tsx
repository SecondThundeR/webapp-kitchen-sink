import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { WebApp } from "@/lib/web-app";
import { showPopupSchema, type ShowPopupSchema } from "./schema";
import { ButtonItem } from "./components/button-item";
import { HookFormField } from "@/components/hook-form-field";

export const ShowPopup = () => {
  const form = useForm<ShowPopupSchema>({
    resolver: zodResolver(showPopupSchema),
    defaultValues: {
      message: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "buttons",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>showPopup</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="show-popup-form"
          onSubmit={form.handleSubmit((data) => {
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
          }, console.error)}
        >
          <FieldGroup className="gap-3">
            <HookFormField
              fieldType="input"
              name="title"
              control={form.control}
              label="Title"
              placeholder="Enter title"
            />
            <HookFormField
              fieldType="textarea"
              name="message"
              control={form.control}
              label="Message"
              placeholder="Enter message"
              rows={6}
              className="min-h-24 resize-none"
              maxLength={256}
            />
            <FieldSet className="gap-4">
              <FieldLegend variant="label">Buttons</FieldLegend>
              {fields.map((field, index) => (
                <ButtonItem
                  key={field.id}
                  control={form.control}
                  index={index}
                  onRemove={(index) => remove(index)}
                  onTextReset={(index) => {
                    form.setValue(`buttons.${index}.text`, "");
                  }}
                />
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => append({ id: "", type: "default", text: "" })}
                disabled={fields.length === 3}
              >
                Add button
              </Button>
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
