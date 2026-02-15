import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransparentBodyBackground } from "@/hooks/use-transparent-body-background";
import { useInvoice } from "./hooks";

export const InvoicePage = () => {
  const {
    handlePayment: handleStarsPayment,
    isInvoiceCreating: isStarsInvoiceCreating,
  } = useInvoice("XTR", 1);

  const {
    handlePayment: handleUSDPayment,
    isInvoiceCreating: isUSDInvoiceCreating,
  } = useInvoice("USD", 100);

  useTransparentBodyBackground();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Invoice Playground
      </h1>
      <div className="flex gap-2">
        <Button onClick={handleStarsPayment}>
          {isStarsInvoiceCreating && <Spinner data-icon="inline-start" />}
          {isStarsInvoiceCreating
            ? "Creating invoice..."
            : "Create invoice (Stars)"}
        </Button>
        <Button onClick={handleUSDPayment}>
          {isUSDInvoiceCreating && <Spinner data-icon="inline-start" />}
          {isUSDInvoiceCreating
            ? "Creating invoice..."
            : "Create invoice (USD)"}
        </Button>
      </div>
    </div>
  );
};
