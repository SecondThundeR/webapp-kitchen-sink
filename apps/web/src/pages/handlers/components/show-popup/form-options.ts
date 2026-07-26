import { formOptions } from "@tanstack/react-form";
import { type ShowPopupSchemaInput, showPopupSchema } from "./schema";

// Shared so that ButtonItem can be typed against the same form via withForm
export const showPopupFormOptions = formOptions({
  defaultValues: {
    title: "",
    message: "",
    buttons: [],
  } as ShowPopupSchemaInput,
  validators: {
    onBlur: showPopupSchema,
    onSubmit: showPopupSchema,
  },
});
