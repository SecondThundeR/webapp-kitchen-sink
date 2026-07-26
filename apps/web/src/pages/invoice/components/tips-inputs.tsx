import { useEffect } from "react";
import { type Control, useFieldArray, useWatch } from "react-hook-form";
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
import type { InvoiceSchema } from "../schemas";

interface TipsInputsProps {
  control: Control<InvoiceSchema>;
}

export const TipsInputs = ({ control }: TipsInputsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "suggested_tip_amounts",
  });

  const maxTipAmount = useWatch({
    control,
    name: "max_tip_amount",
  });

  useEffect(() => {
    if (!maxTipAmount && fields.length > 0) {
      remove();
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
              <HookFormField
                fieldType="number"
                orientation="horizontal"
                name={`suggested_tip_amounts.${index}.tip`}
                control={control}
                placeholder="Enter tip"
                max={maxTipAmount}
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
        onClick={() => append({ tip: 0 })}
        disabled={maxTipAmount === undefined || fields.length === 4}
      >
        Add tip option
      </Button>
    </FieldSet>
  );
};
