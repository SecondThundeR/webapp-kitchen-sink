import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { useInvoice } from "../hooks";
import { type StarsInvoiceSchema, starsInvoiceSchema } from "../schemas";

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
      id="invoice-form"
      onSubmit={form.handleSubmit(handleStarsPayment, console.error)}
    >
      <div className="p-1 flex flex-col gap-4">
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
            name="prices.0.label"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Label</FieldLabel>
                <Input
                  {...field}
                  id="label"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter label"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="prices.0.amount"
            control={form.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Price</FieldLabel>
                <Input
                  {...field}
                  id="amount"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter price"
                  autoComplete="off"
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSeparator />
          <Controller
            name="is_subscription_enabled"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Subscription</FieldLegend>
                  <FieldDescription>
                    Invoices with stars allow to specify subscription period.
                    Currently it only supports 2592000 seconds (30 days)
                    <br />
                    Any number of subscriptions can be active for a given bot at
                    the same time, including multiple concurrent subscriptions
                    from the same user. Subscription price must no exceed 10000
                    Telegram Stars
                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="is_subscription_enabled"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="is_subscription_enabled"
                        className="font-normal"
                      >
                        Enable subscription
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />
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
                  onChange={(e) => onChange(e.target.valueAsNumber)}
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
                  onChange={(e) => onChange(e.target.valueAsNumber)}
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
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          form="invoice-form"
          type="submit"
          disabled={isStarsInvoicePending}
        >
          {isStarsInvoiceCreating && <Spinner data-icon="inline-start" />}
          {isStarsInvoiceCreating ? "Creating invoice..." : "Create invoice"}
        </Button>
      </div>
    </form>
  );
};
