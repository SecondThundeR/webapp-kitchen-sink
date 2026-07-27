import { WebApp } from "./web-app";

const searchParams = new URLSearchParams(window.location.search);

export const launchMode = searchParams.get("mode");

export const shouldEnableEruda = ["ios", "android"].includes(WebApp.platform);
