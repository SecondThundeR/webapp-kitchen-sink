import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useInvoice } from "../hooks";

export const StarsInvoice = () => {
  const {
    handlePayment: handleStarsPayment,
    isInvoicePending: isStarsInvoicePending,
    isInvoiceCreating: isStarsInvoiceCreating,
  } = useInvoice("XTR", 1);

  return (
    <Button onClick={handleStarsPayment} disabled={isStarsInvoicePending}>
      {isStarsInvoiceCreating && <Spinner data-icon="inline-start" />}
      {isStarsInvoiceCreating ? "Creating invoice..." : "Create invoice"}
    </Button>
  );
};
