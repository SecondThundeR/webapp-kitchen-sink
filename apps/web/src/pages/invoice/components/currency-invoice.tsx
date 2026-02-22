import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { HookFormField } from "@/components/hook-form-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { CURRENCIES } from "../constants";
import { useInvoice } from "../hooks";
import { type InvoiceSchema, invoiceSchema } from "../schemas";
import { PricesInputs } from "./prices-inputs";
import { TipsInputs } from "./tips-inputs";

export const CurrencyInvoice = () => {
  const {
    handlePayment: handleCurrencyPayment,
    isInvoicePending: isCurrencyInvoicePending,
    isInvoiceCreating: isCurrencyInvoiceCreating,
  } = useInvoice();

  const form = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      title: "",
      description: "",
      currency: "",
      prices: [
        {
          label: "",
          amount: 1,
        },
      ],
    },
  });

  return (
    <form
      id="currency-invoice-form"
      onSubmit={form.handleSubmit(handleCurrencyPayment, console.error)}
    >
      <div className="p-1 flex flex-col gap-4">
        <h2 className="text-xl">Required parameters</h2>
        <FieldGroup className="gap-3">
          <HookFormField
            name="title"
            control={form.control}
            label="Title"
            placeholder="Enter product title"
          />
          <HookFormField
            fieldType="textarea"
            name="description"
            control={form.control}
            label="Description"
            placeholder="Enter product description"
            rows={6}
            className="min-h-24 resize-none"
            maxLength={255}
          />
          <HookFormField
            fieldType="select"
            name="currency"
            control={form.control}
            label="Currency"
            options={CURRENCIES.map((c) => ({
              value: c.code,
              label: `${c.flag} ${c.name}`,
            }))}
          />
          <PricesInputs control={form.control} />
          <FieldSeparator />
          <h2 className="text-xl">Optional parameters</h2>
          <HookFormField
            fieldType="number"
            name="max_tip_amount"
            control={form.control}
            label="Max tip amount"
            placeholder="Enter max tip amount"
          />
          <TipsInputs control={form.control} />
          <HookFormField
            name="photo_url"
            control={form.control}
            label="Photo URL"
            placeholder="Enter photo URL"
          />
          <HookFormField
            fieldType="number"
            name="photo_size"
            control={form.control}
            label="Photo size"
            placeholder="Enter photo size in bytes"
          />
          <HookFormField
            fieldType="number"
            name="photo_width"
            control={form.control}
            label="Photo width"
            placeholder="Enter photo width"
          />
          <HookFormField
            fieldType="number"
            name="photo_height"
            control={form.control}
            label="Photo height"
            placeholder="Enter photo height"
          />
          <HookFormField
            fieldType="checkbox"
            name="need_name"
            control={form.control}
            label="Require the user's full name to complete the order"
          />
          <HookFormField
            fieldType="checkbox"
            name="need_phone_number"
            control={form.control}
            label="Require the user's phone number to complete the order"
          />
          <HookFormField
            fieldType="checkbox"
            name="need_email"
            control={form.control}
            label="Require the user's email address to complete the order"
          />
          <HookFormField
            fieldType="checkbox"
            name="need_shipping_address"
            control={form.control}
            label="Require the user's shipping address to complete the order"
          />
          <HookFormField
            fieldType="checkbox"
            name="is_flexible"
            control={form.control}
            label="Final price depends on the shipping method"
          />
        </FieldGroup>
        <Alert>
          <InfoIcon />
          <AlertTitle>Payment Details</AlertTitle>
          <AlertDescription>
            For payment, enter 4242 4242 4242 4242 as card number, any valid
            date and CVV code
          </AlertDescription>
        </Alert>
        <Button type="submit" disabled={isCurrencyInvoicePending}>
          {isCurrencyInvoiceCreating && <Spinner data-icon="inline-start" />}
          {isCurrencyInvoiceCreating ? "Creating invoice..." : "Create invoice"}
        </Button>
      </div>
    </form>
  );
};
