import { createFormHook } from "@tanstack/react-form";
import { CheckboxField } from "@/components/form/checkbox-field";
import { FieldShell } from "@/components/form/field-shell";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { TextField } from "@/components/form/text-field";
import { TextareaField } from "@/components/form/textarea-field";
import { fieldContext, formContext } from "./form-context";

// Bound field components own the isTouched/isValid derivation, the
// aria-invalid/data-invalid pairing and the error slot, so a call site only has
// to say which control it wants. FieldShell is that same skeleton without a
// control, for the few fields that wrap something custom.
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
