import type { ComponentProps } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/lib/form-context";
import {
  FieldShell,
  type FieldShellProps,
  useIsFieldInvalid,
} from "./field-shell";

type TextareaProps = Omit<
  ComponentProps<typeof InputGroupTextarea>,
  "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid"
>;

export interface TextareaFieldProps extends TextareaProps, FieldShellProps {}

export const TextareaField = ({
  label,
  description,
  orientation,
  maxLength,
  rows = 6,
  className = "min-h-24 resize-none",
  ...textareaProps
}: TextareaFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = useIsFieldInvalid();
  const value = field.state.value ?? "";

  return (
    <FieldShell
      label={label}
      description={description}
      orientation={orientation}
    >
      <InputGroup>
        <InputGroupTextarea
          id={field.name}
          name={field.name}
          value={value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          rows={rows}
          maxLength={maxLength}
          className={className}
          {...textareaProps}
        />
        {maxLength !== undefined && (
          <InputGroupAddon align="block-end">
            <InputGroupText className="tabular-nums">
              {value.length}/{maxLength} characters
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FieldShell>
  );
};
