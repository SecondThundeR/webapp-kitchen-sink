import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/root";
import { Accelerometer } from "@/pages/accelerometer/accelerometer";
import { BiometricManagerPage } from "@/pages/biometric-manager/biometric-manager";
import { Buttons } from "@/pages/buttons/buttons";
import { CloudStorage } from "@/pages/cloud-storage/cloud-storage";
import { DeviceOrientation } from "@/pages/device-orientation/device-orientation";
import { DeviceStorage } from "@/pages/device-storage/device-storage";
import { Gyroscope } from "@/pages/gyroscope/gyroscope";
import { HandlersPage } from "@/pages/handlers/handlers";
import { HapticFeedbackPage } from "@/pages/haptic-feedback/haptic-feedback";
import { InvoicePage } from "@/pages/invoice/invoice";
import { LocationManager } from "@/pages/location-manager/location-manager";
import { RootPage } from "@/pages/root/root";
import { SecureStorage } from "@/pages/secure-storage/secure-storage";
import { ThemeParamsPage } from "@/pages/theme-params/theme-params";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: RootPage,
      },
      {
        path: "/theme-params",
        Component: ThemeParamsPage,
      },
      {
        path: "/haptic-feedback",
        Component: HapticFeedbackPage,
      },
      {
        path: "/biometric-manager",
        Component: BiometricManagerPage,
      },
      {
        path: "/invoice",
        Component: InvoicePage,
      },
      {
        path: "/handlers",
        Component: HandlersPage,
      },
      {
        path: "/gyroscope",
        Component: Gyroscope,
      },
      {
        path: "/accelerometer",
        Component: Accelerometer,
      },
      {
        path: "/device-orientation",
        Component: DeviceOrientation,
      },
      {
        path: "/location-manager",
        Component: LocationManager,
      },
      {
        path: "/cloud-storage",
        Component: CloudStorage,
      },
      {
        path: "/device-storage",
        Component: DeviceStorage,
      },
      {
        path: "/secure-storage",
        Component: SecureStorage,
      },
      {
        path: "/buttons",
        Component: Buttons,
      },
    ],
  },
]);
