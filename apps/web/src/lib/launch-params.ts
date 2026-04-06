const searchParams = new URLSearchParams(window.location.search);

export const launchMode = searchParams.get("mode");

export const shouldEnableEruda = ["ios", "android"].includes(
  window.Telegram.WebApp.platform,
);
