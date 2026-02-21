import { useEffect } from "react";
import {
  type ArrayPath,
  type Control,
  Controller,
  type FieldArray,
  type FieldPath,
  type FieldValues,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import type { InvoiceSchema } from "../schemas";

interface TipsInputsProps<T extends FieldValues & InvoiceSchema> {
  control: Control<T>;
}

export const TipsInputs = <T extends FieldValues & InvoiceSchema>({
  control,
}: TipsInputsProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "suggested_tip_amounts" as ArrayPath<T>,
  });

  const maxTipAmount = useWatch({
    control: control,
    name: "max_tip_amount" as FieldPath<T>,
  });

  useEffect(() => {
    if (!maxTipAmount && fields.length > 0) {
      const indexes = new Array(fields.length).map((_, index) => index);
      remove(indexes);
    }
  }, [maxTipAmount, fields.length, remove]);

  return (
    <FieldSet className="gap-4">
      <FieldLegend variant="label">Suggested Tip Amounts</FieldLegend>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Tip option {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="gap-4">
              <Controller
                key={field.id}
                name={`suggested_tip_amounts.${index}.tip` as FieldPath<T>}
                control={control}
                render={({ field: { onChange, ...field }, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`suggested-tip-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter tip"
                          type="number"
                          autoComplete="off"
                          max={maxTipAmount}
                          onChange={(e) =>
                            onChange(
                              Number.isNaN(e.target.valueAsNumber)
                                ? undefined
                                : e.target.valueAsNumber,
                            )
                          }
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="w-full"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              Remove tip option
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ tip: 0 } as FieldArray<T, ArrayPath<T>>)}
        disabled={maxTipAmount === undefined || fields.length === 4}
      >
        Add tip option
      </Button>
    </FieldSet>
  );
};
