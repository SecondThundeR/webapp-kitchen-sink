import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/root";
import { BiometricManagerPage } from "@/pages/biometric-manager";
import { HapticFeedbackPage } from "@/pages/haptic-feedback";
import { InspectorPage } from "@/pages/inspector";
import { InvoicePage } from "@/pages/invoice";
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
        path: "/inspector",
        Component: InspectorPage,
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
    ],
  },
]);
