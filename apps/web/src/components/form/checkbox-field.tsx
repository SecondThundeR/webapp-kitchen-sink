import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useFieldContext } from "@/lib/form-context";
import { useIsFieldInvalid } from "./field-shell";

export interface CheckboxFieldProps {
  label: ReactNode;
  description?: ReactNode;
}

export const CheckboxField = ({ label, description }: CheckboxFieldProps) => {
  const field = useFieldContext<boolean | undefined>();
  const isInvalid = useIsFieldInvalid();

  return (
    <Field orientation="horizontal" data-invalid={isInvalid}>
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value ?? false}
        onCheckedChange={(checked) => field.handleChange(checked)}
        aria-invalid={isInvalid}
      />
      {description ? (
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
      ) : (
        <FieldLabel htmlFor={field.name} className="font-normal">
          {label}
        </FieldLabel>
      )}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
