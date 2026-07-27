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

export interface NumberFieldProps extends InputProps, FieldShellProps {
  /**
   * What an emptied input parses to. Defaults to `undefined`, which is what the
   * optional numeric fields expect; fields typed as a plain number pass 0.
   */
  emptyValue?: number;
}

export const NumberField = ({
  label,
  description,
  orientation,
  emptyValue,
  ...inputProps
}: NumberFieldProps) => {
  const field = useFieldContext<number | undefined>();
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
        type="number"
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const value = e.target.valueAsNumber;
          // An empty number input reads back as NaN, never as ""
          field.handleChange(Number.isNaN(value) ? emptyValue : value);
        }}
        aria-invalid={isInvalid}
        {...inputProps}
      />
    </FieldShell>
  );
};
