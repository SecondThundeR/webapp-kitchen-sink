import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        async lazy() {
          const { RootPage } = await import("@/pages/root/root");
          return { Component: RootPage };
        },
      },
      {
        path: "/theme-params",
        async lazy() {
          const { ThemeParamsPage } = await import(
            "@/pages/theme-params/theme-params"
          );
          return { Component: ThemeParamsPage };
        },
      },
      {
        path: "/haptic-feedback",
        async lazy() {
          const { HapticFeedbackPage } = await import(
            "@/pages/haptic-feedback/haptic-feedback"
          );
          return { Component: HapticFeedbackPage };
        },
      },
      {
        path: "/biometric-manager",
        async lazy() {
          const { BiometricManagerPage } = await import(
            "@/pages/biometric-manager/biometric-manager"
          );
          return { Component: BiometricManagerPage };
        },
      },
      {
        path: "/invoice",
        async lazy() {
          const { InvoicePage } = await import("@/pages/invoice/invoice");
          return { Component: InvoicePage };
        },
      },
      {
        path: "/handlers",
        async lazy() {
          const { HandlersPage } = await import("@/pages/handlers/handlers");
          return { Component: HandlersPage };
        },
      },
      {
        path: "/gyroscope",
        async lazy() {
          const { Gyroscope } = await import("@/pages/gyroscope/gyroscope");
          return { Component: Gyroscope };
        },
      },
      {
        path: "/accelerometer",
        async lazy() {
          const { Accelerometer } = await import(
            "@/pages/accelerometer/accelerometer"
          );
          return { Component: Accelerometer };
        },
      },
      {
        path: "/device-orientation",
        async lazy() {
          const { DeviceOrientation } = await import(
            "@/pages/device-orientation/device-orientation"
          );
          return { Component: DeviceOrientation };
        },
      },
      {
        path: "/location-manager",
        async lazy() {
          const { LocationManager } = await import(
            "@/pages/location-manager/location-manager"
          );
          return { Component: LocationManager };
        },
      },
      {
        path: "/cloud-storage",
        async lazy() {
          const { CloudStorage } = await import(
            "@/pages/cloud-storage/cloud-storage"
          );
          return { Component: CloudStorage };
        },
      },
      {
        path: "/device-storage",
        async lazy() {
          const { DeviceStorage } = await import(
            "@/pages/device-storage/device-storage"
          );
          return { Component: DeviceStorage };
        },
      },
      {
        path: "/secure-storage",
        async lazy() {
          const { SecureStorage } = await import(
            "@/pages/secure-storage/secure-storage"
          );
          return { Component: SecureStorage };
        },
      },
      {
        path: "/buttons",
        async lazy() {
          const { Buttons } = await import("@/pages/buttons/buttons");
          return { Component: Buttons };
        },
      },
    ],
  },
]);
