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
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { withFieldGroup } from "@/lib/form";
import type { BaseInvoiceSchemaInput } from "../schemas";

export interface PriceAmountLimit {
  // Field of the parent form that switches this limit on. The group cannot
  // listen to fields it does not own, so the parent is responsible for
  // re-validating the amounts when that field changes
  enabledBy: string;
  max: number;
  message: string;
}

type PricesFields = Pick<BaseInvoiceSchemaInput, "prices">;

// Only the keys are used, to map the group onto whichever form embeds it
const defaultValues: PricesFields = {
  prices: [{ label: "", amount: 1 }],
};

export const PricesInputs = withFieldGroup({
  defaultValues,
  props: {
    singleItem: false,
    amountLimit: undefined as PriceAmountLimit | undefined,
  },
  render: function Render({ group, singleItem, amountLimit }) {
    return (
      <FieldSet className="gap-4">
        <FieldLegend variant="label">Prices</FieldLegend>
        <group.Field name="prices" mode="array">
          {(pricesField) => (
            <>
              {pricesField.state.value.map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: prices are identified by their position in the array
                <Card key={index}>
                  {singleItem ? null : (
                    <CardHeader>
                      <CardTitle>Price {index + 1}</CardTitle>
                    </CardHeader>
                  )}
                  <CardContent>
                    <FieldGroup className="gap-4">
                      <group.Field name={`prices[${index}].label`}>
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                          return (
                            <Field data-invalid={isInvalid}>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="Enter label"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </group.Field>
                      <group.Field
                        name={`prices[${index}].amount`}
                        validators={{
                          onChange: ({ value, fieldApi }) => {
                            if (!amountLimit) return undefined;

                            // The embedding form can be anything, so its values
                            // are only reachable as an untyped record
                            const values = fieldApi.form.state.values as Record<
                              string,
                              unknown
                            >;
                            if (!values[amountLimit.enabledBy])
                              return undefined;

                            return value !== undefined &&
                              value > amountLimit.max
                              ? { message: amountLimit.message }
                              : undefined;
                          },
                        }}
                      >
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                          return (
                            <Field data-invalid={isInvalid}>
                              <Input
                                id={field.name}
                                name={field.name}
                                type="number"
                                value={field.state.value ?? ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                  const value = e.target.valueAsNumber;
                                  // Converts NaN to undefined cleanly
                                  field.handleChange(
                                    Number.isNaN(value) ? undefined : value,
                                  );
                                }}
                                aria-invalid={isInvalid}
                                placeholder="Enter price"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </group.Field>
                    </FieldGroup>
                  </CardContent>
                  {singleItem ? null : (
                    <CardFooter>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => pricesField.removeValue(index)}
                        disabled={pricesField.state.value.length === 1}
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
                    pricesField.pushValue({ amount: 1, label: "" })
                  }
                >
                  Add price
                </Button>
              )}
            </>
          )}
        </group.Field>
      </FieldSet>
    );
  },
});
