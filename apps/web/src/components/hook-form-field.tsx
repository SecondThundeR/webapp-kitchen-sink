import type { ComponentProps, ReactNode } from "react";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BaseProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label?: ReactNode;
  id?: string;
  orientation?: "horizontal" | "responsive";
};

type InputProps = { fieldType?: "input" } & Omit<
  ComponentProps<typeof Input>,
  "name" | "id"
>;

type NumberProps = { fieldType: "number" } & Omit<
  ComponentProps<typeof Input>,
  "name" | "id" | "type"
>;

type TextareaProps = { fieldType: "textarea"; maxLength?: number } & Omit<
  ComponentProps<typeof InputGroupTextarea>,
  "name" | "id"
>;

type SelectProps = {
  fieldType: "select";
  options: { label: ReactNode; value: string }[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
};

type CheckboxProps = { fieldType: "checkbox" };

type HookFormFieldProps<T extends FieldValues> = BaseProps<T> &
  (InputProps | NumberProps | TextareaProps | SelectProps | CheckboxProps);

export const HookFormField = <T extends FieldValues>(
  props: HookFormFieldProps<T>,
) => {
  const { name, control, label, id, ...rest } = props;
  const fieldType =
    "fieldType" in rest && rest.fieldType ? rest.fieldType : "input";
  const fieldId = id || name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        if (fieldType === "checkbox") {
          return (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id={fieldId}
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {label && (
                <FieldLabel htmlFor={fieldId} className="font-normal">
                  {label}
                </FieldLabel>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        return (
          <Field
            orientation={fieldType === "select" ? "responsive" : undefined}
            data-invalid={fieldState.invalid}
          >
            {fieldType === "select" ? (
              <FieldContent>
                {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            ) : (
              label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
            )}

            {fieldType === "input" && (
              <Input
                {...field}
                id={fieldId}
                aria-invalid={fieldState.invalid}
                {...(rest as InputProps)}
              />
            )}

            {fieldType === "number" && (
              <Input
                {...field}
                id={fieldId}
                type="number"
                aria-invalid={fieldState.invalid}
                {...(rest as NumberProps)}
                onChange={(e) => {
                  const val = e.target.valueAsNumber;
                  field.onChange(Number.isNaN(val) ? undefined : val); // Converts NaN to undefined cleanly
                }}
              />
            )}

            {fieldType === "textarea" && (
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id={fieldId}
                  aria-invalid={fieldState.invalid}
                  {...(rest as TextareaProps)}
                />
                {(rest as TextareaProps).maxLength && (
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {String(field.value || "").length}/
                      {(rest as TextareaProps).maxLength} characters
                    </InputGroupText>
                  </InputGroupAddon>
                )}
              </InputGroup>
            )}

            {fieldType === "select" && (
              <Select
                name={field.name}
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  (rest as SelectProps).onValueChange?.(val);
                }}
              >
                <SelectTrigger
                  id={fieldId}
                  aria-invalid={fieldState.invalid}
                  className="min-w-30"
                >
                  <SelectValue
                    placeholder={(rest as SelectProps).placeholder || "Select"}
                  />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {(rest as SelectProps).options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {fieldType !== "select" && fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
};
