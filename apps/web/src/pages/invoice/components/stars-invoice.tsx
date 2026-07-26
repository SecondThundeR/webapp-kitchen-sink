import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useAppForm } from "@/lib/form";
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
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Enter product title"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter product description"
                      rows={6}
                      className="min-h-24 resize-none"
                      maxLength={255}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.state.value.length}/255 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
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
              <form.Field
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
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value ?? false}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked)
                        }
                        aria-invalid={isInvalid}
                      />
                      <FieldLabel htmlFor={field.name} className="font-normal">
                        Enable subscription
                      </FieldLabel>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </FieldSet>
          <form.Field name="photo_url">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Photo URL</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Enter photo URL"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="photo_size">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Photo size</FieldLabel>
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
                    placeholder="Enter photo size in bytes"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="photo_width">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Photo width</FieldLabel>
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
                    placeholder="Enter photo width"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="photo_height">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Photo height</FieldLabel>
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
                    placeholder="Enter photo height"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
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
