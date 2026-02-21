import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WebApp } from "@/lib/web-app";

const TEXT_REQUIRED_TYPES = ["default", "destructive"];

const showPopupSchema = z.object({
  title: z.string().max(64, "Title must be at most 256 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(256, "Message must be at most 256 characters"),
  buttons: z
    .array(
      z
        .object({
          type: z.enum(["default", "ok", "close", "cancel", "destructive"]),
          id: z.string().max(64, "ID must be at most 256 characters"),
          text: z.string().max(64, "Text must be at most 256 characters"),
        })
        .superRefine((data, ctx) => {
          if (TEXT_REQUIRED_TYPES.includes(data.id) && !data.text) {
            ctx.addIssue({
              code: "custom",
              message: "Text is required for selected button type",
              path: ["text"],
            });
          }
        }),
    )
    .max(3, "Popup can have at most 3 buttons")
    .optional(),
});

type ShowPopupSchema = z.infer<typeof showPopupSchema>;

const BUTTON_TYPES = [
  "default",
  "ok",
  "close",
  "cancel",
  "destructive",
] as const;

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
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="message"
                      placeholder="Enter message"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/256 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldSet className="gap-4">
              <FieldLegend variant="label">Buttons</FieldLegend>
              {fields.map((field, index) => {
                const currentType = form.watch(
                  `buttons.${index}.type`,
                ) as NonNullable<ShowPopupSchema["buttons"]>[number]["type"];
                const showTextField = TEXT_REQUIRED_TYPES.includes(currentType);

                return (
                  <Card key={field.id}>
                    <CardHeader>
                      <CardTitle>Button {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FieldGroup className="gap-4">
                        <Controller
                          name={`buttons.${index}.id`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              orientation="horizontal"
                              data-invalid={fieldState.invalid}
                            >
                              <FieldContent>
                                <InputGroup>
                                  <InputGroupInput
                                    {...field}
                                    id={`buttons-id-${index}`}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter ID"
                                    autoComplete="off"
                                  />
                                </InputGroup>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name={`buttons.${index}.type`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              orientation="responsive"
                              data-invalid={fieldState.invalid}
                            >
                              <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);

                                  if (!TEXT_REQUIRED_TYPES.includes(value)) {
                                    form.setValue(`buttons.${index}.text`, "");
                                  }
                                }}
                              >
                                <SelectTrigger
                                  id={`buttons-type-${index}`}
                                  aria-invalid={fieldState.invalid}
                                  className="min-w-30"
                                >
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                  {BUTTON_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {fieldState.invalid && (
                                <FieldContent>
                                  <FieldError errors={[fieldState.error]} />
                                </FieldContent>
                              )}
                            </Field>
                          )}
                        />
                        {showTextField && (
                          <Controller
                            name={`buttons.${index}.text`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                orientation="horizontal"
                                data-invalid={fieldState.invalid}
                              >
                                <FieldContent>
                                  <InputGroup>
                                    <InputGroupInput
                                      {...field}
                                      id={`buttons-text-${index}`}
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Enter text"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </FieldContent>
                              </Field>
                            )}
                          />
                        )}
                      </FieldGroup>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        Remove button
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
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
