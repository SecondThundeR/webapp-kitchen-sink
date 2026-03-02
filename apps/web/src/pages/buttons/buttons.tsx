import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebAppVersionGuard } from "@/guard/web-app-version";
import { MainButton } from "./components/main-button";
import { SecondaryButton } from "./components/secondary-button";
import { SettingsButton } from "./components/settings-button";

export const Buttons = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Buttons Playground
      </h1>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="main">
          <TabsList variant="line">
            <TabsTrigger value="main">Main</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
            <WebAppVersionGuard version="7.0">
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </WebAppVersionGuard>
          </TabsList>
          <TabsContent value="main" forceMount>
            <MainButton />
          </TabsContent>
          <TabsContent value="secondary" forceMount>
            <SecondaryButton />
          </TabsContent>
          <WebAppVersionGuard version="7.0">
            <TabsContent value="settings" forceMount>
              <SettingsButton />
            </TabsContent>
          </WebAppVersionGuard>
        </Tabs>
      </div>
    </div>
  );
};
