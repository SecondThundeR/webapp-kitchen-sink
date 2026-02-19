import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { useTransparentBodyBackground } from "@/hooks/use-transparent-body-background";
import { WebApp } from "@/lib/web-app";
// import { CurrencyInvoice } from "./components/currency-invoice";
import { StarsInvoice } from "./components/stars-invoice";

const InvoicePageComponent = () => {
  // Telegram Desktop adds confetti (bruh), so shadcn's background color interfere with them
  useTransparentBodyBackground(WebApp.platform === "tdesktop");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Invoice Playground
      </h1>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="stars">
          <TabsList variant="line">
            <TabsTrigger value="stars">Stars</TabsTrigger>
            {/* <TabsTrigger value="currency">Currency</TabsTrigger> */}
          </TabsList>
          <TabsContent value="stars">
            <StarsInvoice />
          </TabsContent>
          {/* <TabsContent value="currency">
            <CurrencyInvoice />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export const InvoicePage = withWebAppVersion(InvoicePageComponent, {
  version: "6.1",
  enablePlaceholder: true,
});
