import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  type CreateInvoiceLinkData,
  type CreateStarsInvoiceLinkData,
  createInvoiceLink,
  createStarsInvoiceLink,
} from "@/lib/queries";
import { WebApp } from "@/lib/web-app";
import type { InvoiceSchema, StarsInvoiceSchema } from "./schemas";

const useCreateInvoiceLinkMutation = () =>
  useMutation({
    mutationFn: (body: CreateInvoiceLinkData) => createInvoiceLink(body),
    onError: (error) => {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(String(error.message));
      }
    },
  });

const useCreateStarsInvoiceLinkMutation = () =>
  useMutation({
    mutationFn: (body: CreateStarsInvoiceLinkData) =>
      createStarsInvoiceLink(body),
    onError: (error) => {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(String(error.message));
      }
    },
  });

type HandlePaymentData = InvoiceSchema | StarsInvoiceSchema;

export const useInvoice = () => {
  const [isInvoicePending, setIsInvoicePending] = useState(false);
  const { mutateAsync: mutateInvoiceAsync, isPending: isPendingInvoice } =
    useCreateInvoiceLinkMutation();
  const {
    mutateAsync: mutateStarsInvoiceAsync,
    isPending: isPendingStarsInvoice,
  } = useCreateStarsInvoiceLinkMutation();

  const handlePayment = async (data: HandlePaymentData) => {
    let url: string;

    if ("currency" in data) {
      const result = await mutateInvoiceAsync({
        ...data,
        initData: WebApp.initData,
      });
      url = result.url;
    } else {
      const { is_subscription_enabled, ...invoiceData } = data;
      const result = await mutateStarsInvoiceAsync({
        ...invoiceData,
        subscription_period: is_subscription_enabled ? 2592000 : undefined,
        initData: WebApp.initData,
      });
      url = result.url;
    }

    setIsInvoicePending(true);

    try {
      WebApp.openInvoice(url, (status) => {
        switch (status) {
          case "paid":
            toast.success("Invoice was successfully paid");
            break;
          case "cancelled":
            toast.warning("Payment was cancelled");
            break;
          case "failed":
            toast.error("Failed to pay for invoice");
            break;
        }
        setIsInvoicePending(false);
      });
    } catch (e) {
      toast.error(String(e));
      setIsInvoicePending(false);
    }
  };

  return {
    handlePayment: handlePayment,
    isInvoicePending,
    isInvoiceCreating: isPendingInvoice || isPendingStarsInvoice,
  };
};
