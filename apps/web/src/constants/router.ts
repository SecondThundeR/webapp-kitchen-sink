import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/root";
import { Accelerometer } from "@/pages/accelerometer";
import { BiometricManagerPage } from "@/pages/biometric-manager";
import { DeviceOrientation } from "@/pages/device-orientation";
import { Gyroscope } from "@/pages/gyroscope";
import { HandlersPage } from "@/pages/handlers";
import { HapticFeedbackPage } from "@/pages/haptic-feedback";
import { InvoicePage } from "@/pages/invoice";
import { LocationManager } from "@/pages/location-manager";
import { RootPage } from "@/pages/root";
import { ThemeParamsPage } from "@/pages/theme-params";

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
    ],
  },
]);
