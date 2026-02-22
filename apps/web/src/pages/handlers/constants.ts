import { AddToHomeScreen } from "./components/add-to-home-screen";
import { Close } from "./components/close";
import { ClosingConfirmation } from "./components/closing-confirmation";
import { Fullscreen } from "./components/fullscreen";
import { OrientationLocked } from "./components/orientation-locked";
import { QRPopup } from "./components/qr-popup";
import { RequestContact } from "./components/request-contact";
import { SetEmojiStatus } from "./components/set-emoji-status";
import { ShareMessage } from "./components/share-message";
import { ShareToStory } from "./components/share-to-story";
import { ShowAlert } from "./components/show-alert";
import { ShowConfirm } from "./components/show-confirm";
import { ShowPopup } from "./components/show-popup/show-popup";
import { SwitchInlineQuery } from "./components/switch-inline-query";
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
    name: "showScanQrPopup",
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
    name: "requestContact",
    version: "6.9",
    Component: RequestContact,
  },
  {
    name: "switchInlineQuery",
    version: "6.7",
    Component: SwitchInlineQuery,
  },
  {
    name: "showPopup",
    version: "6.2",
    Component: ShowPopup,
  },
  {
    name: "showConfirm",
    version: "6.2",
    Component: ShowConfirm,
  },
  {
    name: "showAlert",
    version: "6.2",
    Component: ShowAlert,
  },
  {
    name: "shareToStory",
    version: "7.8",
    Component: ShareToStory,
  },
  {
    name: "shareMessage",
    version: "8.0",
    Component: ShareMessage,
  },
  {
    name: "setEmojiStatus",
    version: "8.0",
    Component: SetEmojiStatus,
  },
];
