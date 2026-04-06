import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { launchMode, shouldEnableEruda } from "@/lib/launch-params";
import { WebApp } from "@/lib/web-app";

import "./index.css";

import App from "./App.tsx";
import { Providers } from "./providers/providers.tsx";

WebApp.ready();

if (shouldEnableEruda) {
  void import("eruda").then(({ default: eruda }) => {
    eruda.init();
  });
}

if (launchMode !== "minimized") {
  WebApp.expand();
}

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <Providers>
      <div className="flex flex-col flex-1 p-4">
        <App />
      </div>
    </Providers>
  </StrictMode>,
);
