import {
  type ArrayPath,
  type Control,
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
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import type { BaseInvoiceSchema } from "../schemas";
import { HookFormField } from "@/components/hook-form-field";

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
              <HookFormField
                fieldType="input"
                name={`prices.${index}.label` as FieldPath<T>}
                control={control}
                placeholder="Enter label"
              />
              <HookFormField
                fieldType="number"
                name={`prices.${index}.amount` as FieldPath<T>}
                control={control}
                placeholder="Enter price"
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
