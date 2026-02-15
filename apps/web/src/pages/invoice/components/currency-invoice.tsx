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
    <div className="flex flex-col gap-2">
      <p>
        For payment, enter 4242 4242 4242 4242 as card number, any valid date
        and CVV code
      </p>
      <Button onClick={handleUSDPayment} disabled={isUSDInvoicePending}>
        {isUSDInvoiceCreating && <Spinner data-icon="inline-start" />}
        {isUSDInvoiceCreating ? "Creating invoice..." : "Create invoice"}
      </Button>
    </div>
  );
};
