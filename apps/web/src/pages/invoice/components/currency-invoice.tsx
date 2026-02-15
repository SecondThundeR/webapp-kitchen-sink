import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useInvoice } from "../hooks";

export const CurrencyInvoice = () => {
  const {
    handlePayment: handleUSDPayment,
    isInvoicePending: isUSDInvoicePending,
    isInvoiceCreating: isUSDInvoiceCreating,
  } = useInvoice("USD", 100);

  return (
    <Button onClick={handleUSDPayment} disabled={isUSDInvoicePending}>
      {isUSDInvoiceCreating && <Spinner data-icon="inline-start" />}
      {isUSDInvoiceCreating ? "Creating invoice..." : "Create invoice"}
    </Button>
  );
};
