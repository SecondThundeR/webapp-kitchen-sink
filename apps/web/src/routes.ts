import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/root";
import { RouteError } from "@/layouts/route-error";

interface PlaygroundRoute {
  path: string;
  title: string;
  lazy: () => Promise<{ Component: ComponentType }>;
}

export const PLAYGROUND_ROUTES: PlaygroundRoute[] = [
  {
    path: "/theme-params",
    title: "Theme Params",
    lazy: async () => ({
      Component: (await import("@/pages/theme-params/theme-params"))
        .ThemeParamsPage,
    }),
  },
  {
    path: "/gyroscope",
    title: "Gyroscope",
    lazy: async () => ({
      Component: (await import("@/pages/gyroscope/gyroscope")).Gyroscope,
    }),
  },
  {
    path: "/accelerometer",
    title: "Accelerometer",
    lazy: async () => ({
      Component: (await import("@/pages/accelerometer/accelerometer"))
        .Accelerometer,
    }),
  },
  {
    path: "/device-orientation",
    title: "Device Orientation",
    lazy: async () => ({
      Component: (await import("@/pages/device-orientation/device-orientation"))
        .DeviceOrientation,
    }),
  },
  {
    path: "/haptic-feedback",
    title: "Haptic Feedback",
    lazy: async () => ({
      Component: (await import("@/pages/haptic-feedback/haptic-feedback"))
        .HapticFeedbackPage,
    }),
  },
  {
    path: "/biometric-manager",
    title: "Biometric Manager",
    lazy: async () => ({
      Component: (await import("@/pages/biometric-manager/biometric-manager"))
        .BiometricManagerPage,
    }),
  },
  {
    path: "/location-manager",
    title: "Location Manager",
    lazy: async () => ({
      Component: (await import("@/pages/location-manager/location-manager"))
        .LocationManager,
    }),
  },
  {
    path: "/cloud-storage",
    title: "Cloud Storage",
    lazy: async () => ({
      Component: (await import("@/pages/cloud-storage/cloud-storage"))
        .CloudStorage,
    }),
  },
  {
    path: "/device-storage",
    title: "Device Storage",
    lazy: async () => ({
      Component: (await import("@/pages/device-storage/device-storage"))
        .DeviceStorage,
    }),
  },
  {
    path: "/secure-storage",
    title: "Secure Storage",
    lazy: async () => ({
      Component: (await import("@/pages/secure-storage/secure-storage"))
        .SecureStorage,
    }),
  },
  {
    path: "/buttons",
    title: "Buttons",
    lazy: async () => ({
      Component: (await import("@/pages/buttons/buttons")).Buttons,
    }),
  },
  {
    path: "/invoice",
    title: "Invoice",
    lazy: async () => ({
      Component: (await import("@/pages/invoice/invoice")).InvoicePage,
    }),
  },
  {
    path: "/handlers",
    title: "Handlers",
    lazy: async () => ({
      Component: (await import("@/pages/handlers/handlers")).HandlersPage,
    }),
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteError,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("@/pages/root/root")).RootPage,
        }),
      },
      ...PLAYGROUND_ROUTES.map(({ path, lazy }) => ({ path, lazy })),
    ],
  },
]);
