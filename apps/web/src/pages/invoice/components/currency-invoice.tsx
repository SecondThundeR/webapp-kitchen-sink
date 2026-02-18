import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useInvoice } from "../hooks";

const CURRENCIES = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ARS",
  "AUD",
  "AZN",
  "BAM",
  "BDT",
  "BGN",
  "BHD",
  "BND",
  "BOB",
  "BRL",
  "BYN",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CZK",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ETB",
  "EUR",
  "GBP",
  "GEL",
  "GHS",
  "GTQ",
  "HKD",
  "HNL",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KRW",
  "KZT",
  "LBP",
  "LKR",
  "MAD",
  "MDL",
  "MMK",
  "MNT",
  "MOP",
  "MUR",
  "MVR",
  "MXN",
  "MYR",
  "MZN",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "PAB",
  "PEN",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "SYP",
  "THB",
  "TJS",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VND",
  "YER",
  "ZAR",
];

export const CurrencyInvoice = () => {
  const {
    handlePayment: handleUSDPayment,
    isInvoicePending: isUSDInvoicePending,
    isInvoiceCreating: isUSDInvoiceCreating,
  } = useInvoice();

  return (
    <div className="flex flex-col gap-2">
      <p>
        For payment, enter 4242 4242 4242 4242 as card number, any valid date
        and CVV code
      </p>
      <Button disabled={true || isUSDInvoicePending}>
        {isUSDInvoiceCreating && <Spinner data-icon="inline-start" />}
        {isUSDInvoiceCreating ? "Creating invoice..." : "Create invoice"}
      </Button>
    </div>
  );
};
