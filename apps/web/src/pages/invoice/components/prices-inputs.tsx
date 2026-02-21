import {
  type ArrayPath,
  type Control,
  Controller,
  type FieldArray,
  type FieldPath,
  type FieldValues,
  useFieldArray,
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
import type { BaseInvoiceSchema } from "../schemas";

interface PricesInputsProps<T extends FieldValues & BaseInvoiceSchema> {
  control: Control<T>;
  singleItem?: boolean;
}

export const PricesInputs = <T extends FieldValues & BaseInvoiceSchema>({
  control,
  singleItem = false,
}: PricesInputsProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "prices" as ArrayPath<T>,
  });

  return (
    <FieldSet className="gap-4">
      <FieldLegend variant="label">Prices</FieldLegend>
      {fields.map((field, index) => (
        <Card key={field.id}>
          {singleItem ? null : (
            <CardHeader>
              <CardTitle>Price {index + 1}</CardTitle>
            </CardHeader>
          )}
          <CardContent>
            <FieldGroup className="gap-4">
              <Controller
                name={`prices.${index}.label` as FieldPath<T>}
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`prices-label-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter label"
                          autoComplete="off"
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                key={field.id}
                name={`prices.${index}.amount` as FieldPath<T>}
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
                          id={`prices-amount-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter price"
                          type="number"
                          autoComplete="off"
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
          {singleItem ? null : (
            <CardFooter>
              <Button
                type="button"
                className="w-full"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                Remove price
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
      {singleItem ? null : (
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({ amount: 1, label: "" } as FieldArray<T, ArrayPath<T>>)
          }
        >
          Add price
        </Button>
      )}
    </FieldSet>
  );
};
