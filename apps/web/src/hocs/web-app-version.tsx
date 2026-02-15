import { WebApp } from "@/lib/web-app";

export function withWebAppVersion<P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  version: string,
) {
  return function WithVersionControlWrapper(props: P) {
    const isSupported = WebApp.isVersionAtLeast(version);

    if (!isSupported) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
