import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransparentBodyBackground } from "@/hooks/use-transparent-body-background";
import { useStarsInvoice } from "./hooks";

export const InvoicePage = () => {
  const { handleStarsPayment, isStarsInvoiceCreating } = useStarsInvoice();

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
      </div>
    </div>
  );
};
