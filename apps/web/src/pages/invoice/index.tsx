import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransparentBodyBackground } from "@/hooks/use-transparent-body-background";
import { CurrencyInvoice } from "./components/currency-invoice";
import { StarsInvoice } from "./components/stars-invoice";

export const InvoicePage = () => {
  useTransparentBodyBackground();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Invoice Playground
      </h1>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="stars">
          <TabsList variant="line">
            <TabsTrigger value="stars">Stars</TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
          </TabsList>
          <TabsContent value="stars">
            <StarsInvoice />
          </TabsContent>
          <TabsContent value="currency">
            <CurrencyInvoice />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
