import eruda from "eruda";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WebApp } from "@/lib/web-app";

import "./index.css";

import App from "./App.tsx";
import { Providers } from "./providers/providers.tsx";

WebApp.ready();

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");

if (["ios", "android"].includes(WebApp.platform)) {
  eruda.init();
}

if (mode !== "minimized") {
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
