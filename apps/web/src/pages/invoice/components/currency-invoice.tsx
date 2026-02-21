import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
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
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="description"
                    placeholder="Enter product description"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/255 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="currency"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="currency-select">Currency</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="currency-select"
                    aria-invalid={fieldState.invalid}
                    className="min-w-30"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {CURRENCIES.map(({ code, name, flag }) => (
                      <SelectItem key={code} value={code}>
                        {flag} {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <PricesInputs control={form.control} />
          <h2 className="text-xl">Optional parameters</h2>
          <FieldSeparator />
          <Controller
            name="max_tip_amount"
            control={form.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Max tip amount</FieldLabel>
                <Input
                  {...field}
                  id="max_tip_amount"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter max tip amount"
                  autoComplete="off"
                  onChange={(e) =>
                    onChange(
                      Number.isNaN(e.target.valueAsNumber)
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <TipsInputs control={form.control} />
          <Controller
            name="photo_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Photo URL</FieldLabel>
                <Input
                  {...field}
                  id="photo_url"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter photo URL"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="photo_size"
            control={form.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Photo size</FieldLabel>
                <Input
                  {...field}
                  id="photo_width"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter photo size in bytes"
                  autoComplete="off"
                  onChange={(e) =>
                    onChange(
                      Number.isNaN(e.target.valueAsNumber)
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="photo_width"
            control={form.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Photo width</FieldLabel>
                <Input
                  {...field}
                  id="photo_width"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter photo width"
                  autoComplete="off"
                  onChange={(e) =>
                    onChange(
                      Number.isNaN(e.target.valueAsNumber)
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="photo_height"
            control={form.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Photo height</FieldLabel>
                <Input
                  {...field}
                  id="photo_height"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter photo height"
                  autoComplete="off"
                  onChange={(e) =>
                    onChange(
                      Number.isNaN(e.target.valueAsNumber)
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="need_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id="need_name"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="need_name" className="font-normal">
                  Require the user's full name to complete the order
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="need_phone_number"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id="need_phone_number"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="need_phone_number" className="font-normal">
                  Require the user's phone number to complete the order
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="need_email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id="need_email"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="need_email" className="font-normal">
                  Require the user's email address to complete the order
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="need_shipping_address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id="need_shipping_address"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel
                  htmlFor="need_shipping_address"
                  className="font-normal"
                >
                  Require the user's shipping address to complete the order
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="is_flexible"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id="is_flexible"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="is_flexible" className="font-normal">
                  Final price depends on the shipping method
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
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
