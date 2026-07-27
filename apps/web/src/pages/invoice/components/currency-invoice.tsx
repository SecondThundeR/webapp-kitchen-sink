import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAppForm } from "@/lib/form";
import {
  CURRENCIES,
  MAX_DESCRIPTION_LENGTH,
  PHOTO_NUMBER_FIELDS,
} from "../constants";
import { invoiceFormOptions } from "../form-options";
import { useInvoice } from "../hooks";
import { invoiceSchema } from "../schemas";
import { PricesInputs } from "./prices-inputs";
import { TipsInputs } from "./tips-inputs";

const CURRENCY_OPTIONS = CURRENCIES.map((currency) => ({
  value: currency.code,
  label: `${currency.flag} ${currency.name}`,
}));

const REQUIREMENT_FIELDS = [
  {
    name: "need_name",
    label: "Require the user's full name to complete the order",
  },
  {
    name: "need_phone_number",
    label: "Require the user's phone number to complete the order",
  },
  {
    name: "need_email",
    label: "Require the user's email address to complete the order",
  },
  {
    name: "need_shipping_address",
    label: "Require the user's shipping address to complete the order",
  },
  {
    name: "is_flexible",
    label: "Final price depends on the shipping method",
  },
] as const;

export const CurrencyInvoice = () => {
  const {
    handlePayment: handleCurrencyPayment,
    isInvoicePending: isCurrencyInvoicePending,
  } = useInvoice();

  const form = useAppForm({
    ...invoiceFormOptions,
    onSubmit: ({ value }) => handleCurrencyPayment(invoiceSchema.parse(value)),
    onSubmitInvalid: ({ formApi }) => console.error(formApi.state.errorMap),
  });

  return (
    <form
      id="currency-invoice-form"
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
          <form.AppField name="currency">
            {(field) => (
              <field.SelectField label="Currency" options={CURRENCY_OPTIONS} />
            )}
          </form.AppField>
          <PricesInputs
            form={form}
            fields={{ prices: "prices" }}
            singleItem={false}
            amountLimit={undefined}
          />
          <FieldSeparator />
          <h2 className="text-xl">Optional parameters</h2>
          <form.AppField
            name="max_tip_amount"
            listeners={{
              // Suggested tips are meaningless without a cap, so clearing the
              // cap clears them
              onChange: ({ value }) => {
                if (!value) form.setFieldValue("suggested_tip_amounts", []);
              },
            }}
            validators={{
              onChangeListenTo: ["suggested_tip_amounts"],
              onChange: ({ value, fieldApi }) =>
                !value &&
                fieldApi.form.getFieldValue("suggested_tip_amounts")?.length
                  ? {
                      message:
                        "Max tip amount is required when suggesting tips",
                    }
                  : undefined,
            }}
          >
            {(field) => (
              <field.NumberField
                label="Max tip amount"
                placeholder="Enter max tip amount"
              />
            )}
          </form.AppField>
          <TipsInputs form={form} />
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
          {REQUIREMENT_FIELDS.map(({ name, label }) => (
            <form.AppField key={name} name={name}>
              {(field) => <field.CheckboxField label={label} />}
            </form.AppField>
          ))}
        </FieldGroup>
        <Alert>
          <InfoIcon />
          <AlertTitle>Payment Details</AlertTitle>
          <AlertDescription>
            For payment, enter 4242 4242 4242 4242 as card number, any valid
            date and CVV code
          </AlertDescription>
        </Alert>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isCurrencyInvoicePending || isSubmitting}
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
