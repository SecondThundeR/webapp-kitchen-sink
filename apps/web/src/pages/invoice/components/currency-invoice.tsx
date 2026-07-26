import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useAppForm } from "@/lib/form";
import { CURRENCIES } from "../constants";
import { invoiceFormOptions } from "../form-options";
import { useInvoice } from "../hooks";
import { invoiceSchema } from "../schemas";
import { PricesInputs } from "./prices-inputs";
import { TipsInputs } from "./tips-inputs";

const CURRENCY_OPTIONS = CURRENCIES.map((currency) => ({
  value: currency.code,
  label: `${currency.flag} ${currency.name}`,
}));

const PHOTO_FIELDS = [
  {
    name: "photo_size",
    label: "Photo size",
    placeholder: "Enter photo size in bytes",
  },
  {
    name: "photo_width",
    label: "Photo width",
    placeholder: "Enter photo width",
  },
  {
    name: "photo_height",
    label: "Photo height",
    placeholder: "Enter photo height",
  },
] as const;

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
          <form.Field name="currency">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field orientation="responsive" data-invalid={isInvalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Select<string>
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (value === null) return;
                      field.handleChange(value);
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={isInvalid}
                      className="min-w-30"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          </form.Field>
          <PricesInputs
            form={form}
            fields={{ prices: "prices" }}
            singleItem={false}
            amountLimit={undefined}
          />
          <FieldSeparator />
          <h2 className="text-xl">Optional parameters</h2>
          <form.Field
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
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Max tip amount</FieldLabel>
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
                    placeholder="Enter max tip amount"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <TipsInputs form={form} />
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
          {PHOTO_FIELDS.map(({ name, label, placeholder }) => (
            <form.Field key={name} name={name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
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
                      placeholder={placeholder}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          ))}
          {REQUIREMENT_FIELDS.map(({ name, label }) => (
            <form.Field key={name} name={name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      checked={field.state.value ?? false}
                      onCheckedChange={(checked) => field.handleChange(checked)}
                      aria-invalid={isInvalid}
                    />
                    <FieldLabel htmlFor={field.name} className="font-normal">
                      {label}
                    </FieldLabel>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
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
