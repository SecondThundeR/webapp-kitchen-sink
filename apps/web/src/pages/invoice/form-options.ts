import { formOptions } from "@tanstack/react-form";
import {
  type InvoiceSchemaInput,
  invoiceSchema,
  type StarsInvoiceSchemaInput,
  starsInvoiceSchema,
} from "./schemas";

const defaultPrice = {
  label: "",
  amount: 1,
};

// Shared so that the pieces a form is split into (withForm, withFieldGroup) can
// derive their types from the same options the form itself is built with
export const invoiceFormOptions = formOptions({
  defaultValues: {
    title: "",
    description: "",
    currency: "",
    prices: [defaultPrice],
  } as InvoiceSchemaInput,
  validators: {
    onBlur: invoiceSchema,
    onSubmit: invoiceSchema,
  },
});

export const starsInvoiceFormOptions = formOptions({
  defaultValues: {
    title: "",
    description: "",
    prices: [defaultPrice],
  } as StarsInvoiceSchemaInput,
  validators: {
    onBlur: starsInvoiceSchema,
    onSubmit: starsInvoiceSchema,
  },
});
