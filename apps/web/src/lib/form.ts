import { createFormHook, revalidateLogic } from "@tanstack/react-form";
import { CheckboxField } from "@/components/form/checkbox-field";
import { FieldShell } from "@/components/form/field-shell";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { TextField } from "@/components/form/text-field";
import { TextareaField } from "@/components/form/textarea-field";
import { fieldContext, formContext } from "./form-context";

export const submitValidationLogic = revalidateLogic();

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
