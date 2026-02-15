import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { type CreateInvoiceLinkData, createInvoiceLink } from "@/lib/queries";
import { WebApp } from "@/lib/web-app";

export const useCreateInvoiceLinkMutation = () =>
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

export const useInvoice = (currency: string, amount: number) => {
  const [isInvoicePending, setIsInvoicePending] = useState(false);
  const { mutateAsync, isPending } = useCreateInvoiceLinkMutation();

  const handlePayment = async () => {
    const { url } = await mutateAsync({
      title: "Test invoice",
      description: "Test description",
      currency: currency,
      initData: WebApp.initData,
      prices: [{ label: "Item", amount }],
    });

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
    isInvoiceCreating: isPending,
  };
};
