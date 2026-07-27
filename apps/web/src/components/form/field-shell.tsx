import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useFieldContext } from "@/lib/form-context";

export type FieldOrientation = ComponentProps<typeof Field>["orientation"];

export const useIsFieldInvalid = () => {
  const field = useFieldContext<unknown>();

  return field.state.meta.isTouched && !field.state.meta.isValid;
};

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
  const isInvalid = useIsFieldInvalid();

  return (
    <Field data-invalid={isInvalid} orientation={orientation}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      {children}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
