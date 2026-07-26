import { useFieldArray, useFormContext } from "react-hook-form";
import { HookFormField } from "@/components/hook-form-field";
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

interface PricesInputsProps {
  singleItem?: boolean;
}

export const PricesInputs = ({ singleItem = false }: PricesInputsProps) => {
  const { control } = useFormContext<BaseInvoiceSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
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
                name={`prices.${index}.label`}
                control={control}
                placeholder="Enter label"
              />
              <HookFormField
                fieldType="number"
                name={`prices.${index}.amount`}
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
          onClick={() => append({ amount: 1, label: "" })}
        >
          Add price
        </Button>
      )}
    </FieldSet>
  );
};
