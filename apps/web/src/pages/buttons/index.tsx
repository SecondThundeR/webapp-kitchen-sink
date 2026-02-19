import { WebApp } from "@/lib/web-app";
import { MainButton } from "./components/main-button";
import { SecondaryButton } from "./components/secondary-button";
import { SettingsButton } from "./components/settings-button";

export const Buttons = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Buttons Playground
      </h1>
      <h2 className="text-xl">Back Button</h2>
      <p>
        Back Button was implemented in this application, so there no demo for it
      </p>
      <h2 className="text-xl">Main Button</h2>
      <MainButton />
      <h2 className="text-xl">Secondary Button</h2>
      <SecondaryButton />
      {WebApp.isVersionAtLeast("7.0") && (
        <>
          <h2 className="text-xl">Settings Button</h2>
          <SettingsButton />
        </>
      )}
    </div>
  );
};
