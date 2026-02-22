import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { useInvoice } from "../hooks";
import { type StarsInvoiceSchema, starsInvoiceSchema } from "../schemas";
import { PricesInputs } from "./prices-inputs";
import { HookFormField } from "@/components/hook-form-field";

export const StarsInvoice = () => {
  const {
    handlePayment: handleStarsPayment,
    isInvoicePending: isStarsInvoicePending,
    isInvoiceCreating: isStarsInvoiceCreating,
  } = useInvoice();

  const form = useForm<StarsInvoiceSchema>({
    resolver: zodResolver(starsInvoiceSchema),
    defaultValues: {
      title: "",
      description: "",
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
      id="stars-invoice-form"
      onSubmit={form.handleSubmit(handleStarsPayment, console.error)}
    >
      <div className="p-1 flex flex-col gap-4">
        <h2 className="text-xl">Required parameters</h2>
        <FieldGroup className="gap-3">
          <HookFormField
            fieldType="input"
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
          <PricesInputs control={form.control} singleItem />
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
              <HookFormField
                fieldType="checkbox"
                name="is_subscription_enabled"
                control={form.control}
                label="Enable subscription"
              />
            </FieldGroup>
          </FieldSet>
          <HookFormField
            fieldType="input"
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
        <Button type="submit" disabled={isStarsInvoicePending}>
          {isStarsInvoiceCreating && <Spinner data-icon="inline-start" />}
          {isStarsInvoiceCreating ? "Creating invoice..." : "Create invoice"}
        </Button>
      </div>
    </form>
  );
};
