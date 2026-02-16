import { AddToHomeScreen } from "./components/add-to-home-screen";
import { Close } from "./components/close";
import { ClosingConfirmation } from "./components/closing-confirmation";
import { Fullscreen } from "./components/fullscreen";
import { OrientationLocked } from "./components/orientation-locked";
import { QRPopup } from "./components/qr-popup";
import { RequestContact } from "./components/request-contact";
import { VerticalSwipes } from "./components/vertical-swipes";

export const HANDLERS_MAPPING = [
  {
    name: "isClosingConfirmationEnabled",
    version: "6.1",
    Component: ClosingConfirmation,
  },
  {
    name: "isFullscreen",
    version: "8.0",
    Component: Fullscreen,
  },
  {
    name: "addToHomeScreen",
    version: "8.0",
    Component: AddToHomeScreen,
  },
  {
    name: "QR Popup",
    version: "6.4",
    Component: QRPopup,
  },
  {
    name: "close",
    Component: Close,
  },
  {
    name: "isVerticalSwipesEnabled",
    version: "7.1",
    Component: VerticalSwipes,
  },
  {
    name: "isOrientationLocked",
    version: "8.0",
    Component: OrientationLocked,
  },
  {
    name: "Request Contact",
    version: "6.9",
    Component: RequestContact,
  },
];
