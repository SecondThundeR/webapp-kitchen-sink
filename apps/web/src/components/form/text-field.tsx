import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/form-context";
import {
  FieldShell,
  type FieldShellProps,
  useIsFieldInvalid,
} from "./field-shell";

type InputProps = Omit<
  ComponentProps<typeof Input>,
  "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid" | "type"
>;

export interface TextFieldProps extends InputProps, FieldShellProps {}

export const TextField = ({
  label,
  description,
  orientation,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = useIsFieldInvalid();

  return (
    <FieldShell
      label={label}
      description={description}
      orientation={orientation}
    >
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...inputProps}
      />
    </FieldShell>
  );
};
