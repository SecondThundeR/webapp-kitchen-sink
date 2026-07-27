import { createFormHookContexts } from "@tanstack/react-form";

// Split out from form.ts so the bound field components can read the field
// context without importing the hook that registers them
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();
