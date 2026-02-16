import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

const scanQrPopupClosedHandler = () => {
  toast.info("User closed scan QR popup");
};

export const QRPopup = () => {
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    if (!WebApp.isVersionAtLeast("7.7")) return;

    WebApp.onEvent("scanQrPopupClosed", scanQrPopupClosedHandler);

    return () => {
      WebApp.offEvent("scanQrPopupClosed", scanQrPopupClosedHandler);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Popup</CardTitle>
        {qrData && (
          <CardDescription>Latest scanned QR data: {qrData}</CardDescription>
        )}
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button
          className="w-full"
          onClick={() => {
            WebApp.showScanQrPopup({ text: "Test scan QR popup" }, (data) => {
              setQrData(data);
              WebApp.closeScanQrPopup();
            });
          }}
        >
          Open scan QR popup
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            setQrData("");
          }}
          disabled={!qrData}
        >
          Reset saved scanned QR data
        </Button>
      </CardFooter>
    </Card>
  );
};
