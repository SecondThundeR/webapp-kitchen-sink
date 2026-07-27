import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebAppVersion } from "@/components/web-app-version";
import { MainButton } from "./components/main-button";
import { SecondaryButton } from "./components/secondary-button";
import { SettingsButton } from "./components/settings-button";

export const Buttons = () => {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Buttons Playground
      </h1>
      <div className="flex flex-col gap-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger value="main">Main</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
            <WebAppVersion version="7.0">
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </WebAppVersion>
          </TabsList>
          <TabsContent value="main" keepMounted hidden={activeTab !== "main"}>
            <MainButton />
          </TabsContent>
          <TabsContent
            value="secondary"
            keepMounted
            hidden={activeTab !== "secondary"}
          >
            <SecondaryButton />
          </TabsContent>
          <WebAppVersion version="7.0">
            <TabsContent
              value="settings"
              keepMounted
              hidden={activeTab !== "settings"}
            >
              <SettingsButton />
            </TabsContent>
          </WebAppVersion>
        </Tabs>
      </div>
    </div>
  );
};
