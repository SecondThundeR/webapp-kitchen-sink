import eruda from "eruda";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WebApp } from "@/lib/web-app";

import "./index.css";

import App from "./App.tsx";
import { Providers } from "./providers/index.tsx";

WebApp.expand();
WebApp.ready();

if (["ios", "android"].includes(WebApp.platform)) {
  eruda.init();
}

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
