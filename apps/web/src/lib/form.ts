import {
  type AnyFormApi,
  createFormHook,
  revalidateLogic,
} from "@tanstack/react-form";
import type { SubmitEvent } from "react";
import { CheckboxField } from "@/components/form/checkbox-field";
import { FieldShell } from "@/components/form/field-shell";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { TextField } from "@/components/form/text-field";
import { TextareaField } from "@/components/form/textarea-field";
import { fieldContext, formContext } from "./form-context";

export const submitValidationLogic = revalidateLogic();

export const focusFirstInvalidField = (
  form: AnyFormApi,
  formElement: ParentNode,
) => {
  const invalidNames = Object.entries(form.getAllErrors().fields)
    .filter(([, { errors }]) => errors.length > 0)
    .map(([name]) => name);
  if (invalidNames.length === 0) return;

  const selector = invalidNames
    .map((name) => `#${CSS.escape(name)}`)
    .join(", ");

  for (const element of formElement.querySelectorAll<HTMLElement>(selector)) {
    element.focus({ preventScroll: true });
    if (document.activeElement === element) {
      element.scrollIntoView({ behavior: "instant", block: "center" });
      return;
    }
  }
};

export const handleFormSubmit =
  (form: AnyFormApi) => async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    await form.handleSubmit();
    focusFirstInvalidField(form, formElement);
  };

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    NumberField,
    CheckboxField,
    TextareaField,
    SelectField,
    FieldShell,
  },
  formComponents: {},
});
