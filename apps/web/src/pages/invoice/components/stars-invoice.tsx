import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAppForm } from "@/lib/form";
import { MAX_DESCRIPTION_LENGTH, PHOTO_NUMBER_FIELDS } from "../constants";
import { starsInvoiceFormOptions } from "../form-options";
import { useInvoice } from "../hooks";
import { starsInvoiceSchema } from "../schemas";
import { type PriceAmountLimit, PricesInputs } from "./prices-inputs";

const SUBSCRIPTION_AMOUNT_LIMIT: PriceAmountLimit = {
  enabledBy: "is_subscription_enabled",
  max: 10000,
  message: "Subscription price cannot exceed 10000",
};

export const StarsInvoice = () => {
  const {
    handlePayment: handleStarsPayment,
    isInvoicePending: isStarsInvoicePending,
  } = useInvoice();

  const form = useAppForm({
    ...starsInvoiceFormOptions,
    onSubmit: ({ value }) =>
      handleStarsPayment(starsInvoiceSchema.parse(value)),
    onSubmitInvalid: ({ formApi }) => console.error(formApi.state.errorMap),
  });

  return (
    <form
      id="stars-invoice-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="p-1 flex flex-col gap-4">
        <h2 className="text-xl">Required parameters</h2>
        <FieldGroup className="gap-3">
          <form.AppField name="title">
            {(field) => (
              <field.TextField
                label="Title"
                placeholder="Enter product title"
              />
            )}
          </form.AppField>
          <form.AppField name="description">
            {(field) => (
              <field.TextareaField
                label="Description"
                placeholder="Enter product description"
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
            )}
          </form.AppField>
          <PricesInputs
            form={form}
            fields={{ prices: "prices" }}
            singleItem
            amountLimit={SUBSCRIPTION_AMOUNT_LIMIT}
          />
          <FieldSeparator />
          <h2 className="text-xl">Optional parameters</h2>
          <FieldSet>
            <FieldLegend variant="label">Subscription</FieldLegend>
            <FieldDescription>
              Invoices with stars allow to specify subscription period.
              Currently it only supports 2592000 seconds (30 days)
              <br />
              Any number of subscriptions can be active for a given bot at the
              same time, including multiple concurrent subscriptions from the
              same user. Subscription price must no exceed 10000 Telegram Stars
            </FieldDescription>
            <FieldGroup data-slot="checkbox-group">
              <form.AppField
                name="is_subscription_enabled"
                listeners={{
                  // The price cap only applies to subscriptions, so toggling it
                  // has to re-check the amounts owned by the prices field group
                  onChange: () => {
                    form.state.values.prices.forEach((_, index) => {
                      form.validateField(`prices[${index}].amount`, "change");
                    });
                  },
                }}
              >
                {(field) => <field.CheckboxField label="Enable subscription" />}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
          <form.AppField name="photo_url">
            {(field) => (
              <field.TextField
                label="Photo URL"
                placeholder="Enter photo URL"
              />
            )}
          </form.AppField>
          {PHOTO_NUMBER_FIELDS.map(({ name, label, placeholder }) => (
            <form.AppField key={name} name={name}>
              {(field) => (
                <field.NumberField label={label} placeholder={placeholder} />
              )}
            </form.AppField>
          ))}
        </FieldGroup>
        <Alert>
          <InfoIcon />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            There is no test payment provider like for regular currency
            invoices, so you will spend your own stars
            <br />
            However, right after a successful payment, the bot will instantly
            refund your payment (even if it is a subscription)
          </AlertDescription>
        </Alert>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isStarsInvoicePending || isSubmitting}
            >
              {isSubmitting && <Spinner data-icon="inline-start" />}
              {isSubmitting ? "Creating invoice..." : "Create invoice"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};
