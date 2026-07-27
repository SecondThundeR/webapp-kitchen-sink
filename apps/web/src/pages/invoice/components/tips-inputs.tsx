import { useSelector } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { withForm } from "@/lib/form";
import { invoiceFormOptions } from "../form-options";

const MAX_TIP_OPTIONS = 4;

export const TipsInputs = withForm({
  ...invoiceFormOptions,
  render: function Render({ form }) {
    const maxTipAmount = useSelector(
      form.store,
      (state) => state.values.max_tip_amount,
    );

    return (
      <FieldSet className="gap-4">
        <FieldLegend variant="label">Suggested Tip Amounts</FieldLegend>
        <form.Field name="suggested_tip_amounts" mode="array">
          {(tipsField) => {
            const tips = tipsField.state.value ?? [];

            return (
              <>
                {tips.map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: tip options are identified by their position in the array
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Tip option {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FieldGroup className="gap-4">
                        <form.AppField
                          name={`suggested_tip_amounts[${index}].tip`}
                          validators={{
                            // Re-runs whenever the cap itself is edited, so the
                            // error lands on the tip without touching it again
                            onChangeListenTo: ["max_tip_amount"],
                            onChange: ({ value, fieldApi }) => {
                              const max =
                                fieldApi.form.getFieldValue("max_tip_amount");

                              return max !== undefined &&
                                value !== undefined &&
                                value > max
                                ? { message: `Must be ≤ ${max}` }
                                : undefined;
                            },
                          }}
                        >
                          {(field) => (
                            <field.NumberField
                              orientation="horizontal"
                              max={maxTipAmount}
                              placeholder="Enter tip"
                            />
                          )}
                        </form.AppField>
                      </FieldGroup>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => tipsField.removeValue(index)}
                        disabled={tips.length === 1}
                      >
                        Remove tip option
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => tipsField.pushValue({ tip: undefined })}
                  disabled={
                    maxTipAmount === undefined ||
                    tips.length === MAX_TIP_OPTIONS
                  }
                >
                  Add tip option
                </Button>
              </>
            );
          }}
        </form.Field>
      </FieldSet>
    );
  },
});
