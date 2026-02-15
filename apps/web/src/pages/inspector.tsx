import { ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebAppData } from "@/hooks/use-web-app-data";
import { WebApp } from "@/lib/web-app";

export const InspectorPage = () => {
  const webAppDataJson = useWebAppData();
  const [showPrettified, setShowPrettified] = useState(true);

  const webAppData = JSON.parse(webAppDataJson) as typeof WebApp;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          WebApp Data Inspector
        </h1>
        <Button onClick={() => setShowPrettified((prev) => !prev)}>
          {showPrettified ? "Show stringified JSON" : "Show prettified view"}
        </Button>
      </div>
      {showPrettified ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="wrap-anywhere">initData</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="wrap-anywhere">
                {decodeURIComponent(webAppData.initData)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="wrap-anywhere">initDataUnsafe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="wrap-anywhere">
                {JSON.stringify(webAppData.initDataUnsafe, null, 4)}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">version</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.version}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">platform</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.platform}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">colorScheme</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.colorScheme}</CardContent>
            </Card>
            <Link to="/theme-params">
              <Card>
                <CardHeader>
                  <CardTitle className="flex wrap-anywhere gap-2">
                    themeParams <ExternalLinkIcon className="size-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>Available on separate page</CardContent>
              </Card>
            </Link>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">isExpanded</CardTitle>
              </CardHeader>
              <CardContent>{String(webAppData.isExpanded)}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">viewportHeight</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.viewportHeight}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  viewportStableHeight
                </CardTitle>
              </CardHeader>
              <CardContent>{webAppData.viewportStableHeight}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">safeAreaInset</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.safeAreaInset, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  contentSafeAreaInset
                </CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.contentSafeAreaInset, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  isClosingConfirmationEnabled
                </CardTitle>
              </CardHeader>
              <CardContent>
                {String(webAppData.isClosingConfirmationEnabled)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  isVerticalSwipesEnabled
                </CardTitle>
              </CardHeader>
              <CardContent>
                {String(webAppData.isVerticalSwipesEnabled)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">isFullscreen</CardTitle>
              </CardHeader>
              <CardContent>{String(webAppData.isFullscreen)}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  isOrientationLocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                {String(webAppData.isOrientationLocked)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">isActive</CardTitle>
              </CardHeader>
              <CardContent>{String(webAppData.isActive)}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">headerColor</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.headerColor}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">backgroundColor</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.backgroundColor}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">bottomBarColor</CardTitle>
              </CardHeader>
              <CardContent>{webAppData.bottomBarColor}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">BackButton</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.BackButton, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">MainButton</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.MainButton, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">SecondaryButton</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.SecondaryButton, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">SettingsButton</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.SettingsButton, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">HapticFeedback</CardTitle>
              </CardHeader>
              <CardContent>
                {webAppData.HapticFeedback ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">CloudStorage</CardTitle>
              </CardHeader>
              <CardContent>
                {webAppData.CloudStorage ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  BiometricManager
                </CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.BiometricManager, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">Accelerometer</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.Accelerometer, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  DeviceOrientation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.DeviceOrientation, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">Gyroscope</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.Gyroscope, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">LocationManager</CardTitle>
              </CardHeader>
              <CardContent>
                {JSON.stringify(webAppData.LocationManager, null, 4)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">DeviceStorage</CardTitle>
              </CardHeader>
              <CardContent>
                {"DeviceStorage" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">SecureStorage</CardTitle>
              </CardHeader>
              <CardContent>
                {"SecureStorage" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  isVersionAtLeast(version)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"isVersionAtLeast" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  setHeaderColor(color)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"setHeaderColor" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  setBackgroundColor(color)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"setBackgroundColor" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  setBottomBarColor(color)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"setBottomBarColor" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  enableClosingConfirmation()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"enableClosingConfirmation" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  disableClosingConfirmation()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"disableClosingConfirmation" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  enableVerticalSwipes()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"enableVerticalSwipes" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  disableVerticalSwipes()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"disableVerticalSwipes" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  requestFullscreen()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"requestFullscreen" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  exitFullscreen()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"exitFullscreen" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  lockOrientation()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"lockOrientation" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  unlockOrientation()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"unlockOrientation" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  addToHomeScreen()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"addToHomeScreen" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  checkHomeScreenStatus([callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"checkHomeScreenStatus" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  onEvent(eventType, eventHandler)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"onEvent" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  offEvent(eventType, eventHandler)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"offEvent" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">sendData(data)</CardTitle>
              </CardHeader>
              <CardContent>
                {"sendData" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  switchInlineQuery(query[, choose_chat_types])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"switchInlineQuery" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  openLink(url[, options])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"openLink" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  openTelegramLink(url)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"openTelegramLink" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  openInvoice(url[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"openInvoice" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  shareToStory(media_url[, params])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"shareToStory" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  shareMessage(msg_id[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"shareMessage" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  setEmojiStatus(custom_emoji_id[, params, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"setEmojiStatus" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  requestEmojiStatusAccess([callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"requestEmojiStatusAccess" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  downloadFile(params[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"downloadFile" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">hideKeyboard()</CardTitle>
              </CardHeader>
              <CardContent>
                {"hideKeyboard" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  showPopup(params[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"showPopup" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  showAlert(message[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"showAlert" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  showConfirm(message[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"showConfirm" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  showScanQrPopup(params[, callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"showScanQrPopup" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  closeScanQrPopup()
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"closeScanQrPopup" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  readTextFromClipboard([callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"readTextFromClipboard" in WebApp
                  ? "Supported"
                  : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  requestWriteAccess([callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"requestWriteAccess" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">
                  requestContact([callback])
                </CardTitle>
              </CardHeader>
              <CardContent>
                {"requestContact" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">ready()</CardTitle>
              </CardHeader>
              <CardContent>
                {"ready" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">expand()</CardTitle>
              </CardHeader>
              <CardContent>
                {"expand" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="wrap-anywhere">close()</CardTitle>
              </CardHeader>
              <CardContent>
                {"close" in WebApp ? "Supported" : "Not supported"}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="wrap-break-word">
          <pre className="whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(WebApp, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
