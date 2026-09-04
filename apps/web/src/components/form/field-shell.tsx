import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useFieldContext } from "@/lib/form-context";

export type FieldOrientation = ComponentProps<typeof Field>["orientation"];

export interface FieldShellProps extends PropsWithChildren {
  label?: ReactNode;
  description?: ReactNode;
  orientation?: FieldOrientation;
}

export const FieldShell = ({
  label,
  description,
  orientation,
  children,
}: FieldShellProps) => {
  const field = useFieldContext<unknown>();
  const isInvalid = !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} orientation={orientation}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      {children}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
