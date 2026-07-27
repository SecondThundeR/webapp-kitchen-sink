import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebAppVersion } from "@/components/web-app-version";
import { useSafeAreaInset } from "../hooks";

const SafeAreaViewerComponent = () => {
  const { safeAreaInset, contentSafeAreaInset } = useSafeAreaInset();

  return (
    <div className="grid grid-cols-2 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>safeAreaInset</CardTitle>
        </CardHeader>
        <CardContent>
          <p>top: {safeAreaInset.top}px</p>
          <p>right: {safeAreaInset.right}px</p>
          <p>bottom: {safeAreaInset.bottom}px</p>
          <p>left: {safeAreaInset.left}px</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">contentSafeAreaInset</CardTitle>
        </CardHeader>
        <CardContent>
          <p>top: {contentSafeAreaInset.top}px</p>
          <p>right: {contentSafeAreaInset.right}px</p>
          <p>bottom: {contentSafeAreaInset.bottom}px</p>
          <p>left: {contentSafeAreaInset.left}px</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const SafeAreaViewer = () => (
  <WebAppVersion version="8.0">
    <SafeAreaViewerComponent />
  </WebAppVersion>
);
