import type { ReactNode } from "react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/lib/form-context";
import { cn } from "@/lib/utils";
import { useIsFieldInvalid } from "./field-shell";

export interface SelectFieldOption {
  value: string;
  label: ReactNode;
}

export interface SelectFieldProps {
  options: readonly SelectFieldOption[];
  label?: ReactNode;
  placeholder?: string;
  triggerClassName?: string;
}

export const SelectField = ({
  options,
  label,
  placeholder = "Select",
  triggerClassName,
}: SelectFieldProps) => {
  const field = useFieldContext<string>();
  const isInvalid = useIsFieldInvalid();

  return (
    <Field orientation="responsive" data-invalid={isInvalid}>
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
      <Select<string>
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => {
          // Base UI reports a cleared selection as null, which no field wants
          if (value === null) return;
          field.handleChange(value);
        }}
      >
        <SelectTrigger
          id={field.name}
          aria-invalid={isInvalid}
          className={cn("min-w-30", triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};
